/**
 * 
 */
package com.jbh.service;

import java.math.BigDecimal;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.ezcloud.framework.common.Setting;
import com.ezcloud.framework.page.jdbc.Page;
import com.ezcloud.framework.page.jdbc.Pageable;
import com.ezcloud.framework.service.JdbcService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.util.ResponseVO;
import com.ezcloud.framework.util.SettingUtils;
import com.ezcloud.framework.util.StringUtils;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;

/**   
 * @author shike001 
 * E-mail:510836102@qq.com   
 * @version 创建时间：2014-12-26 下午3:14:51  
 * 类说明: order 
 */

@Component("hslgOrderService")
public class OrderService extends JdbcService{

	private static Logger logger =Logger.getLogger(OrderService.class);
	
	@Resource(name = "hslgOrderItemService")
	private OrderItemService orderItemService;
	
	public OrderService() {
		
	}
	
	/**
	 * 点击进入商家详情
	 * @param id
	 * @return
	 */
	@Transactional(value="jdbcTransactionManager",readOnly = true)
	public Row find(String id)
	{
		Row row =null;
		String sSql ="select * from hslg_order a  "
				+" where a.id='"+id+"' ";
		row =queryRow(sSql);
		return row;
	}
	
	@Transactional(value="jdbcTransactionManager",readOnly = true)
	public Row findDetail(String id)
	{
		Row row =null;
		String sSql ="select a.*,b.username,b.telephone,c.address ,c.receive_name,c.receive_tel,c.zip_code ,d.name as delivery_name from hslg_order a  "
				+ "left join hslg_users b on a.user_id=b.id "
				+ "left join hslg_receive_address c on a.address_id=c.id "
				+ "left join hslg_delivery d on a.delivery_id=d.id "
				+" where a.id='"+id+"' ";
		row =queryRow(sSql);
		return row;
	}
	
	@Transactional(value="jdbcTransactionManager",readOnly = true)
	public Row findByOrderNo(String order_no)
	{
		Row row =null;
		String sSql ="select * from hslg_order where order_no='"+order_no+"' ";
		row =queryRow(sSql);
		return row;
	}
	
	
	@Transactional(value="jdbcTransactionManager",propagation=Propagation.REQUIRED)
	public int insert(Row row)
	{
		int num =0;
		int id =getTableSequence("hslg_order", "id", 1);
		row.put("id", id);
		row.put("create_time", DateUtil.getCurrentDateTime());
		num =insert("hslg_order", row);
		return num;
	}
	
	@Transactional(value="jdbcTransactionManager",propagation=Propagation.REQUIRED)
	public int update(Row row)
	{
		int num =0;
		String id =row.getString("id",null);
		row.put("modify_time", DateUtil.getCurrentDateTime());
		Assert.notNull(id);
		num =update("hslg_order", row, " id='"+id+"'");
		return num;
	}
	
	/**
	 * 分页查询
	 * 
	 * @Title: queryPage
	 * @return Page
	 */
	@Transactional(value="jdbcTransactionManager",readOnly = true)
	public Page queryPage() {
		Page page = null;
		Pageable pageable = (Pageable) row.get("pageable");
		String sql =" select * from "
		+" (select a.*,b.username,b.telephone ,c.`name` as delivery_name, "
		+" d.address ,d.receive_name,d.receive_tel,d.zip_code "
		+" from hslg_order a  "
		+" left join hslg_users b on a.user_id=b.id " 
		+" left join hslg_delivery c on a.delivery_id=c.id "
		+" left join hslg_receive_address d on a.address_id=d.id "
		+" order by a.create_time desc "
		+" ) as tab "
		+" where 1=1 ";
		String restrictions = addRestrictions(pageable);
		String orders = addOrders(pageable);
		sql += restrictions;
		sql += orders;
		String countSql =" select count(*) from "
		+" (select a.*,b.username,b.telephone from hslg_order a " 
		+" left join hslg_users b on a.user_id=b.id "
		+" order by a.create_time desc "
		+" ) as tab "
		+" where 1=1 ";
		countSql += restrictions;
		countSql += orders;
		long total = count(countSql);
		int totalPages = (int) Math.ceil((double) total / (double) pageable.getPageSize());
		if (totalPages < pageable.getPageNumber()) {
			pageable.setPageNumber(totalPages);
		}
		int startPos = (pageable.getPageNumber() - 1) * pageable.getPageSize();
		sql += " limit " + startPos + " , " + pageable.getPageSize();
		dataSet = queryDataSet(sql);
		page = new Page(dataSet, total, pageable);
		return page;
	}
	
	
	public DataSet list(String user_id,String state,String page,String page_size)
	{
		int iStart =(Integer.parseInt(page)-1)*Integer.parseInt(page_size);
		DataSet ds =new DataSet();
		String sSql ="select * from hslg_order "
				+" where user_id='"+user_id+"' " ;
		if( !StringUtils.isEmptyOrNull(state))
		{
			sSql +=" and state='"+state+"' ";
		}
		sSql +=" order by create_time desc ";
		sSql +=" limit "+iStart+" , "+page_size;	
		ds =queryDataSet(sSql);
		return ds;
	}
	
