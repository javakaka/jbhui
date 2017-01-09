<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>登录</title>
    <meta name="viewport" content="minimal-ui,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <link type="text/css" rel="stylesheet" href="<%=basePath %>res/jbh/resource/style-m-2.0.css">
    <link type="text/css" rel="stylesheet" href="<%=basePath %>res/jbh/resource/login-m-2.0.css">
    <link type="text/css" rel="stylesheet" href="<%=basePath %>res/jbh/resource/popup.css">
</head>
<body >
    <div id="container">
        <div class="touchweb-com_header ">
    <!-- left start -->
    <a id="back" href="javascript: window.history.go(-1);" class="left icon-back"></a>
    <!-- left end -->
    <!-- title start -->
    <h1>登录爽乐购</h1>
    <!-- title end -->
    
	<!-- right start -->
        <div class="rightBox">
        <a id="register_btn" href="<%=basePath%>h5-register.do" class="right rbtn">
            注册
        </a>
        </div>
        <!-- 下拉 start -->
        <!-- 下拉 end -->
    <!-- right end -->
</div>
<div class="touchweb_page-login">
	<!--
	<div id="error_tips" class="error_tips" style="display: block;">
            <span class="icon-warning icon_warning"></span>
            提示信息
    </div>
    -->
    <div class="login_box">
        <div class="form_item">
            <label class="icon-my" for="touchweb_form-username"></label>
            <div class="input_box">
                <input type="text"  placeholder="邮箱/手机/用户名" name="username" id="username" value="" />
                <span class="icon_delete icon-delete"></span>
            </div>
        </div>
        <div class="form_item">
            <label class="icon-password" for="touchweb_form-password"></label>
            <div class="input_box">
                <input type="password"  placeholder="请输入密码" name="password" id="password" value=""/>
                <span class="icon_delete icon-delete"></span>
            </div>
        </div>
    </div>
    <div class="form_box form_verification none">
        <div class="form_item">
            <div class="input_box">
            	<input id="validateSig" type="hidden">
                <input id="register_form-phone-verification" class="text_verification" type="text" placeholder="请输入验证码" maxlength="4">
                <img class="pic_verification" alt="" width="105" height="43">
                <span class="icon_refresh icon-refresh"></span>
            </div>
        </div>
    </div>
    <div class="remember_login">
        <input id="touchweb_form-checkbox" type="checkbox" checked="">
        <label for="touchweb_form-checkbox">一周内记住登录</label>
        <a href="<%=basePath%>find-pwd.do" class="forgot_password">忘记密码？</a>
    </div>
    
    <div class="login_btn">
        <a id="loginBtn" href="javascript: void(0);" class="btn">登录</a>
    </div>
    
</div>

	<div class="pop_login-error" id="errorTip">错误信息<br></div>
    <div id="pop" class="touchweb_com-modPopup" style="display: none;">
		<div class="popup_box">
			<div class="popup_title" style="font-size: 10px;">您的密码可能有安全风险！</div>
			<div class="popup_con" style="font-size: 10px;">建议您马上修改</div>
			<div class="popup_btn">
				<a id="to_update_password" href="javascript: void();" class="continue" style="font-size: 10px;" onclick="">速速修改</a>
				<a id="to_ignore_to_update_password" href="javascript: void();" class="ignore" style="font-size: 10px;" onclick="">残忍忽略</a>
			</div>
		</div>
		<div class="popup_bg" style="bottom: 0px; right: 0px;"></div>
	</div>
	<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
	<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
	<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/res/js/md5.js"></script>
	<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/login.js"></script>
</body>
</html>