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
<title>编辑配送员</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/input.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript">
$().ready(function() {
	var $inputForm = $("#inputForm");
	
	${flash_message}
	// 表单验证
	$inputForm.validate({
		rules: {
			
			TELEPHONE:"required",
			TELEPHONE: {
				required: true
			},
			NAME: {
				required: true
			},
		},
		messages:{
			TELEPHONE:{
				required: "手机号码不能为空"
			},
			NAME:{
				required: "用户名不能为空",
			}
		}
	});
	
});
</script>
</head>
<body>
	<div class="path">
		订单管理 &raquo; 编辑配送员
	</div>
	<form id="inputForm" action="update.do" method="post">
		<input type="text" name="ID" class="text" maxlength="200" value="${row.ID }" />
		<table class="input">
			<tr>
				<th>
					<span class="requiredField">*</span>姓名:
				</th>
				<td>
					<input type="text" name="NAME" class="text" maxlength="200" value="${row.NAME }" />
				</td>
			</tr>
			<tr>
				<th>
					<span class="requiredField">*</span>手机号码:
				</th>
				<td>
					<input type="text" name="TELEPHONE" class="text" maxlength="200" value="${row.TELEPHONE }" />
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