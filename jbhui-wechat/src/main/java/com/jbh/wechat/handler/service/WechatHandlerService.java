/**
* 
**/
package com.jbh.wechat.handler.service;

import java.util.TimeZone;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.service.pay.WeixinTicketService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.vo.Row;
import com.ezcloud.framework.weixin.common.WeixinUtil;
import com.ezcloud.framework.weixin.model.OutMessage;
import com.ezcloud.framework.weixin.model.request.InClickEventMessage;
import com.ezcloud.framework.weixin.model.request.InEventMessage;
import com.ezcloud.framework.weixin.model.request.InSubscribeEventMessage;
import com.ezcloud.framework.weixin.model.request.InTextMessage;
import com.ezcloud.framework.weixin.model.response.OutTextMessage;
import com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice;
import com.ezcloud.framework.weixin.service.busi.WechatUserService;

import net.sf.json.JSONObject;

/**
* 作者: kaka
* 日期: 18 Sep 2016
* 功能说明: 
**/
@Component("jbhWechatHandlerService")
public class WechatHandlerService extends BaseWeiXinProcessWervice{

	private Logger logger =Logger.getLogger( WechatHandlerService.class );
	@Resource(name = "frameworkWeixinUserService")
	private WechatUserService userService;
	
	@Resource(name = "frameworkWeixinTicketService")
	private WeixinTicketService weixinTicketService;
	
	
//	private static final String WeiXinUrl ="";
	/**
	* 
	*<p>Title: handleEventMsgRequest</p>   
	*<p>Description: 处理事件请求：</p>   
	* 事件包括：
	* 1.用户关注/取消关注事件
	* 2.扫描二维码事件，1未关注公众号扫描；2已关注公众号扫描
	* 3.上报地理位置
	* 4.自定义菜单点击事件
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleEventMsgRequest(java.lang.Object)
	 */
	
	@Override
	public OutMessage handleEventMsgRequest(Object msg) {
		InEventMessage inEventMsg =(InEventMessage)msg;
		OutMessage outMessage =null;
		String outType =null;
		
		return outMessage;
	}

	public WechatHandlerService() {
		super();
		TimeZone timeZone =TimeZone.getTimeZone("Asia/Shanghai");
		TimeZone.setDefault(timeZone);
	}

	@Override
	public OutMessage handleImageMsgRequest(Object msg) {
		return null;
	}

	@Override
	public OutMessage handleLinkMsgRequest(Object msg) {
		return null;
	}

	@Override 
	public OutMessage handleLocationMsgRequest(Object msg) {
		return null;
	}

	@Override
	public OutMessage handleTextMsgRequest(Object msg) {
		//关键字回复
		InTextMessage inTextMsg =(InTextMessage)msg;
		OutMessage outMessage =null;
		String outType =null;
		
		String fromUserName =inTextMsg.getFromUserName();
		String toUserName =inTextMsg.getToUserName();
		String userContent =inTextMsg.getContent();
		String createTime =DateUtil.getCurrentDateTime();
		String msgType =BaseWeiXinProcessWervice.RESPONSE_MESSAGE_TYPE_TEXT;
		Setting setting =SettingUtils.get();
		String site_url =setting.getSiteUrl();
		String page_url =site_url+"/index.do?from_user="+fromUserName;
		String content =null;
		if(userContent.equals("拍卖"))
		{
			content ="您好，点击这里试试<a href=\""+page_url+"\">拍卖专场</a>";
		}
		else if(userContent.equals("测试支付"))
		{
			page_url =site_url+"/wxpay/test/wx-test-pay.do?from_user="+fromUserName;
			content ="Pay Test <a href=\""+page_url+"\">Pay</a>";
		}
		else
		{
			content ="您好，未找到您想要的内容";
		}
		OutTextMessage outTextMessage =new OutTextMessage(fromUserName, toUserName, createTime, msgType, content);
		outType =BaseWeiXinProcessWervice.RESPONSE_MESSAGE_TYPE_TEXT;
		outMessage =new OutMessage(outType,outTextMessage);
		return outMessage;
	}

