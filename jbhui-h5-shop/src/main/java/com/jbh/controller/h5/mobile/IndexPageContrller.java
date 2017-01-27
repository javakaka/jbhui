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
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsService;
import com.jbh.service.MailboxSysInfoService;

@Controller("h5IndexPageController")
public class IndexPageContrller  extends BaseController{

	 @Resource(name="hslgGoodsService")
	  private GoodsService goodsService;
	 
	 @Resource(name="hslgMailboxSysInfoService")
	 private MailboxSysInfoService sysInfoService;
	 
	/**
	 * 首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/index",method =RequestMethod.GET)
	public String indexPage(String from_user,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		if( !StringUtil.isEmptyOrNull(from_user) )
		{
			session.setAttribute("from_user", from_user);
		}
		//置顶商品
		DataSet top_goods =goodsService.queryTopGoods();
		//系统消息
		DataSet sys_info =sysInfoService.list("1", "5");
		//首页商品列表
		DataSet goods_list =goodsService.queryIndexGoods();
		model.addAttribute("top_goods", top_goods);
		model.addAttribute("sys_info", sys_info);
		model.addAttribute("goods_list", goods_list);
		model.addAttribute("isLogin", isLogin);
		return "/jbhpage/h5/index";
	}
	
}
