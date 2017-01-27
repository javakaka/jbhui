package com.jbh.controller.h5.mobile;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.service.pay.WeixinTicketService;
import com.ezcloud.framework.util.MapUtils;
import com.ezcloud.framework.util.NumberUtils;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.util.WeixinUtil;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.OrderService;

/**
 * @author TongJianbo
 */
@Controller("jbhWeixinJsPayNotifyOrderController")
public class WeixinJsPayNotifyOrderContrller  extends BaseController{

	private static Logger logger = Logger.getLogger(WeixinJsPayNotifyOrderContrller.class);
	
	@Resource(name = "frameworkWeixinTicketService")
	private WeixinTicketService weixinTicketService;
	
	@Resource(name = "hslgOrderService")
	private OrderService orderService;
//	
	
	/**
	 * http://www.paipintang.com/paimai/paimaipage/wxpaytest/notify-guarentee.do
	 * 客户端发起支付请求，到服务器端认证
	 * @param request
	 * @return
	 * <xml>
		  <return_code><![CDATA[SUCCESS]]></return_code>
		  <return_msg><![CDATA[OK]]></return_msg>
		</xml>
	 * @throws Exception
	 */
	@RequestMapping(value = "/wxpay/site/notify-order")
	public @ResponseBody
	String notify(HttpServletRequest request)
	{
		String returen_msg_template ="<xml><return_code><![CDATA[{RETURN_CODE}]]></return_code><return_msg><![CDATA[{RETURN_MSG}]]></return_msg></xml>";
		String return_code ="SUCCESS";
		String return_msg ="";
		logger.info("微信支付回调处理过程...");
		HashMap<String, String> map =null;
		Row row =new Row();
		try {
			map = WeixinUtil.parseXml(request);
			row =MapUtils.convertMaptoRowWithoutNullField(map);
			logger.info("解析微信服务器发来的数据===>>"+row);
		} catch (Exception e) {
			logger.info("解析http post 数据转换成 map对象出错:"+e.getMessage());
			return_code ="FAIL";
			return_msg ="FAIL";
		}
		if(return_code.equals("FAIL"))
		{
			returen_msg_template =returen_msg_template.replace("{RETURN_CODE}", return_code);
			returen_msg_template =returen_msg_template.replace("{RETURN_MSG}", return_msg);
			logger.info("返回给微信的确认信息=================>>>>");
			return returen_msg_template;
		}
		//验证微信服务器处理支付是否成功
		String wechat_return_code =row.getString("return_code","FAIL");
		String wechat_return_msg =row.getString("return_msg","");
		String result_code =row.getString("result_code","FAIL");
		//处理失败
		if( ! (wechat_return_code.equals("SUCCESS") && result_code.equals("SUCCESS")))
		{
			String err_code =row.getString("err_code","");
			String err_code_des =row.getString("err_code_des","");
			logger.info("微信支付返回交易出错原因[return_msg]:"+wechat_return_msg+",[err_code]:"+err_code+",[err_code_des]:"+err_code_des);
			return_code ="FAIL";
			return_msg ="FAIL";
			returen_msg_template =returen_msg_template.replace("{RETURN_CODE}", return_code);
			returen_msg_template =returen_msg_template.replace("{RETURN_MSG}", return_msg);
			logger.info("返回给微信的确认信息=================>>>>");
			return returen_msg_template;
		}
		//验证订单号是否相等
		String xml_order_no =row.getString("out_trade_no","");
		String total_fee =row.getString("total_fee","");
		String transaction_id =row.getString("transaction_id","");
		String appid =row.getString("appid","");
		String mch_id =row.getString("mch_id","");
		String nonce_str =row.getString("nonce_str","");
		String sign =row.getString("sign","");
		String time_end =row.getString("time_end","");
		
//		//判断订单是否存在
		Row orderRow =orderService.findByOrderNo(xml_order_no);
		logger.info("判断订单是否存在--------------------->>");
		if(orderRow == null)
		{
			logger.info("订单号不存在:,[order_no]:"+xml_order_no);
			return_code ="FAIL";
			return_msg ="FAIL";
			returen_msg_template =returen_msg_template.replace("{RETURN_CODE}", return_code);
			returen_msg_template =returen_msg_template.replace("{RETURN_MSG}", return_msg);
			return returen_msg_template;
		}
		//判断订单是否已正确处理订单状态，如果已处理，则直接返回处理正确响应结果给微信，否则，更改订单状态
		String state =orderRow.getString("state","");
		logger.info("判断订单状态--------------------->>");
		if(state.equals("2") || state.equals("3") || state.equals("4") || state.equals("5") || state.equals("6"))
		{
			return_code ="SUCCESS";
			return_msg ="SUCCESS";
			returen_msg_template =returen_msg_template.replace("{RETURN_CODE}", return_code);
			returen_msg_template =returen_msg_template.replace("{RETURN_MSG}", return_msg);
			return returen_msg_template;
		}
		logger.info("更新订单状态--------------------->>");
		Row updateRow =new Row();
		updateRow.put("id", orderRow.getString("id"));
		updateRow.put("state", "2");//0待付款，1已付款未到账，2已到账待收货，3已收货4申请退款5退款未到账，6已退款,-1已取消
		updateRow.put("pay_type", "1");//1微信支付2支付宝快捷支付3支付宝银行卡支付
		updateRow.put("api_order_no", transaction_id);
		updateRow.put("pay_finish_time", time_end);
		String already_pay_money =orderRow.getString("pay_money","0");
		if(StringUtils.isEmptyOrNull(already_pay_money))
		{
			already_pay_money ="0";
		}
		double dalready_pay_money =Double.parseDouble(already_pay_money);
		double dtotal_fee =Double.parseDouble(total_fee)/100;
		double dnew_paid_fee =dalready_pay_money+dtotal_fee;
		String new_paid_fee =String.valueOf(dnew_paid_fee);
		new_paid_fee =NumberUtils.getTwoDecimal(new_paid_fee);
		updateRow.put("pay_money", new_paid_fee);
		orderService.update(updateRow);
		logger.info("更新订单状态成功--------------------->>");
		return_code ="SUCCESS";
		return_msg ="SUCCESS";
		returen_msg_template =returen_msg_template.replace("{RETURN_CODE}", return_code);
		returen_msg_template =returen_msg_template.replace("{RETURN_MSG}", return_msg);
		logger.info("返回给微信的确认信息=================>>>>");
		return returen_msg_template;
	}
}
