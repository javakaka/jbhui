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

@Controller("hslgPlatformDonateAccountController")
@RequestMapping("/hslgpage/platform/commonweal/setting/params")
public class DonateAccountContrller  extends BaseController{

	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	
	/**
	 * 上月善小基金余额
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String list(ModelMap model) {
		DataSet ds =systemConfigService.getConfigData("HSLG_DONATE_PARAM");
//		HSLG_DONATE_ACCOUNT_LEFT_MONEY
		String hslg_donate_account_left_money ="";
		String busi_code ="";
		if( ds != null && ds.size()>0 )
		{
			for(int i=0; i< ds.size(); i++)
			{
				Row row =(Row)ds.get(i);
				busi_code =row.getString("busi_code","");
				if(busi_code.equals("HSLG_DONATE_ACCOUNT_LEFT_MONEY"))
				{
					hslg_donate_account_left_money =row.getString("busi_code_set","");
				}
			}
		}
		model.addAttribute("hslg_donate_account_left_money", hslg_donate_account_left_money);
		model.addAttribute("busi_type", "HSLG_DONATE_PARAM");
		return "/hslgpage/platform/commonweal/setting/params/Setting";
	}
	
	
	@RequestMapping(value = "/SaveSetting")
	public String save(String hslg_donate_account_left_money,ModelMap model,RedirectAttributes redirectAttributes) {
		Assert.notNull(hslg_donate_account_left_money, "hslg_donate_account_left_money 不能为空");
		String busi_type="HSLG_DONATE_PARAM";
		systemConfigService.setConfigData(busi_type,"HSLG_DONATE_ACCOUNT_LEFT_MONEY",hslg_donate_account_left_money,"善小基金上月余额");
		addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
		return "redirect:list.do";
	}

	@RequestMapping(value = "/delete")
	public @ResponseBody
	Message delete(Long[] ids) {
		return SUCCESS_MESSAGE;
	}
}