	/**
	 * 
	 * @param user_id 
	 * 				用户ID
	 * @param status 
	 * 				业务查询状态
	 * 1 处理中 state =0
	 * 2 已取消  state in (1,2,3,4,5,6)
	 * 3 已完成 state =-1
	 * @param page
	 * 				当前页码
	 * @param page_size
	 * 				每页数据大小
	 * @return
	 */
	public DataSet listPageByUserIdAndStatus(String user_id,String status,String page,String pageSize)
	{
		int iStart =(Integer.parseInt(page)-1)*Integer.parseInt(pageSize);
		DataSet ds =new DataSet();
		String sSql ="select * from hslg_order where user_id='"+user_id+"' " ;
		String stateCondition ="";
		if (status.equals("1")) {
			stateCondition ="'0'";
		}
		else if (status.equals("2")) {
			stateCondition ="'-1'";
		}
		else if (status.equals("3")) {
			stateCondition ="'2','3','4','5','6'";
		}
		if( !StringUtils.isEmptyOrNull(stateCondition))
		{
			sSql +=" and state in ("+stateCondition+") ";
		}
		sSql +=" order by create_time desc ";
		sSql +=" limit "+iStart+" , "+pageSize;
		ds =queryDataSet(sSql);
		return ds;
	}
	
	@SuppressWarnings("unchecked")
	public DataSet listWithOneGoods(String user_id,String state,String page,String page_size)
	{
		int iStart =(Integer.parseInt(page)-1)*Integer.parseInt(page_size);
		DataSet ds =new DataSet();
		String sSql ="select a.id,a.state,a.user_id,a.create_time,a.order_no,"
		+ "a.transfer_state,a.score,b.goods_id,b.goods_num,b.goods_price,fu.file_path ,"
		+ "d.name as goods_name,d.unit,a.order_type,e.name as delivery_name,e.telephone as delivery_telephone from hslg_order a "
		+" left join hslg_order_item b on b.order_id=a.id "
		+" left join file_attach_control fc on fc.DEAL_CODE=b.goods_id and fc.DEAL_TYPE='goods_icon' " 
		+" left join file_attach_upload fu on fc.CONTROL_ID=fu.CONTROL_ID "
		+" left join hslg_goods d on b.goods_id=d.id "
		+" left join hslg_delivery e on a.delivery_id=e.id "
		+" where a.user_id='"+user_id+"' " ;
		if( !StringUtils.isEmptyOrNull(state))
		{
			sSql +=" and a.state='"+state+"' ";
		}
		sSql +=" group by a.id ";
		sSql +=" order by a.create_time desc ";
		sSql +=" limit "+iStart+" , "+page_size;	
		ds =queryDataSet(sSql);
		if(ds != null)
		{
			Setting setting =SettingUtils.get();
			String site_url =setting.getSiteUrl();
			int iPos =-1;
			for(int i =0; i<ds.size(); i++)
			{
				Row row =(Row)ds.get(i);
				String file_path =row.getString("file_path","");
				if(!StringUtils.isEmptyOrNull(file_path))
				{
					iPos =file_path.indexOf("/resources");
					if(iPos != -1)
					{
						file_path =file_path.substring(iPos,file_path.length());
						file_path =site_url+file_path;
						row.put("file_path", file_path);
						ds.set(i, row);
					}
				}
			}
		}
		return ds;
	}
	
