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
<title>收货地址</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="收货地址">
<meta name="Description" content="收货地址">
<meta name="tp_page" content="CHECKOUT_H5_ADDRESS_EDIT.0">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/chooseAddress.css" rel="stylesheet" type="text/css">
</head>
<body >
<!-- h5 global top -->
<header class="titleHead clearfix">
<h2>选择收货地址</h2>
<button onclick="adressback()" class="backArrow"></button>
<a href="<%=basePath %>user/address/add.do" class="rightBtn cur" >新建地址</a>
<input type="hidden" id="errorMsg" value="">
<input type="hidden" id="errorMsgToCart" value="">
<input type="hidden" id="checkoutError" value="">
<input type="hidden" id="checkoutGoBack" value="">
<input type="hidden" id="lastProvinceId" value="0">
<input type="hidden" id="checkoutType" value="">
<input type="hidden" id="o2oMerchant" value="">
</header>
<div class="wrap chooseAddr mb">
<div class="whiteBodrBox radio mt">
<input class="addrIpt radioH5" type="radio" id="delivery1" name="chooseAddr" checked="" value="2">
<label class="addrCon">
<p>李明&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p>广东&nbsp;&nbsp;广州市&nbsp;&nbsp;</p>
<p>增城市</p>
<p>建设路11号</p>
<p> 1382*****36&nbsp;&nbsp;&nbsp;&nbsp;</p>
<ins class="none">112456083</ins>
</label>
<input type="hidden" name="provinceName" value="广东">
<input type="hidden" name="provinceId" value="20">
<input type="hidden" name="cityName" value="广州市">
<input type="hidden" name="cityId" value="237">
<input type="hidden" name="countyName" value="增城市">
<input type="hidden" name="countyId" value="2288">
<input type="hidden" name="address" value="建设路11号">
<input type="hidden" name="goodReceiverId" value="112456083">
<a href="<%=basePath %>user/address/edit.do?id=1" class="addrEdit" data-tpa="EDIT_ADDRESS"><i class="editIco">&gt;</i></a>
</div>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/address-list.js"></script>
</body>
</html>