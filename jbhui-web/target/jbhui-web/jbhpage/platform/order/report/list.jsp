<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>销售报表</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/list.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/datePicker/WdatePicker.js"></script>
<style type="text/css">
.moreTable th {
	width: 80px;
	line-height: 25px;
	padding: 5px 10px 5px 0px;
	text-align: right;
	font-weight: normal;
	color: #333333;
	background-color: #f8fbff;
}

.moreTable td {
	line-height: 25px;
	padding: 5px;
	color: #666666;
}

.promotion {
	color: #cccccc;
}
</style>
<script type="text/javascript">
var type="${type}";
var year="${year}";
var month="${month}";
var day="${day}";

$().ready(function() {

	${flash_message}
	var $listForm = $("#listForm");
	var $moreButton = $("#moreButton");
	var $filterSelect = $("#filterSelect");
	var $filterOption = $("#filterOption a");
	var $exportButton = $("#exportButton");
	var $queryButton = $("#queryButton");
	
	var $typeSelector = $("#type");
	var $yearBlockNavi = $("#year");
	var $monthBlockNavi = $("#month");
	var $dayBlockNavi = $("#day");

	
	// 更多选项
	$moreButton.click(function() {
		$.dialog({
			title: "更多选项",
			content:'<table id="moreTable" class="moreTable">'
					+'<tr>'
					+'<th>111:<\/th>'
					+'<td>'
					+'<select name="productCategoryId">'
					+'<option value="">请选择...<\/option>'
					+'<option value="1" selected="selected">11<\/option>'
					+'<option value="2" >22<\/option><option value="3" >33<\/option>'
					+'<\/select>'
					+'<\/td>'
					+'<\/tr>'
					+'<\/table>',
			width: 470,
			modal: true,
			ok: "ok",
			cancel: "cancel",
			onOk: function() {
				$("#moreTable :input").each(function() {
					var $this = $(this);
					$("#" + $this.attr("name")).val($this.val());
				});
				$listForm.submit();
			}
		});
	});
	
	// 商品筛选
	$filterSelect.mouseover(function() {
		var $this = $(this);
		var offset = $this.offset();
		var $menuWrap = $this.closest("div.menuWrap");
		var $popupMenu = $menuWrap.children("div.popupMenu");
		$popupMenu.css({left: offset.left, top: offset.top + $this.height() + 2}).show();
		$menuWrap.mouseleave(function() {
			$popupMenu.hide();
		});
	});
	
	// 筛选选项
	$filterOption.click(function() {
		var $this = $(this);
		var $dest = $("#" + $this.attr("name"));
		if ($this.hasClass("checked")) {
			$dest.val("");
		} else {
			$dest.val($this.attr("val"));
		}
		$listForm.submit();
		return false;
	});
	
	$exportButton.click(function(){
		
		exportExcel();
	});
	
	$typeSelector.change(function(){
		var typeValue =$typeSelector.val();
		//alert(typeValue);
		if(typeValue == "" )
		{
			
		}
		//day 
		else if(typeValue  == "1")
		{
			$yearBlockNavi.hide();
			$monthBlockNavi.hide();
			$dayBlockNavi.show();
		}
		else if(typeValue  == "2")
		{
			$yearBlockNavi.hide();
			$monthBlockNavi.show();
			$dayBlockNavi.hide();
		}
		else if(typeValue  == "3")
		{
			$yearBlockNavi.show();
			$monthBlockNavi.hide();
			$dayBlockNavi.hide();
		}
	});
	
	if(typeof type != "undefined" && type != null)
	{
		$typeSelector.val(type);
		if(type == "" )
		{
			
		}
		//day 
		else if(type  == "1")
		{
			$yearBlockNavi.hide();
			$monthBlockNavi.hide();
			$dayBlockNavi.show();
		}
		else if(type  == "2")
		{
			$yearBlockNavi.hide();
			$monthBlockNavi.show();
			$dayBlockNavi.hide();
		}
		else if(type  == "3")
		{
			$yearBlockNavi.show();
			$monthBlockNavi.hide();
			$dayBlockNavi.hide();
		}
	}
	
	$queryButton.click(function(){
		$listForm.submit();
	});

});

function exportExcel()
{
	var type=$("#type").val();
	var year=$("#year").val();
	var month=$("#month").val();
	var day=$("#day").val();
	var url ="<%=basePath%>/hslgpage/platform/order/report/export-excel.do?";
	url +="&type="+type;	
	url +="&year="+year;	
	url +="&month="+month;	
	url +="&day="+day;	
	window.open(url);
}