	/**
	 * H5 订单查询
	 * @param user_id 
	 * 				用户ID
	 * @param status 
	 * 				业务查询状态
	 * 1 处理中 state =0
	 * 2 已取消  state in (1,2,3,4,5,6)
	 * 3 已完成 state =-1
	 * @param page
	 * 				当前页码
	 * @param pageSize
	 * 				每页数据大小
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public DataSet listWithOneGoodsByuserIdAndStatus(String user_id,String status,String page,String pageSize)
	{
		int iStart =(Integer.parseInt(page)-1)*Integer.parseInt(pageSize);
		DataSet ds =new DataSet();
		String sSql ="select a.id,a.state,a.user_id,a.create_time,a.order_no,"
				+ "a.transfer_state,a.score,a.money,a.total_goods_num,b.goods_id,b.goods_num,b.goods_price,fu.file_path ,"
				+ "d.name as goods_name,d.unit,a.order_type,e.name as delivery_name,e.telephone as delivery_telephone from hslg_order a "
				+" left join hslg_order_item b on b.order_id=a.id "
				+" left join file_attach_control fc on fc.DEAL_CODE=b.goods_id and fc.DEAL_TYPE='goods_icon' " 
				+" left join file_attach_upload fu on fc.CONTROL_ID=fu.CONTROL_ID "
				+" left join hslg_goods d on b.goods_id=d.id "
				+" left join hslg_delivery e on a.delivery_id=e.id "
				+" where a.user_id='"+user_id+"' " ;
		String stateCondition ="";
		if (status.equals("1")) {
			stateCondition ="'0'";
		}
		else if (status.equals("2")) {
			stateCondition ="'-1'";
		}
		else if (status.equals("3")) {
			stateCondition ="'1','2','3','4','5','6'";
		}
		if( !StringUtils.isEmptyOrNull(stateCondition))
		{
			sSql +=" and a.state in ("+stateCondition+") ";
		}
		sSql +=" group by a.id ";
		sSql +=" order by a.create_time desc ";
		sSql +=" limit "+iStart+" , "+pageSize;	
		ds =queryDataSet(sSql);
		if(ds != null)
		{
			Setting setting =SettingUtils.get();
			String site_url =setting.getSiteUrl();
			int iPos =-1;
			for(int i =0; i<ds.size(); i++)
			{
				Row row =(Row)ds.get(i);
				String file_path =row.getString("file_path","");
				if(!StringUtils.isEmptyOrNull(file_path))
				{
					iPos =file_path.indexOf("/resources");
					if(iPos != -1)
					{
						file_path =file_path.substring(iPos,file_path.length());
						file_path =site_url+file_path;
						row.put("file_path", file_path);
						ds.set(i, row);
					}
				}
			}
		}
		return ds;
	}
	
	/**
	 * 删除
	 * 
	 * @Title: delete
	 * @param @param ids
	 * @return void
	 */
	@Transactional(value="jdbcTransactionManager",propagation=Propagation.REQUIRED)
	public void delete(String... ids) {
		String id = "";
		if (ids != null) {
			for (int i = 0; i < ids.length; i++) {
				if (id.length() > 0) {
					id += ",";
				}
				id += "'" + String.valueOf(ids[i]) + "'";
			}
			sql = "delete from hslg_order_item where order_id in(" + id + ")";
			update(sql);
			sql = "delete from hslg_order where id in(" + id + ")";
			update(sql);
		}
	}
	
	//精确到秒的订单数量
	public int getOrderNumByCreateTime(String time)
	{
		int num =0;
		String sql ="select count(*) from hslg_order where create_time='"+time+"' ";
		num =Integer.parseInt(queryField(sql));
		return num;
	}
	//精确到小时的订单数量
	public int getOrderNumByHour(String time)
	{
		int num =0;
		String sql ="select count(*) from hslg_order where create_time like'%"+time+"%' ";
		num =Integer.parseInt(queryField(sql));
		return num;
	}
	
	//精确到天的订单数量
	public int getOrderNumByDay(String time)
	{
		int num =0;
		String sql ="select count(*) from hslg_order where create_time like'%"+time+"%' ";
		num =Integer.parseInt(queryField(sql));
		return num;
	}
	
