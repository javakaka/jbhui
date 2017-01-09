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
<title>运费调整</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="">
<meta name="Description" content="">

<link href="<%=basePath %>res/jbh/resource/global_site_cms.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/cmsh5.css" rel="stylesheet" type="text/css">
<style type="text/css">
#anchor_div4558580 .cms_page-rules .image{position:relative;display:block;margin:3.125%;padding-top:40%;overflow:hidden}
#anchor_div4558580 .cms_page-rules .image img{position:absolute;top:0;left:0;width:100%;height:auto}
#anchor_div4558580 .cms_page-rules .mod_title{height:26px;color:#000;font-size:1.2rem;line-height:26px}
#anchor_div4558580 .cms_page-rules .mod_rules{position:relative;width:100%;padding:0 10px 10px;-webkit-box-sizing:border-box;box-sizing:border-box}
#anchor_div4558580 .cms_page-rules .rules_con{height:35px;overflow:hidden;color:#666;font-size:1.2rem;line-height:18px}
#anchor_div4558580 .cms_page-rules .rules_con.show{height:auto}
#anchor_div4558580 .cms_page-rules .close{display:inline-block;position:relative;width:16px;height:16px;line-height:0;vertical-align:middle;text-align:center;display:block;position:absolute;right:0;top:10px;width:50px;height:50px;color:#ccc;font-size:1.6rem;line-height:50px;-webkit-transition:300ms;transition:300ms}
#anchor_div4558580 .cms_page-rules .close v{display:inline-block;width:8px;height:8px;margin:3px 0;border-top:2px solid #9c9c9c;border-right:2px solid #9c9c9c;vertical-align:middle}
#anchor_div4558580 .cms_page-rules .close v{-webkit-transform:rotate3d(0,0,1,135deg);-ms-transform:rotate3d(0,0,1,135deg);transform:rotate3d(0,0,1,135deg)}
#anchor_div4558580 .cms_page-rules .close.open{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}
<!-- webp 2.4.18以上 -->
</style>
</head>
<body>
<div id="div_globalHeadAppDown" class="touchweb_com-recommendApps" style="display:none" data-tpa="H5_HOMEPAGE_APPDOWN_NOTICE">
<img src="./tranfee-desc_files/new_download_app.png" alt="">
<div class="btns">
<a href="javascript:;" class="icon_close icon-clear" id="appdown-icon-close" data-trackersend="1"></a>
<a href="javascript:;" class="btn_download" id="openAppId" data-trackersend="1">点我下载APP</a>
</div>
</div><div class="touchweb-com_header header_flex" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="javascript:history.go(-1);" data-tpa="H5_GLOBAL_ICON_GOBACK" data-trackersend="1" data-ext-flag="1"></a>
<h1>运费调整</h1>
<div class="rightBox" data-tpa="H5_GLOBAL_ICON_RIGHTBOX" style="display: none;">
<a class="right" href="" data-tpa="H5_GLOBAL_ICON_GOTOCART" id="globalCart" data-ext-flag="1">
<i class="sumClass" style="display: none;"></i>
<span class="right_text icon-cart"></span>
</a>
<a class="right" href="javascript:;" id="globalMore" data-tpa="H5_GLOBAL_ICON_MORE" data-ext-flag="1">
<span class="right_text icon-more btn_more"></span>
</a>
</div></div>

<!-- start of cms -->
<div class="clothShop">
<!--header start 文字版header-->
<div id="h5_cms_page_expired" style="display:none" data-page-start="2016-05-27-00-00-00" data-page-end="2021-07-31-23-59-59">
<div class="pop_cms_activityExpired">
<div class="main">
<div class="pic_shop"></div>
<div class="title">很抱歉,您查看的活动已过期，别担心，我们还有更多</div>
<a href="index.html" class="back_index">返回首页</a>
</div>
</div>
</div><div id="cmsBgPath">
<div id="anchor_div4558580" showbegintime="" showendtime="" data-tpa="m4558580_2" data-ext-flag="1"><div class="cms_page-rules" id="cms_h5_rules_4558580">
<div class="mod_rules">
<!-- <h2 class="mod_title">活动规则：</h2> -->
<div class="rules_con show" isopen="1">
<p>北京、天津、上海、广东、江苏、浙江、安徽、湖北、福建、四川、重庆”满68包邮”；河北、山东满99包邮；全国其他区域满199包邮”。</p>
<p>
温馨提示：1、礼品卡单笔订单满500元免邮；2、自营订单具体配送时效及运费以结算页为准；3.自营订单的特色服务支持情况以结算页为准。</p>
<p>
普通商品</p>
<p>
运费：5元及以下, 5kg及以下,运费20元；5元以上, 50元及以下, 5kg及以下,运费10元；50元以上, 68元及以下, 5kg及以下,运费5元</p>
<p>
续重：1元/KG</p>
<p>
运费优惠：满68元，重量≤10kg 免运费；满136元，重量≤20kg 免运费</p>
<p>
以此类推</p>
<p>
生鲜商品</p>
<p>
运费：50元及以下, 5kg及以下,运费20元；50元以上, 99元及以下, 5kg及以下,运费10元</p>
<p>
续重：1元/KG</p>
<p>
运费优惠：满99元，重量≤10kg 免运费；满198元，重量≤20kg 免运费</p>
<p>
以此类推-
服装鞋帽
运费：满68元，重量≤10kg 免运费；满136元，重量≤20kg 免运费</p>
<p>
续重：1元/KG</p>
<p>
运费优惠：满68元，重量≤10kg 免运费；满136元，重量≤20kg 免运费</p>
<p>
以此类推</p>
<p>
名品特卖</p>
<p>
（特别说明：名品特卖的运费规则仅限自营商品，入驻商家按商家规定执行）</p>
<p>
运费：5元及以下, 5kg及以下,运费20元；5元以上, 50元及以下, 5kg及以下,运费10元；50元以上, 68元及以下, 5kg及以下,运费5元</p>
<p>
续重：1元/KG</p>
<p>
运费优惠：满68元，重量≤10kg 免运费；满136元，重量≤20kg 免运费</p>
<p>
以此类推</p>
<p>
</p>
</div>

</div>
</div></div>
</div>
<!-- end of cms -->
<script type="text/javascript" src="./tranfee-desc_files/dynamictime"></script>
<div class="touchweb_com-backTop ">
<a href="index.html"></a>
</div>
<nav></nav>
</div>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>