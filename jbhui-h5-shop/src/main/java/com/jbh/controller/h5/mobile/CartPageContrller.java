package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.StringUtil;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;

@Controller("h5CartPageController")
public class CartPageContrller  extends BaseController{

	 @Resource(name="hslgGoodsService")
	  private GoodsService goodsService;
	 
	 @Resource(name = "hslgGoodsTypeService")
	 private GoodsTypeService goodsTypeService;
	 
	/**
	 * 首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/cart",method =RequestMethod.GET)
	public String indexPage(ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		if (user != null) {
			return "/jbhpage/h5/cart-login";
		}
		else{
			return "/jbhpage/h5/cart-logout";
		}
	}
	/**
	 * 空购物车
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/cart-empty",method =RequestMethod.GET)
	public String emptyCart(ModelMap model ) {
		return "/jbhpage/h5/cart-empty";
	}
	
	/**
	 * 加载商品数据
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/cart-goods",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO loadCartGoods(String ids,ModelMap model ) {
		ResponseVO ovo =new ResponseVO();
		if(StringUtil.isEmptyOrNull(ids))
		{
			return ovo;
		}
		DataSet goodsList =goodsService.queryShopCartGoods(ids);
		ovo.put("goods_list", goodsList);
		return ovo;
	}
	
}
