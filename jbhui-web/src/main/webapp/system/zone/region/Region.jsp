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
<title>辖区列表</title>
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
					+'<th>省份:<\/th>'
					+'<td>'
					+'<select id="province_id" name="province_id" onchange="queryCitiesByProvinceId(this)">'
					+'<option value="" selected>请选择...</option>'
					+'<c:forEach items="${province_list}" var="row" varStatus="status">'
					+'<c:choose> <c:when test="${row.ID == province_id}"><option value="${row.ID}" selected>${row.NAME}<\/option></c:when><c:otherwise><option value="${row.ID}" >${row.NAME}<\/option></c:otherwise></c:choose>'	
					+'</c:forEach>'
					+'<\/select>'
					+'城市:<select id="city_id_selector" name="city_id">'
					+'<option value="" selected>请选择...</option>'
					+'<c:forEach items="${city_list}" var="row" varStatus="status">'
					+'<c:choose> <c:when test="${row.ID == city_id}"><option value="${row.ID}" selected>${row.NAME}<\/option></c:when><c:otherwise><option value="${row.ID}" >${row.NAME}<\/option></c:otherwise></c:choose>'	
					+'</c:forEach>'
					+'<\/select>'
					+'<\/td>'
					+'<\/tr>'
					+'<\/table>',
			width: 470,
			modal: true,
			ok: "确定",
			cancel: "取消",
			onOk: function() {
				$("#moreTable :input").each(function() {
					var $this = $(this);
					$("#" + $this.attr("name")).val($this.val());
				});
				$listForm.submit();
			}
		});
	});
	
	// 筛选
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

function queryCitiesByProvinceId(obj)
{
		var $provinceNode =obj;
		var $cityNode =$("#city_id_selector");
		var url ="<%=basePath%>system/zone/province/queryCitiesByProId.do";
		var pro_id =$provinceNode.value;
		var params ={id:pro_id};
		$.ajax({
			url: url,
			type: "POST",
			data: params,
			dataType: "json",
			cache: false,
			beforeSend: function (XMLHttpRequest){
			},
			success: function(ovo, textStatus) {
				var code =ovo.code;
				if(code >=0)
				{
					var city_list =ovo.oForm.CITY_LIST;
					$cityNode.html("");
					var optHtml ='<option value="" >请选择...</option>';
					$.each(city_list,function(i,item){
						optHtml +='<option value='+item.ID+'>'+item.NAME+'</option>';
					});
					$cityNode.html(optHtml);
				}
				else
				{
					$.message("error",ovo.msg);
				}
			},
			complete: function (XMLHttpRequest, textStatus){
			},
			error: function (){
				$.message("error","处理出错");
			}
		});
}
</script>
</head>
<body>
	<div class="path">
		<cc:message key="framework.nav.index" /> &raquo;辖区列表
		<span><cc:message key="admin.page.total" args="${page.total}"/></span>
	</div>
	<form id="listForm" action="Region.do" method="get">
	<input type="hidden" id="state" name="state" value="<c:if test="${state !=''}">${state}</c:if>" />
	<input type="hidden" id="province_id" name="province_id" value="<c:if test="${province_id !=''}">${province_id}</c:if>" />
	<input type="hidden" id="city_id" name="city_id" value="<c:if test="${city_id !=''}">${city_id}</c:if>" />
		<div class="bar">
			<a href="add.do" class="iconButton">
				<span class="addIcon">&nbsp;</span><cc:message key="admin.common.add" />
			</a>
			<div class="buttonWrap">
				<a href="javascript:;" id="deleteButton" class="iconButton disabled">
					<span class="deleteIcon">&nbsp;</span><cc:message key="admin.common.delete" />
				</a>
				<a href="javascript:;" id="refreshButton" class="iconButton">
					<span class="refreshIcon">&nbsp;</span><cc:message key="admin.common.refresh" />
				</a>
				<div class="menuWrap">
					<a href="javascript:;" id="filterSelect" class="button">
						筛选<span class="arrow">&nbsp;</span>
					</a>
					<div class="popupMenu">
						<ul id="filterOption" class="check">
							<li>
								<a href="javascript:;" name="state" val="1" <c:if test="${state == '1'}"> class="checked" </c:if> >启用</a>
							</li>
							<li class="separator">
								<a href="javascript:;" name="state" val="0" <c:if test="${state == '0'}"> class="checked" </c:if> >停用</a>
							</li>
						</ul>
					</div>
				</div>
				<a href="javascript:;" id="moreButton" class="button">更多选项</a>
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
							<a href="javascript:;" <c:if test="${page.searchProperty == 'NAME'}"> class="current"</c:if> val="NAME">名称</a>
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
					<a href="javascript:;" class="sort" name="NAME">名称</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="PROVINCE">所属城市</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="STATE">状态</a>
				</th>
				<th>
					<span><cc:message key="admin.common.handle" /></span>
				</th>
			</tr>
			<c:forEach items="${page.content}" var="row" varStatus="status">
				<tr>
					<td>
						<input type="checkbox" name="ids" value="${row.ID}" />
					</td>
					<td>
						${row.NAME}
					</td>
					<td>
						${row.CITY}
					</td>
					<td>
						<c:choose>
							<c:when test="${row.STATE==1}">
								启用
							</c:when>
							<c:otherwise>
								停用
							</c:otherwise>
						</c:choose>
					</td>
					<td>
						<a href="edit.do?id=${row.ID}"><cc:message key="admin.common.edit" /></a>
					</td>
				</tr>
			</c:forEach>
		</table>
		<%@ include file="/include/pagination.jsp" %> 
	</form>
</body>
</html>