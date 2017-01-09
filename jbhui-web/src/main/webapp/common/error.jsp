<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>出错啦</title>
<style type="text/css">
.error-page{
    text-align: center;
}
</style>
</head>
<body>
<div class="error-page">
	...............................<br/>
	****************出错啦 ***********<br/>
	<!-- 
	<c:forEach var="trace" items="${pageContext.exception.stackTrace}">
	<p>${trace}</p>
	</c:forEach>
	-->
	...............................<br/>
</div>
</body>
</html>