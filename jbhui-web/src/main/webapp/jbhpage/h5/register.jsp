<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>register</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="minimal-ui,width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link type="text/css" rel="stylesheet" href="<%=basePath %>res/jbh/resource/register-m-2.0.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>res/jbh/resource/public-m-2.0.css">
</head>
<body >
    <div id="container">
        <div class="touchweb-com_header ">
    <!-- left start -->
    <a id="nav_back" href="javascript: window.history.go(-1);" class="left icon-back"></a>
    <!-- left end -->
    <!-- title start -->
    <h1>注册</h1>
    <!-- title end -->
    <!-- right start -->
        <div class="rightBox">
        <a id="login_btn" href="<%=basePath%>h5-login.do?from_user=${from_user}" class="right rbtn">
            登录
        </a>
        </div>
        <!-- 下拉 start -->
            
        <!-- 下拉 end -->
    <!-- right end -->
</div>
<div class="touchweb_page-register">
	<!--
    <div class="tab_box" style="">
        <div class="item current">手机注册</div>
        <div class="item">邮箱注册</div>
    </div>
    -->
    <input id="returnUrl" type="hidden" name="returnUrl" value="">
    <div class="con_box show">
        <div class="step_1">
            <div class="form_box">
                <div class="form_item">
                    <label for="telephone" class="icon-cell_phone"></label>
                    <div class="input_box">
                        <input id="telephone" class="text_box" type="tel" placeholder="请输入手机号码" maxlength="11">
                    </div>
                </div>
                <div class="form_item">
                    <label for="register_form-phone-verification" class="icon-mail"></label>
                    <div class="input_box">
                    	<input id="validateSig" type="hidden" value="usYhNeXJbZbtNvJcsVjGksme8O9xKBeNnRUalqwNh3IqllTL">
                        <input id="sms-code" class="text_verification" type="text" placeholder="请输入验证码" maxlength="4">
                        <img id="captcha" class="pic_verification" alt="" width="105" height="43" src="<%=basePath %>/include/ValidateCode.jsp">
                        <span id="captcha_refresh" class="icon_refresh icon-refresh"></span>
                    </div>
                </div>
            </div>
            <div class="error_tips" style="display: none;"><span class="icon-warning icon_warning" id="error-lable"></span></div>
            <div class="agreement">
                <label>点击注册，表示您同意<a href="javascript: void(0);" class="license-terms">《服务协议》</a></label>
            </div>
            <div class="btn_box">
                <a href="javascript:" class="btn phone_reg_btn disable" onclick="javascript:stepCheckCode();" id="checkBtn">注册</a>
            </div>
        </div><!-- step_1 -->
        <div class="step_2">
            <div class="form_box">
            	<input type="hidden" id="csrf_state" name="regState" value="2f3fdafbe8273549051d81ce123d5dcd">
                <div class="form_item">
                    <label for="register_form-phone-message" class="icon-cell_phone"></label>
                    <div class="input_box">
                        <input id="register_form-phone-message" class="text_message" type="text" placeholder="请输入验证码" maxlength="6">
                        <a href="javascript:;" class="again_message disable">
                            <span class="text">获取验证码</span>
                            <span class="countdown">（<em class="num">60</em>S）</span>
                        </a>
                    </div>
                </div>
                <div class="form_item">
                    <label for="register_form-phone-pwd" class="icon-password"></label>
                    <div class="input_box">
                        <input id="register_form-phone-pwd" class="text_pwd" type="password" placeholder="6-20位字母，数字或符号组合" maxlength="20">
                        <input type="checkbox" class="show_pwd">
                    </div>
                </div>
            </div>
            <div class="error_tips" style="display: none;">
                <span class="icon-warning icon_warning"></span>
                验证码错误
            </div>
            <div class="btn_box">
                <a href="<%=basePath %>h5-register-s2.do" class="btn phone_reg_btn">注册</a>
            </div>
        </div><!-- step_2 -->
    </div><!-- con_box -->
    <div class="con_box">
        <div class="form_box">
            <div class="form_item">
                <label for="register_form-mail" class="icon-mail"></label>
                <div class="input_box">
                    <input id="register_form-mail" class="text_box" type="email" placeholder="请输入常用的邮箱地址">
                    <div class="email_lists">
                        <span class="item"><em>aaa</em>@163.com</span>
                        <span class="item"><em>aaa</em>@qq.com</span>
                        <span class="item"><em>aaa</em>@sohu.com</span>
                        <span class="item"><em>aaa</em>@yahoo.com</span>
                        <span class="item"><em>aaa</em>@gmail.com</span>
                    </div>
                </div>
            </div>
            <div class="form_item">
                <label for="register_form-mail-pwd" class="icon-password"></label>
                <div class="input_box">
                    <input id="register_form-mail-pwd" class="text_pwd" type="password" placeholder="6-20位字母，数字或符号组合" maxlength="20">
                    <input type="checkbox" class="show_pwd">
                </div>
            </div>
            <div class="form_item">
                <label for="register_form-mail-verification" class="icon-mail"></label>
                <div class="input_box">
                    <input id="register_form-mail-verification" class="text_verification" type="text" placeholder="请输入验证码" maxlength="4">
                    <img id="m_captcha" class="pic_verification" alt="" width="105" height="43">
                    <span id="m_captcha_refresh" class="icon_refresh icon-refresh"></span>
                </div>
            </div>
        </div>
        <div id="em_error_tips" class="error_tips" style="display: none;">
            <span class="icon-warning icon_warning"></span>
            验证码错误
        </div>
        <div class="agreement">
            <label>点击注册，表示您同意<a href="javascript: void(0);" class="license-terms">《服务协议》</a></label>
        </div>
        <div class="btn_box">
            <a id="email_reg_btn" href="javascript: void(0);" class="btn phone_reg_btn disable">注册</a>
        </div>
    </div><!-- con_box -->
	<div class="banner" id="ad_position_area"></div>
</div>
    </div>
<script type="text/javascript" src="<%=basePath%>/res/js/gloable.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/httputil.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/md5.js"></script>
<script type="text/javascript" >
var from_user ="${from_user}";
</script>

<script type="text/javascript" src="<%=basePath%>res/jbh/resource/js/register.js?v=1.001"></script>
</body>
</html>