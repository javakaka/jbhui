package com.jbh.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.exp.JException;
import com.ezcloud.framework.plugin.pay.Unifiedorder;
import com.ezcloud.framework.service.JdbcService;
import com.ezcloud.framework.service.system.SystemConfigService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.FieldUtil;
import com.ezcloud.framework.util.MapUtils;
import com.ezcloud.framework.util.NumberUtils;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.util.StringUtil;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.util.WeixinUtil;
import com.ezcloud.framework.util.XmlUtil;
import com.ezcloud.framework.vo.IVO;
import com.ezcloud.framework.vo.OVO;
import com.ezcloud.framework.vo.Row;

/**   
 * 拍卖成功后，微信支付服务
 * @author shike001 
 * E-mail:510836102@qq.com   
 */
@Component("paimaiWeiXinJSPayOrderService")
public class WeiXinJSPayOrderService extends JdbcService {

	private static Logger logger = Logger.getLogger(WeiXinJSPayOrderService.class);
	
	@Resource(name = "hslgUserService")
	private UserService userService;
	
	@Resource(name = "hslgOrderService")
	private OrderService orderService;
	
	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	
	public WeiXinJSPayOrderService() 
	{
		
	}
	
	/**
	 * 字段名		变量名			必填	类型		示例值					描述
	 * 公众账号ID		appid			是	String(32)	wx8888888888888888			微信分配的公众账号ID
	 * 商户号		mch_id			是	String(32)	1900000109				微信支付分配的商户号
	 * 设备号		device_info		否	String(32)	013467007045764				终端设备号(门店号或收银设备ID)，注意：PC网页或公众号内支付请传"WEB"
	 * 随机字符串		nonce_str		是	String(32)	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	随机字符串，不长于32位。推荐随机数生成算法
	 * 签名			sign			是	String(32)	C380BEC2BFD727A4B6845133519F3AD6	签名，详见签名生成算法
	 * 商品描述		body			是	String(32)	Ipad mini  16G  白色		商品或支付单简要描述
	 * 商品详情		detail			否	String(8192)	Ipad mini  16G  白色		商品名称明细列表
	 * 附加数据		attach			否	String(127)	说明	附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
	 * 商户订单号		out_trade_no	是	String(32)	1217752501201407033233368018	商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
	 * 货币类型		fee_type		否	String(16)	CNY	符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
	 * 总金额		total_fee		是	Int	888	订单总金额，只能为整数，详见支付金额
	 * 终端IP		spbill_create_ip是	String(16)	8.8.8.8	APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。
	 * 交易起始时间	time_start		否	String(14)	20091225091010	订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
	 * 交易结束时间	time_expire		否	String(14)	20091227091010	订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。其他详见时间规则
	 * 注意：最短失效时间间隔必须大于5分钟
	 * 商品标记		goods_tag		否	String(32)	WXG		商品标记，代金券或立减优惠功能的参数，说明详见代金券或立减优惠
	 * 通知地址		notify_url		是	String(256)	http://www.baidu.com/	接收微信支付异步通知回调地址
	 * 交易类型		trade_type		是	String(16)	JSAPI	取值如下：JSAPI，NATIVE，APP，WAP,详细说明见参数规定
	 * 商品ID		product_id		否	String(32)	12235413214070356458058	trade_type=NATIVE，此参数必传。此id为二维码中包含的商品ID，商户自行定义。
	 * 用户标识		openid			否	String(128)	oUpF8uMuAJO_M2pxb1Q9zNjWeS6o	trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。下单前需要调用【网页授权获取用户信息】接口获取到用户的Openid。
	 * 共10个必填字段
	 * @param ivo
	 * @return
	 * @throws Exception 
	 */
	public OVO validate(IVO ivo) throws Exception
	{
		OVO ovo =new OVO();
		String user_id =ivo.getString("user_id");
		String order_id =ivo.getString("order_id");
		String app_ip =ivo.getString("app_ip");
		Row userRow =userService.find(user_id);
		if(userRow == null)
		{
			ovo =new OVO(-20011,"用户不存在","用户不存在");
			return ovo;
		}
		String openid =userRow.getString("from_user","");
		if(StringUtil.isEmptyOrNull(openid))
		{
			openid =ivo.getString("from_user");
		}
		Row orderRow =orderService.find(order_id);
		if(orderRow == null)
		{
			ovo =new OVO(-20011,"订单不存在","订单不存在");
			return ovo;
		}
		
		//校验订单是否属于当前用户
		String order_user_id =orderRow.getString("user_id","");
		if(! user_id.equals(order_user_id))
		{
			ovo =new OVO(-20016,"非法操作","非法操作");
			return ovo;
		}
		String order_no=orderRow.getString("order_no");
		if(StringUtils.isEmptyOrNull(order_no))
		{
			//100 订单支付 101竞拍保证金 102 委托竞拍订单
			//200 订单退款 201竞拍保证金退款 202 委托竞拍订单退款
			order_no ="100"+DateUtil.getCurrentDateTime().replace(" ", "").replace("-", "").replace(":", "")+user_id;
			Row updateRow =new Row();
			updateRow.put("id", order_id);
			updateRow.put("order_no", order_no);
			orderService.update(updateRow);
		}
		String order_state =orderRow.getString("state","");
		if(order_state.equals("1") || order_state.equals("2"))
		{
			ovo =new OVO(-20011,"订单正在处理中，不能重复支付","订单正在处理中，不能重复支付");
			return ovo;
		}
		else if(order_state.equals("3") || order_state.equals("4") || order_state.equals("5"))
		{
			ovo =new OVO(-20011,"订单已完成之后，不能重复支付","订单已完成之后，不能重复支付");
			return ovo;
		}
		else if(order_state.equals("6"))
		{
			ovo =new OVO(-20011,"订单已退款，不能支付","订单已退款，不能支付");
			return ovo;
		}
		else if(order_state.equals("-1"))
		{
			ovo =new OVO(-20011,"订单已取消，不能支付","订单已取消，不能支付");
			return ovo;
		}
		//支付密钥
		String api_key =systemConfigService.getConfigValue("PAIMAI_WXPAY","API_KEY");
		String app_id =systemConfigService.getConfigValue("PAIMAI_WXPAY","APP_ID");
		String mch_id =systemConfigService.getConfigValue("PAIMAI_WXPAY","MCH_ID");
		if(StringUtils.isEmptyOrNull(api_key))
		{
			ovo =new OVO(-20011,"api_key系统配置错误","api_key系统配置错误");
			return ovo;
		}
		if(StringUtils.isEmptyOrNull(app_id))
		{
			ovo =new OVO(-20011,"app_id系统配置错误","app_id系统配置错误");
			return ovo;
		}
		if(StringUtils.isEmptyOrNull(mch_id))
		{
			ovo =new OVO(-20011,"mch_id系统配置错误","mch_id系统配置错误");
			return ovo;
		}
		Unifiedorder unifiiedorder =new Unifiedorder();
		unifiiedorder.setAppid(app_id);
		unifiiedorder.setMch_id(mch_id);
		unifiiedorder.setOpenid(openid);
		String nonce_str =StringUtil.getRandKeys(28).toUpperCase();
		unifiiedorder.setNonce_str(nonce_str);
		String body ="下单成功订单-"+order_no;
		String out_trade_no =order_no;
		unifiiedorder.setOut_trade_no(out_trade_no);
		unifiiedorder.setBody(body);
		String fee_type ="CNY";
		unifiiedorder.setFee_type(fee_type);
		String total_fee ="0";
		String order_money =orderRow.getString("money","0");
		double d_order_money =Double.parseDouble(order_money);
		double d_left_money =d_order_money ;
		d_left_money =new BigDecimal(d_left_money).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
		double dmoney =d_left_money;
		if(dmoney == 0)
		{
			ovo =new OVO(-20012,"订单金额为0","订单金额为0");
			return ovo;
		}
		dmoney =dmoney*100;//(分)
		total_fee =StringUtils.subStrBeforeDotNotIncludeDot(String.valueOf(dmoney));
		unifiiedorder.setTotal_fee(total_fee);
		String spbill_create_ip=app_ip;
		unifiiedorder.setSpbill_create_ip(spbill_create_ip);
		Setting setting =SettingUtils.get();
		String site_url =setting.getSiteUrl();
		String notify_url =site_url+"/wxpay/site/notify-order.do";
		unifiiedorder.setNotify_url(notify_url);
		String trade_type ="JSAPI";
		unifiiedorder.setTrade_type(trade_type);
		Row row =FieldUtil.getObjectNotEmptyFieldsUrlParamsStr(unifiiedorder, api_key);
		String xml =row.getString("xml","");
		logger.info("发送给统一下单接口的xml数据＝＝＝＝＝＝>>"+xml);
		String resp =WeixinUtil.createPreOrder(xml);
		logger.info("统一下单接口返回的xml数据＝＝＝＝＝＝>>"+resp);
		ovo =parsePreOrderResult(resp,api_key);
		if(ovo.iCode<0)
		{
			return ovo;
		}
//		//预付单处理成功 设置订单的状态［state］为1，处理中
		Row updateRow =new Row();
		updateRow.put("id", order_id);
		String token =StringUtil.getRandKeys(12);;
		updateRow.put("pay_token", token);
		orderService.update(updateRow);
		ovo.set("pay_token", token);
		logger.info("JS调起微信支付的数据＝＝＝＝＝＝>>"+ovo.oForm);
		return ovo;
	}
	
