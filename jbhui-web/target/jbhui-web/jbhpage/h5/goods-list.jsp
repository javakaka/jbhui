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
<title>商品列表</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="">
<meta name="Description" content="">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/index_new2.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header header_flex fixed" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="javascript:history.go(-1);" data-tpa="H5_GLOBAL_ICON_GOBACK" data-trackersend="1"></a>
<div id="searchBox" class="search_wrap" data-tpa="H5_GLOBAL_SEARCH">
<div class="search_box focus">
<form name="searchForm" id="searchForm" method="get" action="">
<input type="search" placeholder="搜索你想找的商品" name="keyword" id="keyword" class="search_txt" value="" data-original="" autocomplete="off">
<span class="icon-search"></span>
<span class="icon_back icon-back"></span>
<span class="icon_delete icon-delete" style="display: none;"></span>
</form>
</div>
<a class="btn_search" id="searchBtn" href="javascript:;">搜索</a>
<div class="touchweb_components-searchList" id="searchSuggest">
<div class="tags"></div>
<ul></ul>
<a class="clear_history" href="javascript:;">清除历史记录</a>
</div>
</div>
</div>
<div class="search_fixed_mask" id="searchMask"></div>
<div class="search_fixed_placeholder" style=""></div>
<div id="container">
<!-- cacheKey = -->
<input type="hidden" id="carId" style="display: none;">
<input type="hidden" id="globalId" style="display: none;">
<div class="touchweb_com-switchNav">
<ul>
<li class="cur"><i class="icon-sort_3"></i>列表视图</li>
<li class="big"><i class="icon-sort_big_pic_2"></i>图片视图</li>
</ul>
</div><div class="touchweb-com_searchListNavigation" data-tpa="H5_SEARCH_SORT">
<div class="wrap">
<ul class="nav-box ">
<li class="sort">综合排序<i></i></li>

<li class="" link="goods-detail.do?id=" data-tc="3.0.21.7.1"><input type="checkbox" id="bselfSupport" class="checkbox"><label for="selfSupport">包邮</label></li>
<li class="" link="goods-detail.do?id=" data-tc="3.0.21.a.1"><input type="checkbox" id="bselfSupport" class="checkbox"><label for="selfSupport">打折</label></li>
<li class="screening icon-filter_2"></li>
</ul>
<div class="pop-box">
<ul class="select" style="display: none;">
<li link="/search/c5265-0/p1-s1?virtualflag=1&amp;req.needMispellKw=0" class="cur" linktype="order_default">
<span>综合排序</span><i class="check"></i>
</li>
<li link="/search/c5265-0/p1-s2?virtualflag=1&amp;req.needMispellKw=0" linktype="order_sale">
<span>销量从高到低</span><i class="check"></i>
</li>
<li link="/search/c5265-0/p1-s3?virtualflag=1&amp;req.needMispellKw=0" linktype="order_price_up">
<span>价格从低到高</span><i class="check"></i>
</li>
<li link="/search/c5265-0/p1-s4?virtualflag=1&amp;req.needMispellKw=0" linktype="order_price_down">
<span>价格从高到低</span><i class="check"></i>
</li>
<li link="/search/c5265-0/p1-s5?virtualflag=1&amp;req.needMispellKw=0" linktype="commentNum_down">
<span>评论数从高到低</span><i class="check"></i>
</li>
</ul>
<input id="urlFilterNew" type="hidden" value="/search/fc5265-0/k/mb0-pr-a-d0-f0?virtualflag=1&amp;req.needMispellKw=0&amp;isFlowProduct=2">
<input id="urlFilterBrand" type="hidden" value="/search/lazyLoadBrand/fc5265-0/k/mb0-pr-a-d0-f0?virtualflag=1&amp;req.needMispellKw=0&amp;isFlowProduct=2">
<input id="urlFilterCates" type="hidden" value="/search/lazyLoadCates/fc5265-0/k/mb0-pr-a-d0-f0?virtualflag=1&amp;req.needMispellKw=0&amp;isFlowProduct=2">
</div>
</div>
</div><div class="touchweb_com-selectNav" data-tpa="H5_SEARCH_QUICK_FILTER">

<div class="content" style="display: none;">
<div class="inBox" id="contentCategory">
</div>
<div class="inBox brand" id="contentBrand" style="display: none;">
</div>
<div class="inBox" style="display: none;">
<ul class="attrBox">
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.565" data-tcs="SEARCH.0">办公零食<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.679" data-tcs="SEARCH.0">坚果<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.678" data-tcs="SEARCH.0">蜜饯<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.677" data-tcs="SEARCH.0">膨化食品<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.569" data-tcs="SEARCH.0">牛肉干<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.567" data-tcs="SEARCH.0">糕点<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.566" data-tcs="SEARCH.0">点心<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-tcd="COMMENT_TAG.680" data-tcs="SEARCH.0">奶酪/乳制品<i class="close_icon"></i></a>
</div>
</li>
</ul>
</div>
<div class="inBox" style="display: none;">
<ul class="attrBox">
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-id="attr_116108" data-tcd="a13.116108" data-tcs="SEARCH.0">罐装<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-id="attr_100608" data-tcd="a13.100608" data-tcs="SEARCH.0">袋装<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-id="attr_100611" data-tcd="a13.100611" data-tcs="SEARCH.0">礼盒装<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?id=" data-id="attr_100609" data-tcd="a13.100609" data-tcs="SEARCH.0">盒装<i class="close_icon"></i></a>
</div>
</li>
</ul>
</div>
</div>
</div>
<!-- 商品展示区 -->
<div class="touchweb-com_searchListBox ">
<ul data-tpa="H5_SEARCH_PRODUCT">
<li>
<a href="goods-detail.do?id=" class="item">
<div class="pic_box">
<img src="<%=basePath %>res/jbh/resource/goods1.jpg">
</div>
<div class="middle">
<div class="title_box">

