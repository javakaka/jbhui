/**
 * 
 */
var URI="/h5-login.do";
var redirectUrl =request("redirect");
// search 
var loginBtn =$("#loginBtn");
var errorTip =$("#errorTip");
var username =$("#username");
var password =$("#password");

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		initPageFuns();
		//loadData();
	});
}, false);

//init 
function initPageFuns(){
	
	username.focus(function(){
		errorTip.html("");
		errorTip.removeClass("show");
	});
	
	password.focus(function(){
		errorTip.html("");
		errorTip.removeClass("show");
	});
	
	loginBtn.click(function(){
		if( isEmpty( username.val() ) )
		{
			errorTip.html("用户名不能为空");
			errorTip.addClass("show");
			return;
		}
		if( isEmpty( password.val() ) )
		{
			errorTip.html("密码不能为空");
			errorTip.addClass("show");
			return;
		}
		submit();
	});
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
