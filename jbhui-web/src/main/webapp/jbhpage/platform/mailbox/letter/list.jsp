<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String imgBasePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>用户消息列表</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/list.js"></script>
<script type="text/javascript">
$().ready(function() {
	${flash_message}
});
</script>
</head>
<body>
	<div class="path">
		收件箱 &raquo;用户消息列表
		<span><cc:message key="admin.page.total" args="${page.total}"/></span>
	</div>
	<form id="listForm" action="list.do" method="get">
		<div class="bar">
			<a href="add.do" class="iconButton">
				<span class="addIcon">&nbsp;</span><cc:message key="admin.common.add" />
			</a>
			<!--
			-->
			<div class="buttonWrap">
				<a href="javascript:;" id="deleteButton" class="iconButton disabled">
					<span class="deleteIcon">&nbsp;</span><cc:message key="admin.common.delete" />
				</a>
				<!--
				-->
				<a href="javascript:;" id="refreshButton" class="iconButton">
					<span class="refreshIcon">&nbsp;</span><cc:message key="admin.common.refresh" />
				</a>
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
							<a href="javascript:;" <c:if test="${page.searchProperty == 'FROM_USER'}"> class="current"</c:if> val="FROM_USER">发件人</a>
						</li>
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'TO_USER'}"> class="current"</c:if> val="TO_USER">收件人</a>
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
					<a href="javascript:;" class="sort" name="TO_USER">收件人</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="TITLE">标题</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="AUDIT_STATUS">审核状态</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="READ_STATUS">阅读状态</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="CREATE_TIME">发送时间</a>
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
						${row.TO_USER}
					</td>
					<td>
						${row.TITLE}
					</td>
					<td>
						<c:choose>
							<c:when test="${row.AUDIT_STATUS ==1}">
								待审核
							</c:when>
							<c:when test="${row.AUDIT_STATUS ==2}">
								审核通过
							</c:when>
							<c:when test="${row.AUDIT_STATUS ==0}">
								审核不通过
							</c:when>
							<c:when test="${row.AUDIT_STATUS == -1}">
								删除
							</c:when>
							<c:otherwise>
								--
							</c:otherwise>
						</c:choose>
					</td>
					<td>
						<c:choose>
							<c:when test="${row.READ_STATUS ==1}">
								已阅读
							</c:when>
							<c:when test="${row.READ_STATUS ==2}">
								未读
							</c:when>
							<c:otherwise>
								--
							</c:otherwise>
						</c:choose>
					</td>
					<td>
						${row.CREATE_TIME}
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