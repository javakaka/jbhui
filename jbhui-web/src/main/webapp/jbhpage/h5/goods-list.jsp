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
	<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css"/>
	<link href="<%=basePath %>res/jbh/resource/index_new2.css" rel="stylesheet" type="text/css"/>
	<link href="<%=basePath %>res/jbh/resource/footer.css" rel="stylesheet" type="text/css"/>
	<link href="<%=basePath %>res/jbh/resource/css/iscroll.css" rel="stylesheet" type="text/css"/>
</head>
<body >
<div class="touchweb-com_header header_flex fixed" id="globalHeader">
<a id="topIconBack" class="left icon-back" href="javascript:history.go(-1);" ></a>
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
<ul id="history_list">
<li><a class="link_text" href='javascript:goSearch("啤酒")'><span class="icon gicon-history"></span><span class="text">啤酒</span><span class="icon_arrow gicon-right_arrow"></span></a></li>
</ul>
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
</div><div class="touchweb-com_searchListNavigation">
<div class="wrap">
<ul class="nav-box ">
<li class="sort" id="orderBtn">综合排序<i></i></li>
<li class="" ><input type="checkbox" id="transFreeBtn" class="checkbox"><label for="selfSupport">包邮</label></li>
<li class="" ><input type="checkbox" id="discountBtn" class="checkbox"><label for="selfSupport">打折</label></li>
<!-- 
<li class="screening icon-filter_2"></li>
 -->
</ul>
<div class="pop-box">
<ul class="select" style="display: none;">
<li class="cur" linktype="order_default">
<span>综合排序</span><i class="check"></i>
</li>
<li linktype="order_sale">
<span>销量从高到低</span><i class="check"></i>
</li>
<li linktype="order_price_up">
<span>价格从低到高</span><i class="check"></i>
</li>
<li linktype="order_price_down">
<span>价格从高到低</span><i class="check"></i>
</li>
</ul>
<input id="urlFilterNew" type="hidden" value="/search/fc5265-0/k/mb0-pr-a-d0-f0?virtualflag=1&amp;req.needMispellKw=0&amp;isFlowProduct=2">
<input id="urlFilterBrand" type="hidden" value="/search/lazyLoadBrand/fc5265-0/k/mb0-pr-a-d0-f0?virtualflag=1&amp;req.needMispellKw=0&amp;isFlowProduct=2">
<input id="urlFilterCates" type="hidden" value="/search/lazyLoadCates/fc5265-0/k/mb0-pr-a-d0-f0?virtualflag=1&amp;req.needMispellKw=0&amp;isFlowProduct=2">
<input id="orderValue" type="hidden" value="">
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
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.565" data-tcs="SEARCH.0">办公零食<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.679" data-tcs="SEARCH.0">坚果<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.678" data-tcs="SEARCH.0">蜜饯<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.677" data-tcs="SEARCH.0">膨化食品<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.569" data-tcs="SEARCH.0">牛肉干<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.567" data-tcs="SEARCH.0">糕点<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.566" data-tcs="SEARCH.0">点心<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-tcd="COMMENT_TAG.680" data-tcs="SEARCH.0">奶酪/乳制品<i class="close_icon"></i></a>
</div>
</li>
</ul>
</div>
<div class="inBox" style="display: none;">
<ul class="attrBox">
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-id="attr_116108" data-tcd="a13.116108" data-tcs="SEARCH.0">罐装<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-id="attr_100608" data-tcd="a13.100608" data-tcs="SEARCH.0">袋装<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-id="attr_100611" data-tcd="a13.100611" data-tcs="SEARCH.0">礼盒装<i class="close_icon"></i></a>
</div>
</li>
<li>
<div class="liBox">
<a href="goods-detail.do?goodsId=" data-id="attr_100609" data-tcd="a13.100609" data-tcs="SEARCH.0">盒装<i class="close_icon"></i></a>
</div>
</li>
</ul>
</div>
</div>
</div>
<!-- 商品展示区 -->
<!-- goods list start -->
<div id="wrapper-goods-list">
	  <div id="scroller">
		  	<div id="pullDown" class="idle">
				<span class="pullDownIcon"></span>
				<span class="pullDownLabel">下拉更新...</span>
			</div>
<div class="touchweb-com_searchListBox ">
<ul  id="goods-list">
	
</ul>

</div>
<div id="pullUp" class="idle">
				<span class="pullUpIcon"></span>
				<span class="pullUpLabel">上拉更新...</span>
			</div>
		</div>
	</div>
<!-- goods list end -->
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
<nav></nav>
<div class="floor bottom-bar-pannel">
    <div class="floor-container  ">
		<ul class="tab5">
		<li><span class="bar-img"><a  page_name="index" href="javascript:void(0)"><img src="<%=basePath %>res/jbh/resource/home-btn.png"></a></span></li>
		<li><span class="bar-img"><a  page_name="index" href="cate.do"><img src="<%=basePath %>res/jbh/resource/cate-btn.png"></a></span></li>
		<!-- 
		<li><span class="bar-img"></span></li>
		-->
		<li><span class="bar-img"><a  page_name="index" href="cart.do"><img src="<%=basePath %>res/jbh/resource/cart-btn.png"></a></span></li>
		<li><span class="bar-img"><a  page_name="index" href="<%=basePath %>user/profile/index.do?id=1"><img src="<%=basePath %>res/jbh/resource/user-home-btn.png"></a></span></li>
		<!-- 
		<li><span class="bar-img"><a  page_name="index" href="http://gzfhxxkj.com:8080/jbh/junbinghui/demo/cart-login.html"><img src="<%=basePath %>res/jbh/resource/cart-btn.png"></a></span></li>
		<li><span class="bar-img"><a  page_name="index" href="http://gzfhxxkj.com:8080/jbh/junbinghui/demo/user-profile.html?id=1"><img src="<%=basePath %>res/jbh/resource/user-home-btn.png"></a></span></li>
		 -->
	</ul>
	</div>
</div>
<div class="mod_tips" style="position: fixed;top: 50%;left: 50%;display: none;">
<p id="addresult">添加购物车成功!</p>
</div>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/utils.js"></script>
<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/goods-list.js"></script>
</body>
</html>