齐云山 南酸枣糕 300g/袋
</div>
<div class="active_box">
</div>

</div>
<div class="price_box">
<span class="new_price">
<small>¥</small><i>12.8</i>
</span>
<span class="bug_car" categoryid="34743" pmid="962118" buynum="1" serial="0" isonekeygo="0" islpprod="0" isoversea="0" isyhd="1" todetail="0" merchantid="3" productid="40929" adlpurl="">
<i class="icon-shop_cart"></i>
</span>
</div>
</a>
<div data-tpa="H5_SEARCH_RECOMMEND" class="recommend-box" style="display: none;">
</div>
</li>
<div name="prom_theme_kits">
<!--促销 -->
<!--场景购 -->

<!--无线锦囊 -->
</div>
		<li>
			<a href="goods-detail.do?id=" class="item">
				<div class="pic_box">
						<img src="<%=basePath %>res/jbh/resource/goods2.jpg">
				</div>
				<div class="middle">
					<div class="title_box">
						
					SABAVA/沙巴哇综合蔬果干 180g 越南进口
					</div>
					<div class="active_box">
					</div>
						
				</div>
				<div class="price_box">
					<span class="new_price">
						<small>¥</small><i>12.9</i>
					</span>
							
						<span class="bug_car" categoryid="33786" pmid="6504016" buynum="1" serial="0" isonekeygo="0" islpprod="0" isoversea="0" isyhd="1" todetail="0" merchantid="3" productid="5482980" adlpurl="">
								<i class="icon-shop_cart"></i>
						</span>
				</div>
			</a>
			<div class="recommend-box" style="display: none;">
			</div>
		</li>
		<li>
			<a href="goods-detail.do?id=" class="item">
				<div class="pic_box">
						<img src="<%=basePath %>res/jbh/resource/goods3.jpg">
				</div>
				<div class="middle">
					<div class="title_box">
					天喔 盐津乌梅 无核 160g/瓶
					</div>
					<div class="active_box">
					</div>
						<div class="comment_box">
						<!-- 
								<span class="comment"><i class="icon-dialog"></i>12897</span>
								<span class="percentage"><i class="icon-good"></i>98%</span>
								-->
						</div>
				</div>
				<div class="price_box">
					<span class="new_price">
						<small>¥</small><i>12.8</i>
					</span>
						<span class="bug_car" categoryid="24564" pmid="14619648" buynum="1" serial="0" isonekeygo="0" islpprod="0" isoversea="0" isyhd="1" todetail="0" merchantid="3" productid="11639380" adlpurl="">
								<i class="icon-shop_cart"></i>
						</span>
				</div>
			</a>
			<div data-tpa="H5_SEARCH_RECOMMEND" class="recommend-box" style="display: none;">
			</div>
		</li>
		<li>
			<a href="goods-detail.do?id=" class="item">
				<div class="pic_box">
						<img src="<%=basePath %>res/jbh/resource/goods4.jpg">
						<span class="img_tag">多规格</span>
				</div>
				<div class="middle">
					<div class="title_box">
					天喔 韩话梅 无核 160g/瓶
					</div>
					<div class="active_box">
					</div>
				</div>
				<div class="price_box">
					<span class="new_price">
						<small>¥</small><i>9.8</i>
					</span>
						<span class="bug_car" categoryid="24564" pmid="14619653" buynum="2" serial="0" isonekeygo="0" islpprod="0" isoversea="0" isyhd="1" todetail="0" merchantid="3" productid="11639379" adlpurl="">
								<i class="icon-shop_cart"></i>
						</span>
				</div>
			</a>
			<div data-tpa="H5_SEARCH_RECOMMEND" class="recommend-box" style="display: none;">
			</div>
		</li>
			<a href="goods-detail.do?id=" class="item">
				<div class="pic_box">
						<img class="" src="<%=basePath %>res/jbh/resource/goods5.jpg">
				</div>
				<div class="middle">
					<div class="title_box">
						
					良品铺子 老婆梅140g/罐
					</div>
					<div class="active_box">
							
					</div>
						<div class="comment_box">
						<!-- 
								<span class="comment"><i class="icon-dialog"></i>2599</span>
								<span class="percentage"><i class="icon-good"></i>98%</span>
								 -->
						</div>
				</div>
				<div class="price_box">
					<span class="new_price">
						<small>¥</small><i>12.9</i>
					</span>
						<span class="bug_car" categoryid="24564" pmid="61417591" buynum="1" serial="0" isonekeygo="0" islpprod="0" isoversea="0" isyhd="1" todetail="0" merchantid="3" productid="52818802" adlpurl="">
								<i class="icon-shop_cart"></i>
						</span>
				</div>
			</a>
			<div class="recommend-box" style="display: none;">
			</div>
</ul>
</div>
<!-- loading -->
<div class="loading_banner" style="display: none;">
<div class="loading"></div>
</div>
<!--遮罩-->
<div class="searchList_mask" style="display: none;"></div>
<div class="touchweb_com-top" style="display:none;">
<a href="" class="go2top">已展示所有结果，点击返回顶部<i class="icon-up_arrow_small"></i></a>
</div>

<div class="addTip none">
<div class="in" id="addresult">
</div>
</div>
</div>
<div class="searchPageSide">
<a href="javascript:" class="top icon-down_arrow " style="display: none;"></a>
</div>
<div style="display:none;">
<span style="color: #FFFFFF">1718502</span>
<span style="color: #FFFFFF" id="span_server_time_tracker">20161207232059</span>
</div> 
<nav></nav>

<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>