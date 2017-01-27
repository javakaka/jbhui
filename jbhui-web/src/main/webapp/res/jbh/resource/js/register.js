/**
 * 
 */
var URI="/check-validate-code.do";
var redirectUrl =request("redirect");

var $telephone =$("#telephone");
var $smsCode =$("#sms-code");
var $captcha =$("#captcha");
var $captcha_refresh =$("#captcha_refresh");
var $checkBtn =$("#checkBtn");
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
	
	$telephone.bind('input propertychange', function() {
	    var tel =$telephone.val();
	    var len =tel.length;
	    if(len ==11)
	    {
	    	$checkBtn.removeClass("disable");
	    }
	    else if(len <11)
	    {
	    	$checkBtn.addClass("disable");
	    }
	    else if(len >11)
	    {
	    	$checkBtn.addClass("disable");
	    	$error_tips.css("display","block");
	    	$errorLable.html("手机号码长度不能超过11位");
	    }
	});
	
	$smsCode.bind('input propertychange', function() {
	    var code =$smsCode.val();
	    var len =code.length;
	    if(len > 0)
	    {
	    	clearError();
	    }
	});
	
	// 更换验证码
	$captcha_refresh.click( function() {
		$captcha.attr("src", SITE_PATH+"/include/ValidateCode.jsp?captchaId=0214d269-d438-4ab6-bbfe-138f96654d13&timestamp=" + (new Date()).valueOf());
	});
}

function stepCheckCode()
{
	var tel =$telephone.val();
	var code =$smsCode.val();
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
	var codeLen =code.length;
	if(codeLen != 4)
	{
		showError("验证码格式不对");
		return;
	}
	
	var params ={code: code,telephone: tel};
	$.ajax({
		type:"post",
		url: SITE_PATH + URI,
		data:params,
		beforeSend: function (XMLHttpRequest){
			$checkBtn.removeAttr("onclick");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) 
			{
				showError(data.msg);
				return;
			}
			window.location.href=SITE_PATH +"/h5-register-s2.do?from_user="+from_user;
		},
		complete: function (XMLHttpRequest, textStatus){
			$checkBtn.removeAttr("onclick");
		},
		error: function (){
			$checkBtn.attr("onclick","stepCheckCode()");
		}
	});
}

function showError(text)
{
	$checkBtn.addClass("disable");
	$error_tips.css("display","block");
	$error_tips.html( "<span class=\"icon-warning icon_warning\" id=\"error-lable\"></span>"+text );
}

function clearError()
{
	$checkBtn.attr("onclick","stepCheckCode()");
	$checkBtn.removeClass("disable");
	$error_tips.css("display","none");
	$error_tips.html( "<span class=\"icon-warning icon_warning\" id=\"error-lable\"></span>" );
}


/**
*刷新
**/
function submit() {
	var params ={username: username.val(),password: hex_md5( password.val() )};
	$.ajax({
		type:"post",
		url: SITE_PATH + URI,
		data:params,
		beforeSend: function (XMLHttpRequest){
			loginBtn.attr("disabled","disabled");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) {
				errorTip.html(data.msg);
				errorTip.addClass("show");
				return;
			}
			if (isEmpty( redirectUrl )) {
				window.location.href=SITE_PATH +"/user/profile/index.do";
			}
			else
			{
				window.location.href=redirectUrl;
			}
		},
		complete: function (XMLHttpRequest, textStatus){
			loginBtn.removeAttr("disabled");
		},
		error: function (){
			loginBtn.removeAttr("disabled");
		}
	});
}
