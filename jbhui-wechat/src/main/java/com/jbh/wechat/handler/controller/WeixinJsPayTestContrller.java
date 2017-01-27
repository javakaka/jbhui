package com.jbh.wechat.handler.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.exp.JException;
import com.ezcloud.framework.service.pay.WeixinTicketService;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.util.SpringUtils;
import com.ezcloud.framework.util.WeixinUtil;
import com.ezcloud.framework.vo.IVO;
import com.ezcloud.framework.vo.OVO;
import com.ezcloud.framework.vo.Row;
import com.ezcloud.framework.weixin.common.WeixinTicketSign;

/**
 * 微站首页－热拍单品
 * @author TongJianbo
 */
@Controller("jbhWeixinJsPayTestController")
public class WeixinJsPayTestContrller  extends BaseController{

	@Resource(name = "frameworkWeixinTicketService")
	private WeixinTicketService weixinTicketService;
	
	/**
	 * http://www.paipintang.com/paimai/paimaipage/wxpaytest/test-pay.do
	 * @param pageable
	 * @param model
	 * @return
	 * @throws JException 
	 */
	@RequestMapping(value = "/wxpay/test/wx-test-pay")
	public String list(String user_id,String order_id,HttpServletRequest request,ModelMap model) throws JException {
		Assert.notNull(user_id);
		Assert.notNull(order_id);
		Setting setting =SettingUtils.get();
		String site_url =setting.getSiteUrl();
		//取出token 生成签名
		Row row =weixinTicketService.queryByPMAndState("1","1");
		String jsapi_ticket =row.getString("ticket","");
		String nonceStr ="";
		String timestamp ="";
		String signature ="";
		String url =site_url+"/wxpay/test/wx-test-pay.do?user_id="+user_id+"&order_id="+order_id;
		Map<String, String> map=WeixinTicketSign.sign(jsapi_ticket, url);
		nonceStr =map.get("nonceStr");
		timestamp =map.get("timestamp");
		signature =map.get("signature");
		model.addAttribute("appId", "wx43b3a03d7c049c92");
		model.addAttribute("timestamp", timestamp);
		model.addAttribute("nonceStr", nonceStr);
		model.addAttribute("signature", signature);
		String app_remote_ip =request.getRemoteAddr();
		String app_remote_host =request.getRemoteHost();
		System.out.println("---------------app_remote_ip--------->>"+app_remote_ip);
		System.out.println("---------------app_remote_ip--------->>"+request.getRemoteHost());
		//取订单信息
		IVO ivo =new IVO(0);
		ivo.set("app_ip", app_remote_host);
		ivo.set("user_id", user_id);
		ivo.set("order_id", order_id);
		String service_name ="paimaiWeiXinJSPayOrderService";
		Object serviceObj =null;
		OVO ovo =null;
		try
		{
			serviceObj =SpringUtils.getBean(service_name);
			if(serviceObj == null)
			{
				return "/jbhpage/wxpaytest/wx-test-pay";
			}
			Method method =serviceObj.getClass().getDeclaredMethod("validate",IVO.class);;
			ovo =(OVO)method.invoke(serviceObj,ivo);
		}catch(NoSuchBeanDefinitionException | NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException exp)
		{
			exp.printStackTrace();
			return "/jbhpage/wxpaytest/wx-test-pay";
		}
		
		int code =ovo.iCode;
		String pay_timestamp ="";
		String pay_noncestr ="";
		String pay_package ="";
		String pay_signtype ="";
		String pay_paysign ="";
		if(code >= 0)
		{
			pay_timestamp =ovo.getString("timestamp","");
			pay_noncestr =ovo.getString("noncestr","");
			pay_package =ovo.getString("package","");
			pay_signtype =ovo.getString("signtype","");
			pay_paysign =ovo.getString("sign","");
		}
		else if(code < 0)
		{
			System.out.println("============="+ovo.sMsg);
		}
		model.addAttribute("pay_timestamp", pay_timestamp);
		model.addAttribute("pay_noncestr", pay_noncestr);
		model.addAttribute("pay_package", pay_package);
		model.addAttribute("pay_signtype", pay_signtype);
		model.addAttribute("pay_paysign", pay_paysign);
		return "/jbhpage/wxpaytest/wx-test-pay";
	}
}
