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
<a href="" class="goback"></a>
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
<input type="hidden" name="fromid" value="1">
<input type="hidden" name="provinceId_temp2" id="provinceId_temp2">
<input type="hidden" name="goodReceiverId" value="-1">
<input type="hidden" name="grouponId" value="0">
<ul>
<li>
<input type="text" name="receiverName" id="receiverName" value="" placeholder="收货人姓名" maxlength="20">
</li>
<li>
<select id="provinceId" onchange="changeProvince(this.value)" class="province_select">
<option value="1">上海</option>
<option value="2">北京</option>
<option value="3">天津</option>
<option value="4">河北</option>
<option value="5">江苏</option>
<option value="6">浙江</option>
<option value="7">重庆</option>
<option value="8">内蒙古</option>
<option value="9">辽宁</option>
<option value="10">吉林</option>
<option value="11">黑龙江</option>
<option value="12">四川</option>
<option value="13">安徽</option>
<option value="14">福建</option>
<option value="15">江西</option>
<option value="16">山东</option>
<option value="17">河南</option>
<option value="18">湖北</option>
<option value="19">湖南</option>
<option value="20" selected="">广东</option>
<option value="21">广西</option>
<option value="22">海南</option>
<option value="23">贵州</option>
<option value="24">云南</option>
<option value="25">西藏</option>
<option value="26">陕西</option>
<option value="27">甘肃</option>
<option value="28">青海</option>
<option value="29">新疆</option>
<option value="30">宁夏</option>
<option value="32">山西</option>
</select>
<select name="cityName" onchange="changeCity(this.value)" id="cityId">
<option value="237" selected="">广州市</option>
<option value="238">深圳市</option>
<option value="239">珠海市</option>
<option value="240">汕头市</option>
<option value="241">韶关市</option>
<option value="242">佛山市</option>
<option value="243">江门市</option>
<option value="244">湛江市</option>
<option value="245">茂名市</option>
<option value="246">肇庆市</option>
<option value="247">惠州市</option>
<option value="248">梅州市</option>
<option value="249">汕尾市</option>
<option value="250">河源市</option>
<option value="251">阳江市</option>
<option value="252">清远市</option>
<option value="253">东莞市</option>
<option value="254">中山市</option>
<option value="255">潮州市</option>
<option value="256">揭阳市</option>
<option value="257">云浮市</option>
</select>
</li>
<li>
<select name="countyName" id="countyId">
<option value="2288">增城市</option>
<option value="31200">番禺区</option>
<option value="31202">越秀区</option>
<option value="31203">南沙区</option>
<option value="31204">天河区</option>
<option value="31205">从化区</option>
<option value="31206">荔湾区</option>
<option value="31210">白云区</option>
<option value="31211">海珠区</option>
<option value="31213">黄埔区</option>
<option value="31214">花都区</option>
<option value="32260">萝岗区</option>
</select>
</li>
<li>
<input type="text" name="address1" id="address1Id" value="" placeholder="详细地址" maxlength="100">
</li>
<li>
<input type="tel" name="receiverMobile" id="receiverMobile" value="" placeholder="手机">
</li>
<li>
<input type="tel" name="receiverPhone" id="receiverPhone" value="" placeholder="电话">
</li>
<li>
<p>
<span class="checkSeckKillAddr">是否设为常用地址</span>
<input type="checkbox" id="defaultAddr" name="defaultAddr" class="setdefaultaddress">
</p>
</li>
<input type="hidden" id="receiverId" value=""/>
<li><input type="submit" class="save" onclick="checksaveaddress()" value="保存" id="submitAddress"></li>
</ul>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>