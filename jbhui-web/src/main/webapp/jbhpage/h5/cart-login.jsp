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
<title>购物车</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="购物车">
<meta name="Description" content="购物车">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>res/jbh/resource/cartNew.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>res/jbh/resource/css/iscroll.css" rel="stylesheet" type="text/css" />
</head>
<body >
<!-- h5 global top -->
<style type="text/css">
.order_warning {
	display:none;
}
.order_warning .warning_content {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 75%;
	text-align: center;
	background-color: #fff;
	z-index: 920;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.order_warning .warning_content .warning_title {
	line-height: 18px;
	padding: 30px 28px 0;
	font-size: 1.4rem;
	color: #333;
}
.order_warning .warning_content .warning_desc {
	line-height: 22px;
	padding: 0 28px;
	margin-top: 18px;
	font-size: 1.4rem;
	color: #333;
	white-space: nowrap;
}
.order_warning .warning_content .warning_desc span {
	display: block;
}
.order_warning .warning_content .warning_desc strong {
	color: #ff3c3c;
	font-weight: normal;
}
.order_warning .warning_content .warning_tip {
	line-height: 14px;
	margin-top: 10px;
	padding: 0 28px;
	font-size: 1.2rem;
	color: #999;
}
.order_warning .warning_content .order_detail {
	padding: 0 28px;
	margin-top: 38px;
}
.order_warning .warning_content .order_detail .detail_item {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	height: 34px;
	margin-top: 12px;
	border: 1px #e6e6e6 solid;
	text-align: center;
	border-radius: 5px;
}
.order_warning .warning_content .order_detail .detail_item .item_desc {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	line-height: 14px;
	padding-left: 10px;
	text-align: left;
}
.order_warning .warning_content .order_detail .detail_item .item_desc .price {
	display: block;
	padding-top: 4px;
	color: #ff3c3c;
	font-size: 1.2rem;
}
.order_warning .warning_content .order_detail .detail_item .item_desc .sort {
	display: block;
	color: #666;
	font-size: 0.9rem;
}
.order_warning .warning_content .order_detail .detail_item .button {
	display: block;
	width: 80px;
	line-height: 34px;
	margin-top: -1px;
	font-size: 1.2rem;
	color: #fff;
	background-color: #ff3c3c;
	border-radius: 5px;
}
.order_warning .warning_content .bottom_btn {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	height: 40px;
	line-height: 40px;
	margin-top: 20px;
}
.order_warning .warning_content .bottom_btn a {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	display: block;
	font-size: 1.4rem;
	color: #999;
	text-align: center;
	background-color: #f5f5f5;
}
.order_warning .mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 904;
}
</style>
<div id="container">
	<div class="layout_head">
		<div class="touchweb-com_header ">
			<a href="javascript:window.history.go(-1)" class="left icon-back"></a>
			<h1>购物车</h1>
			<div class="rightBox"></div>
		</div>
	</div>
	<div class="layout_body">
		<form method="post" action="" class="buycarForm" name="productForm" id="productForm">
		<div class="touchweb_page-shopCart">
			<div class="goods_box">
				<div class="goods_box-title">
					<label class="left">
					<!-- 
						<input type="checkbox" class="storeCheck check_box" checked="true">
						-->
						<a class="link" href="javascript:void(0);">商品列表</a>
					</label>
					<div class="right">
						<span class="cart_info">
						</span>
					</div>
				</div> 
				<div id="coupon_remind_-1" style="display:block"></div>
				<div class="goods_box-body">
				<div id="wrapper-cartgoods-list">
				  <div id="scroller">
					  	<div id="pullDown" class="idle">
							<span class="pullDownIcon"></span>
							<span class="pullDownLabel">下拉更新...</span>
						</div>
						<div class="product_list" id="goods-list">
						</div>
						
						<div id="pullUp" class="idle">
							<span class="pullUpIcon"></span>
							<span class="pullUpLabel">上拉更新...</span>
						</div>
					</div>
				</div>
					
				</div>
			</div>
		</div>
		</form>
	</div>
	<div class="layout_footer">
		<div class="normal">
			<label class="all_check" checked="true">
				<input type="checkbox" class="all_check check_box" checked="true">
				<br>
				<span>
				全选
				</span>
			</label>
			<div class="checkout_info">
				<span>
					<span class="price" id="total_price">
					¥
					</span>
					<br>
					<em>
					商品(不含运费)
					</em>
				</span>
			</div>
			<a href="javascript:;"  class="btn_checkout" id="total_goods_num" onclick="toOrderStep1()">结算</a>
		</div>
		<div class="edit">
			<label class="all_check" checked="true">
				<input type="checkbox" class="check_box all_check" checked="true">
				<span>
				全选
				</span>
			</label>
			<a href="javascript:;" class="btn_del">
			删除
			</a>
		</div>
		<input type="hidden" id="checkoutTypes" value="0" />
	</div>
</div>
<!-- 提示框 -->
<div id="page_alert_tip" style="display: none;">
	<div class="m_popup_wrap">
		<div class="title">
			<span id="page_alert_titletext">确认</span>
			<b id="page_alert_titleclose" class="close"></b>
		</div>
		<div class="text">
			<p id="page_alert_contenttext" style="overflow: auto; height: 60px;">确定从购物车中删除吗？</p>
		</div>
		<div class="btn_box">
			<a id="page_alert_cancel" class="btn_public btn_general" >取消</a>
			<a id="page_alert_close" class="btn_public btn_highlight">确定</a>
		</div>
	</div>
	<div class="m_popup_wrap_mask"></div>
</div>
<!-- 提示框 End-->
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/utils.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/cart.js"></script>
</body>
</html>