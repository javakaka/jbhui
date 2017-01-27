<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${goods.NAME }--爽乐购商城</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="${goods.SUMMARY }--爽乐购商城">
<meta name="Description" content="${goods.SUMMARY }--爽乐购商城">
<meta name="ios" content="">
<meta name="android" content="">
<meta name="ipad" content="">
<meta name="h5" content="">
<link href="<%=basePath %>res/jbh/resource/site_normal.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/goods_detail.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header detail" id="globalHeader">
</div>
<div class="pd_product-wrap">
<div class="screen_slide">
	<div class="swipeSlide_wrap">
		<div class="swipeSlide_detail">
			<ul style="transition: all 0s ease; transform: translate3d(-12200px, 0px, 0px);">
				<li style="transition: all 0s ease; transform: translate3d(12200px, 0px, 0px);">
				<a href="javascript:void(0);">
				<img src="<%=basePath %>res/jbh/resource/detail-goods1.jpg" alt="">
				</a>
				</li>
			</ul>
		</div>
	</div>

	<div class="swipe_num">
		<span class="cur"></span><span class="sum"></span>
	</div>
</div>
<!-- pic -->
<div class="inner_wrapper">
<div id="dingjin_banner">
</div>
<div class="pd_box-border">
<div class="pd_product-title-wrap">
	<div class="pd_product-title-box">
		<h2 class="pd_product-title" id="pd_product-title" title="${goods.NAME }"><a id="promotionLabelPic"> </a><span class=""></span>${goods.NAME }</h2>
		<h3 class="pd_product-subtitle" id="pd_product-subtitle" title="${goods.SUMMARY }">${goods.SUMMARY }</h3>
	</div>
	<a href="javascript:void(0);" class="pd_product-collect" id="pd_product-collect" >
		<span class="pd_product-collect-text pd_product-collect-text_not">收藏</span>
		<span class="pd_product-collect-text pd_product-collect-text_yes">已收藏</span>
		<span class="pd_product-collect-text" id="detailFavNums" >${collectNum }</span>
	</a>
</div>
<div class="pd_product-price" id="current_price">
	<span class="pd_product-price-yen">￥</span>
	<strong class="pd_product-price-num">
	<c:if test="${goods.IS_COUPON == 1}">${goods.COUPON_PRICE }</c:if>
	<c:if test="${empty goods.IS_COUPON }">${goods.RAW_PRICE }</c:if>
	<c:if test="${ goods.IS_COUPON == 0 }">${goods.RAW_PRICE }</c:if>
	</strong>
	<span class="pd_product-price-decimal"></span>
	<span class="tips tips_save" id="comparePcPrice" style="display:none;">
	<span class="icon icon-cell_phone_2"></span>
	</span>
	<span class="pd_product-price-old" id="dingjinPreSellPrice"></span>
</div>
<div id="dingjin_pay">
</div>
<div class="pd_product-medal-deals" style="display:none;">
此商品支持商家会员优惠
<a href="javascript:void(0);" class="pd_product-medal-deals-login" >登录查看</a>
</div>
<label class="pd_product-integral-buy" id="point" style="display:none;" >
<input type="checkbox" class="pd_product-integral-buy-check">
<span class="pd_product-integral-buy-text">积分购</span>
<span class="pd_product-integral-buy-price-box">
<span class="pd_product-integral-buy-price"></span>
</span>
<input type="hidden" autocomplete="off" id="pointNum" value="0">
</label>
<div id="pd_remain_msg" class="pd_area-not-sell" style="display: none;"></div>
<div id="pd_reserve_msg" class="pd_area-not-sell" style="display:none;"></div>
<a href="javascript:void(0);" id="pd_old-change-new" class="pd_old-change-new" style="display:none;" ></a>
<div id="dingjin_step">
</div>
<div class="pd_appointment-text" style="display:none;">
<div class="appointment_text" style="display:none;">
<span class="icon icon-history"></span>
距预约截止 还剩 <span class="num">11</span> 天 <span class="num"></span> 小时
</div>
<div class="appointment_num" style="display:none;">
<span class="num"></span>人已预约
</div>
</div>
<div class="pd_product-promo-copy" style="display:none;" id="promoLabel"></div>
<a href="javascript:;" class="pd_favorable-comment">
	<span class="item">${judgeNum }条评论</span>
