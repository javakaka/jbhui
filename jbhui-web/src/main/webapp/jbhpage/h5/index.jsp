<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String from_user =request.getParameter("from_user");
if( from_user == null || from_user.trim().length() == 0 )
{
	from_user ="";
}
%>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>爽乐购商城</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<meta name="Keywords" content="爽乐购商城">
<meta name="Description" content="爽乐购商城">
<meta name="tp_page" content="H5-HOMEPAGE.0">
<meta name="ios" content="" wireless2content="">
<meta name="android" content="" wireless2content="">
<meta name="h5" content="">

<link href="<%=basePath %>res/jbh/resource/global_site_index.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/homepage.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/footer.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/css/iscroll.css?v=1.00" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=basePath %>res/jbh/resource/swipe.js"></script>
<script type="text/javascript" src="<%=basePath %>res/jbh/resource/zepto.js"></script>
</head>
<body >
<!-- h5 global top -->
<div id="container" style="height: auto;">
<div id="container_inner">
<div class="touchweb_page-index" data-tpa="H5_HOMEPAGE_BODY">
<div class="blocks" id="blocks">
<!-- top  -->
<div class="touchweb-com_header index fixed" id="globalHeader">
	<a href="index.do" class="header_logo">
	<img src="<%=basePath %>res/jbh/resource/header_logo.png">
	</a>
	
	<div id="searchBox" class="search_wrap">
	<div class="search_box focus">
	<form name="searchForm" id="searchForm" method="get">
	<input type="search" placeholder="搜索商品" name="keyword" id="keyword" class="search_txt" value="" data-original="" autocomplete="off">
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
	<div class="rightBox" data-tpa="H5_GLOBAL_HEADER_RIGHTBOX">
	<a href="index.do" class="right" data-tpa="H5_GLOBAL_HEADER_CATEGORY">
	<span class="right_text icon-sort_big_pic">
	</span>
	<span class="icon_text">消息</span>
	</a>
	<!-- 
	<a href="" class="right" data-tpa="H5_GLOBAL_HEADER_CART">
	<span class="right_text icon-cart">
	</span>
	<span class="icon_text">扫一扫</span>
	</a>
	-->
	</div>
</div>
<c:if test="${ ! empty top_goods }">
<div style="-webkit-transform:translate3d(0,0,0);">
		<div id="banner_box" class="box_swipe" style="visibility: visible;">
			<ul style="list-style: none; transition-duration: 500ms; transform: translate3d(-2864px, 0px, 0px); width: 3580px;">
			<c:forEach items="${ top_goods }" var="tg_item"> 
				<li style="width: 716px; display: table-cell; vertical-align: top;">
					<a href="goods-detail.do?goodsId=1">
					<img src="<c:if test="${ empty goods.FILE_PATH }"><%=basePath %>res/jbh/resource/images/goods-list-default.png</c:if><c:if test="${!empty  goods.FILE_PATH }">${goods.FILE_PATH }</c:if>" alt="1" style="width:100%;">
					</a>
				</li>
			</c:forEach>
			</ul>
			<ol>
				<c:forEach items="${ top_goods }" var="tg_item" varStatus="status"> 
				<li <c:if test="${status.index == '0'} ">class="on"</c:if> ></li>
				</c:forEach>
			</ol>
		</div>
	</div>
	<script>
		$(function(){
			new Swipe(document.getElementById('banner_box'), {
				speed:500,
				auto:3000,
				callback: function(){
					var lis = $(this.element).next("ol").children();
					lis.removeClass("on").eq(this.index).addClass("on");
				}
			});
		});
	</script>
