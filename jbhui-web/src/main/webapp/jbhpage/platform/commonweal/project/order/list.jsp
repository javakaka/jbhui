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
<title>项目捐款订单列表</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/list.js"></script>
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
$().ready(function() {

	${flash_message}

	var $listForm = $("#listForm");
	var $moreButton = $("#moreButton");
	var $filterSelect = $("#filterSelect");
	var $filterOption = $("#filterOption a");
	
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

});
</script>
</head>
<body>
	<div class="path">
		订单管理 &raquo;项目捐款订单列表
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
				<a href="javascript:;" id="deleteButton" class="iconButton disabled">
					<span class="deleteIcon">&nbsp;</span><cc:message key="admin.common.delete" />
				</a>
				<a href="javascript:;" id="refreshButton" class="iconButton">
					<span class="refreshIcon">&nbsp;</span><cc:message key="admin.common.refresh" />
				</a>
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
							<a href="javascript:;" <c:if test="${page.searchProperty == 'ORDER_NO'}"> class="current"</c:if> val="ORDER_NO">订单编号</a>
						</li>
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'USERNAME'}">class="current"</c:if> val="USERNAME">用户名</a>
						</li>
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'TELEPHONE'}">class="current"</c:if> val="TELEPHONE">用户手机号</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<table id="listTable" class="list">
			<tr>
				<th class="check">
					<input type="checkbox" id="selectAll" />
				</th>
				<th>
					<a href="javascript:;" class="sort" name="ORDER_NO">订单编号</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="USERNAME">用户姓名</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="TELEPHONE">用户手机</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="MONEY">捐款金额(元)</a>
				</th>
				<!--
				<th>
					<a href="javascript:;" class="sort" name="RETURN_MONEY">退款金额</a>
				</th>
				-->
				<th>
					<a href="javascript:;" class="sort" name="PAY_STATE">支付状态</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="PAY_TYPE">支付方式</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="CREATE_TIME">创建时间</a>
				</th>
				<th>
					<span><cc:message key="admin.common.handle" /></span>
				</th>
			</tr>
			<c:forEach items="${page.content}" var="row" varStatus="status">
				<tr>
					<td>
						<input type="checkbox" name="ids" value="${row.ORDER_ID}" />
					</td>
					<td>
						<span title="${row.ORDER_NO}">${row.ORDER_NO}</span>
					</td>
					<td>
						<span title="${row.USERNAME}">${row.USERNAME}</span>
					</td>
					<td>
						<span title="${row.TELEPHONE}">${row.TELEPHONE}</span>
					</td>
					<td>
						<span title="${row.MONEY}">${row.MONEY}</span>
					</td>
					<td>
						<c:choose>
							<c:when test="${row.PAY_STATE == 0}">待付款</c:when>
							<c:when test="${row.PAY_STATE == 1}">已付款未到账</c:when>
							<c:when test="${row.PAY_STATE == 2}">已到账</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
					</td>
					<td>
						<c:choose>
							<c:when test="${row.PAY_TYPE == 1}">微信支付</c:when>
							<c:when test="${row.PAY_TYPE == 2}">支付宝支付</c:when>
							<c:when test="${row.PAY_TYPE == 3}">银联卡支付</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
					</td>
					<td>
						${row.CREATE_TIME}
					</td>
					<td>
					<!--
						<a href="edit.do?id=${row.ID}"><cc:message key="admin.common.edit" /></a>
						<a href="javascript:void(0);" onclick="openTabFromTopWindow('${row.ORDER_NO}','ORDER_NO')">明细</a>
						<a href="edit.do?id=${row.ID}"><cc:message key="admin.common.edit" /></a>-->
						<!--<a href="#" target="_blank"><cc:message key="admin.common.view" /></a>-->
					</td>
				</tr>
			</c:forEach>
		</table>
		<%@ include file="/include/pagination.jsp" %> 
	</form>
<script type="text/javascript">

function openTabFromTopWindow(searchValue,searchProperty)
{
	var url ="<%=basePath%>/hslgpage/platform/order/item/list.do";
	if(typeof searchValue != "undefined" && searchValue !="")
	{
		url +="?searchValue="+searchValue;
		if(typeof searchProperty != "undefined" && searchProperty !="")
		{
			url +="&searchProperty="+searchProperty;
		}
	}
	var title="订单明细";
	var tab_pic_index ='1';
	var tabId ='fun_nav_order_items_of_paimai';
	var tabIcon ="";
	var iFrame =top.frames["iframe"];
	iFrame.addadd(url,title,tabId,tabIcon);
}
</script>
</body>
</html>