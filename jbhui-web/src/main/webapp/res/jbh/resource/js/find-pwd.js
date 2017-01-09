/**
 * 
 */
var checkAccountUrl=SITE_PATH+"/check-account.do";
var redirectUrl =request("redirect");
// step1 
var $login_account =$("#login_account");
var $account_tips =$("#account_tips");
var $account_desc =$("#account_desc");
var $stpe1Btn =$("#stpe1Btn");
var $stpe1SubmitDiv =$("#submit_button_style");

// step2
var $sms_code_tips =$("#sms_code_tips");
var $valid_mobile_code_desc =$("#valid_mobile_code_desc");
var $telephone =$("#telephone");
var $smsCode =$("#sms_code");
var $sendCodeBtn =$("#send_code");
var $step2Submit =$("#step2Submit");

// step3 
var $newpassword =$("#newpassword");
var $password_tips =$("#password_tips");
var $password_error =$("#password_error");
var $step3SubmitBtn =$("#step3SubmitBtn");
var $updateUserPassword =$("#updateUserPassword");
var $updateTips =$("#updateTips");

var errorTip =$("#errorTip");

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		initPageFuns();
	});
}, false);

//init 
function initPageFuns(){
	$stpe1Btn.click(function(){
		if( isEmpty( $login_account.val() ) )
		{
			$account_tips.css("display","block");
			$account_desc.html("请输入账号");
			$stpe1SubmitDiv.addClass("btn_grey");
			return;
		}
		step1Submit();
	});
	
	$sendCodeBtn.click( function(){
		sendSmsCode();
	} );
	
	$step2Submit.click( function(){
		step2Next();
	} );
	$updateUserPassword.click(function(){
		step3Submit();
	});
}

function showOff()
{
	var account =$login_account.val();
	if (isEmpty( account )) {
		$account_tips.css("display","block");
		$account_desc.html("请输入账号");
		$stpe1SubmitDiv.addClass("btn_grey");
	}
	else
	{
		$account_tips.css("display","none");
		$account_desc.html("");
		$stpe1SubmitDiv.removeClass("btn_grey");
	}
}

function step2Check()
{
	var code =$smsCode.val();
	if (isEmpty( code )) {
		$sms_code_tips.css("display","block");
		$valid_mobile_code_desc.html("请输入验证码");
		$step2Submit.addClass("btn_grey");
	}
	else
	{
		$sms_code_tips.css("display","none");
		$valid_mobile_code_desc.html("");
		$step2Submit.removeClass("btn_grey");
	}
}
/**
*
**/
function step1Submit() {
	var params ={username: $login_account.val()};
	$.ajax({
		type:"post",
		url: checkAccountUrl,
		data:params,
		beforeSend: function (XMLHttpRequest){
			$sendCodeBtn.attr("disabled","disabled");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) {
				$account_tips.css("display","block");
				$account_desc.html(data.msg);
				$stpe1SubmitDiv.addClass("btn_grey");
				return;
			}
			window.location.href=SITE_PATH +"/find-pwd-s2.do?telephone="+data.oForm.TELEPHONE;
		},
		complete: function (XMLHttpRequest, textStatus){
			$sendCodeBtn.removeAttr("disabled");
		},
		error: function (){
			$sendCodeBtn.removeAttr("disabled");
		}
	});
	
}

function sendSmsCode() {
	var telephone =$telephone.val();
	var url =SITE_PATH+"/sms/send-reset-pwd.do";
	var params ={telephone: telephone, type: "0"};
	$.ajax({
		type:"post",
		url: url,
		data:params,
		beforeSend: function (XMLHttpRequest)
		{
			$step2Submit.attr("disabled","disabled");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) {
				$sms_code_tips.css("display","block");
				$valid_mobile_code_desc.html(data.msg);
				$step2Submit.addClass("btn_grey");
				return;
			}
			$sms_code_tips.css("display","block");
			$valid_mobile_code_desc.html("发送成功!");
			$step2Submit.removeClass("btn_grey");
		},
		complete: function (XMLHttpRequest, textStatus){
			$step2Submit.removeAttr("disabled");
		},
		error: function (){
			$step2Submit.removeAttr("disabled");
		}
	});
}

function step2Next()
{
	window.location.href=SITE_PATH +"/find-pwd-s3.do?telephone="+$telephone.val()+"&code="+$smsCode.val();	
}

function checkNewPassword()
{
	var newPassword =$newpassword.val();
	if (isEmpty( newPassword )) {
		$password_tips.css("display","block");
		$password_error.html("请输入密码");
		$step3SubmitBtn.addClass("btn_grey");
		return false;
	}
	if( newPassword.length < 6 ){
		$password_tips.css("display","block");
		$password_error.html("密码长度不能小于6");
		$step3SubmitBtn.addClass("btn_grey");
		return false;
	}
	$step3SubmitBtn.removeClass("btn_grey");
	$password_tips.css("display","none");
	return true;
}

function step3Submit()
{
	var valid =checkNewPassword();
	if(! valid){
		return;
	}
	var newPassword =$newpassword.val();
	var telephone =request("telephone");
	var code =request("code");
	var url =SITE_PATH +"/update-password.do";
	var params ={telephone: telephone, code: code, password: hex_md5( newPassword )};
	$.ajax({
		type:"post",
		url: url,
		data:params,
		beforeSend: function (XMLHttpRequest)
		{
			$step3SubmitBtn.attr("disabled","disabled");
		},
		success: function (data, textStatus){
			var code =data.code;
			if (code != 0) {
				$password_tips.css("display","block");
				$password_error.html(data.msg);
				$step3SubmitBtn.addClass("btn_grey");
				return;
			}
			$updateTips.css("display","block");
//			$updateTips.click(function(){
//				window.location.href=SITE_PATH +"/h5-login.do";
//			});
		},
		complete: function (XMLHttpRequest, textStatus){
			$step3SubmitBtn.removeAttr("disabled");
		},
		error: function (){
			$step3SubmitBtn.removeAttr("disabled");
		}
	});
}