</a>
</div> 
<div id="prod_args" class="pd_product-arguments" >
<a href="javascript:;">
<span class="tip">请选择</span>
<span class="text">
</span>
<span class="arrow icon-right_arrow"></span>
</a>
</div>
<div class="pd_product-arguments show checkDetail" id="phonePlanAttribute" style="display:none;">
	<a href="javascript:;">
		<span id="FXphoneplanDesc" class="text"></span>
		<span class="arrow icon-right_arrow"></span>
	</a>
</div>
<div class="pd_box-border">
<c:if test="${!empty userAddressRow.ID }">
	<div class="pd_region-selection">
	<div class="address" id="selectionAddress">
	送货至 &nbsp;
	<span class="name" id="h5ThreeAreas">${userAddressRow.PROVINCE_NAME }<i></i>${userAddressRow.CITY_NAME }<i></i>${userAddressRow.REGION_NAME }<i></i></span>
	</div>
	<div id="stockDesc" class="desc">
	现货，三日内送达
	</div>
	</div>
</c:if>
</div> 
</div>
<!--pd_multiple-business-->
<div class="pd_detail-tab">
<div class="tab">
<a href="javascript:;" class="item cur" >图文详情</a>
<a href="javascript:;" class="item" >规格参数</a>
<a href="javascript:;" class="item" >评论
${judgeNum }
</a>
<a href="javascript:;" class="item">售后服务</a>
</div>
</div>
<div class="pd_detail-wrap" style="min-height: 529px;">
<!-- desc -->
<div id="descTab" class="pd_detail-tab-con desc">
<div id="specialQualify"></div>
<style type="text/css">
img{max-width:none;}
.leftBckBtn{position:absolute; display:block; width:110px; height:70px; line-height:70px; left:-15px; top:-10px; text-indent:20px; text-decoration:none; font-size:28px;
}
</style>
<div id="rxDescPic" style="display:none;max-width:100%;text-align:center;"></div>
<div id="haigouDescPic" style="display:none;max-width:100%;text-align:center;"></div>
<div id="proTxtImg" class="proTxtImg" style="zoom: 1.6039;">
<style type="text/css">
	.mod_des .detail_box table .ull{}
	.mod_des .detail_box table .ull li{ font-size:16px; font-family:"微软雅黑";list-style:none; padding-top:3px; line-height:30px;}
	.mod_des .detail_box div.text{line-height: 1.2em;max-width:750px;word-wrap:break-word;}
</style>
	<div class="text"></div>
	<div>${goods.DETAIL }</div>
</div>
<!-- parameter -->
<div class="pd_detail-tab-con parameter">
	<h3 class="pd_product-parameter-title">包装规格</h3>
	<div class="pd_product-parameter-item">
	<label class="pd_product-parameter-item-title">总规格</label>
	<span class="pd_product-parameter-item-desc">2层*150抽*(3+1)包</span>
	</div>
	<h3 class="pd_product-parameter-title">包装清单</h3>
	<div class="pd_product-parameter-item">
	<span class="pd_product-parameter-item-desc">由于厂商产品批次不同，具体包装清单可能各有不同，请以实物为准 ！</span>
	</div>
	<h3 class="pd_product-parameter-title">服务保障</h3>
	<p class="pd_product-parameter-text">支持7天无理由退货</p>
</div>
<!-- comment -->
<div class="pd_detail-tab-con comment" data-load="0">
</div>
<!-- after_service -->
<div class="pd_detail-tab-con after_service">
	<div class="pd_detail-tab-con after_service" style="">
	<div class="quote"><p>本商品支持7天无理由退货</p></div>
	</div>
