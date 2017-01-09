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
<title>爽乐购商城--商品详情</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="商品详情">
<meta name="Description" content="商品详情">
<meta name="ios" content="">
<meta name="android" content="">
<meta name="ipad" content="">
<meta name="h5" content="">
<link href="<%=basePath %>res/jbh/resource/site_normal.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/goods_detail.css" rel="stylesheet" type="text/css">
</head><body mycollectionplug="bind">
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
<h2 class="pd_product-title" id="pd_product-title" title="清风原木纯品系列2层150抽中幅抽取式面纸*(3+1)包"><a id="promotionLabelPic"> </a><span class=""></span>清风原木纯品系列2层150抽中幅抽取式面纸*(3+1)包</h2>
<h3 class="pd_product-subtitle" id="pd_product-subtitle" title="采用原生木浆；纸质细腻吸水性强；擦拭更舒适；无味纸巾；新老包装随机发货">采用原生木浆；纸质细腻吸水性强；擦拭更舒适；无味纸巾；新老包装随机发货</h3>
</div>
<a href="javascript:void(0);" class="pd_product-collect" id="pd_product-collect" data-tpa="H5_DETAIL_STOREUP" data-trackersend="1">
<span class="pd_product-collect-text pd_product-collect-text_not">收藏</span>
<span class="pd_product-collect-text pd_product-collect-text_yes">已收藏</span>
<span class="pd_product-collect-text" id="detailFavNums" nums="4786">1000
</span>
</a>
</div>
<div class="pd_product-price" id="current_price">

<span class="pd_product-price-yen">￥</span>
<strong class="pd_product-price-num">14</strong>
<span class="pd_product-price-decimal">.9</span>
<span class="tips tips_save" id="comparePcPrice" style="display:none;">
<span class="icon icon-cell_phone_2"></span>
</span>

<span class="pd_product-price-old" id="dingjinPreSellPrice">
</span>
</div>
<div id="dingjin_pay">
</div>
<div class="pd_product-medal-deals" style="display:none;">
此商品支持商家会员优惠
<a href="javascript:void(0);" class="pd_product-medal-deals-login" data-tpa="H5_DETAIL_XZ_LOGIN">登录查看</a>
</div>
<label class="pd_product-integral-buy" id="point" style="display:none;" data-tpa="H5_DETAIL_POINTS" data-trackersend="1">
<input type="checkbox" class="pd_product-integral-buy-check">
<span class="pd_product-integral-buy-text">积分购</span>
<span class="pd_product-integral-buy-price-box">
<span class="pd_product-integral-buy-price"></span>
</span>
<input type="hidden" autocomplete="off" id="pointNum" value="0">
</label>
<div id="pd_remain_msg" class="pd_area-not-sell" style="display: none;"></div>
<div id="pd_reserve_msg" class="pd_area-not-sell" style="display:none;"></div>
<a href="javascript:void(0);" id="pd_old-change-new" class="pd_old-change-new" style="display:none;" data-tpa="H5_DETAIL_FUBZ_EXCHANGE"></a>
<div id="dingjin_step">
</div>
<div class="pd_appointment-text" style="display:none;">
<div class="appointment_text" style="display:none;">
<span class="icon icon-history"></span>
距预约截止 还剩 <span class="num">11</span> 天 <span class="num">23</span> 小时
</div>
<div class="appointment_num" style="display:none;">
<span class="num">1988</span>人已预约
</div>
</div>
<div class="pd_product-promo-copy" style="display:none;" id="promoLabel"></div>
<!--<div class="pd_area-not-sell" id="showMessage" style="display:none;">本商品在当前区域不销售，请切换区域或选择其他商品</div>-->
<a href="javascript:;" class="pd_favorable-comment">
<span class="item">
100+条评论

</span>

</a>
</div> 
<div id="prod_args" class="pd_product-arguments " data-tpa="H5_DETAIL_SERIES_CHECK" data-trackersend="1">
<a href="javascript:;">
<span class="tip">请选择</span>
<span class="text">
</span>
<span class="arrow icon-right_arrow"></span>
</a>
</div>
<div class="pd_product-arguments show checkDetail" data-tpa="H5_DETAIL_FXPHONEPLAN" data-trackersend="1" id="phonePlanAttribute" style="display:none;">
<a href="javascript:;">
<span id="FXphoneplanDesc" class="text"></span>
<span class="arrow icon-right_arrow"></span>
</a>
</div>
<div class="pd_box-border">
<div class="pd_region-selection">
<div class="address" id="selectionAddress">
送货至 &nbsp;
<span class="name" id="h5ThreeAreas">广东<i></i>广州市<i></i>增城市<i></i></span>
</div>
<div id="stockDesc" class="desc">
现货，广州城区11:00前完成订单，预计当日送达
</div>
</div>
</div> </div>
<!--pd_multiple-business-->
<div class="pd_detail-tab">
<div class="tab">
<a href="javascript:;" class="item cur" data-tpa="H5_DETAIL_DESC" data-trackersend="1">图文详情</a>
<a href="javascript:;" class="item" data-tpa="H5_DETAIL_RULE" data-trackersend="1">规格参数</a>
<a href="javascript:;" class="item" data-tpa="H5_DETAIL_REVIEW" data-trackersend="1">评论
100+
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
					  		<table width="100%" cellspacing="0" cellpadding="0" border="0"> 
	   			<tbody> 
								    		<tr> 
			     			<td><img style="width: 750px;display: block;" src="<%=basePath %>res/jbh/resource/detail-goods2.png"></td> 
			    		</tr> 
									</tbody> 
			</table> 
				<div class="text"></div>
