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
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.DeliveryService;

@Controller("hslgPlatformDeliveryContrller")
@RequestMapping("/hslgpage/platform/order/delivery")
public class DeliveryContrller  extends BaseController{

	@Resource(name = "hslgDeliveryService")
	private DeliveryService deliveryService;

	/**
	 * 分页查询
	 * @param pageable
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String list(Pageable pageable, ModelMap model) {
		deliveryService.getRow().put("pageable", pageable);
		Page page = deliveryService.queryPage();
		model.addAttribute("page", page);
		deliveryService.getRow().clear();
		return "/hslgpage/platform/order/delivery/list";
	}
	
	@RequestMapping(value = "/select")
	public String selectUserList(String id,Pageable pageable, ModelMap model) {
		deliveryService.getRow().put("pageable", pageable);
		Page page = deliveryService.queryPage();
		model.addAttribute("page", page);
		if(StringUtils.isEmptyOrNull(id))
		{
			id ="";
		}
		model.addAttribute("id", id);
		deliveryService.getRow().clear();
		return "/hslgpage/platform/order/delivery/select";
	}
	@RequestMapping(value = "/add")
	public String add(ModelMap model) {
		return "/hslgpage/platform/order/delivery/add";
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public  String save(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		Row row =MapUtils.convertMaptoRowWithoutNullField(map);
		deliveryService.insert(row);
		return "redirect:list.do";
	}

	@RequestMapping(value = "/edit")
	public String edit(String id, ModelMap model) throws Exception {
		Assert.notNull(id, "id null");
		Row row =deliveryService.find(id);
		model.addAttribute("row", row);
		return "/hslgpage/platform/order/delivery/edit";
	}

	@RequestMapping(value = "/update")
	public String update(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		Row row=MapUtils.convertMaptoRowWithoutNullField(map);
		deliveryService.update(row);
		addFlashMessage(redirectAttributes,SUCCESS_MESSAGE);
		return "redirect:list.do";
	}

	@RequestMapping(value = "/delete")
	public @ResponseBody
	Message delete(String[] ids) {
		deliveryService.delete(ids);
		return SUCCESS_MESSAGE;
	}
	
}
