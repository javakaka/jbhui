package com.jbh.controller.h5.app;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ezcloud.framework.service.system.SystemConfigService;
import com.ezcloud.framework.util.AesUtil;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.NumberUtils;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.OVO;
import com.ezcloud.framework.vo.Row;
import com.ezcloud.framework.vo.VOConvert;
import com.jbh.service.CommonwealLoveRecordService;
import com.jbh.service.CommonwealLoveService;
import com.jbh.service.CommonwealProjectRecordService;
import com.jbh.service.CommonwealProjectService;
import com.jbh.service.OrderService;
import com.jbh.service.UserService;
import com.jbh.service.UserTokenService;

@Controller("mobileConvenientFinanceController")
@RequestMapping("/api/convenient/finance")
public class ConvenientFinanceController extends BaseController {
	
	private static Logger logger = Logger.getLogger(ConvenientFinanceController.class); 
	
	@Resource(name = "hslgUserService")
	private UserService userService;
	
	@Resource(name = "hslgUserTokenService")
	private UserTokenService userTokenService;
	
	@Resource(name = "hslgCommonwealLoveService")
	private CommonwealLoveService commonwealLoveService;
	
	@Resource(name = "hslgCommonwealLoveRecordService")
	private CommonwealLoveRecordService commonwealLoveRecordService;

	@Resource(name = "hslgCommonwealProjectService")
	private CommonwealProjectService commonwealProjectService;
	
	@Resource(name = "hslgCommonwealProjectRecordService")
	private CommonwealProjectRecordService commonwealProjectRecordService;
	
	@Resource(name = "hslgOrderService")
	private OrderService orderService;
	
	@Resource(name = "frameworkSystemConfigService")
	private SystemConfigService systemConfigService;
	
	/**
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value ="/summary")
	public @ResponseBody
	String queryAllAd(HttpServletRequest request) throws Exception
	{
		parseRequest(request);
		logger.info("善小财务汇总");
		String user_id =ivo.getString("user_id","");
		String current_date =DateUtil.getCurrentDate();
//		机构募集善款＝购物捐款＋爱心捐款＋公益项目捐款总金额
		String org_total_money ="0";
//		商城累计公益款
		String shop_total_money ="0";
//		上月机构对公账户余额
		String last_month_left_money ="0";
//		上月购物捐款金额
		String last_month_total_money ="0";
//		用户购物公益善款
		String user_shop_money ="0";
//		用户捐赠的金额
		String user_donate_money ="0";
		
		String love_total_num ="0";
		String project_total_num ="0";
		
		//爱心捐款总金额
		String love_total_money ="0";
		//公益项目捐款总金额
		String project_total_money ="0";
		DataSet ds =commonwealLoveService.list();
		Row row =null;
		if(ds != null)
		{
			row =(Row)ds.get(0);
			love_total_num =row.getString("num","0");
			love_total_money =row.getString("money","0");
		}
		Row summaryProjectRow =commonwealProjectService.queryTotalMoneyAndTotalNum();
		if(summaryProjectRow != null)
		{
			project_total_num =summaryProjectRow.getString("num","0");
			project_total_money =summaryProjectRow.getString("money","0");
		}
		//商城购物总捐款额，根据用户总积分计算，金额＝积分＊0.01
		shop_total_money =String.valueOf(userService.getAllUserScore()*0.01);
		shop_total_money =NumberUtils.getTwoDecimal(shop_total_money);
		
		org_total_money =String.valueOf(Double.parseDouble(love_total_money)+Double.parseDouble(project_total_money) + Double.parseDouble(shop_total_money));
		org_total_money =NumberUtils.getTwoDecimal(org_total_money);
		//上月商城购物捐款金额，查上月的订单积分，金额＝积分＊0.01
		String cur_date =DateUtil.getCurrentDate();
		Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, -1);
        String lastMonth =new SimpleDateFormat("yyyy-MM").format(c.getTime());
		last_month_total_money =NumberUtils.getTwoDecimal(String.valueOf(orderService.getScoreSumByMonth(lastMonth)*0.01));
		//用户购物捐款总金额
		if(! StringUtils.isEmptyOrNull(user_id))
		{
			Row userRow =userService.find(user_id);
			if(userRow != null )
			{
				String user_score =userRow.getString("score","0");
				if(StringUtils.isEmptyOrNull(user_score))
				{
					user_score ="0";
				}
				user_shop_money =NumberUtils.getTwoDecimal(String.valueOf(Integer.parseInt(user_score)*0.01));
			}
			//用户无偿捐款的金额，爱心捐款＋公益项目捐款
			double dUserLoveMoney =commonwealLoveRecordService.getUserDonateMoney(user_id);
			double dUserProjectMoney =commonwealProjectRecordService.getUserDonateMoney(user_id);
			double dUserTotalDonateMoney =dUserLoveMoney + dUserProjectMoney ;
			user_donate_money =String.valueOf(dUserTotalDonateMoney);
			user_donate_money =NumberUtils.getTwoDecimal(user_donate_money);
		}
		//上月善小基金账号余额
		String[] arr =systemConfigService.getConfigData("HSLG_DONATE_PARAM","HSLG_DONATE_ACCOUNT_LEFT_MONEY");
		last_month_left_money =arr[0];
		OVO ovo =new OVO(0,"","");
		ovo.set("current_date", current_date);
		ovo.set("org_total_money", org_total_money);
		ovo.set("shop_total_money", shop_total_money);
		ovo.set("last_month_left_money", last_month_left_money);
		ovo.set("last_month_total_money", last_month_total_money);
		ovo.set("user_shop_money", user_shop_money);
		ovo.set("user_donate_money", user_donate_money);
		return AesUtil.encode(VOConvert.ovoToJson(ovo));
	}
}
