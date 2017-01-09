package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.util.StringUtil;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.GoodsJudgementService;
import com.jbh.service.GoodsService;
import com.jbh.service.GoodsTypeService;
import com.jbh.service.UserAddressService;
import com.jbh.service.UserCollectionService;

@Controller("h5GoodsPageController")
public class GoodsContrller  extends BaseController{

	 @Resource(name="hslgGoodsService")
	  private GoodsService goodsService;
	 
	 @Resource(name = "hslgGoodsTypeService")
	 private GoodsTypeService goodsTypeService;
	 
	 @Resource(name = "hslgUserCollectionService")
	 private UserCollectionService userCollectionService;
	 
	 @Resource(name = "hslgUserAddressService")
	 private UserAddressService userAddressService;
	 
	 @Resource(name = "hslgGoodsJudgementService")
	 private GoodsJudgementService goodsJudgementService;
	/**
	 * 首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/goods-list",method =RequestMethod.GET)
	public String indexPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
		}
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		return "/jbhpage/h5/goods-list";
	}
	
	/**
	 * 
	 * @param typeId
	 * @param isHot
	 * @param teamBuy
	 * @param page
	 * @param pageSize
	 * @param keyword	搜索关键字
	 * @param order		排序规则
	 * @param transFree 是否包邮
	 * @param discount  是否打折
	 * @return
	 */
	@RequestMapping(value = "/goods-page",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO indexPageGoodsData(String typeId,String isHot,String teamBuy,
			String page,String pageSize,String keyword,String order ,
			String transFree,String discount) {
		ResponseVO ovo =new ResponseVO();
		DataSet data = this.goodsService.list(typeId, isHot, teamBuy, page, pageSize
				,keyword,order,transFree,discount);
		ovo.put("data", data);
		return ovo;
	}
	
	/**
	 * detail
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/goods-detail",method =RequestMethod.GET)
	public String detailPage(String cateId,String goodsId,ModelMap model ) {
		if (StringUtil.isEmptyOrNull(goodsId)) {
			return "/jbhpage/h5/goods-detail";
		}
		String user_id ="";
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		int isLogin =0;
		if (user != null) {
			isLogin =1;
			user_id =user.getString("id");
		}
		Row row =goodsService.findDetailWithoutPicture(goodsId);
		//是否已收藏
		String is_collected ="0";
		// 用户的默认收货地址
		Row userAddressRow =new Row();
		if(!StringUtils.isEmptyOrNull(user_id))
		{
			Row collectionRow =userCollectionService.find(user_id, goodsId);
			if(collectionRow != null)
			{
				is_collected ="1";
			}
			userAddressRow =userAddressService.findDefault(user_id);
		}
		//图片列表
		DataSet picture_list =goodsService.findDetailPictureList(goodsId);
//		//推荐商品，当前商品所属类型的同类型商品，当前商品id往后最靠近的两个商品
//		DataSet similarityDs =goodsService.findSimilarityGoods(goodsId, type_id);
		Setting setting =SettingUtils.get();
		String siteUrl =setting.getSiteUrl();
		String domain =siteUrl;
		int iPos =siteUrl.lastIndexOf("/");
		if(iPos != -1)
		{
			domain =siteUrl.substring(0,iPos);
		}
		int judgeNum =goodsJudgementService.findGoodsTotalJudgeNum(goodsId);
//		//替换图片标签的url为http全路径
//		detail =HtmlUtils.fillImgSrcWithDomain(domain, detail);
//		// 转义字符串中的换行，不然在转成json对象时会报错
//		detail =StringUtils.string2Json(detail);
		//查询商品的收藏次数
		int collectNum =userCollectionService.getGoodsTotalCollectionNum(goodsId);
		model.addAttribute("isLogin", isLogin);
		model.addAttribute("cateId", cateId);
		model.addAttribute("goodsId", goodsId);
		model.addAttribute("goods",row );
		model.addAttribute("cateId", cateId);
		model.addAttribute("picture_list", picture_list);
		model.addAttribute("collectNum", collectNum);
		model.addAttribute("judgeNum", judgeNum);
		model.addAttribute("is_collected", is_collected);
		model.addAttribute("userAddressRow", userAddressRow);
		return "/jbhpage/h5/goods-detail";
	}
	
}