	/**
	* <p>Title: handleVideoMsgRequest</p>   
	* <p>Description: </p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleVideoMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleVideoMsgRequest(Object msg) {
		return null;
	}

	/**
	* <p>Title: handleVoiceMsgRequest</p>   
	* <p>Description: </p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleVoiceMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleVoiceMsgRequest(Object msg) {
		return null;
	}

	@Override
	public OutMessage handleVoiceRecognitionMsgRequest(Object msg) {
		return null;
	}

	/**
	* <p>Title: handleClickEventMsgRequest</p>   
	* <p>Description: 处理自定义点击菜单事件</p>   
	* 微信平台图片大小为360×200时，显示效果最佳
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleClickEventMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleClickEventMsgRequest(Object msg) {
		OutMessage outMessage =null;
		String outType =null;
		
		InClickEventMessage oInClickEventMessage =(InClickEventMessage)msg;
		String fromUserName =oInClickEventMessage.getFromUserName();
		String toUserName =oInClickEventMessage.getToUserName();
		String event =oInClickEventMessage.getEvent();
		String eventKey =oInClickEventMessage.getEventKey();
		
		logger.info("event........>>"+event+"    eventKey........>>"+eventKey);
		
		/**凡是涉及到报表查询的操作，都需要检验该微信号是否绑定了共总帐号，
		 * 未绑定，提示用户绑定公众号
		 * 已经绑定的，则执行查报表的操作
		 * **/
		//日能耗分析
		if(eventKey.equalsIgnoreCase("report_day"))
		{
		}
		return outMessage;
	}

	/**
	* <p>Title: handleLocationEventMsgRequest</p>   
	* <p>Description: </p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleLocationEventMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleLocationEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	* <p>Title: handleScanSubscribeEventMsgRequest</p>   
	* <p>Description: </p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleScanSubscribeEventMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleScanSubscribeEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	* <p>Title: handleScanUnSubscribeEventMsgRequest</p>   
	* <p>Description: </p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleScanUnSubscribeEventMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleScanUnSubscribeEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	* <p>Title: handleSubscribeEventMsgRequest</p>   
	* <p>Description: 用户关注公众号事件</p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleSubscribeEventMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleSubscribeEventMsgRequest(Object msg) {
		OutMessage outMessage =null;
		String outType =null;
		InSubscribeEventMessage oInSubscribeEventMessage =(InSubscribeEventMessage)msg;
		/**
		 * 显示欢迎语句
		 */
		String fromUserName =oInSubscribeEventMessage.getFromUserName();
		String toUserName =oInSubscribeEventMessage.getToUserName();
		String createTime =DateUtil.getCurrentDateTime();
		String msgType =BaseWeiXinProcessWervice.RESPONSE_MESSAGE_TYPE_TEXT;
		String content =null;
		content ="尊敬的用户您好";
		//获取用户基本信息
		String nickname ="";
		Row trow=weixinTicketService.queryByPMAndState("1","1");
		if(trow != null)
		{
			String token =trow.getString("access_token","");
			String openid =fromUserName;
			JSONObject obj =WeixinUtil.getUserBaseInfo(token,openid);
			if(obj != null )
			{
				nickname =obj.getString("nickname"); 
			}
		}
		//保存用户到数据库
		Row userRow =userService.queryByOpenId(fromUserName);
		Row row =new Row();
		if(userRow == null)
		{
			row.put("open_id",fromUserName);
			row.put("nickname",nickname);
			row.put("subscribe","1");
			userService.insert(row);
		}
		else
		{
			row.put("id",userRow.getString("id"));
			row.put("subscribe","1");
			row.put("nickname",nickname);
			userService.update(row);
		}
		OutTextMessage outTextMessage =new OutTextMessage(fromUserName, toUserName, createTime, msgType, content);
		outType =BaseWeiXinProcessWervice.RESPONSE_MESSAGE_TYPE_TEXT;
		outMessage =new OutMessage(outType,outTextMessage);
		return outMessage;
	}

	/**
	* <p>Title: handleUnSubscribeEventMsgRequest</p>   
	* <p>Description: </p>   
	* @param msg
	* @return   
	* @see com.ezcloud.framework.weixin.service.BaseWeiXinProcessWervice#handleUnSubscribeEventMsgRequest(java.lang.Object)   
	*/
	@Override
	public OutMessage handleUnSubscribeEventMsgRequest(Object msg) {
		OutMessage outMessage =null;
		String outType =null;
		InSubscribeEventMessage oInSubscribeEventMessage =(InSubscribeEventMessage)msg;
		/**
		 * 显示欢迎语句
		 */
		String fromUserName =oInSubscribeEventMessage.getFromUserName();
		String toUserName =oInSubscribeEventMessage.getToUserName();
		String createTime =DateUtil.getCurrentDateTime();
		String msgType =BaseWeiXinProcessWervice.RESPONSE_MESSAGE_TYPE_TEXT;
		String content =null;
		content ="欢迎再次关注";
//		Row userRow =userService.findByOpenid(fromUserName);
//		Row row =new Row();
//		if(userRow != null)
//		{
//			row.put("id",userRow.getString("id"));
//			row.put("sub_state","2");
//			userService.update(row);
//		}
		OutTextMessage outTextMessage =new OutTextMessage(fromUserName, toUserName, createTime, msgType, content);
		outType =BaseWeiXinProcessWervice.RESPONSE_MESSAGE_TYPE_TEXT;
		outMessage =new OutMessage(outType,outTextMessage);
		return outMessage;
	}

	/**
	 * 点击菜单跳转链接时的事件推送
	 * <xml>
		<ToUserName><![CDATA[toUser]]></ToUserName>
		<FromUserName><![CDATA[FromUser]]></FromUserName>
		<CreateTime>123456789</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[VIEW]]></Event>
		<EventKey><![CDATA[www.qq.com]]></EventKey>
		<MenuId>MENUID</MenuId>
		</xml>
		
		参数				描述
		ToUserName		开发者微信号
		FromUserName	发送方帐号（一个OpenID）
		CreateTime		消息创建时间 （整型）
		MsgType			消息类型，event
		Event			事件类型，VIEW
		EventKey		事件KEY值，设置的跳转URL
		MenuID			指菜单ID，如果是个性化菜单，则可以通过这个字段，知道是哪个规则的菜单被点击了
	 */
	@Override
	public OutMessage handleClickViewEventMsgRequest(Object msg) {
		InClickEventMessage inEventMsg =(InClickEventMessage)msg;
		OutMessage outMessage =null;
		String outType =null;
		String eventKey =inEventMsg.getEventKey();
		logger.info( "自定义菜单跳转链接的地址是---------------->>" + eventKey);
		return outMessage;
	}

	/**
	 * scancode_push：扫码推事件的事件推送
	 * <xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
		<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
		<CreateTime>1408090502</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[scancode_push]]></Event>
		<EventKey><![CDATA[6]]></EventKey>
		<ScanCodeInfo><ScanType><![CDATA[qrcode]]></ScanType>
		<ScanResult><![CDATA[1]]></ScanResult>
		</ScanCodeInfo>
		</xml>

		参数说明：
		参数				描述
		ToUserName		开发者微信号
		FromUserName	发送方帐号（一个OpenID）
		CreateTime		消息创建时间（整型）
		MsgType			消息类型，event
		Event			事件类型，scancode_push
		EventKey		事件KEY值，由开发者在创建菜单时设定
		ScanCodeInfo	扫描信息
		ScanType		扫描类型，一般是qrcode
		ScanResult		扫描结果，即二维码对应的字符串信息
	 */
	@Override
	public OutMessage handleClickScancodePushEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 *  scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框的事件推送
	 *  
	 *  <xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
		<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
		<CreateTime>1408090606</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[scancode_waitmsg]]></Event>
		<EventKey><![CDATA[6]]></EventKey>
		<ScanCodeInfo><ScanType><![CDATA[qrcode]]></ScanType>
		<ScanResult><![CDATA[2]]></ScanResult>
		</ScanCodeInfo>
		</xml>
		
		参数	描述
		ToUserName	开发者微信号
		FromUserName	发送方帐号（一个OpenID）
		CreateTime	消息创建时间 （整型）
		MsgType	消息类型，event
		Event	事件类型，scancode_waitmsg
		EventKey	事件KEY值，由开发者在创建菜单时设定
		ScanCodeInfo	扫描信息
		ScanType	扫描类型，一般是qrcode
		ScanResult	扫描结果，即二维码对应的字符串信息
	 */
	@Override
	public OutMessage handleClickScancodeWaitmsgEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 自定义菜单点击 pic_sysphoto：弹出系统拍照发图的事件推送
	 * <xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
		<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
		<CreateTime>1408090651</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[pic_sysphoto]]></Event>
		<EventKey><![CDATA[6]]></EventKey>
		<SendPicsInfo><Count>1</Count>
		<PicList><item><PicMd5Sum><![CDATA[1b5f7c23b5bf75682a53e7b6d163e185]]></PicMd5Sum>
		</item>
		</PicList>
		</SendPicsInfo>
		</xml>
		
		
		参数				描述
		ToUserName		开发者微信号
		FromUserName	发送方帐号（一个OpenID）
		CreateTime		消息创建时间 （整型）
		MsgType			消息类型，event
		Event			事件类型，pic_sysphoto
		EventKey		事件KEY值，由开发者在创建菜单时设定
		SendPicsInfo	发送的图片信息
		Count			发送的图片数量
		PicList			图片列表
		PicMd5Sum		图片的MD5值，开发者若需要，可用于验证接收到图片
	 */
	@Override
	public OutMessage handleClickPicSysphotoEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 自定义菜单点击 pic_photo_or_album：弹出拍照或者相册发图的事件推送
	 * <xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
		<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
		<CreateTime>1408090816</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[pic_photo_or_album]]></Event>
		<EventKey><![CDATA[6]]></EventKey>
		<SendPicsInfo><Count>1</Count>
		<PicList><item><PicMd5Sum><![CDATA[5a75aaca956d97be686719218f275c6b]]></PicMd5Sum>
		</item>
		</PicList>
		</SendPicsInfo>
		</xml>
		
		参数				描述
		ToUserName		开发者微信号
		FromUserName	发送方帐号（一个OpenID）
		CreateTime		消息创建时间 （整型）
		MsgType			消息类型，event
		Event			事件类型，pic_photo_or_album
		EventKey		事件KEY值，由开发者在创建菜单时设定
		SendPicsInfo	发送的图片信息
		Count			发送的图片数量
		PicList			图片列表
		PicMd5Sum		图片的MD5值，开发者若需要，可用于验证接收到图片
	 */
	@Override
	public OutMessage handleClickPicPhotoOrAlbumEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 自定义菜单点击  pic_weixin：弹出微信相册发图器的事件推送
	 * <xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
		<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
		<CreateTime>1408090816</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[pic_weixin]]></Event>
		<EventKey><![CDATA[6]]></EventKey>
		<SendPicsInfo><Count>1</Count>
		<PicList><item><PicMd5Sum><![CDATA[5a75aaca956d97be686719218f275c6b]]></PicMd5Sum>
		</item>
		</PicList>
		</SendPicsInfo>
		</xml>
		
		参数				描述
		ToUserName		开发者微信号
		FromUserName	发送方帐号（一个OpenID）
		CreateTime		消息创建时间 （整型）
		MsgType			消息类型，event
		Event			事件类型，pic_weixin
		EventKey		事件KEY值，由开发者在创建菜单时设定
		SendPicsInfo	发送的图片信息
		Count			发送的图片数量
		PicList			图片列表
		PicMd5Sum		图片的MD5值，开发者若需要，可用于验证接收到图片
	 */
	@Override
	public OutMessage handleClickPicWeixinEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 自定义菜单点击  location_select：弹出地理位置选择器的事件推送
	 * <xml><ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>
		<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>
		<CreateTime>1408091189</CreateTime>
		<MsgType><![CDATA[event]]></MsgType>
		<Event><![CDATA[location_select]]></Event>
		<EventKey><![CDATA[6]]></EventKey>
		<SendLocationInfo><Location_X><![CDATA[23]]></Location_X>
		<Location_Y><![CDATA[113]]></Location_Y>
		<Scale><![CDATA[15]]></Scale>
		<Label><![CDATA[ 广州市海珠区客村艺苑路 106号]]></Label>
		<Poiname><![CDATA[]]></Poiname>
		</SendLocationInfo>
		</xml>
		
		参数					描述
		ToUserName			开发者微信号
		FromUserName		发送方帐号（一个OpenID）
		CreateTime			消息创建时间 （整型）
		MsgType				消息类型，event
		Event				事件类型，location_select
		EventKey			事件KEY值，由开发者在创建菜单时设定
		SendLocationInfo	发送的位置信息
		Location_X			X坐标信息
		Location_Y			Y坐标信息
		Scale				精度，可理解为精度或者比例尺、越精细的话 scale越高
		Label				地理位置的字符串信息
		Poiname				朋友圈POI的名字，可能为空
	 */
	@Override
	public OutMessage handleClickLocationSelectEventMsgRequest(Object msg) {
		// TODO Auto-generated method stub
		return null;
	}
}
