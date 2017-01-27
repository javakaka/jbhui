<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>空购物车</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="购物车">
<meta name="Description" content="购物车">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/cart.css" rel="stylesheet" type="text/css">
</head>
<body >
<div id="div_globalHeadAppDown" class="touchweb_com-recommendApps" style="display:none" data-tpa="H5_HOMEPAGE_APPDOWN_NOTICE">
<img src="./cart-logout_files/new_download_app.png" alt="">
<div class="btns">
<a href="javascript:;" class="icon_close icon-clear" id="appdown-icon-close" data-trackersend="1"></a>
<a href="javascript:;" class="btn_download" id="openAppId" data-trackersend="1">点我下载APP</a>
</div>
</div><div class="touchweb-com_header header_flex" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="javascript:history.go(-1);" data-tpa="H5_GLOBAL_ICON_GOBACK" data-trackersend="1"></a>
<h1>购物车</h1>
<div class="rightBox" data-tpa="H5_GLOBAL_ICON_RIGHTBOX">

</div></div>
<div class="modGiftCard">
<span class="noCar"></span>
<p class="alignC">您的购物车内还没有任何商品<br>是否立即登录?</p>
<div class="mt mb alignC">
<a href="<%=basePath%>h5-login.do?redirect=<%=basePath%>cart.do&from_user=${from_user}" class="redBtn w48 h38">登录</a>
<a href="<%=basePath%>h5-register.do?from_user=${from_user}" class="deepGreyBtn w48 h38">注册</a>
</div>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
</body>
</html>