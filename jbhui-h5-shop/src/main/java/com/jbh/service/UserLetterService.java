package com.jbh.service;

import org.springframework.stereotype.Component;

import com.ezcloud.framework.page.jdbc.Page;
import com.ezcloud.framework.page.jdbc.Pageable;
import com.ezcloud.framework.service.JdbcService;
import com.ezcloud.framework.util.DateUtil;
import com.ezcloud.framework.vo.DataSet;
import com.ezcloud.framework.vo.Row;

/**   
 * @author shike001 
 * E-mail:510836102@qq.com   
 * @version 创建时间：2015-1-1 下午4:24:59  
 * 类说明:规则消息业务处理类 
 */
@Component("hslgUserLetterService")
public class UserLetterService extends JdbcService {

	public UserLetterService() 
	{
		
	}

	public int insert(Row row) 
	{
		int rowNum =0;
		int id =getTableSequence("hslg_user_letter", "id", 1);
		row.put("id", id);
		row.put("create_time", DateUtil.getCurrentDateTime());
		rowNum =insert("hslg_user_letter", row);
		return rowNum;
	}
	
	public Row findById(String id)
	{
		Row row =null;
		sql ="select * from hslg_user_letter where id='"+id+"'";
		row =queryRow(sql);
		return row;
	}
	
	public int update(Row row)
	{
		int rowNum =0;
		String id=row.getString("id");
		row.put("modify_time", DateUtil.getCurrentDateTime());
		update("hslg_user_letter", row, " id='"+id+"'");
		return rowNum;
	}
	
	/*********************************管理后台**********************************/
	/**
	 * 分页查询
	 * 
	 * @Title: queryPage
	 * @return Page
	 */
	public Page queryPage(Pageable pageable) {
		Page page = null;
		String sql ="select * from (select a.*,b.telephone as from_telephone,b.username as from_user, "
		+" c.telephone as to_telephone,c.username as to_user "
		+" from hslg_user_letter a  "
		+" left join hslg_users b on a.from_id =b.id "
		+" left join hslg_users c on a.to_id =c.id "
		+" ) as tab where 1=1 ";
		String restrictions = addRestrictions(pageable);
		String orders = addOrders(pageable);
		sql += restrictions;
		sql += orders;
		String countSql ="select count(*) from (select a.*,b.telephone as from_telephone,b.username as from_user, "
				+" c.telephone as to_telephone,c.username as to_user "
				+" from hslg_user_letter a  "
				+" left join hslg_users b on a.from_id =b.id "
				+" left join hslg_users c on a.to_id =c.id "
				+" ) as tab where 1=1 "; 
		countSql += restrictions;
		countSql += orders;
		long total = count(countSql);
		int totalPages = (int) Math.ceil((double) total / (double) pageable.getPageSize());
		if (totalPages < pageable.getPageNumber()) {
			pageable.setPageNumber(totalPages);
		}
		int startPos = (pageable.getPageNumber() - 1) * pageable.getPageSize();
		sql += " limit " + startPos + " , " + pageable.getPageSize();
		DataSet dataSet = queryDataSet(sql);
		page = new Page(dataSet, total, pageable);
		return page;
	}
	
	
	
	/**
	 * 删除
	 * 
	 * @Title: delete
	 * @param @param ids
	 * @return void
	 */
	public void delete(Long... ids) {
		String id = "";
		if (ids != null) {
			for (int i = 0; i < ids.length; i++) {
				if (id.length() > 0) {
					id += ",";
				}
				id += "'" + String.valueOf(ids[i]) + "'";
			}
			sql = "delete from hslg_user_letter where id in(" + id + ")";
			update(sql);
		}
	}
	
	/*********************************管理后台**********************************/
	
	public DataSet list(String user_id,String page,String page_size) {
		DataSet ds =null;
		int iStart =(Integer.parseInt(page)-1)*Integer.parseInt(page_size);
		String sql ="select a.id,a.title,a.summary,a.read_status,a.create_time "
		+" from hslg_user_letter a  "
		+" where a.to_id='"+user_id+"' "
		+ "order by a.create_time desc limit "+iStart+" , "+page_size;
		ds = queryDataSet(sql);
		return ds;
	}
	
}