</c:if>
	
	<!--  function nav -->
	<div class="touchweb_components-headerMenu" id="iconNav">
		<a href="index.do" class="item">
			<span class="icon_box">
			<img src="<%=basePath %>res/jbh/resource/func-nav1.png" alt="1号团" class="icon">
			</span>
			<span class="title">功能1</span>
		</a>
		<a href="index.do" class="item">
			<span class="icon_box">
			<img src="<%=basePath %>res/jbh/resource/func-nav1.png" alt="1号团" class="icon">
			</span>
			<span class="title">功能2</span>
		</a>
		<a href="index.do" class="item">
			<span class="icon_box">
			<img src="<%=basePath %>res/jbh/resource/func-nav1.png" alt="1号团" class="icon">
			</span>
			<span class="title">功能3</span>
		</a>
		<a href="index.do" class="item">
			<span class="icon_box">
			<img src="<%=basePath %>res/jbh/resource/func-nav1.png" alt="1号团" class="icon">
			</span>
			<span class="title">功能4</span>
		</a>
		
</div>
<!-- scroll news -->
<c:if test="${ ! empty sys_info }">
<div class="jbh-express-news">
	<a  class="J_ping jbh-news-tit" href="index.do">实时动态:</a>
	<div id="scroll-news" class="news-list-wrapper">
		<ul class="news-list" style="">
		<c:forEach items="${ sys_info }" var="info_item">
			<li class="news-item">
				 <a   href="index.do" >${info_item.TITLE }</a>
			</li>
		</c:forEach>
		</ul>
	</div>
	<a class="J_ping jbh-news-more" href="index.do"><i class="line"></i>更多</a>
</div>
</c:if>
<div class="feature_channel">
</div>

<div class="precision_column" id="goods-list">
<c:forEach items="${goods_list }" var ="goods" varStatus="status">
	<div class="product_item">
		<a href="goods-detail.do?goodsId=${goods.ID }">
			<div class="pic_box">
				<img src="<c:if test="${ empty goods.FILE_PATH }"><%=basePath %>res/jbh/resource/images/goods-list-default.png</c:if><c:if test="${!empty  goods.FILE_PATH }">${goods.FILE_PATH }</c:if>" alt="" class="">
			</div>
			<h3>${goods.NAME }</h3>
			<div class="price_box">
				   <strong>￥${goods.RAW_PRICE }</strong>
			</div>
		</a>
	</div>
</c:forEach>
</div>
</div>
<div class="touchweb_com-backTop">
<a href="index.do"></a>
</div>
<div class="copyright">
<p>爽乐购商城</p>
<p></p>
</div>
</div>
</div>
<div id="fixed_layer"></div>
</div>
<nav></nav>
<div class="floor bottom-bar-pannel">
    <div class="floor-container  ">
		<ul class="tab5">
		<li><span class="bar-img"><a  page_name="index" href="javascript:void(0)"><img src="<%=basePath %>res/jbh/resource/home-btn.png"></a></span></li>
		<li><span class="bar-img"><a  page_name="index" href="cate.do?from_user=<%=from_user%>"><img src="<%=basePath %>res/jbh/resource/cate-btn.png"></a></span></li>
		<!-- 
		<li><span class="bar-img"></span></li>
		-->
		<li><span class="bar-img"><a  page_name="index" href="cart.do?from_user=<%=from_user%>"><img src="<%=basePath %>res/jbh/resource/cart-btn.png"></a></span></li>
		<li><span class="bar-img"><a  page_name="index" href="<%=basePath %>user/profile/index.do?from_user=<%=from_user%>"><img src="<%=basePath %>res/jbh/resource/user-home-btn.png"></a></span></li>
		<!-- 
		<li><span class="bar-img"><a  page_name="index" href="http://gzfhxxkj.com:8080/jbh/junbinghui/demo/cart-login.html"><img src="<%=basePath %>res/jbh/resource/cart-btn.png"></a></span></li>
		<li><span class="bar-img"><a  page_name="index" href="http://gzfhxxkj.com:8080/jbh/junbinghui/demo/user-profile.html?id=1"><img src="<%=basePath %>res/jbh/resource/user-home-btn.png"></a></span></li>
		 -->
	</ul>
	</div>
</div>
	<!-- 
	<div class="floor bottom-bar-activity">
		<span class="bar-img">
			<a class="" href="index.do"><img src="<%=basePath %>res/jbh/resource/info-btn.png"></a>
		</span>
	</div>
	-->
<script >
  var BasePath ="<%=basePath%>";
</script>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/iscroll.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>