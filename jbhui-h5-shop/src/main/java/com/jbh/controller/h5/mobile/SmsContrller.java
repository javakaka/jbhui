package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.exp.JException;
import com.ezcloud.framework.service.system.SystemConfigService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.NumberUtils;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.Row;
import com.jbh.controller.h5.app.SMSController;
import com.jbh.service.SMSService;
import com.jbh.service.UserService;
import com.jbh.util.SmsWebServiceUtil;

@Controller("h5SmsController")
@RequestMapping("/sms")
public class SmsContrller  extends BaseController{
	 
	private static Logger logger = Logger.getLogger(SMSController.class); 
	
	@Resource(name = "hslgUserService")
	private UserService userService;
	
	@Resource(name = "hslgSMSService")
	private SMSService smsService;
	
	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	 
	/**
	 * @param telephone
	 * @param type //1 发送短信 0不发送短信
	 * @return
	 */
	@RequestMapping(value = "/send-register",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO sendSms( String telephone ,String type) {
		ResponseVO ovo=new ResponseVO();
		logger.info("发送短信");
		String sms_switch =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "SWITCH");
		if(StringUtils.isEmptyOrNull(sms_switch))
		{
			sms_switch ="0";
		}
		if(sms_switch.equals("0"))
		{
			ovo =new ResponseVO(-1,"系统未开放短信注册，请联系客服","");
			return ovo;
		}
		if(StringUtils.isEmptyOrNull(telephone))
		{
			ovo =new ResponseVO(-1,"手机号不能为空","");
			return ovo;
		}
		Row userRow = userService.findByTelephone(telephone);
		if(userRow != null)
		{
			ovo =new ResponseVO(-1,"此用户已注册!","");
			return ovo;
		}
		//防止频繁请求发送短信
		int sms_num =smsService.findCodeNumByTelphone(telephone);
		if(sms_num >=5)
		{
			Row lastedRow =smsService.getLastedSms(telephone);
			String send_time =lastedRow.getString("send_time","");
			if(StringUtils.isEmptyOrNull(send_time))
			{
				ovo =new ResponseVO(-1,"此帐号异常，请联系客服人员","");
				return ovo;
			}
			String nowTime =DateUtil.getCurrentDateTime();
			long time_tap =DateUtil.getMinuteMinusOfTwoTime(send_time, nowTime);
			if(time_tap <= 5)
			{
				ovo =new ResponseVO(-1,"发送短信太频繁，请稍后再试","");
				return ovo;
			}
			else
			{
				smsService.setSmsTimeOut(telephone);
			}
		}
		int sms_code =NumberUtils.getSixRandomNumber();
		String sms_content ="感谢您的注册，您的验证码是："+sms_code+" ";
		//0发送失败 1发送成功 2已过期 -1本地测试短信，不发送
		int status =0;
		//调用第三方短信平台接口
		long remote_send_status =0;
		if(type.equals("1"))
		{
			String sms_url =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "URL");
			String sms_sn =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "USERNAME");
			String sms_pwd =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "PASSWORD");
			String sms_cgid =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "CGID");
			String sms_csid =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "CSID");
			if(StringUtils.isEmptyOrNull(sms_sn) || StringUtils.isEmptyOrNull(sms_pwd))
			{
				ovo =new ResponseVO(-1,"短信发送异常，请稍后再试","");
				return ovo;			
			}
			logger.info("sms_sn------------------>>"+sms_sn);
			logger.info("sms_pwd------------------>>"+sms_pwd);
//			remote_send_status =SmsWebServiceUtil.sendSms(sms_sn, sms_pwd, telephone, sms_content, "");
			remote_send_status =SmsWebServiceUtil.sendC123Sms(sms_url, sms_sn, sms_pwd, 
					Integer.parseInt(sms_cgid), Integer.parseInt(sms_csid), 
					telephone, sms_content);
			if(remote_send_status > 0)
			{
				status =1;
			}
			else
			{
				status =0;
				ovo =new ResponseVO(-1,"发送短信验证码失败","发送短信验证码失败");
				return ovo;
			}
