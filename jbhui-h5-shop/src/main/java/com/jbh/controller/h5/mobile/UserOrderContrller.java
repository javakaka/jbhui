package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.service.system.SystemConfigService;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.StringUtil;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.DeliveryService;
import com.jbh.service.GoodsService;
import com.jbh.service.OrderItemService;
import com.jbh.service.OrderService;
import com.jbh.service.UserAddressService;
import com.jbh.service.UserService;

@Controller("h5UserOrderController")
@RequestMapping("/user/order")
public class UserOrderContrller  extends BaseController {

	@Resource(name = "hslgUserService")
	private UserService userService;
	
	@Resource(name = "hslgOrderService")
	private OrderService orderService;
	
	@Resource(name = "hslgOrderItemService")
	private OrderItemService orderItemService;
	
	@Resource(name = "hslgGoodsService")
	private GoodsService goodsService;
	
	@Resource(name = "hslgUserAddressService")
	private UserAddressService userAddressService;
	
	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	
	@Resource(name = "hslgDeliveryService")
	private DeliveryService deliveryService;
	
	private static Logger logger =Logger.getLogger(UserOrderContrller.class);
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list",method =RequestMethod.GET)
	public String listPage(String status,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		String userId =user.getString("id");
		//相应订单的总数
		String stateConditionNew ="";
		String stateConditionCancel ="";
		String stateConditionComplete ="";
		if (StringUtil.isEmptyOrNull(status)) {
			status ="1";
		}
		stateConditionNew ="'0'";
		stateConditionCancel ="'-1'";
		stateConditionComplete ="'1','2','3','4','5','6'";
		int newTotalOrderNum =orderService.queryOrderTotalNumByUserIdAndStatus( userId ,stateConditionNew);
		int cancelTotalOrderNum =orderService.queryOrderTotalNumByUserIdAndStatus( userId ,stateConditionCancel);
		int completeTotalOrderNum =orderService.queryOrderTotalNumByUserIdAndStatus( userId ,stateConditionComplete);
		model.addAttribute("status", status);
		model.addAttribute("newTotalOrderNum", newTotalOrderNum);
		model.addAttribute("cancelTotalOrderNum", cancelTotalOrderNum);
		model.addAttribute("completeTotalOrderNum", completeTotalOrderNum);
		return "/jbhpage/h5/user-order-list";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/page-data",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO pageData(String status,String page, String pageSize, ModelMap model ) 
	{
		ResponseVO ovo =new ResponseVO();
		HttpSession session =getSession();
		Row userRow =(Row)session.getAttribute("member");
		String userId =userRow.getString("id");
		if (StringUtil.isEmptyOrNull(status)) 
		{
			status ="1";
		}
		DataSet orderList =orderService.listWithOneGoodsByuserIdAndStatus(userId, status, page, pageSize);
		ovo.put("order_list", orderList);
		return ovo;
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/detail",method =RequestMethod.GET)
	public String detailPage(String id,ModelMap model ) {
		//订单基本信息	
		Row orderRow =orderService.find(id);
		//收货地址信息
		String addressId =null;
		if( orderRow != null)
		{
			addressId =orderRow.getString("address_id");
		}
		Row addressRow =userAddressService.find(addressId);
		//订单商品列表信息
		DataSet goodsList =orderItemService.findOrderItems(id);
		model.addAttribute("id", id);
		model.addAttribute("order", orderRow);
		model.addAttribute("address", addressRow);
		model.addAttribute("goodsList", goodsList);
		return "/jbhpage/h5/user-order-detail";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/cancel",method =RequestMethod.GET)
	@ResponseBody
	public String cancel(String orderId,ModelMap model ) {
		model.addAttribute("orderId", orderId);
		return "";
	}
	
	/** 前端下单，订单处理**/
	/**
	 * @param ids	购物车中的商品ID
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/create-step1",method =RequestMethod.GET)
	public String createOrderStep1(String goods,@CookieValue(value="shop_car",required=false) String shopCar,
			String addr_id,
			ModelMap model ) {
		logger.info("cookie val ===============================>>" + shopCar);
		logger.info("goods ===============================>>" + goods);
		String ids=orderService.parseGoodsIds( goods );
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		String userId =user.getString("id");
		// 查询用户是否有默认的收获地址
		int isHaveDefaultAddress =0;
		Row addressRow =userAddressService.findDefault(userId);
		if(  addressRow != null)
		{
			isHaveDefaultAddress =1;
		}
		if(! StringUtil.isEmptyOrNull(addr_id))
		{
			isHaveDefaultAddress =1;
			addressRow =userAddressService.find(addr_id);
		}
		// 查询商品列表
		DataSet goodsList =goodsService.queryShopCartGoods(ids);
		// 计算运费和订单总金额
		Double orderMoney =new Double(0);
		DataSet cartGoodsList =orderService.parseGoodsToDataSet(goods);
		orderMoney =orderService.calOrderTotalMoney(goodsList, cartGoodsList);
		Double orderTransMoney =orderService.calOrderTotalTransMoney(goodsList, cartGoodsList);
		model.addAttribute("isHaveDefaultAddress", isHaveDefaultAddress);
		// 将购买数量添加到商品列表
		goodsList =orderService.addCartNumToDbList(goodsList, cartGoodsList);
		model.addAttribute("goods_list", goodsList);
		model.addAttribute("orderMoney", orderMoney);
		model.addAttribute("orderTransMoney", orderTransMoney);
		model.addAttribute("addressRow", addressRow);
		return "/jbhpage/h5/order-pay-step1";
	}
	
	/**
	 * 在数据库中创建订单
	 * @param model
	 * @param goods 		购物车商品数据
	 * @param receiverId	收货地址ID
	 * @return
	 */
	@RequestMapping(value = "/create-step2",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO createOrderStep2(String goods,String receiverId,ModelMap model ) {
		ResponseVO ovo =new ResponseVO();
		logger.info("goods ===============================>>" + goods);
		String ids=orderService.parseGoodsIds( goods );
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		String userId =user.getString("id");
		Row addressRow =userAddressService.find(receiverId);
		if( addressRow==null )
		{
			ovo =new ResponseVO(-1,"收货地址错误");
			return ovo;
		}
		// 查询商品列表
		DataSet goodsList =goodsService.queryShopCartGoods(ids);
		DataSet cartGoodsList =orderService.parseGoodsToDataSet(goods);
		//生成订单
		ovo =orderService.createH5Order(goodsList, cartGoodsList, userId, receiverId);
		return ovo;
	}
	
	/**
	 * 根据订单号显示订单信息
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/create-step3",method =RequestMethod.GET)
	public String createOrderStep3(String orderNo,ModelMap model ) {
		if(StringUtil.isEmptyOrNull(orderNo))
		{
			return "/jbhpage/h5/order-pay-step2";
		}
		Row orderRow =orderService.findByOrderNo(orderNo);
		if(orderRow == null)
		{
			return "/jbhpage/h5/order-pay-step2";
		}
		model.addAttribute("order", orderRow);
		return "/jbhpage/h5/order-pay-step2";
	}
	
	/**
	 * 选择支付方式
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/select-paytype",method =RequestMethod.GET)
	public String selectpayType(String type,ModelMap model ) {
		model.addAttribute("type", type);
		return "/jbhpage/h5/order-pay-select-paytype";
	}
}
