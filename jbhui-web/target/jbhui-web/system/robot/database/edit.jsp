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
<title>编辑数据库</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/input.js"></script>
<script type="text/javascript">
$().ready(function() {

	var $inputForm = $("#inputForm");
	
	[@flash_message /]
	
	// 表单验证
	$inputForm.validate({
		rules: {
			WIN_TARGET: "required"
		}
	});

});
</script>
</head>
<body>
	<div class="path">
		代码管理 &raquo; 编辑数据库
	</div>
	<form id="inputForm" action="update.do" method="post">
		<input type="hidden" name="id" class="text" value="${row.ID }" maxlength="200" />
		<table class="input">
			<tr>
				<th>
					<span class="requiredField">*</span>数据库类型:
				</th>
				<td>
					<select id="type" name="type" class="text" style="width:190px;" >
					<c:choose>
							<c:when test="${row.TYPE == 1}">
								<option value="" >请选择</option>
								<option value="1" selected>MySQL</option>
								<option value="2" >SqlServer</option>
								<option value="3" >Oracle</option>
							</c:when>
							<c:when test="${row.TYPE == 2}">
								<option value="" >请选择</option>
								<option value="1" >MySQL</option>
								<option value="2" selected>SqlServer</option>
								<option value="3" >Oracle</option>
							</c:when>
							<c:when test="${row.TYPE == 3}">
								<option value="" >请选择</option>
								<option value="1" >MySQL</option>
								<option value="2" >SqlServer</option>
								<option value="3" selected>Oracle</option>
							</c:when>
							<c:otherwise>
								<option value="" selected>请选择</option>
								<option value="1" >MySQL</option>
								<option value="2" >SqlServer</option>
								<option value="3" >Oracle</option>
							</c:otherwise>
						</c:choose>
					</select>
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>数据库名字:
				</th>
				<td>
					<input type="text" name="db_name" class="text" value="${row.DB_NAME }" maxlength="200" />
				</td>
			</tr>
			<tr>
				<th>
					&nbsp;
				</th>
				<td>
					<input type="submit" class="button" value="<cc:message key="admin.common.submit" />" />
					<input type="button" id="backButton" class="button" value="<cc:message key="admin.common.back" />" />
				</td>
			</tr>
		</table>
	</form>
</body>
</html>