//			status =1;
		}
		else
		{
			status =-1;
			if(type.equals("0"))
			{
				status =1;
			}
		}
		Row smsRow =new Row();
		smsRow.put("to_account",telephone );
		smsRow.put("sms_code", sms_code);
		smsRow.put("sms_content", sms_content);
		smsRow.put("status", status);
		//1注册2找回密码
		smsRow.put("type", "1");
		int rowNum =0;
		try {
			rowNum = smsService.insert(smsRow);
		} catch (JException e) {
			rowNum =0;
		}
		if(rowNum <= 0)
		{
			ovo =new ResponseVO(-1,"发送短信验证码失败","发送短信验证码失败");
			return ovo;
		}
		ovo =new ResponseVO(0,"发送短信验证码成功","");
		if(type.equals("0"))
		{
			ovo.put("code", sms_code);
		}
		return ovo;
	}
	
	/**
	 * 找回密码时发送短信
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/send-reset-pwd")
	public @ResponseBody
	ResponseVO sendSmsWhenResetPwd(String telephone,String type) throws Exception
	{
		ResponseVO ovo=new ResponseVO();
		logger.info("发送短信");
		String sms_switch =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "SWITCH");
		if(StringUtils.isEmptyOrNull(sms_switch))
		{
			sms_switch ="0";
		}
		if(sms_switch.equals("0"))
		{
			ovo =new ResponseVO(-1,"系统未开放短信注册，请联系客服","");
			return ovo;
		}
		if(StringUtils.isEmptyOrNull(telephone))
		{
			ovo =new ResponseVO(-1,"手机号不能为空","");
			return ovo;
		}
		Row userRow = userService.findByTelephone(telephone);
		if(userRow == null)
		{
			ovo =new ResponseVO(-1,"此手机号未注册，请先注册!","此手机号未注册，请先注册!");
			return ovo;
		}
		//防止频繁请求发送短信
//		int sms_num =smsService.findCodeNumByTelphone(telephone);
//		if(sms_num >=5)
//		{
//			Row lastedRow =smsService.getLastedSms(telephone);
//			String send_time =lastedRow.getString("send_time","");
//			if(StringUtils.isEmptyOrNull(send_time))
//			{
//				ovo =new ResponseVO(-1,"此帐号异常，请联系客服人员","");
//				return AesUtil.encode(VOConvert.ovoToJson(ovo));
//			}
//			String nowTime =DateUtil.getCurrentDateTime();
//			long time_tap =DateUtil.getMinuteMinusOfTwoTime(send_time, nowTime);
//			if(time_tap <= 5)
//			{
//				ovo =new ResponseVO(-1,"发送短信太频繁，请稍后再试","");
//				return AesUtil.encode(VOConvert.ovoToJson(ovo));
//			}
//			else
//			{
//				smsService.setSmsTimeOut(telephone);
//			}
//		}
		int sms_code =NumberUtils.getSixRandomNumber();
		String sms_content ="找回密码的验证码为："+sms_code+"，请在5分钟内完成验证。如非本机号码操作，请忽略此信息。";
		//0发送失败 1发送成功 2已过期 -1本地测试短信，不发送
		int status =0;
		//调用第三方短信平台接口
		long remote_send_status =0;
		if(type.equals("1"))
		{
			String sms_url =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "URL");
			String sms_sn =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "USERNAME");
			String sms_pwd =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "PASSWORD");
			String sms_cgid =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "CGID");
			String sms_csid =systemConfigService.querySingleConfig("APP_SMS_INTERFACE", "CSID");
			if(StringUtils.isEmptyOrNull(sms_sn) || StringUtils.isEmptyOrNull(sms_pwd))
			{
				ovo =new ResponseVO(-1,"短信发送异常，请稍后再试","");
				return ovo;			
			}
//			remote_send_status =SmsWebServiceUtil.sendSms(sms_sn, sms_pwd, telephone, sms_content, "");
			remote_send_status =SmsWebServiceUtil.sendC123Sms(sms_url, sms_sn, sms_pwd, 
					Integer.parseInt(sms_cgid), Integer.parseInt(sms_csid), 
					telephone, sms_content);
			if(remote_send_status > 0)
			{
				status =1;
			}
			else
			{
				status =0;
				ovo =new ResponseVO(-1,"发送短信验证码失败","发送短信验证码失败");
				return ovo;
			}
//			status =1;
		}
		else
		{
			status =-1;
			if(type.equals("0"))
			{
				status =1;
			}
		}
		Row smsRow =new Row();
		smsRow.put("to_account",telephone );
		smsRow.put("sms_code", sms_code);
		smsRow.put("sms_content", sms_content);
		smsRow.put("status", status);
		//1注册2找回密码
		smsRow.put("type", "2");
		int rowNum =smsService.insert(smsRow);
		if(rowNum <= 0)
		{
			ovo =new ResponseVO(-1,"发送短信验证码失败","发送短信验证码失败");
			return ovo;
		}
		ovo =new ResponseVO(0,"发送短信验证码成功","");
		if(type.equals("0"))
		{
			ovo.put("code", sms_code);
		}
		return ovo;
	}
}
