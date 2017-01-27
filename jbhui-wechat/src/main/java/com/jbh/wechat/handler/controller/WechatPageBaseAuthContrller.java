package com.jbh.wechat.handler.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.service.pay.WeixinTicketService;
import com.ezcloud.framework.service.system.SystemConfigService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.vo.Row;
import com.ezcloud.framework.weixin.common.WeixinUtil;
import com.ezcloud.framework.weixin.model.menu.AuthAccessToken;
import com.ezcloud.framework.weixin.service.busi.WechatUserAuthService;
import com.ezcloud.framework.weixin.service.busi.WechatUserService;

import net.sf.json.JSONObject;

/**
 * 网页基本授权
 * @author TongJianbo
 */
@Controller("jbhWechatPageBaseAuthController")
public class WechatPageBaseAuthContrller  extends BaseController{

	private static Logger logger =Logger.getLogger( WechatPageBaseAuthContrller.class );
	
	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	
	@Resource(name = "frameworkWeixinUserService")
	private WechatUserService wechatUserService;
	
	@Resource(name = "frameworkWeixinTicketService")
	private WeixinTicketService weixinTicketService;
	
	@Resource(name = "frameworkWeixinUserAuthService")
	private WechatUserAuthService weixinUserAuthService;
	
	@Value(value="${framework.weixin.appId}")
	private String appId;
	
	@Value(value="${framework.weixin.appSecret}")
	private String appSecret;
	
	/**
	 * 网页授权
	 * @param pageable
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/wx/site/base-auth-score")
	public String authPage(String code,String state,ModelMap model) {
		logger.info("auth code is:"+code);
		logger.info("appId is:"+appId);
		logger.info("appSecret is:"+appSecret);
		String app_id =systemConfigService.getConfigValue("PAIMAI_WXPAY","APP_ID");
		String app_secret =systemConfigService.getConfigValue("PAIMAI_WXPAY","APP_SECRET");
		//通过code换取网页授权access_token
		AuthAccessToken token =WeixinUtil.getAuthAccessToken(app_id, app_secret, code);
		logger.info("token is:"+token);
		String openid =token.getOpenid();
		String access_token =token.getAccessToken();
		//保存token 信息到数据库
		Row authRow =weixinUserAuthService.find( openid );
		if ( authRow == null ) {
			authRow =new Row();
			authRow.put( "open_id", openid );
			authRow.put( "access_token", access_token );
			authRow.put( "expires_in", token.getExpiresIn() );
			authRow.put( "refresh_token", token.getRefreshToken() );
			authRow.put( "scope", token.getScope() );
			authRow.put( "create_time", DateUtil.getCurrentDateTime() );
			weixinUserAuthService.insert( authRow );
		}
		else{
			authRow.put( "access_token", access_token );
			authRow.put( "expires_in", token.getExpiresIn() );
			authRow.put( "refresh_token", token.getRefreshToken() );
			authRow.put( "scope", token.getScope() );
			authRow.put( "modify_time", DateUtil.getCurrentDateTime() );
			weixinUserAuthService.update( authRow );
		}
		//根据openid 获取用户的基本信息
		Row userRow =wechatUserService.queryByOpenId(openid);
		String scope =token.getScope();
		logger.info( "网页授权类型-------------------->>"+scope +" || 数据库中是否存在当前openid的用户数据"+openid+" >> userRow isnull ?"+(userRow == null));
		if(userRow == null && scope.equals( "snsapi_userinfo" ))
		{
			try{
				JSONObject obj =WeixinUtil.getUrlAuthUserBaseInfo(access_token,openid);
				String nickname =obj.getString( "nickname" );
				String sex =obj.getString( "sex" );
				String province =obj.getString( "province" );
				String city =obj.getString( "city" );
				String country =obj.getString( "country" );
				String headimgurl =obj.getString( "headimgurl" );
				String unionid ="";
				if( obj.has( "unionid" ) )
				{
					unionid =obj.getString( "unionid" );
				}
				Row wechatRow =new Row();
				wechatRow.put( "open_id", openid);
				wechatRow.put( "nickname", nickname);
				wechatRow.put( "sex", sex);
				wechatRow.put( "country", country);
				wechatRow.put( "province", province);
				wechatRow.put( "city", city);
				wechatRow.put( "headimgurl", headimgurl);
				wechatRow.put( "union_id", unionid);
				wechatUserService.insert( wechatRow );
			}catch(Exception exp){
				logger.info("exp--------------->>"+exp.getMessage());
				exp.printStackTrace();
			}
		}
		logger.info("返回--------------->>");
		return "redirect:/index.do?from_user="+openid;
	}
	
}