	//根据月份查询积分
	public int getScoreSumByMonth(String month)
	{
		int num =0;
		String sql ="select sum(score) from hslg_order where create_time like '%"+month+"%' ";
		try{
			num =Integer.parseInt(queryField(sql));
		}catch(Exception exp){
			num =0;
		}
		return num;
	}
	
	@SuppressWarnings("unchecked")
	public DataSet findExportOrder()
	{
		DataSet ds =new DataSet();
		String sSql ="select a.*,b.username,b.telephone,c.address ,d.name as delivery_name from hslg_order a  "
				+ "left join hslg_users b on a.user_id=b.id "
				+ "left join hslg_receive_address c on a.address_id=c.id "
				+ "left join hslg_delivery d on a.delivery_id=d.id ";
		ds =queryDataSet(sSql);
		if(ds != null && ds.size() > 0 )
		{
			for(int i=0; i< ds.size(); i++)
			{
				Row temp =(Row)ds.get(i);
				String order_type =temp.getString("order_type","");
				if(! StringUtils.isEmptyOrNull(order_type))
				{
					if(order_type.equals("1"))
					{
						order_type ="在线支付";
					}
					else if(order_type.equals("2"))
					{
						order_type ="货到付款";
					}
					else if(order_type.equals("3"))
					{
						order_type ="水票支付";
					}
					else
					{
						order_type ="";
					}
				}
				String pay_type =temp.getString("pay_type","");
				if(! StringUtils.isEmptyOrNull(pay_type))
				{
					if(pay_type.equals("1"))
					{
						pay_type ="账户余额支付";
					}
					else if(pay_type.equals("2"))
					{
						pay_type ="支付宝支付";
					}
					else if(pay_type.equals("3"))
					{
						pay_type ="银行卡支付";
					}
					else if(pay_type.equals("4"))
					{
						pay_type ="货到付款";
					}
					else
					{
						pay_type ="";
					}
				}
				String state =temp.getString("state","");
				if(! StringUtils.isEmptyOrNull(state))
				{
					if(state.equals("0"))
					{
						state ="待付款";
					}
					else if(state.equals("1"))
					{
						state ="已付款未到账";
					}
					else if(state.equals("2"))
					{
						state ="已到账待收货";
					}
					else if(state.equals("3"))
					{
						state ="已收货";
					}
					else if(state.equals("4"))
					{
						state ="申请退款";
					}
					else if(state.equals("5"))
					{
						state ="退款未到账";
					}
					else if(state.equals("6"))
					{
						state ="已退款";
					}
					else
					{
						state ="";
					}
				}
				String transfer_state =temp.getString("transfer_state","");
				if(! StringUtils.isEmptyOrNull(transfer_state))
				{
					if(transfer_state.equals("0"))
					{
						transfer_state ="未配送";
					}
					else if(transfer_state.equals("1"))
					{
						transfer_state ="配送中";
					}
					else if(transfer_state.equals("2"))
					{
						transfer_state ="配送完成";
					}
					else
					{
						transfer_state ="";
					}
				}
				temp.put("order_type", order_type);
				temp.put("pay_type", pay_type);
				temp.put("state", state);
				temp.put("transfer_state", transfer_state);
				ds.set(i, temp);
			}
		}
		return ds;
	}
	
	public int queryOrderTotalNumByUserId( String userId )
	{
		int total =0;
		String sql ="select count(*) from hslg_order where user_id='"+userId+"' ";
		total =Integer.parseInt( queryField(sql) );
		return total;
	}
	
	/**
	 * 
	 * @param userId
	 * @param status '1','2'
	 * @return
	 */
	public int queryOrderTotalNumByUserIdAndStatus( String userId ,String status)
	{
		int total =0;
		String sql ="select count(*) from hslg_order where user_id='"+userId+"' and state in ("+status+")";
		total =Integer.parseInt( queryField(sql) );
		return total;
	}
	
	/** h5订单**/

	/**
	 * 从购物车提交的订单数据中，解析出商品ID列表
	 * @param cartGoods
	 * @return
	 */
	public String parseGoodsIds(String cartGoods)
	{
		String ids ="";
		if (StringUtils.isEmptyOrNull(cartGoods)) {
			return ids;
		}
		String goodsArr [] =cartGoods.split(",");
		if (goodsArr != null) {
			for (int i = 0; i < goodsArr.length; i++) 
			{
				if (StringUtils.isEmptyOrNull(goodsArr[i])) {
					continue;
				}
				String item[] =goodsArr[i].split("@");
				if (StringUtils.isEmptyOrNull(ids)) {
					ids +="'"+item[0]+"'";
				}
				else
				{
					ids +=",'"+item[0]+"'";
				}
			}
		}
		return ids;
	}
	
