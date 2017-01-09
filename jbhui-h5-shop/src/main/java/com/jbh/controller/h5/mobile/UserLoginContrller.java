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
import com.ezcloud.framework.vo.Row;
import com.jbh.service.SMSService;
import com.jbh.service.UserService;

@Controller("h5UserLoginController")
public class UserLoginContrller  extends BaseController{
	 
	 @Resource(name = "hslgUserService")
	 private UserService userService;
	 
	 @Resource(name = "hslgSMSService")
	 private SMSService smsService;
	 
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/h5-login",method =RequestMethod.GET)
	public String loginPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/login";
	}
	
	@RequestMapping(value = "/h5-login",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO login(String username,String password,ModelMap model ) {
		ResponseVO ovo =new ResponseVO();
		Row userRow =userService.findByUserName(username);
		if (userRow == null ) {
			userRow =userService.findByTelephone(username);
		}
		if (userRow == null ) {
			userRow =userService.findByEmail(username);
		}
		if (userRow == null ) {
			ovo =new ResponseVO(-1, "用户不存在");
			return ovo;
		}
		String pwd =userRow.getString("password");
		System.out.println("---------------------------------pwd-------------->>" +pwd);
		System.out.println("---------------------------------pwd-------------->>" +password);
		if (!pwd.equals(password)) {
			ovo =new ResponseVO(-2, "密码错误");
		}
		HttpSession session =getSession();
		session.setAttribute("member",userRow);
		return ovo;
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/h5-register",method =RequestMethod.GET)
	public String regPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/register";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/h5-register-s2",method =RequestMethod.GET)
	public String regStep2Page(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		String telephone =(String)session.getAttribute("telephone");
		if(StringUtil.isEmptyOrNull(telephone)){
			return "/jbhpage/h5/register";
		}
		model.addAttribute("telephone", telephone);
		return "/jbhpage/h5/register-s2";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/h5-register-save",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO registerSave(String telephone,String password,String code,ModelMap model ) {
		ResponseVO ovo =new ResponseVO();
		if (StringUtil.isEmptyOrNull(telephone)) {
			ovo =new ResponseVO(-1,"手机号错误");
			return ovo;
		}
		if (StringUtil.isEmptyOrNull(password)) {
			ovo =new ResponseVO(-1,"密码不能为空");
			return ovo;
		}
		if (StringUtil.isEmptyOrNull(code)) {
			ovo =new ResponseVO(-1,"验证码不能为空");
			return ovo;
		}
		//短信验证码是否存在
		boolean codeExsited =smsService.findByCodeAndTelphone(code, telephone,1);
		if(! codeExsited)
		{
			ovo =new ResponseVO(-10010,"短信验证码错误或已过期","短信验证码错误或已过期");
			return ovo;
		}
		Row userRow =userService.findByTelephone(telephone);
		if (userRow != null) {
			ovo =new ResponseVO(-10010,"此手机号已被注册","此手机号已被注册");
			return ovo;
		}
		userRow =new Row();
		userRow.put("telephone", telephone);
		userRow.put("password", password);
		int rowNum =userService.insert(userRow);
		if (rowNum <1) {
			ovo =new ResponseVO(-10010,"注册失败，请稍后再试","注册失败，请稍后再试");
			return ovo;
		}
		// disable sms code
		rowNum =smsService.setCodeTimeout(telephone, code, "1");
		return ovo;
	}
	
	@RequestMapping(value = "/debug-user-lgin",method =RequestMethod.GET)
	@ResponseBody
	public String debugLogin(String cateId,ModelMap model ) {
		Row row =userService.find("1");
		HttpSession session =getSession();
		session.setAttribute("member", row);
		return "success";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/find-pwd",method =RequestMethod.GET)
	public String findPwdStep1(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/find-pwd";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/find-pwd-s2",method =RequestMethod.GET)
	public String findPwdStep2(String telephone,ModelMap model ) {
		if ( StringUtil.isEmptyOrNull(telephone) ) {
			telephone ="";
		}
		String formatTel ="";
		if (telephone.length() >=11) {
			formatTel =telephone.substring(0,3)+"****"+telephone.substring(7);
		}
		model.addAttribute("telephone", telephone);
		model.addAttribute("formatTel", formatTel);
		return "/jbhpage/h5/find-pwd-s2";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/find-pwd-s3",method =RequestMethod.GET)
	public String findPwdStep3(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/find-pwd-s3";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/check-account",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO checkAccount( String username ) {
		ResponseVO ovo=new ResponseVO();
		Row userRow =userService.findByTelephone(username);
		if (userRow == null) {
			userRow =userService.findByEmail(username);
		}
		if (userRow == null) {
			userRow =userService.findByUserName(username);
		}
		if (userRow == null) {
			ovo =new ResponseVO(-1,"账号不存在");
			return ovo;
		}
		String telephone =userRow.getString("telephone");
		ovo.put("telephone", telephone);
		return ovo;
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/find-pwd-auth",method =RequestMethod.GET)
	@ResponseBody
	public ResponseVO authWhenFindPassword( String username ,String code) {
		ResponseVO ovo=new ResponseVO();
		Row userRow =userService.findByTelephone(username);
		if (userRow == null) {
			userRow =userService.findByEmail(username);
		}
		if (userRow == null) {
			userRow =userService.findByUserName(username);
		}
		if (userRow == null) {
			ovo =new ResponseVO(-1,"账号不存在");
		}
		String telephone =userRow.getString("telephone");
		ovo.put("telephone", telephone);
		return ovo;
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/update-password",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO updatePassword( String telephone ,String code,String password) {
		ResponseVO ovo=new ResponseVO();
		Row userRow =userService.findByTelephone(telephone);
		if (userRow == null) {
			userRow =userService.findByEmail(telephone);
		}
		if (userRow == null) {
			userRow =userService.findByUserName(telephone);
		}
		if (userRow == null) {
			ovo =new ResponseVO(-1,"账号不存在");
		}
		//短信验证码是否存在
		boolean codeExsited =smsService.findByCodeAndTelphone(code, telephone,2);
		if(! codeExsited)
		{
			ovo =new ResponseVO(-10010,"短信验证码错误或已过期","短信验证码错误或已过期");
			return ovo;
		}
		int rowNum =userService.updatePassword(telephone, password);
		if (rowNum != 0 ) {
			ovo =new ResponseVO(-10010,"操作出错，请稍后再试","操作出错，请稍后再试");
			return ovo;
		}
		// disable sms code
		rowNum =smsService.setCodeTimeout(telephone, code, "2");
		return ovo;
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/check-validate-code",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO checkValidateCode( String telephone ,String code ) {
		ResponseVO ovo=new ResponseVO();
		HttpSession session =getSession();
		String validateCode =(String)session.getAttribute("validateCode");
		if(StringUtil.isEmptyOrNull(validateCode))
		{
			ovo=new ResponseVO(-1,"验证码错误");
			return ovo;
		}
		if(StringUtil.isEmptyOrNull(code))
		{
			ovo=new ResponseVO(-1,"验证码错误");
			return ovo;
		}
		if(StringUtil.isEmptyOrNull(telephone))
		{
			ovo=new ResponseVO(-2,"请填写手机号");
			return ovo;
		}
		if( ! code.equals(validateCode) ){
			ovo=new ResponseVO(-1,"验证码错误");
			return ovo;
		}
		Row userRow =userService.findByTelephone(telephone);
		if (userRow != null) {
			ovo =new ResponseVO(-10010,"此手机号已被注册","此手机号已被注册");
			return ovo;
		}
		session.setAttribute("telephone", telephone);
		session.setAttribute("code", code);
		return ovo;
	}
}
