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
<title>用户中心</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="tp_page" content="5088.0">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/h5Index.css" rel="stylesheet" type="text/css">
</head>
<body mycollectionplug="bind">
<div class="touchweb-com_header header_flex" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="index.do"></a>
<h1>我的主页</h1>
</div>
<div class="mine_main_content">
<div class="desc">
<div class="img" style="background-image:url()"></div>
<div class="user_info">
<span>用户昵称：大森林</span>
<span>1382653****</span>
<!-- 
<ul>
<li onclick="gotoPoint();" id="pointItem" data-tpa="1444"><em>积分</em><i>0</i></li>
</ul>
-->
</div>
</div>
<ul>
<li><a id="myorder" href="user-order-list.html">我的订单<i>1</i></a></li>
<li><a id="myComment" href="user-comment.html">我的评论 </a></li>
<li><a id="myfav" href="user-collection-list.html">我的收藏<i>0</i></a></li>
<li><a id="myaddress" href="address-list.html">地址管理</a></li>
<li><a id="freightIntroductions" href="tranfee-desc.html">运费说明</a></li>
</ul>
<ul>
<!-- 
<li>
<a href="" data-tpa="1454">手机绑定
<em>
已绑定
</em>
</a>
</li>
-->
<li>
<a href="change-pwd.html" data-tpa="1455">修改密码
<em>
已绑定
</em>
</a>
</li>
</ul>
<a href="index.do" data-tpa="1456" class="logout">退出当前账户</a>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>