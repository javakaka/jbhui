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
<title>订单列表</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>res/jbh/resource/h5OrderList.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>res/jbh/resource/css/iscroll.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header header_flex" id="globalHeader">
<input type="hidden" name="status" id="status" value="${status }" />
	<a id="topIconBack" class="left icon-back" onclick="javascript:window.history.go(-1);" href="javascript:void(0);" ></a>
	<h1>订单列表</h1>
	<div class="rightBox" ></div>
</div>
<div class="myOrderContent">
	<ul class="tab">
		<li <c:if test="${status == 1 }">class="ac"</c:if> ><a href="<%=basePath %>user/order/list.do?status=1" >处理中<c:if test="${ !empty newTotalOrderNum}"><i>${newTotalOrderNum }</i></c:if></a></li>
		<li <c:if test="${status == 2 }">class="ac"</c:if> ><a href="<%=basePath %>user/order/list.do?status=2" >已取消<c:if test="${ !empty cancelTotalOrderNum}"><i>${cancelTotalOrderNum }</i></c:if></a></li>
		<li <c:if test="${status == 3 }">class="ac"</c:if> ><a href="<%=basePath %>user/order/list.do?status=3" >已完成<c:if test="${ !empty completeTotalOrderNum}"><i>${completeTotalOrderNum }</i></c:if></a></li>
	</ul>
	<div id="wrapper-order-list">
		<div id="scroller">
		  	<div id="pullDown" class="idle">
				<span class="pullDownIcon"></span>
				<span class="pullDownLabel">下拉更新...</span>
			</div>
	<!-- order list start -->
	<div class="order_change_con" id="order-list">
		<div class="package_detail">
			<p><em>2016-12-10</em><span class="amount">￥19.9</span></p>
			<a href="<%=basePath %>goods-detail.do?goodsId=1" class="items a_link">
				<ul>
					<li><img src="<%=basePath %>jbhpage/demo/resource/order-goods.jpg"></li>
				</ul>
				<span>1个包裹 (共1件)</span>
			</a>
			<div class="order_info">
				<div class="info">
					<span>订单号</span>
					<span>11226465023638</span>
				</div>
			</div>
			<div class="order_info">
				<div class="status">
					<em class="timer countDown"><i class="hour">23</i>:<i class="minute">46</i>:<i class="seconds">33</i></em>
					<a data-tpa="1490" href="<%=basePath %>user/order/detail.do?id=1" class="btn_pay">立即支付</a>
				</div>
			</div>
		</div>
	</div>
	<!-- order list end -->
	<div id="pullUp" class="idle">
		<span class="pullUpIcon"></span>
		<span class="pullUpLabel">上拉更新...</span>
	</div>
</div>
</div>
<!-- scroll end -->
</div>
<input type="hidden" value="4" id="type">
<input type="hidden" value="1" id="currentPage">
<input type="hidden" value="1" id="pageNums">
<input type="hidden" value="0" id="source">
<input type="hidden" value="0" id="o2oSign">
<span id="loadAll" style="display:none"></span>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/order-list.js"></script>
</body>
</html>