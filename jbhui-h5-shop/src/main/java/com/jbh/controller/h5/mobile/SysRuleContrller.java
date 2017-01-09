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

@Controller("h5SysRuleController")
public class SysRuleContrller  extends BaseController{

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
		@RequestMapping(value = "/tranfee-desc",method =RequestMethod.GET)
		public String tranfeeDesc(String cateId,ModelMap model ) {
			HttpSession session =getSession();
			Row user =(Row)session.getAttribute("member");
			int isLogin =0;
			if (user != null) {
				isLogin =1;
			}
			model.addAttribute("isLogin", isLogin);
			model.addAttribute("cateId", cateId);
			//				user-collection-list	user-comment
			return "/jbhpage/h5/tranfee-desc";
		}
}
