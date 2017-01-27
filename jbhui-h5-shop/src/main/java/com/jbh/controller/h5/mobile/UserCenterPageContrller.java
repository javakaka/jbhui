package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsJudgementService;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;
import com.jbh.service.OrderService;
import com.jbh.service.UserCollectionService;
import com.jbh.service.UserService;

@Controller("h5UserCenterController")
@RequestMapping("/user/profile")
public class UserCenterPageContrller  extends BaseController{

	 @Resource(name="hslgGoodsService")
	  private GoodsService goodsService;
	 
	 @Resource(name = "hslgGoodsTypeService")
	 private GoodsTypeService goodsTypeService;
	 
	 @Resource(name = "hslgUserService")
	 private UserService userService;
	 
	 @Resource(name = "hslgOrderService")
	 private OrderService orderService;

	 @Resource(name = "hslgGoodsJudgementService")
	 private GoodsJudgementService goodsJudgementService;
	 
	 @Resource(name = "hslgUserCollectionService")
	 private UserCollectionService userCollectionService;
	 
	/**
	 * 首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/index",method =RequestMethod.GET)
	public String indexPage(String from_user,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		if (user == null) {
			return "redirect:/h5-login.do?from_user="+from_user;
		}
		String userId =user.getString("id");
		// 统计订单总数
		int totalOrderNum =orderService.queryOrderTotalNumByUserId( userId );
		// 统计评论总数
		int totalCommentNum =goodsJudgementService.findGoodsTotalJudgeNumByUserId(userId);
		// 统计收藏总数
		int totalCollectionNum =userCollectionService.getGoodsTotalCollectionNumByUserId(userId);
		model.addAttribute("totalOrderNum", totalOrderNum);
		model.addAttribute("totalCommentNum", totalCommentNum);
		model.addAttribute("totalCollectionNum", totalCollectionNum);
		model.addAttribute("user", user);
		return "/jbhpage/h5/user-profile";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/logout",method =RequestMethod.GET)
	public String login(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		session.removeAttribute("member");
		return "/jbhpage/h5/login";
	}
	
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/change-pwd",method =RequestMethod.GET)
	public String changePwd(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		//			tranfee-desc	user-collection-list	user-comment
		return "/jbhpage/h5/change-pwd";
	}
}
