package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;
import com.jbh.service.UserService;

@Controller("h5UserCommentController")
@RequestMapping("/user/comment")
public class UserCommentContrller  extends BaseController{

	 @Resource(name="hslgGoodsService")
	  private GoodsService goodsService;
	 
	 @Resource(name = "hslgGoodsTypeService")
	 private GoodsTypeService goodsTypeService;
	 
	 @Resource(name = "hslgUserService")
	 private UserService userService;
	
	 /**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list",method =RequestMethod.GET)
	public String listPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/user-comment-list";
	}
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/page-data",method =RequestMethod.POST)
	@ResponseBody
	public String pageData(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "{}";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/save",method =RequestMethod.GET)
	public String save(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/user-profile";
	}
	/**
	 * 首页
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
		return "/jbhpage/h5/user-profile";
	}
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/delete",method =RequestMethod.POST)
	@ResponseBody
	public String delete(String id ) {
		return "{}";
	}
}