</div>
<div class="pd_detail-tab-loading" style="display: none;">
<span></span>
</div>
</div> </div>
<!-- H5跳转APP -->
<div class="pd_product-buy-num show" id="product-buy-num">
<div class="pd_product-num-wrap">
<span class="pd_product-num-minus pd_product-num_disable"  id="minusBtn"></span>
<input class="pd_product-num-form" type="number" min="1" max="999" value="1" id="buycount" required="">
<span class="pd_product-num-plus" id="plusBtn"></span>
</div>
<a href="javascript:buyNow();" class="pd_buy-now" id="buynow">立即购买</a>
<a href="javascript:;" class="pd_add-cart" id="reserve" style="display:none;">立即支付定金</a>
<a href="javascript:addToShopCar(this);" class="pd_add-cart" id="addcart">加入购物车</a>
<div class="tips_purchase" style="display:none;">
<span class="icon_close icon-clear"></span>
</div>
</div>
<div class="pd_pop-text pd_pop-fast-add-cart"></div>
<div class="pd_pop-text pd_pop-text-add-cart"></div>
<div class="pd_product-property" id="sku_unit">
<div class="pd_product-property-info">
<div class="pd_product-property-pic">
<img src="" width="70" height="70" alt="">
</div>
<div class="pd_product-property-title-wrap">
<div class="pd_product-property-title">清风原木纯品系列2层150抽中幅抽取式面纸*(3+1)包</div>
<div class="pd_product-property-price">
<span class="price" id="pd_product-property-price-num">￥14.9</span>
<span class="desc" id="pd_product-property-price-save"></span>
</div>
<div class="pd_product-property-price" id="pd_product-property-integral-price" style="display: none;"></div>
</div>
</div>
<div class="property-wrapper">
</div>
<a href="javascript:;" class="property-close">
<span class="icon-clear"></span>
</a>
</div>
<div class="pd_product-property_mask"></div>
<div id="contractPlanDetail_area" class="pd_set_meal_wrap hide">
<h2 class="head">套餐详情</h2>
<div class="inner">
</div>
<div class="btn_box">
<a href="javascript:;" class="btn">确认</a>
</div>
</div>
<div class="pd_showpic">
<div class="touchweb-com_header">
<a href="javascript:;" class="left icon-back"></a>
<h1><span class="num">1</span>/<span class="sum">5</span></h1>
</div>
<div class="swipeSlide">
	<ul>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
	</ul>
</div>
</div> 
<div class="pd_back-top show">
	<a class="icon_back-top icon-back" href="javascript:void(0);"></a>
