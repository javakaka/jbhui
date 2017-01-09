package com.jbh.controller.h5.admin;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.page.jdbc.Page;
import com.ezcloud.framework.page.jdbc.Pageable;
import com.ezcloud.framework.util.MapUtils;
import com.ezcloud.framework.util.Message;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.CommonwealArchiveRecordService;

/**
 * 后台查询档案捐款捐款订单
 * @author TongJianbo
 *
 */
@Controller("hslgPlatformArchiveOrderController")
@RequestMapping("/hslgpage/platform/commonweal/archives/order")
public class ArchiveOrderContrller  extends BaseController{

	@Resource(name = "hslgCommonwealArchiveRecordService")
	private CommonwealArchiveRecordService commonwealArchiveRecordService;
	/**
	 * 分页查询
	 * @param pageable
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String list(Pageable pageable, ModelMap model) {
		commonwealArchiveRecordService.getRow().put("pageable", pageable);
		Page page = commonwealArchiveRecordService.queryPage();
		model.addAttribute("page", page);
		commonwealArchiveRecordService.getRow().clear();
		return "/hslgpage/platform/commonweal/archives/order/list";
	}
	

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		Row row =MapUtils.convertMaptoRowWithoutNullField(map);
		commonwealArchiveRecordService.insert(row);
		addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
		return "redirect:list.do";
	}

	@RequestMapping(value = "/edit")
	public String edit(String id, ModelMap model) throws Exception {
		Row row =new Row();
		Assert.notNull(id, "id can not be null...");
		row =commonwealArchiveRecordService.find(id);
		model.addAttribute("row", row);
		return "/hslgpage/platform/commonweal/archives/order/edit";
	}
	
	@RequestMapping(value = "/update")
	public String update(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		Row row=MapUtils.convertMaptoRowWithoutNullField(map);
		commonwealArchiveRecordService.update(row);
		addFlashMessage(redirectAttributes,SUCCESS_MESSAGE);
		return "redirect:list.do";
	}

	@RequestMapping(value = "/delete")
	public @ResponseBody
	Message delete(String[] ids) {
		commonwealArchiveRecordService.delete(ids);
		return SUCCESS_MESSAGE;
	}
}