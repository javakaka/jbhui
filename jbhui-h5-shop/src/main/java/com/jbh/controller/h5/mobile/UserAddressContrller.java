package com.jbh.controller.h5.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.service.system.SystemZoneService;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.StringUtil;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.UserAddressService;
import com.jbh.service.UserService;

@Controller("h5UserAddressController")
@RequestMapping("/user/address")
public class UserAddressContrller  extends BaseController{

	 @Resource(name = "hslgUserService")
	 private UserService userService;
	 
	 @Resource(name = "hslgUserAddressService")
	 private UserAddressService userAddressService;
	 
	 @Resource(name = "frameworkSystemZoneService")
	 private SystemZoneService zoneService;
	 
	/**
	 * 首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list",method =RequestMethod.GET)
	public String indexPage(String cateId,ModelMap model ) {
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		DataSet addrList =userAddressService.listAll( user.getString("id") );
		model.addAttribute("address_list", addrList);
		return "/jbhpage/h5/user-address-list";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/add",method =RequestMethod.GET)
	public String add(String cateId,ModelMap model ) {
		// 查询已开放的省份列表
		DataSet proDs =zoneService.findAllOpenedProvince();
		// 查询已开放的城市列表
		DataSet cityDs =zoneService.findAllOpenedCities();
		// 查询已开放的城市的区域列表
		DataSet zoneDs =zoneService.findAllOpenedZone();
		model.addAttribute("province_list", proDs);
		model.addAttribute("city_list", cityDs);
		model.addAttribute("zone_list", zoneDs);
		return "/jbhpage/h5/user-address-add";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/edit",method =RequestMethod.GET)
	public String edit(String id,ModelMap model ) {
		// 查询已开放的省份列表
		DataSet proDs =zoneService.findAllOpenedProvince();
		// 查询已开放的城市列表
		DataSet cityDs =zoneService.findAllOpenedCities();
		// 查询已开放的城市的区域列表
		DataSet zoneDs =zoneService.findAllOpenedZone();
		Row addressRow =userAddressService.find(id);
		model.addAttribute("province_list", proDs);
		model.addAttribute("city_list", cityDs);
		model.addAttribute("zone_list", zoneDs);
		model.addAttribute("address", addressRow);
		return "/jbhpage/h5/user-address-edit";
	}
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/save",method =RequestMethod.POST)
	@ResponseBody
	public ResponseVO save(String id,String receiveName,String receiveTel,String isDefault,String address, 
			String provinceId,String cityId,String regionId,
			ModelMap model ) {
		ResponseVO ovo = new ResponseVO();
		HttpSession session =getSession();
		Row user =(Row)session.getAttribute("member");
		String userId =user.getString("id","");
		Row addressRow =new Row();
		addressRow.put("user_id", userId);
		addressRow.put("province_id", provinceId);
		addressRow.put("city_id", cityId);
		addressRow.put("region_id", regionId);
		addressRow.put("address", address);
		addressRow.put("receive_name", receiveName);
		addressRow.put("receive_tel", receiveTel);
		addressRow.put("is_default", isDefault);
		if (! StringUtil.isEmptyOrNull(isDefault) && isDefault.equals("1") ) 
		{
			userAddressService.updateUserDefaultAddressByUserId(userId);
		}
		int rowNum =0;
		if(StringUtil.isEmptyOrNull(id))
		{
			rowNum =userAddressService.insert(addressRow);
		}
		else
		{
			addressRow.put("id", id);
			rowNum =userAddressService.update(addressRow);	
		}
		if(rowNum <= 0)
		{
			ovo =new ResponseVO(-1,"保存失败");
		}
		return ovo;
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