	/**
	 * 从购物车提交的订单数据中，解析出商品ID和数量列表
	 * @param cartGoods
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public DataSet parseGoodsToDataSet(String cartGoods)
	{
		DataSet goodsDs =new DataSet();
		if (StringUtils.isEmptyOrNull(cartGoods)) {
			return null;
		}
		String goodsArr [] =cartGoods.split(",");
		if (goodsArr != null) {
			for (int i = 0; i < goodsArr.length; i++) 
			{
				if (StringUtils.isEmptyOrNull(goodsArr[i])) {
					continue;
				}
				Row row =new Row();
				String item[] =goodsArr[i].split("@");
				row.put("id", item[0]);
				row.put("num", item[1]);
				goodsDs.add(row);
			}
		}
		return goodsDs;
	}
	
	/**
	 * 计算订单总价格
	 * @param goodsDbList	数据库中商品的基本信息，需要从这个数据中取商品的价格进行计算
	 * @param cartGoodsList	购物车提交过来的商品数据列表，包含商品ID和购买数量
	 * @return
	 */
	public Double calOrderTotalMoney(DataSet goodsDbList,DataSet cartGoodsList)
	{
		Double totalMoney =new Double(0);
		if( goodsDbList == null ||  cartGoodsList == null )
		{
			return totalMoney;
		}
		for (int i = 0; i < cartGoodsList.size(); i++) {
			Row cartRow =(Row)cartGoodsList.get(i);
			String goodsId =cartRow.getString("id");
			Integer goodsNum =Integer.parseInt( cartRow.getString("num") );
			Double goodsPrice =getGoodsPrice(goodsDbList,goodsId);
			Double goodsTransFee =getGoodsTransFee(goodsDbList,goodsId);
			Double goodsMoney =goodsPrice*goodsNum;
			Double goodsTransMoney =goodsTransFee*goodsNum;
			totalMoney +=goodsMoney+goodsTransMoney;
		}
		BigDecimal bigDecimalMoney =new BigDecimal(totalMoney);
		totalMoney =bigDecimalMoney.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		return totalMoney;
	}
	
	/**
	 * 计算订单总运费
	 * @param goodsDbList	数据库中商品的基本信息，需要从这个数据中取商品的价格进行计算
	 * @param cartGoodsList	购物车提交过来的商品数据列表，包含商品ID和购买数量
	 * @return
	 */
	public Double calOrderTotalTransMoney(DataSet goodsDbList,DataSet cartGoodsList)
	{
		Double totalMoney =new Double(0);
		if( goodsDbList == null ||  cartGoodsList == null )
		{
			return totalMoney;
		}
		for (int i = 0; i < cartGoodsList.size(); i++) {
			Row cartRow =(Row)cartGoodsList.get(i);
			String goodsId =cartRow.getString("id");
			Integer goodsNum =Integer.parseInt( cartRow.getString("num") );
			Double goodsTransFee =getGoodsTransFee(goodsDbList,goodsId);
			Double goodsTransMoney =goodsTransFee*goodsNum;
			totalMoney +=goodsTransMoney;
		}
		BigDecimal bigDecimalMoney =new BigDecimal(totalMoney);
		totalMoney =bigDecimalMoney.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		return totalMoney;
	}
	
