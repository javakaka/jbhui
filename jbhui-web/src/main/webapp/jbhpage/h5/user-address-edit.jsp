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
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/editAddress.css" rel="stylesheet" type="text/css">
</head>
<body>
<!-- h5 global top -->
<header>
<div class="leftBtns">
<a href="javascrpt:;" onclick="window.history.go(-1);" class="goback"></a>
<input type="hidden" id="errorCode" value="">
<input type="hidden" id="errorMsg" value="">
<input type="hidden" id="errorData" value="">
<input type="hidden" id="errorMsgToCart" value="">
<input type="hidden" id="checkoutGoBack" value="">
<input type="hidden" id="siteProvinceId" value="20">
<input type="hidden" id="needReInitOrder" value="1">
<input type="hidden" id="isEcardOrder" value="">
<input type="hidden" id="fastByPhoneFlag" value="">
<input type="hidden" id="fastBuyFlag" value="">
<input type="hidden" id="checkoutType" value="">
<input type="hidden" id="o2oMerchant" value="">
</div>
<h2>收货地址编辑 </h2>
<div class="rightBtns" onclick="checksaveaddress()"><div class="confirm">保存</div></div>
</header>
<!--header end-->
<div class="address_add_content">
<input type="hidden" name="fromid" value="1"/>
<input type="hidden" name="provinceId_temp2" id="provinceId_temp2"/>
<input type="hidden" name="goodReceiverId" value="-1"/>
<input type="hidden" name="grouponId" value="0"/>
<input type="hidden" name="addressId" value="${address.ID }" id="addressId" />
<ul>
<li>
<input type="text" name="receiverName" id="receiverName" value="${address.RECEIVE_NAME }" placeholder="收货人姓名" maxlength="20">
</li>
<li>
<select id="provinceId" onchange="changeProvince(this.value)" class="province_select">
	<option value="">请选择...</option>
	<c:forEach items="${province_list }" var="province" varStatus="status">
		<option value="${province.ID }">${province.NAME }</option>
	</c:forEach>
</select>
<script>
	var city_list =new Array();
	<c:forEach items="${city_list }" var="city" varStatus="status">
		var city_item =new Array(); 
		city_item.id ="${city.ID}";
		city_item.name ="${city.NAME}";
		city_item.provinceId ="${city.PROVINCEID}";
		city_list.push( city_item );
	</c:forEach>
	
	var zone_list =new Array();
	<c:forEach items="${zone_list }" var="zone" varStatus="status">
		var zone_item =new Array(); 
		zone_item.id ="${zone.ID}";
		zone_item.name ="${zone.NAME}";
		zone_item.cityId ="${zone.CITYID}";
		zone_list.push( zone_item );
	</c:forEach>
	console.log("---------------------->>" + zone_list.length);
</script>
<select name="cityName" onchange="changeCity(this.value)" id="cityId">
	<option value="" selected>请选择...</option>
</select>
</li>
<li>
<select name="zoneName" id="zoneId">
	<option value="" selected>请选择...</option>
</select>
</li>
<li>
<input type="text" name="address1" id="address1Id" value="${address.ADDRESS }" placeholder="详细地址" maxlength="100" >
</li>
<li>
<input type="tel" name="receiverMobile" id="receiverMobile" value="${address.RECEIVE_TEL }" placeholder="手机">
</li>
<li>
<p>
<span class="checkSeckKillAddr">是否设为常用地址</span>
<select id="defaultAddr">
	<option value="" >请选择...</option>
	<option value="1" <c:if test="${address.IS_DEFAULT == 1 }">selected</c:if> >是</option>
	<option value="0" <c:if test="${address.IS_DEFAULT == 0 }">selected</c:if> >否</option>
</select>
</p>
</li>
<input type="hidden" id="receiverId" value=""/>
<li><input type="submit" class="save" onclick="saveaddress()" value="保存" id="submitAddress"></li>
</ul>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" >
var curpage ="edit";
var curProvinceId ="${address.PROVINCE_ID}";
var curCityId ="${address.CITY_ID}";
var curZoneId ="${address.REGION_ID}";
</script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/edit-address.js"></script>
</body>
</html>