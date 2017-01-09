package com.jbh.controller.h5.admin;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.exp.JException;
import com.ezcloud.framework.page.jdbc.Page;
import com.ezcloud.framework.page.jdbc.Pageable;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.ExcelUtil;
import com.ezcloud.framework.util.FileUtil;
import com.ezcloud.framework.util.MapUtils;
import com.ezcloud.framework.util.Message;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.DeliveryService;
import com.jbh.service.OrderItemService;
import com.jbh.service.OrderService;

@Controller("hslgPlatformOrderController")
@RequestMapping("/jbhpage/platform/order/profile")
public class OrderContrller  extends BaseController{

	@Resource(name = "hslgOrderService")
	private OrderService orderService;
	
	@Resource(name = "hslgDeliveryService")
	private DeliveryService deliveryService;
	
	@Resource(name = "hslgOrderItemService")
	private OrderItemService orderItemService;
	
	/**
	 * 分页查询
	 * @param pageable
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String list(Pageable pageable, ModelMap model) {
		orderService.getRow().put("pageable", pageable);
		Page page = orderService.queryPage();
		model.addAttribute("page", page);
		orderService.getRow().clear();
		// 配送员列表
		DataSet deliver_list =deliveryService.findAll();
		model.addAttribute("deliver_list", deliver_list);
		return "/jbhpage/platform/order/profile/list";
	}
	

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		Row row =MapUtils.convertMaptoRowWithoutNullField(map);
		orderService.insert(row);
		addFlashMessage(redirectAttributes, SUCCESS_MESSAGE);
		return "redirect:list.do";
	}
	
	

	@RequestMapping(value = "/edit")
	public String edit(String id, ModelMap model) throws Exception {
		Row row =new Row();
		Assert.notNull(id, "id can not be null...");
		row =orderService.findDetail(id);
		model.addAttribute("row", row);
		model.addAttribute("delivery_list", deliveryService.findAll());
		return "/jbhpage/platform/order/profile/edit";
	}
	
	@RequestMapping(value = "/update")
	public String update(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		Row row=MapUtils.convertMaptoRowWithoutNullField(map);
		orderService.update(row);
		addFlashMessage(redirectAttributes,SUCCESS_MESSAGE);
		return "redirect:list.do";
	}
	
	@RequestMapping(value = "/update-ajax", method = RequestMethod.POST)
	public @ResponseBody ResponseVO saveAjax(@RequestParam HashMap<String,String> map,RedirectAttributes redirectAttributes) throws Exception {
		ResponseVO ovo =new ResponseVO();
		Row row=MapUtils.convertMaptoRowWithoutNullField(map);
		orderService.update(row);
		return ovo;
	}

	@RequestMapping(value = "/delete")
	public @ResponseBody
	Message delete(String[] ids) {
		orderService.delete(ids);
		return SUCCESS_MESSAGE;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/export-order")
	public  String exportUserPunchLog(HttpServletRequest request,HttpServletResponse response,
			String start_date,String end_date,String depart_id,String user_id) throws JException, IOException
	{
		HttpSession session = getSession();
		Row staff =(Row)session.getAttribute("staff");
		String org_id =null;
		if(staff != null){
			org_id =staff.getString("bureau_no", null);
		}
		if(org_id == null){
			return null;
		}
		DataSet pageSet = null;
		if(! StringUtils.isEmptyOrNull(start_date))
		{
			start_date =start_date.replaceAll(" ", "");
			start_date +=" 00:00:00";
		}
		if(! StringUtils.isEmptyOrNull(end_date))
		{
			end_date =end_date.replaceAll(" ", "");
			end_date +=" 00:00:00";
		}
		String real_path =request.getRealPath("resources");
		int iPos =real_path.indexOf("resources");
		String base_real_path =real_path;
		if(iPos != -1)
		{
			base_real_path =real_path.substring(0,iPos);
		}
		pageSet = orderService.findExportOrder();
		DataSet titleDs =new DataSet();
		titleDs.add("订单编号");
		titleDs.add("用户姓名");
		titleDs.add("用户手机");
		titleDs.add("订单类型");
		titleDs.add("订单金额");
		titleDs.add("已支付金额");
		titleDs.add("支付方式");
		titleDs.add("支付状态");
		titleDs.add("配送状态");
		titleDs.add("订单创建时间");
		titleDs.add("配送员");
		titleDs.add("期望配送时间");
		titleDs.add("配送地址");
		DataSet keyDs =new DataSet();
		keyDs.add("ORDER_NO");
		keyDs.add("USERNAME");
		keyDs.add("TELEPHONE");
		keyDs.add("ORDER_TYPE");
		keyDs.add("MONEY");
		keyDs.add("PAY_MONEY");
		keyDs.add("PAY_TYPE");
		keyDs.add("STATE");
		keyDs.add("TRANSFER_STATE");
		keyDs.add("CREATE_TIME");
		keyDs.add("DELIVERY_NAME");
		keyDs.add("ORDER_MESSAGE");
		keyDs.add("ADDRESS");
		String basePath =request.getSession().getServletContext().getRealPath("/resources");
		basePath +="/export_order_excel"+"/";
		File dirfile =new File(basePath);
		if(! dirfile.exists() )
		{
			FileUtil.mkdir(basePath);
		}
		String fileName =DateUtil.getCurrentDate().replaceAll(" ", "").replaceAll("-", "")+"订单表.xls";
		String out_path=basePath;
		String file_path=basePath+"/"+fileName;
		String sheetName="订单表";
		ExcelUtil.writeExcel(titleDs, keyDs, pageSet, out_path,fileName,sheetName,400);
		InputStream is = new FileInputStream(file_path);
		response.reset();
		response.setContentType("application/vnd.ms-excel;charset=utf-8");
		response.setHeader("Content-Disposition", "attachment;filename="+ new String(fileName.getBytes(), "iso-8859-1"));
		ServletOutputStream out = response.getOutputStream();
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			bis = new BufferedInputStream(is);
			bos = new BufferedOutputStream(out);
			byte[] buff = new byte[2048];
			int bytesRead;
			while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
				bos.write(buff, 0, bytesRead);
			}
		} catch (final IOException e) {
			throw e;
		} finally {
			if (bis != null)
				bis.close();
			if (bos != null)
				bos.close();
		}
		
		return null;
	} 
	
	
	@RequestMapping(value = "/print")
	public String print(String id, ModelMap model) throws Exception {
		Row row =new Row();
		Assert.notNull(id, "id can not be null...");
		row =orderService.findDetail(id);
		model.addAttribute("row", row);
		// 订单项
		DataSet items =orderItemService.queryItemsByOrderId(id);
		model.addAttribute("items", items);
		return "/jbhpage/platform/order/profile/print";
	}
}