	/**
	 * 将购买数量添加到商品列表
	 * @param goodsDbList	数据库中商品的基本信息，需要从这个数据中取商品的价格进行计算
	 * @param cartGoodsList	购物车提交过来的商品数据列表，包含商品ID和购买数量
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public DataSet addCartNumToDbList(DataSet goodsDbList,DataSet cartGoodsList)
	{
		for (int i = 0; i < goodsDbList.size(); i++) 
		{
			Row dbRow =(Row)goodsDbList.get(i);
			String goodsId =dbRow.getString("id");
			String goodsNum =getGoodsNumFromCart( cartGoodsList, goodsId );
			dbRow.put("cart_num", goodsNum);
			goodsDbList.set(i, dbRow);
		}
		return goodsDbList;
	}
	
	/**
	 * 根据商品ID从数据库记录中取出商品的价格，如果有打折就取打折之后的价格，没有打折就取原价
	 * @param goodsDbList
	 * @param goodsId
	 * @return
	 */
	public Double getGoodsPrice(DataSet goodsDbList,String goodsId)
	{
		Double  price =0.0;
		if (goodsDbList == null || goodsDbList.size() == 0 ) {
			return price;
		}
		try
		{
			for (int i = 0; i < goodsDbList.size(); i++) 
			{
				Row row =(Row)goodsDbList.get(i);
				String id =row.getString("id");
				String rawPrice =row.getString("raw_price");
				String couponPrice =row.getString("coupon_price");
				String is_coupon =row.getString("is_coupon");
				if (goodsId.equals(id)) {
					if(! StringUtils.isEmptyOrNull(is_coupon) && is_coupon.equals("1"))
					{
						price =Double.parseDouble(couponPrice);
					}
					else
					{
						price =Double.parseDouble(rawPrice);
					}
				}
			}
		}catch(Exception exp)
		{
			logger.info("Exception =========================>>获取商品价格出错,可能是未设置订单价格或者设置了优惠但没有设置优惠价格\r");
			logger.info("Exception =========================>>"+ exp.getMessage());
			price =null;
		}
		return price;
	}
	
	/**
	 * 根据商品ID从数据库记录中取出商品的运费，如果有打折就取打折之后的价格，没有打折就取原价
	 * @param goodsDbList
	 * @param goodsId
	 * @return
	 */
	public Double getGoodsTransFee(DataSet goodsDbList,String goodsId)
	{
		Double  price =0.0;
		if (goodsDbList == null || goodsDbList.size() == 0 ) {
			return price;
		}
		try
		{
			for (int i = 0; i < goodsDbList.size(); i++) 
			{
				Row row =(Row)goodsDbList.get(i);
				String id =row.getString("id");
				String transFee =row.getString("trans_free");
				if (goodsId.equals(id)) {
					if(! StringUtils.isEmptyOrNull(transFee) )
					{
						price =Double.parseDouble(transFee);
					}
					else
					{
						price =new Double(0);
					}
				}
			}
		}catch(Exception exp)
		{
			logger.info("Exception =========================>>获取商品价格出错,可能是运费字段设置有错\r");
			logger.info("Exception =========================>>"+ exp.getMessage());
			price =null;
		}
		return price;
	}
	/**
	 * 根据商品ID从数据库记录中取出商品的积分
	 * @param goodsDbList
	 * @param goodsId
	 * @return
	 */
	public Integer getGoodsScore(DataSet goodsDbList,String goodsId)
	{
		Integer  price =0;
		if (goodsDbList == null || goodsDbList.size() == 0 ) {
			return price;
		}
		try
		{
			for (int i = 0; i < goodsDbList.size(); i++) 
			{
				Row row =(Row)goodsDbList.get(i);
				String id =row.getString("id");
				String score =row.getString("score");
				if (goodsId.equals(id)) {
					if(! StringUtils.isEmptyOrNull(score) )
					{
						price =Integer.parseInt(score);
					}
					else
					{
						price =0;
					}
				}
			}
		}catch(Exception exp)
		{
			logger.info("Exception =========================>>获取商品积分出错,可能是运费字段设置有错\r");
			logger.info("Exception =========================>>"+ exp.getMessage());
			price =null;
		}
		return price;
	}
	
	public String getGoodsNumFromCart(DataSet cartGoodsList,String goodsId)
	{
		String goodsNum ="";
		if(cartGoodsList == null || cartGoodsList.size() == 0 )
		{
			return goodsNum;
		}
		for (int i = 0; i < cartGoodsList.size(); i++) {
			Row cartRow =(Row)cartGoodsList.get(i);
			String id =cartRow.getString("id");
			if(id.equals(goodsId))
			{
				goodsNum =cartRow.getString("num");
				break;
			}
		}
		return goodsNum;
	}
	
