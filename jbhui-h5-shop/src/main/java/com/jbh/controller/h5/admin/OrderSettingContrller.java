package com.jbh.controller.h5.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.service.system.SystemConfigService;
import com.ezcloud.framework.util.Message;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;

@Controller("hslgPlatformOrderSettingContrller")
@RequestMapping("/hslgpage/platform/order/setting")
public class OrderSettingContrller  extends BaseController{

	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	
	/**
	 * 每小时订单数量
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String list(ModelMap model) {
		DataSet ds =systemConfigService.getConfigData("HSLG_ORDER");
//		HSLG_DONATE_ACCOUNT_LEFT_MONEY
		String per_hour_order_num ="";
		String busi_code ="";
		if( ds != null && ds.size()>0 )
		{
			for(int i=0; i< ds.size(); i++)
			{
				Row row =(Row)ds.get(i);
				busi_code =row.getString("busi_code","");
				if(busi_code.equals("PER_HOUR_ORDER_NUM"))
				{
					per_hour_order_num =row.getString("busi_code_set","");
				}
			}
		}
		model.addAttribute("per_hour_order_num", per_hour_order_num);
		model.addAttribute("busi_type", "HSLG_ORDER");
		return "/hslgpage/platform/order/setting/Setting";
	}
	
	
	@RequestMapping(value = "/SaveSetting")
	public String save(String per_hour_order_num,ModelMap model,RedirectAttributes redirectAttributes) {
		Assert.notNull(per_hour_order_num, "hslg_donate_account_left_money 不能为空");
		String busi_type="HSLG_ORDER";
		systemConfigService.setConfigData(busi_type,"PER_HOUR_ORDER_NUM",per_hour_order_num,"每小时发货阀值");
		addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
		return "redirect:list.do";
	}

	@RequestMapping(value = "/delete")
	public @ResponseBody
	Message delete(Long[] ids) {
		return SUCCESS_MESSAGE;
	}
}