</script>
<style type="">
.navi-block {
height: 26px;
    line-height: 26px;
    display: inline-block;
    display: -moz-inline-stack;
    float: left;
    position: relative;
    padding: 0px 16px 0px 26px;
    margin-right: 10px;
    color: #444444;
    text-shadow: 1px 1px #ffffff;
    -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    outline: none;
    blr: expression(this.hideFocus = true);
    border: 1px solid #b7c8d9;
}
.nav-hidden {
display: none;
}
</style>
</head>
<body>
	<div class="path">
		订单管理 &raquo;销售报表
		<span><cc:message key="admin.page.total" args="${page.total}"/></span>
	</div>
	<form id="listForm" action="list.do" method="get">
		<div class="bar">
			<!--
			<a href="add.do" class="iconButton">
				<span class="addIcon">&nbsp;</span><cc:message key="admin.common.add" />
			</a>
			-->
			<div class="buttonWrap">
				<!-- 
				<a href="javascript:;" id="deleteButton" class="iconButton disabled">
					<span class="deleteIcon">&nbsp;</span><cc:message key="admin.common.delete" />
				</a>
				<a href="javascript:;" id="refreshButton" class="iconButton">
					<span class="refreshIcon">&nbsp;</span><cc:message key="admin.common.refresh" />
				</a>
				-->
				<!-- 
				<div class="menuWrap">
					<a href="javascript:;" id="filterSelect" class="button">
						筛选<span class="arrow">&nbsp;</span>
					</a>
					<div class="popupMenu">
						<ul id="filterOption" class="check">
							<li>
								<a href="javascript:;" name="SEX" val="0" <c:if test="${SEX == '1'}"> class="checked" </c:if> >男</a>
							</li>
							<li>
								<a href="javascript:;" name="SEX" val="1" <c:if test="${SEX == '2'}"> class="checked" </c:if> >女</a>
							</li>
							
						</ul>
					</div>
				</div>
				-->
				<div class="menuWrap">
					<!-- 
					<a href="javascript:;" id="pageSizeSelect" class="button">
						<cc:message key="admin.page.pageSize" /><span class="arrow">&nbsp;</span>
					</a>
					<div class="popupMenu">
						<ul id="pageSizeOption">
							<li>
								<a href="javascript:;" <c:if test="${page.pageSize == 10}">class="current"</c:if> val="10" >10</a>
							</li>
							<li>
								<a href="javascript:;" <c:if test="${page.pageSize == 20}">class="current"</c:if> val="20">20</a>
							</li>
							<li>
								<a href="javascript:;" <c:if test="${page.pageSize == 50}"> class="current"</c:if>val="50">50</a>
							</li>
							<li>
								<a href="javascript:;"  <c:if test="${page.pageSize == 100}">class="current"</c:if>val="100">100</a>
							</li>
						</ul>
					</div>
					-->
					<select id="type" name="type" class="navi-block">
						<option value="" selected>请选择类型...</option>
						<option value="1">日报表</option>
						<option value="2">月报表</option>
						<option value="3">年报表</option>
					</select>
					<!-- 
					<span class="navi-block">请选择时间：</span>
					-->
						<input id="year" name="year" class="navi-block Wdate nav-hidden" maxlength="200" value="${year }" onfocus="WdatePicker({dateFmt:'yyyy'});" />
					
						<input id="month" name="month" class="navi-block Wdate nav-hidden" maxlength="200" value="${month }" onfocus="WdatePicker({dateFmt:'yyyy-MM'});" />
					
						<input id="day" name="day" class="navi-block Wdate nav-hidden" maxlength="200" value="${day }" onfocus="WdatePicker();" />
					
					<a href="javascript:;" id="queryButton" class="iconButton">
						查询
					</a>
					<a href="javascript:;" id="exportButton" class="iconButton">
						<span class="refreshIcon">&nbsp;</span>导出数据
					</a>
				</div>
			</div>
			<div class="menuWrap">
				<div class="search">
					<span id="searchPropertySelect" class="arrow">&nbsp;</span>
					<input type="text" id="searchValue" name="searchValue" value="${page.searchValue}" maxlength="200" />
					<button type="submit">&nbsp;</button>
				</div>
				<div class="popupMenu">
					<ul id="searchPropertyOption">
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'NAME'}">class="current"</c:if> val="NAME">商品名称</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<table id="listTable" class="list">
			<tr>
				<!-- 
				<th class="check">
					<input type="checkbox" id="selectAll" />
				</th>
				-->
				<th>
					<a href="javascript:;" class="sort" name="NAME">商品名称</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="NUM">销售数量</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="MONEY">销售金额</a>
				</th>
			</tr>
			<c:forEach items="${page.content}" var="row" varStatus="status">
				<tr>
					<!-- 
					<td>
						<input type="checkbox" name="ids" value="${row.ID}" />
					</td>
					-->
					<td>
						<span title="${row.NAME}">${row.NAME}</span>
					</td>
					<td>
						<span title="${row.NUM}">${row.NUM}</span>
					</td>
					<td>
						<span title="${row.MONEY}">${row.MONEY}</span>
					</td>
				</tr>
			</c:forEach>
			<tr>
					<!-- 
					<td>
						<input type="checkbox" name="ids" value="${row.ID}" />
					</td>
					-->
					<td >
						汇总
					</td>
					<td>
						总金额：${total_money }
					</td>
					<td>
						总销售数量：${total_num }
					</td>
				</tr>
		</table>
		<%@ include file="/include/pagination.jsp" %> 
	</form>
</body>
</html>