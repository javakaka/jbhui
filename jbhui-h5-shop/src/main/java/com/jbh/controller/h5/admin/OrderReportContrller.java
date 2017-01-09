package com.jbh.controller.h5.admin;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ezcloud.framework.controller.BaseController;
import com.ezcloud.framework.exp.JException;
import com.ezcloud.framework.page.jdbc.Page;
import com.ezcloud.framework.page.jdbc.Pageable;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.ExcelUtil;
import com.ezcloud.framework.util.FileUtil;
import com.ezcloud.framework.util.NumberUtils;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;
import com.jbh.service.OrderItemService;
import com.jbh.service.OrderService;

@Controller("hslgPlatformOrderReportContrller")
@RequestMapping("/hslgpage/platform/order/report")
public class OrderReportContrller  extends BaseController{

	@Resource(name = "hslgOrderService")
	private OrderService orderService;
	
	@Resource(name = "hslgOrderItemService")
	private OrderItemService orderItemService;
	
	
	
	/**
	 * 分页查询
	 * @param pageable
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String list(String type,String year,String month,String day,Pageable pageable, ModelMap model) {
		String date ="";
		if(StringUtils.isEmptyOrNull(type))
		{
			type ="1";//1 day 2 month 3 year
		}
		if(type.equals("1"))
		{
			if(StringUtils.isEmptyOrNull(day))
			{
				date =DateUtil.getCurrentDate();
			}
			else
			{
				date =day;
			}
		}
		else if(type.equals("2"))
		{
			if(StringUtils.isEmptyOrNull(month))
			{
				date =DateUtil.getCurrentDate().substring(0,7);
			}
			else
			{
				date =month;
			}
		}
		else if(type.equals("3"))
		{
			if(StringUtils.isEmptyOrNull(year))
			{
				date =DateUtil.getCurrentDate().substring(0,4);
			}
			else
			{
				date =year;
			}
		}
		
		pageable.setPageSize(10000000);
		pageable.setPageNumber(1);
		Page page = orderItemService.queryReport(date,pageable);
		// 计算总金额
		DataSet ds =page.getContent();
		int total_num =0;
		int num =0;
		double total_money =0;
		double dmoney =0;
		if(ds != null)
		{
			for(int i =0; i< ds.size(); i++ )
			{
				Row temp =(Row)ds.get(i);
				String smoney =temp.getString("money","0");
				dmoney =Double.parseDouble(smoney);
				String snum =temp.getString("num","0");
				num =Integer.parseInt(snum);
				total_num +=num;
				total_money+=dmoney;
			}
		}
		model.addAttribute("total_num", total_num);
		model.addAttribute("total_money", total_money);
		model.addAttribute("page", page);
		model.addAttribute("type", type);
		model.addAttribute("year", year);
		model.addAttribute("month", month);
		model.addAttribute("day", day);
		return "/hslgpage/platform/order/report/list";
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/export-excel")
	public  String exportUserPunchLog(HttpServletRequest request,HttpServletResponse response,
			String type,String year,String month,String day) throws JException, IOException
	{
		HttpSession session = getSession();
		Row staff =(Row)session.getAttribute("staff");
		String org_id =null;
		if(staff != null){
			org_id =staff.getString("bureau_no", null);
		}
		String date ="";
		if(StringUtils.isEmptyOrNull(type))
		{
			type ="1";//1 day 2 month 3 year
		}
		if(type.equals("1"))
		{
			if(StringUtils.isEmptyOrNull(day))
			{
				date =DateUtil.getCurrentDate();
			}
			else
			{
				date =day;
			}
		}
		else if(type.equals("2"))
		{
			if(StringUtils.isEmptyOrNull(month))
			{
				date =DateUtil.getCurrentDate().substring(0,7);
			}
			else
			{
				date =month;
			}
		}
		else if(type.equals("3"))
		{
			if(StringUtils.isEmptyOrNull(year))
			{
				date =DateUtil.getCurrentDate().substring(0,4);
			}
			else
			{
				date =year;
			}
		}
		Pageable pageable =new Pageable();
		pageable.setPageNumber(1);
		pageable.setPageSize(10000000);
		Page page = orderItemService.queryReport(date,pageable);
		// 计算总金额
		DataSet ds =page.getContent();
		int total_num =0;
		int num =0;
		double total_money =0;
		double dmoney =0;
		if(ds != null)
		{
			for(int i =0; i< ds.size(); i++ )
			{
				Row temp =(Row)ds.get(i);
				String smoney =temp.getString("money","0");
				dmoney =Double.parseDouble(smoney);
				String snum =temp.getString("num","0");
				num =Integer.parseInt(snum);
				total_num +=num;
				total_money+=dmoney;
			}
		}
		DataSet pageSet = page.getContent();
		Row summaryRow =new Row();
		summaryRow.put("name", "汇总：");
		summaryRow.put("money", "总金额："+NumberUtils.getTwoDecimal(String.valueOf(total_money)));
		summaryRow.put("num", "销售总数："+total_num);
		pageSet.add(summaryRow);
		DataSet titleDs =new DataSet();
		titleDs.add("商品名称");
		titleDs.add("销售数量");
		titleDs.add("销售金额（小记）");
		DataSet keyDs =new DataSet();
		keyDs.add("NAME");
		keyDs.add("NUM");
		keyDs.add("MONEY");
		String basePath =request.getSession().getServletContext().getRealPath("/resources");
		basePath +="/export_report_excel"+"/";
		File dirfile =new File(basePath);
		if(! dirfile.exists() )
		{
			FileUtil.mkdir(basePath);
		}
		String fileName =date+"－销售报表.xls";
		String out_path=basePath;
		String file_path=basePath+"/"+fileName;
		String sheetName="销售报表";
		ExcelUtil.writeExcel(titleDs, keyDs, pageSet, out_path,fileName,sheetName,400);
//		ExcelUtil.writeExcel(titleDs, keyDs, pageSet,summarySet, out_path,fileName,sheetName,400);
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
}