<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品分类</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="">
<meta name="Description" content="">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/category2.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header header_flex" id="globalHeader" style="padding: 0px;">
<a id="topIconBack" class="left icon-back" href="javascript:window.history.go(-1);" data-tpa="H5_GLOBAL_ICON_GOBACK" data-trackersend="1"></a>
<h1>商品分类</h1>
</div>
<div id="container">
<div class="touchweb_page-goodsCategory">
<div class="tab_wrap">
	<!-- level 1 -->
	<div class="tab_title"   style="height: 635px;">
		<c:forEach items="${cate_list }" var="cate" varStatus="status">
			<c:if test="${cate.UP_ID == -1}">
				<a href="cate.do?cateId=${cate.ID }" class="item <c:if test="${selected_id == cate.ID }">cur</c:if>" title=" ${cate.TYPE_NAME }">
					<p><img src="<%=basePath %>res/jbh/resource/c1.png" alt=""></p> ${cate.TYPE_NAME }
				</a>
			</c:if>
		</c:forEach>
	</div>
<div class="tab_box"   style="height: 635px;">
	<div class="list cur">
		<c:forEach items="${cate_list }" var="cate" varStatus="status">
			<c:if test="${cate.UP_ID == selected_id && cate.LEVEL == 2 }">
			<div class="list_box">
			<a href="goods-list.do?cateId=${cate.ID }" class="title" title=" ${cate.TYPE_NAME }" >
			<h3>
			${cate.TYPE_NAME }
			</h3>
			<span class="icon-up_arrow_long arrow"></span>
			</a>
				<div class="box"  >
				<c:forEach items="${cate_list }" var="cateLevel3" varStatus="l3Status">
				<c:if test="${cateLevel3.UP_ID == cate.ID && cateLevel3.LEVEL == 3 }">
				<a href="goods-list.do?cateId=${ cateLevel3.ID}" class=" " title="${cateLevel3.TYPE_NAME }">
				<span> ${cateLevel3.TYPE_NAME }
				</span>
				</a>
				</c:if>
				</c:forEach>
				</div>
			</div>
			</c:if>
		</c:forEach>
	</div>
</div>
</div>
</div>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
</body>
</html>