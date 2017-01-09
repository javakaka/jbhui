/**
 * 
 */
var URI="/h5-register-save.do";
var redirectUrl =request("redirect");

var $telephone =$("#telephone");
var $password =$("#password");
var $tele_code =$("#tele_code");
var $refreshCode =$("#refreshCode");
var $regBtn =$("#regBtn");
var $error_tips =$(".error_tips");
var $errorLable =$("#error-lable");

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		initPageFuns();
		//loadData();
	});
}, false);

//init 
function initPageFuns(){
	$tele_code.bind('input propertychange', function() {
	    var code =$tele_code.val();
	    var len =code.length;
	    if(len > 0)
	    {
	    	clearError();
	    }
	});
	$password.bind('input propertychange', function() {
		var code =$password.val();
		var len =code.length;
		if(len > 0)
		{
			clearError();
		}
	});
	
	// 更换验证码
	$refreshCode.click( function() {
		sendRegCode();
	});
}

function sendRegCode()
{
	var telephone =$telephone.val();
	var url =SITE_PATH+"/sms/send-register.do";
	var params ={telephone: telephone, type: "0"};
	$.ajax({
		type:"post",
		url: url,
		data:params,
		beforeSend: function (XMLHttpRequest){
			$regBtn.removeAttr("onclick");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) 
			{
				showError(data.msg);
				return;
			}
			
		},
		complete: function (XMLHttpRequest, textStatus){
			$regBtn.removeAttr("onclick");
		},
		error: function (){
			$regBtn.attr("onclick","stepCheckCode()");
		}
	});
}

function stepCheckCode()
{
	var tel =$telephone.val();
	var pwd =$password.val();
	var code =$tele_code.val();
	if(isEmpty( tel ))
	{
		showError("验证码不能为空");
		return;
	}
	if(isEmpty( tel ))
	{
		showError("手机号码不能为空");
		return;
	}
	var len =tel.length;
	if(len != 11)
	{
		showError("手机号码长度为11位");
		return;
	}
	var codeLen =pwd.length;
	if(codeLen < 6)
	{
		showError("密码不能小于6位");
		return;
	}
	
	var params ={password: hex_md5(pwd),telephone: tel, code: code};
	$.ajax({
		type:"post",
		url: SITE_PATH + URI,
		data:params,
		beforeSend: function (XMLHttpRequest){
			$regBtn.removeAttr("onclick");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) 
			{
				showError(data.msg);
				return;
			}
			window.location.href=SITE_PATH +"/h5-login.do";
		},
		complete: function (XMLHttpRequest, textStatus){
			$regBtn.removeAttr("onclick");
		},
		error: function (){
			$regBtn.attr("onclick","stepCheckCode()");
		}
	});
}

function showError(text)
{
	$regBtn.addClass("disable");
	$error_tips.css("display","block");
	$error_tips.html( "<span class=\"icon-warning icon_warning\" id=\"error-lable\"></span>"+text );
}

function clearError()
{
	$regBtn.attr("onclick","stepCheckCode()");
	$regBtn.removeClass("disable");
	$error_tips.css("display","none");
	$error_tips.html( "<span class=\"icon-warning icon_warning\" id=\"error-lable\"></span>" );
}
