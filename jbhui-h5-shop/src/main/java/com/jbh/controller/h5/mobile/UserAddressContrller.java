package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;
import com.jbh.service.UserService;

@Controller("h5UserAddressController")
@RequestMapping("/user/address")
public class UserAddressContrller  extends BaseController{

	 @Resource(name="hslgGoodsService")
	  private GoodsService goodsService;
	 
	 @Resource(name = "hslgGoodsTypeService")
	 private GoodsTypeService goodsTypeService;
	 
	 @Resource(name = "hslgUserService")
	 private UserService userService;
	 
	/**
	 * 首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list",method =RequestMethod.GET)
	public String indexPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/user-address-list";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/add",method =RequestMethod.GET)
	public String add(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/user-address-add";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/edit",method =RequestMethod.GET)
	public String edit(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/user-address-edit";
	}
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/save",method =RequestMethod.POST)
	public String save(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "redirect:list.do";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/update",method =RequestMethod.POST)
	public String update(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "redirect:list.do";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/delete",method =RequestMethod.POST)
	public String delete( String id ) {
		
		return "redirect:list.do";
	}
	
	
	
}