	public OVO parsePreOrderResult(String xml,String api_key) throws JException
	{
		OVO ovo =null;
		HashMap<String, String> map=XmlUtil.xmlToMap(xml);
		Row resultRow =MapUtils.convertMaptoRowWithoutNullField(map);
		String return_code =resultRow.getString("return_code","");
		String return_msg =resultRow.getString("return_msg","");
		String appid =resultRow.getString("appid","");
		String mch_id =resultRow.getString("mch_id","");
		String nonce_str =resultRow.getString("nonce_str","");
		String sign =resultRow.getString("sign","");
		String result_code =resultRow.getString("result_code","");
		String err_code =resultRow.getString("err_code","");
		String err_code_desc =resultRow.getString("err_code_desc","");
		String prepay_id =resultRow.getString("prepay_id","");
		String trade_type =resultRow.getString("trade_type","");
		//调用预付单成功
		if(!StringUtils.isEmptyOrNull(return_code) && !StringUtils.isEmptyOrNull(result_code)
		&& return_code.equalsIgnoreCase("SUCCESS") && result_code.equalsIgnoreCase("SUCCESS"))
		{
			ovo =new OVO(0,"预付单处理成功","预付单处理成功");
			ovo.set("result", "success");
			ArrayList<String> list = new ArrayList<String>();
			list.add("appId");
			list.add("timeStamp");
			list.add("nonceStr");
			list.add("package");
			list.add("signType");
			Row dataRow =new Row();
			dataRow.put("appId", appid);
			dataRow.put("signType", "MD5");
			dataRow.put("nonceStr", nonce_str);
			long time =System.currentTimeMillis()/1000;
			dataRow.put("timeStamp", time);
			dataRow.put("package", "prepay_id="+prepay_id);
			String new_sign =FieldUtil.getWeixinRequestSign(list, dataRow, api_key);
			ovo.set("appId", appid);
			ovo.set("signType", "MD5");
			ovo.set("nonceStr", nonce_str);
			ovo.set("timeStamp", time);
			ovo.set("package", "prepay_id="+prepay_id);
			ovo.set("sign", new_sign);
		}
		else
		{
			ovo =new OVO(-10030,"预付单处理失败"+return_msg+"@"+mch_id+"@"+sign+"@"+trade_type,"预付单处理失败"+return_msg+"@"+mch_id+"@"+sign+"@"+trade_type);
			ovo.set("result", "fail");
			ovo.set("err_code", err_code);
			ovo.set("err_code_desc", err_code_desc);
		}
		return ovo;
	}
}