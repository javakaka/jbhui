package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.util.StringUtil;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;

@Controller("h5CatePageController")
public class CatePageContrller  extends BaseController{

	@Resource(name = "hslgGoodsService")
	private GoodsService goodsService;
	
	@Resource(name = "hslgGoodsTypeService")
	private GoodsTypeService goodsTypeService;
	 
	/**
	 * 商品分类
	 * @param cateId 
	 * 				被选中的分类ID，如果没有选中，则默认选择第一个分类
	 * @param model
	 * @return
	 * 			返回所有一级分类，以及被选中的一级分类的二级、三级分类
	 */
	@RequestMapping(value = "/cate",method =RequestMethod.GET)
	public String indexPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		//cate data
		DataSet cate_list =goodsTypeService.list();
		model.addAttribute("cate_list", cate_list);
		model.addAttribute("isLogin", isLogin);
		String selectedId="";
		if (StringUtil.isEmptyOrNull(cateId)) {
			selectedId =goodsTypeService.getSelectedId(cate_list);
		}
		else{
			selectedId=cateId;
		}
		model.addAttribute("selected_id", selectedId);
		return "/jbhpage/h5/cate";
	}
	
	
}
