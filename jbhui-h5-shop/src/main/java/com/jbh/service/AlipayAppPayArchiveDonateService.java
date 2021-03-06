package com.jbh.service;

import java.util.Random;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.service.JdbcService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.IVO;
import com.ezcloud.framework.vo.OVO;
import com.ezcloud.framework.vo.Row;

/**   
 * 档案捐赠－支付宝支付
 * @author shike001 
 * E-mail:510836102@qq.com   
 */
@Component("hslgAlipayAppPayArchiveDonateService")
public class AlipayAppPayArchiveDonateService extends JdbcService {

	private static Logger logger = Logger.getLogger(AlipayAppPayArchiveDonateService.class);
	
	@Resource(name = "hslgUserService")
	private UserService userService;
	
	@Resource(name = "hslgUserTokenService")
	private UserTokenService userTokenService;

	@Resource(name = "hslgCommonwealArchiveService")
	private CommonwealArchiveService commonwealArchiveService;
	
	@Resource(name = "hslgCommonwealArchiveRecordService")
	private CommonwealArchiveRecordService commonwealArchiveRecordService;
	
	public AlipayAppPayArchiveDonateService() 
	{
		
	}
	
	/**
	 * 
	 * @param ivo
	 * @return
	 * @throws Exception
	 */
	public OVO validate(IVO ivo) throws Exception
	{
		OVO ovo =new OVO();
		String user_id =ivo.getString("user_id");
		String order_id =ivo.getString("order_id");
		String money =ivo.getString("money","0");
		Row userRow =userService.find(user_id);
		if(userRow == null)
		{
			ovo =new OVO(-20011,"用户不存在","用户不存在");
			return ovo;
		}
		if(StringUtils.isEmptyOrNull(money))
		{
			ovo =new OVO(-20011,"捐赠金额不能为空","捐赠金额不能为空");
			return ovo;
		}
		double dmoney =Double.parseDouble(money);
		if(dmoney == 0)
		{
			ovo =new OVO(-20011,"捐赠金额不能为0","捐赠金额不能为0");
			return ovo;
		}
		Row tokenRow =userTokenService.find(user_id);
		if(tokenRow == null)
		{
			ovo =new OVO(-20012,"用户未登录","用户未登录");
			return ovo;
		}
		Row archiveRow =commonwealArchiveService.find(order_id);
		if(archiveRow == null)
		{
			ovo =new OVO(-20012,"捐赠所属档案不存在","捐赠所属档案不存在");
			return ovo;
		}
		String order_no="";
		String cur_time =DateUtil.getCurrentDateTime().replace(" ", "").replace(":", "").replace("-", "");
		Random random =new Random(100);
		int rand_int =random.nextInt(1000);
		//倒数第三第四为定义：01 爱心捐赠02善小档案捐赠03公益项目捐赠
		order_no =cur_time+"01"+String.valueOf(rand_int);
		Row orderRow =new Row();
		orderRow.put("user_id", user_id);
		orderRow.put("archive_id", order_id);
		orderRow.put("order_no", order_no);
		orderRow.put("donate_date", DateUtil.getCurrentDate());
		orderRow.put("money", money);
		orderRow.put("pay_state", "0");
		orderRow.put("pay_type", "1");
		commonwealArchiveRecordService.insert(orderRow);
		Setting setting =SettingUtils.get();
		String site_url =setting.getSiteUrl();
		String notify_url =site_url+"/api/pay/alipay/app/notifyArchiveDonate.do";
		ovo =new OVO(0,"","");
		ovo.set("order_no", order_no);
		ovo.set("money", money);
		ovo.set("notify_url", notify_url);
		logger.info("支付宝支付订单校验通过");
		return ovo;
	}
}