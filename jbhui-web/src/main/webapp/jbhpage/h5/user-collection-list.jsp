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
<title>我的收藏</title>
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="minimal-ui=yes,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="msapplication-tap-highlight" content="no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="wap-font-scale" content="no">
<meta name="applicable-device" content="mobile">
<link href="<%=basePath %>res/jbh/resource/global_site_base.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>res/jbh/resource/h5FavoriteList.css" rel="stylesheet" type="text/css">
</head>
<body >
<div class="touchweb-com_header header_flex" id="globalHeader">
	<a id="topIconBack" class="left icon-back" href="<%=basePath %>user/profile/index.do" ></a>
	<h1>我的收藏</h1>
	<div class="rightBox" >
		<a href="javascript:;" class="right" id="changeMyFavState" >
			<span class="right_text icon-edit"></span>
			<span class="icon_text"></span>
		</a>
	</div>
</div>
<div class="wrap proList goodsList" id="favList">
	<dl>
		<dt>
			<a href="<%=basePath %>goods-detail.do?goodsId=1" >
				<img class="lazy" src="<%=basePath %>res/jbh/resource/fa1.jpg" alt="">
			</a>
		</dt>
		<dd>
			<a href="<%=basePath %>goods-detail.do?goodsId=1" >
				<h4>饮思洁 软包抽纸 200抽抽取式无香型面巾纸*8包 包邮！包邮！</h4>
				<p class="promTags"></p>
				<p class="price">
					<strong>¥17.8</strong>
					<del>¥25.4</del>
				</p>
			</a>
			<div class="myFavContent2" style="display:block">
				<a href="<%=basePath %>goods-detail.do?goodsId=1"  class="viewBtn"><i class="greyRightArrow">></i></a>
			</div>
			<div class="myFavContent3" style="display:none">
				<a class="delRedBtn" href="javascript:deleteProduct(89119230);"  id="deleteProduct">删除</a>
			</div>
		</dd>
	</dl>
	<div class="canclOdrIn _deleteDiv" style="display:none" id="ins_89119230">
		<p>确认要删除该商品吗？</p>
		<a id="deleteCertain" href="" class="greyBtn tinyGreyBtn h30" >确定</a>
		<a id="noCancl" href="javascript:hide(89119230);" class="greyBtn tinyGreyBtn h30" >取消</a>
	</div>
	<dl>
		<dt>
			<a href="<%=basePath %>goods-detail.do?goodsId=1" >
				<img class="lazy" src="<%=basePath %>res/jbh/resource/fa2.jpg" alt="">
			</a>
		</dt>
		<dd>
			<a href="<%=basePath %>goods-detail.do?goodsId=1">
				<h4>威露士 衣物家居消毒液 多用途消毒 1L</h4>
				<p class="promTags"></p>
				<p class="price">
					<strong>¥29.9</strong>
					<del>¥39.9</del>
				</p>
			</a>
			<div class="myFavContent2" style="display:block">
				<a href="<%=basePath %>goods-detail.do?goodsId=1"  class="viewBtn"><i class="greyRightArrow">></i></a>
			</div>
			<div class="myFavContent3" style="display:none">
				<a class="delRedBtn" href="javascript:deleteProduct(89119211);"  id="deleteProduct">删除</a>
			</div>
		</dd>
	</dl>
	<div class="canclOdrIn _deleteDiv" style="display:none" id="ins_89119211">
		<p>确认要删除该商品吗？</p>
		<a id="deleteCertain" href="" class="greyBtn tinyGreyBtn h30" >确定</a>
		<a id="noCancl" href="javascript:hide(89119211);" class="greyBtn tinyGreyBtn h30" >取消</a>
	</div>
</div>
<nav></nav>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>res/js/layer/layer.min.js"></script>
</body>
</html>