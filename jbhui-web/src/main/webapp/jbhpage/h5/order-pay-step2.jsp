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
<title>订单完成页</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/h5OrderFinish.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header header_flex" id="globalHeader">
<a id="topIconBack" class="left icon-back" href=""></a>
<h1>订单已生成</h1>
<div class="rightBox">
<a href="<%=basePath%>/user/order/detail.do?id=${order.ID}" class="right" id="orderDetail" >
<span class="right_text rbtn"></span>
<span class="icon_text">查看订单</span>
</a>
</div></div>
<div class="modPoint cartHeadYelw">
<!--银行转账 -->
订单将保留48小时，请在<span class="deepRed">48小时内内完成付款</span>，祝您购物愉快！
</div>
<!--start 订单已生成-->
<div class="layoutMain">
<span class="layoutTop"></span>
<div class="layoutContent">
<div class="modOrder">
<a  href="<%=basePath%>/user/order/detail.do?id=${order.ID}" >
<p>订单编号：${order.ORDER_NO }</p>
<p class="mt5">包裹数：1
个
</p>
<p class="mt5">商品数：${order.TOTAL_GOOD_NUM }个</p>
<p class="mt5">
待支付金额：
<span class="deepRed">
¥<em>${order.MONEY }</em>
</span>
</p>
<i class="greyRightArrow">&gt;</i>
</a>
</div>
<div class="modDefray">
<p class="payment relative">
<!-- 
<a href="order-pay-s2-select.html">
-->
<a href="javascript:;">
<!--支付那边没有对微信屏蔽支付宝国际，我们先做一个兼容，到时候这个可以删除-->
<input type="hidden" id="selectDefaultPayMethod" bankcardtype="" paysignno="" gatewaycode="alipay">
<span class="modShortSlct greenLnk fr">
微信
</span>
支付方式：微信支付
</a>
<!-- 
<i class="greyRightArrow">&gt;</i>
-->
<i class="greyRightArrow"></i>
</p>
<br>
<br>
<br>
<div class="pages_nextprev">
	<a id="h5OrderFinishGoPay"  href="javascript:goPay('0',this);">
		<p class="floatListMore mt">立即支付</p>
	</a>
</div>
</div>
</div>
<input id="orderId" type="hidden" value="11226465023638">
<input id="orderCode" type="hidden" value="11226465023638">
<span class="layoutFooter"></span>
</div>
<div class="touchweb_page-payCompleted">
<p class="tips">请您在收货时确认商品后再签收，祝您购物愉快，谢谢！</p>
<!--2: 货到付款 5:pos机 12:货到刷支付宝 4: 银行转账 14:货到刷斯玛特卡、杉德卡-->

</div>
<div class="y_dialog y_dialogPlain pop_payments_confirm">
<div class="y_dialogMain">
<h2 class="y_dialogTitle">支付确认</h2>
<div class="y_dialogContent">
<p>1.请在微信内完成支付，如果您已支付成功，请点击“已完成支付”按钮</p>
<p>2.如果您还未安装微信6.0.2及以上版本客户端，请点击“取消”并选择其它支付方式付款</p>
</div>
<div class="y_dialogButtonGroup">
	<a href="javascript:;" class="y_button y_button-line y_buttonPlain y_dialogClose btn_cancel">取消</a>
	<a href="javascript:;" class="y_button btn_confirm">完成支付</a>
</div>
</div>
</div>
<div class="pop_payments_not" style="display:none;">您的订单还未完成支付，请重新支付。</div>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/utils.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/order-pay-step3.js"></script>
</body>
</html>