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
	    <title>重新设置密码</title>
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
                <span>1 输入账号</span>&gt;<span>2 验证身份</span>&gt;<span class="color_red">3 设置新密码</span>&gt;<span>4 完成</span>
            </div>
            <!-- e 流程 -->

            <!-- s 表单 -->
            <div class="mod_forms">
                <input type="hidden" id="findPwdState" name="findPwdState" value="">
                <div class="forms_box" id="forms_pwd">
                    <label>新密码：<input type="password" placeholder="请输入新密码" onkeyup="checkNewPassword()" onblur="checkNewPassword()" id="newpassword"></label>
                    <!-- 
                    <span class="pw_btn"><i>abc</i><s class="on">...</s></span>
                    -->
                </div>
                <div class="point_box" id="password_tips" style="display:none"><span class="color_red"><i></i><label id="password_error"></label></span></div>
                <div class="message">*密码必须为6-20位字符，由字母加符号或数字组合而成，且不能单独使用字母、符号或数字。</div>
            </div>
            
            <div class="mod_btn btn_grey" id="step3SubmitBtn">
                <a href="javascript:"  id="updateUserPassword">完成</a>
            </div>
            <!-- e 表单 -->
            <!-- s 新密码设置成功 -->
            <div class="mod_newtips" id="updateTips"><a href="<%=basePath%>h5-login.do">新密码设置成功</a></div>
            <!-- e 新密码设置成功 -->

        </div>
        <!--footer start-->
 <div class="footer">     
    <p>copyright@军炳会 2016－2020</p>
</div>        <!--footer end-->
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/md5.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/jbh/resource/js/find-pwd.js"></script>
</body>
</html>