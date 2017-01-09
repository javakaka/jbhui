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
<title>用户评价</title>
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
<link rel="stylesheet" href="<%=basePath %>res/jbh/resource/commentDetail.css">
<link rel="stylesheet" type="text/css" href="<%=basePath %>res/jbh/resource/public.css">
<link rel="stylesheet" href="<%=basePath %>res/jbh/resource/product-comment-no-reply.css">
</head>
<body >
<div class="touchweb-com_header detail" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="javascript:history.go(-1);" data-tpa="H5_GLOBAL_ICON_GOBACK" data-trackersend="1"></a>
<h1>我的评价</h1>
</div>

<div id="container">
<div class="touchweb_page-commentDetail">
<div class="tab">
<div class="tab-header">
<span id="tab-header-uncomment" class="cur">待评论</span>
<span id="tab-header-hascomment">已评论</span>
</div>
<div class="tab-body">
<div id="div_uncomment" currpage="1" totalcount="0">
<div class="pd_comment-wrap">
<div class="pd-_comment-no-reply">
<div class="pd-_comment-no-reply-icon"></div>
<div class="pd-_comment-no-reply-text">sorry，您还没有可评论的订单喔</div>
</div>
</div>
</div>
<div>
<div class="tab">
<div class="tab-body">
</div>
</div>
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