</div>
<div class="prepares_sell_tips" id="weixinpopup">
<div class="text"></div>
<div class="btn"></div>
<div class="arrow"></div>
</div>
<div class="touchweb_components-provinceSwitch">
<div class="provinceSwitch_body">
<div class="switch_head">
<a href="javascript:;" class="head_item">
<span class="con_detail" tag-index="1" id="tabs_province" data-id="20">广东</span>
</a>
<a href="javascript:;" class="head_item">
<span class="con_detail" tag-index="2" id="tabs_city" data-id="237">广州市</span>
</a>
<a href="javascript:;" class="head_item cur">
<span class="con_detail cur" tag-index="3" id="tabs_town" data-id="2288">增城市</span>
</a>
</div>
<div class="switch_con">
<div class="detail_wrap">
<div class="detail_box" tag-index="1">
<a class="con_item" href="javascript:void(0);" data-id="2">北京</a>
<a class="con_item" href="javascript:void(0);" data-id="3">天津</a>
<a class="con_item" href="javascript:void(0);" data-id="4">河北</a>
<a class="con_item" href="javascript:void(0);" data-id="32">山西</a>
<a class="con_item" href="javascript:void(0);" data-id="8">内蒙古</a>
<a class="con_item" href="javascript:void(0);" data-id="1">上海</a>
<a class="con_item" href="javascript:void(0);" data-id="5">江苏</a>
<a class="con_item" href="javascript:void(0);" data-id="6">浙江</a>
<a class="con_item" href="javascript:void(0);" data-id="13">安徽</a>
<a class="con_item" href="javascript:void(0);" data-id="14">福建</a>
<a class="con_item" href="javascript:void(0);" data-id="16">山东</a>
<a class="con_item select" href="javascript:void(0);" data-id="20">广东</a>
<a class="con_item" href="javascript:void(0);" data-id="21">广西</a>
<a class="con_item" href="javascript:void(0);" data-id="22">海南</a>
<a class="con_item" href="javascript:void(0);" data-id="15">江西</a>
<a class="con_item" href="javascript:void(0);" data-id="17">河南</a>
<a class="con_item" href="javascript:void(0);" data-id="18">湖北</a>
<a class="con_item" href="javascript:void(0);" data-id="19">湖南</a>
<a class="con_item" href="javascript:void(0);" data-id="7">重庆</a>
<a class="con_item" href="javascript:void(0);" data-id="12">四川</a>
<a class="con_item" href="javascript:void(0);" data-id="23">贵州</a>
<a class="con_item" href="javascript:void(0);" data-id="24">云南</a>
<a class="con_item" href="javascript:void(0);" data-id="25">西藏</a>
<a class="con_item" href="javascript:void(0);" data-id="26">陕西</a>
<a class="con_item" href="javascript:void(0);" data-id="27">甘肃</a>
<a class="con_item" href="javascript:void(0);" data-id="28">青海</a>
<a class="con_item" href="javascript:void(0);" data-id="30">宁夏</a>
<a class="con_item" href="javascript:void(0);" data-id="29">新疆</a>
<a class="con_item" href="javascript:void(0);" data-id="9">辽宁</a>
<a class="con_item" href="javascript:void(0);" data-id="10">吉林</a>
<a class="con_item" href="javascript:void(0);" data-id="11">黑龙江</a>
</div>
</div>
<div class="detail_wrap">
<div class="detail_box" tag-index="2" id="mod_address_city">		 <a class="con_item select" href="javascript:void(0);" data-id="237">广州市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="238">深圳市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="239">珠海市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="240">汕头市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="241">韶关市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="242">佛山市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="243">江门市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="244">湛江市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="245">茂名市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="246">肇庆市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="247">惠州市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="248">梅州市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="249">汕尾市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="250">河源市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="251">阳江市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="252">清远市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="253">东莞市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="254">中山市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="255">潮州市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="256">揭阳市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="257">云浮市</a>
</div>
</div>
<div class="detail_wrap active">
<div class="detail_box" tag-index="3" id="mod_address_town">		 <a class="con_item select" href="javascript:void(0);" data-id="2288">增城市</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31200">番禺区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31202">越秀区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31203">南沙区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31204">天河区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31205">从化区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31206">荔湾区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31210">白云区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31211">海珠区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31213">黄埔区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="31214">花都区</a>
		 <a class="con_item" href="javascript:void(0);" data-id="32260">萝岗区</a>
</div>
</div>
</div>
</div>
<div class="layer_mask"></div>
</div><div class="subscribe hide">
<div class="sub_body hide">
<div class="title">订阅到货通知</div>
<div class="product">
<div class="product_img">
<img id="arrivalNoticePic">
</div>
<div class="product_desc">
<div class="name" id="arrivalNoticeTitle"></div>
<div class="price">¥<span id="arrivalNoticePrice"></span></div>
</div>
</div>
</div>
<div class="subscribe_notice hide"><i class="icon-successful"></i> 订阅成功</div>
</div>
<nav></nav>
<input type="hidden" name="goods_left_num" id="goods_left_num" value="${goods.LEFT_NUM }"/>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/utils.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/goods-detail.js"></script>
</body>
</html>