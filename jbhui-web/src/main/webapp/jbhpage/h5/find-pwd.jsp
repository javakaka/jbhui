<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <title>找回密码</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	    <meta name="format-detection" content="telephone=no">
        <link href="<%=basePath %>res/jbh/resource/h5_find_pwd_now.css" type="text/css" rel="stylesheet">
	</head>
	<body >
        <!--s 头部-->
        <header class="titleHead" style="display: none;">
            <h2>找回密码</h2>
            <div class="leftBtns">
                <a class="goback" href="javascript:void(0);" onclick="javascript:window.history.go(-1);"></a>
            </div>
        </header>
        <!--e 头部-->
        <div class="layout">
            <!-- s 流程 -->
            <div class="mod_process">
                <span class="color_red">1 输入账号</span>&gt;<span>2 验证身份</span>&gt;<span>3 设置新密码</span>&gt;<span>4 完成</span>
            </div>
            <!-- e 流程 -->
            <!-- s 表单 -->
            <div class="mod_forms">
                <div class="forms_box">
                    <label>账号：<input type="text" placeholder="手机号/邮箱/用户名" id="login_account" onkeyup="showOff()" onblur="showOff()"></label>
                </div>
                 <div class="forms_box" style="display: none;" id="validateDiv">
                 	<input type="hidden" id="validateSig">
                    <label>验证码：<input type="text" id="validCode" "=""><img src="" id="validateImg" onclick="refresh_captcha()"></label>           
                </div>                
                <div class="point_box" id="account_tips" style="display: none;"><span class="color_red"><i></i><label id="account_desc"></label></span></div>
            </div>
            <div class="mod_btn btn_grey" id="submit_button_style">
                <a href="javascript:void(0);" id="stpe1Btn">下一步</a>
            </div>
            <!-- e 表单 -->
        </div>
        <!--footer start-->
	 <div class="footer">     
	    <p>copyright@军炳会 2016－2020</p>
	</div>        
	<!--footer end-->
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/jbh/resource/js/find-pwd.js"></script>
</body>
</html>