<style type="text/css">
	.mod_des .detail_box table .ull{}
	.mod_des .detail_box table .ull li{ font-size:16px; font-family:"微软雅黑";list-style:none; padding-top:3px; line-height:30px;}
	.mod_des .detail_box div.text{line-height: 1.2em;max-width:750px;word-wrap:break-word;}
</style> 

			
		<div class="text"></div>
			  		  					  	
		  		  			

			<div class="text"></div>
					  		 
				<div class="text"></div>
	<style type="text/css">
	.mod_des .detail_box table .ull{}
	.mod_des .detail_box table .ull li{ font-size:16px; font-family:"微软雅黑";list-style:none; padding-top:3px; line-height:30px;}
	.mod_des .detail_box div.text{line-height: 1.2em;max-width:750px;word-wrap:break-word;}
</style>
			<div class="text"></div>
					  		 
				<div class="text"></div>
	<style type="text/css">
	.mod_des .detail_box table .ull{}
	.mod_des .detail_box table .ull li{ font-size:16px; font-family:"微软雅黑";list-style:none; padding-top:3px; line-height:30px;}
	.mod_des .detail_box div.text{line-height: 1.2em;max-width:750px;word-wrap:break-word;}
</style>
			<div class="text"></div>
					  		 
				<div class="text"></div>
	<style type="text/css">
	.mod_des .detail_box table .ull{}
	.mod_des .detail_box table .ull li{ font-size:16px; font-family:"微软雅黑";list-style:none; padding-top:3px; line-height:30px;}
	.mod_des .detail_box div.text{line-height: 1.2em;max-width:750px;word-wrap:break-word;}
</style>
			<div class="text"></div>
					  		 
				<div class="text"></div>
	<style type="text/css">
	.mod_des .detail_box table .ull{}
	.mod_des .detail_box table .ull li{ font-size:16px; font-family:"微软雅黑";list-style:none; padding-top:3px; line-height:30px;}
	.mod_des .detail_box div.text{line-height: 1.2em;max-width:750px;word-wrap:break-word;}
</style>
			<div class="text"></div>
					  		 
				<div class="text"></div>
	</div></div>
<!-- parameter -->
<div class="pd_detail-tab-con parameter"><h3 class="pd_product-parameter-title">包装规格</h3><div class="pd_product-parameter-item"><label class="pd_product-parameter-item-title">总规格</label><span class="pd_product-parameter-item-desc">2层*150抽*(3+1)包</span></div><h3 class="pd_product-parameter-title">包装清单</h3><div class="pd_product-parameter-item"><span class="pd_product-parameter-item-desc">由于厂商产品批次不同，具体包装清单可能各有不同，请以实物为准 ！
</span></div><h3 class="pd_product-parameter-title">服务保障</h3><p class="pd_product-parameter-text">支持7天无理由退货</p></div>
<!-- comment -->
<div class="pd_detail-tab-con comment" data-load="0">
</div>
<!-- after_service -->
<div class="pd_detail-tab-con after_service"><div class="pd_detail-tab-con after_service" style="display: block;"><div class="quote"><p>本商品支持7天无理由退货</p><p>1号店承诺，商品因质量问题，自售出之日（以实际收货日期为准）起7日内可以退货，15日内可以换货，客户可与1号店的客服中心联系办理退换货事宜。</p></div><div class="quote"><h3>服务承诺</h3><p>网站所售产品均为厂商正品，如有任何问题可与我们客服人员联系，我们会在第一时间跟您沟通处理。我们将争取以更具竞争力的价格、更优质的服务来满足您最大的需求。开箱验货：请根据本页面开箱验货标准进行验收。如存在包装破损等影响签收的因素，请您可以拒收全部商品（包括赠品）；为了保护您的权益，建议您尽量不要委托他人代为签收；如由他人代为签收商品而没有在配送人员在场的情况下验货，则视为您所订购商品的包装无任何问题。</p><h3>温馨提示</h3><p>由于部分商品包装更换较为频繁，因此您收到的货品有可能与图片不完全一致，请您以收到的商品实物为准，同时我们会尽量做到及时更新，由此给您带来不便多多谅解，谢谢！</p></div></div></div>
<div class="pd_detail-tab-loading" style="display: none;">
<span></span>
</div>
</div> </div>
<!-- H5跳转APP -->

<div class="pd_product-buy-num show" id="product-buy-num">
<div class="pd_product-num-wrap">
<span class="pd_product-num-minus pd_product-num_disable" data-tpa="H5_DETAIL_AMOUNTSELECT" data-trackersend="1"></span>
<input class="pd_product-num-form" type="number" min="1" max="999" value="1" id="buycount" required="">
<span class="pd_product-num-plus" data-tpa="H5_DETAIL_AMOUNTSELECT" data-trackersend="1"></span>
</div>
<a href="javascript:;" class="pd_buy-now" id="buynow">立即购买</a>
<a href="javascript:;" class="pd_add-cart" id="reserve" style="display:none;">立即支付定金</a>
<a href="javascript:;" class="pd_add-cart" id="addcart">加入购物车</a>




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

<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
</body>
</html>