	/**
	 * H5生成订单
	 * @param goodsDbList	数据库中商品的基本信息，需要从这个数据中取商品的价格进行计算
	 * @param cartGoodsList	购物车提交过来的商品数据列表，包含商品ID和购买数量
	 * @param userId		用户ID
	 * @param addressId		收货地址ID
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional(value="jdbcTransactionManager",propagation=Propagation.REQUIRED)
	public ResponseVO createH5Order(DataSet goodsDbList,DataSet cartGoodsList,
			String userId,String addressId)
	{
		ResponseVO ovo =new ResponseVO();
		Double totalMoney =new Double(0);
		Double totalTransMoney =new Double(0);
		Integer goodsTotalScore =0;
		Integer goodsTotalNum =0;
		if( goodsDbList == null ||  cartGoodsList == null )
		{
			return new ResponseVO(-1,"商品数据不能为空");
		}
		//创建订单
		Row orderRow =new Row();
		orderRow.put("user_id", userId);
		orderRow.put("create_time", DateUtil.getCurrentDateTime());
		orderRow.put("state", "0");//0待付款，1已付款未到账，2已到账待收货，3已收货4申请退款5退款未到账，6已退款,-1已取消
		orderRow.put("address_id", addressId);
		orderRow.put("order_message", "系统消息，尽快发货");
		String cur_time =DateUtil.getCurrentDate();
		String order_no =cur_time.replace("-", "").replace(" ", "").replace(":", "");
		int order_num =getOrderNumByDay(cur_time);
		if(order_num ==0)
		{
			order_num =10001;
		}
		else
		{
			order_num ++;
		}
		String order_num_str ="";
		if(order_num < 10)
		{
			order_num_str ="0000"+String.valueOf(order_num);
		}
		else if(order_num < 100)
		{
			order_num_str ="000"+String.valueOf(order_num);
		}
		else if(order_num < 1000)
		{
			order_num_str ="00"+String.valueOf(order_num);
		}
		else if(order_num < 10000)
		{
			order_num_str ="0"+String.valueOf(order_num);
		}
		else
		{
			order_num_str =String.valueOf(order_num);
		}
		order_no =order_no+order_num_str;
		orderRow.put("order_no", order_no);
		orderRow.put("order_type", "1");

		// order items 
		DataSet orderItemsDs =new DataSet();
		for (int i = 0; i < cartGoodsList.size(); i++) 
		{
			Row cartRow =(Row)cartGoodsList.get(i);
			String goodsId =cartRow.getString("id");
			Integer goodsNum =Integer.parseInt( cartRow.getString("num") );
			Double goodsPrice =getGoodsPrice(goodsDbList,goodsId);
			Double goodsTransFee =getGoodsTransFee(goodsDbList,goodsId);
			Double goodsMoney =goodsPrice*goodsNum;
			Double goodsTransMoney =goodsTransFee*goodsNum;
			totalTransMoney +=goodsTransMoney;
			totalMoney +=goodsMoney+goodsTransMoney;
			Integer goodsScore =getGoodsScore(goodsDbList,goodsId);
			goodsTotalScore +=goodsScore*goodsNum;
			goodsTotalNum +=goodsNum;
			
			Row itemRow =new Row();
			itemRow.put("goods_id", goodsId);
			itemRow.put("goods_num", goodsNum);
			itemRow.put("goods_price", goodsPrice);
			itemRow.put("goods_money",goodsMoney+goodsTransMoney );
			orderItemsDs.add(itemRow);
		}
		BigDecimal bigDecimalMoney =new BigDecimal(totalMoney);
		totalMoney =bigDecimalMoney.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		BigDecimal transBigDecimalMoney =new BigDecimal(totalTransMoney);
		totalTransMoney =transBigDecimalMoney.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		orderRow.put("money", totalMoney);
		orderRow.put("transfer_fee", transBigDecimalMoney);
		orderRow.put("score", goodsTotalScore);
		orderRow.put("total_goods_num", goodsTotalNum);
		insert(orderRow);
		String orderId =orderRow.getString("id");
		// insert order items to db and add order_id field
		for (int i = 0; i < orderItemsDs.size(); i++) 
		{
			Row itemsRow =(Row)orderItemsDs.get(i);
			itemsRow.put("order_id", orderId);
			orderItemService.insert(itemsRow);
		}
		ovo.put("order_no", order_no);
		ovo.put("order_id", orderId);
		return ovo;
	}
	
	public int calculateOrderScoreSum(DataSet goodsDbList,DataSet cartGoodsList)
	{
		int score =0;
		return score;
	}
}