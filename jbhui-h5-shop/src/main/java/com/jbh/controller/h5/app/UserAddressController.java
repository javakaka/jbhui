package com.jbh.controller.h5.app;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.util.AesUtil;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.OVO;
import com.ezcloud.framework.vo.Row;
import com.ezcloud.framework.vo.VOConvert;
import com.jbh.service.UserAddressService;
import com.jbh.service.UserService;
/**
 * 用户收货地址
 * @author TongJianbo
 *
 */
@Controller("mobileUserAddressController")
@RequestMapping("/api/user/address")
public class UserAddressController extends BaseController {
	
	private static Logger logger = Logger.getLogger(UserAddressController.class); 
	
	@Resource(name = "hslgUserService")
	private UserService userService;
	
	@Resource(name = "hslgUserAddressService")
	private UserAddressService userAddressService;
	
	/**
	 * 用户分页查询自己的收货地址列表
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/list")
	public @ResponseBody
	String queryPage(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		String user_id =ivo.getString("user_id",null);
		if(StringUtils.isEmptyOrNull(user_id))
		{
			ovo =new OVO(-1,"","用户编号不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String page =ivo.getString("page","1");
		String page_size =ivo.getString("page_size","10");
		DataSet list =userAddressService.list(user_id, page, page_size);
		ovo =new OVO(0,"","");
		ovo.set("list", list);
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}
	
	@RequestMapping(value ="/add")
	public @ResponseBody
	String add(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		String user_id =ivo.getString("user_id","");
		if(StringUtils.isEmptyOrNull(user_id))
		{
			ovo =new OVO(-1,"用户编号不能为空","用户编号不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		Row userRow =userService.find(user_id);
		if(userRow == null)
		{
			ovo =new OVO(-1,"用户不存在","用户不存在");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String address =ivo.getString("address","");
		if(StringUtils.isEmptyOrNull(address))
		{
			ovo =new OVO(-1,"详细地址不能为空","详细地址不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String receive_name =ivo.getString("receive_name","");
		if(StringUtils.isEmptyOrNull(receive_name))
		{
			ovo =new OVO(-1,"收货人姓名不能为空","收货人姓名不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String receive_tel =ivo.getString("receive_tel","");
		if(StringUtils.isEmptyOrNull(receive_tel))
		{
			ovo =new OVO(-1,"收货人电话不能为空","收货人电话不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String door_no =ivo.getString("door_no","");
		if(StringUtils.isEmptyOrNull(door_no))
		{
			door_no ="";
		}
		String tag =ivo.getString("tag","");
		if(StringUtils.isEmptyOrNull(tag))
		{
			tag ="";
		}
		String is_default =ivo.getString("is_default","");
		if(StringUtils.isEmptyOrNull(is_default))
		{
			is_default ="1";
		}
		Row row =new Row();
		row.put("user_id", user_id);
		row.put("address", address);
		row.put("receive_name", receive_name);
		row.put("receive_tel", receive_tel);
		row.put("door_no", door_no);
		row.put("tag", tag);
		row.put("is_default",is_default );
		if(is_default.equals("1"))
		{
			//
			userAddressService.updateUserDefaultAddressByUserId(user_id);
		}
		userAddressService.insert(row);
		ovo =new OVO(0,"操作成功","");
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}
	
	
	/**
	 * 查询收货地址详情
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/detail")
	public @ResponseBody
	String find(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		logger.info("查询收货地址详情");
		String id =ivo.getString("id",null);
		if(StringUtils.isEmptyOrNull(id))
		{
			ovo =new OVO(-1,"编号不能为空","编号不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		Row row = userAddressService.find(id);
		String province_id =row.getString("province_id","");
		String province_name =row.getString("province_name","");
		String city_id =row.getString("city_id","");
		String city_name =row.getString("city_name","");
		String region_id =row.getString("region_id","");
		String region_name =row.getString("region_name","");
		String address =row.getString("address","");
		String receive_name =row.getString("receive_name","");
		String receive_tel =row.getString("receive_tel","");
		String zip_code =row.getString("zip_code","");
		String is_default =row.getString("is_default","");
		ovo =new OVO(0,"操作成功","");
		ovo.set("id", id);
		ovo.set("province_id", province_id);
		ovo.set("province_name", province_name);
		ovo.set("city_id", city_id);
		ovo.set("city_name", city_name);
		ovo.set("region_id", region_id);
		ovo.set("region_name", region_name);
		ovo.set("address", address);
		ovo.set("receive_name", receive_name);
		ovo.set("receive_tel", receive_tel);
		ovo.set("zip_code", zip_code);
		ovo.set("is_default", is_default);
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}
	
	/**
	 * 查询收货地址详情
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/default")
	public @ResponseBody
	String queryDefault(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		logger.info("查询用户的默认收货地址详情");
		String user_id =ivo.getString("user_id",null);
		if(StringUtils.isEmptyOrNull(user_id))
		{
			ovo =new OVO(-1,"用户编号不能为空","用户编号不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		Row row = userAddressService.findDefault(user_id);
		String province_id =row.getString("province_id","");
		String province_name =row.getString("province_name","");
		String city_id =row.getString("city_id","");
		String city_name =row.getString("city_name","");
		String region_id =row.getString("region_id","");
		String region_name =row.getString("region_name","");
		String address =row.getString("address","");
		String receive_name =row.getString("receive_name","");
		String receive_tel =row.getString("receive_tel","");
		String zip_code =row.getString("zip_code","");
		String is_default =row.getString("is_default","");
		String door_no =row.getString("door_no","");
		String tag =row.getString("tag","");
		String id =row.getString("id","");
		
		ovo =new OVO(0,"操作成功","");
		ovo.set("id", id);
		ovo.set("province_id", province_id);
		ovo.set("province_name", province_name);
		ovo.set("city_id", city_id);
		ovo.set("city_name", city_name);
		ovo.set("region_id", region_id);
		ovo.set("region_name", region_name);
		ovo.set("address", address);
		ovo.set("receive_name", receive_name);
		ovo.set("receive_tel", receive_tel);
		ovo.set("zip_code", zip_code);
		ovo.set("is_default", is_default);
		ovo.set("door_no", door_no);
		ovo.set("tag", tag);
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}
	
	/**
	 * 修改收货地址详情
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/update")
	public @ResponseBody
	String update(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		String id =ivo.getString("id","");
		if(StringUtils.isEmptyOrNull(id))
		{
			ovo =new OVO(-1,"地址编号不能为空","地址编号不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		Row addRow = userAddressService.find(id);
		if(addRow == null )
		{
			ovo =new OVO(-1,"地址记录不存在","地址记录不存在");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String user_id =addRow.getString("user_id","");
		String address =ivo.getString("address","");
		if(StringUtils.isEmptyOrNull(address))
		{
			ovo =new OVO(-1,"详细地址不能为空","详细地址不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String receive_name =ivo.getString("receive_name","");
		if(StringUtils.isEmptyOrNull(receive_name))
		{
			ovo =new OVO(-1,"收货人姓名不能为空","收货人姓名不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String receive_tel =ivo.getString("receive_tel","");
		if(StringUtils.isEmptyOrNull(receive_tel))
		{
			ovo =new OVO(-1,"收货人电话不能为空","收货人电话不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		String door_no =ivo.getString("door_no","");
		if(StringUtils.isEmptyOrNull(door_no))
		{
			door_no ="";
		}
		String tag =ivo.getString("tag","");
		if(StringUtils.isEmptyOrNull(tag))
		{
			tag ="";
		}
		String is_default =ivo.getString("is_default","");
		if(StringUtils.isEmptyOrNull(is_default))
		{
			is_default ="1";
		}
		Row row =new Row();
		row.put("id", id);
		row.put("address", address);
		row.put("receive_name", receive_name);
		row.put("receive_tel", receive_tel);
		row.put("door_no", door_no);
		row.put("tag", tag);
		row.put("is_default",is_default );
		if(is_default.equals("1"))
		{
			//
			userAddressService.updateUserDefaultAddressByUserId(user_id);
		}
		userAddressService.update(row);
		ovo =new OVO(0,"操作成功","");
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}
	
	/**
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/delete")
	public @ResponseBody
	String delete(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		String id =ivo.getString("id",null);
		if(StringUtils.isEmptyOrNull(id))
		{
			ovo =new OVO(-1,"编号不能为空","编号不能为空");
			return AesUtil.encode(VOConvert.ovoToJson(ovo));
		}
		userAddressService.delete(id);
		ovo =new OVO(0,"操作成功","");
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}

	
}
