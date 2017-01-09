/**
 * 
 */
var URI="/user/order/create-step2.do";
//page 页码、page_size 每页显示条数、id 当前用户Id
var PageUrl =SITE_PATH+URI;
var USER_ID =request("user_id");//
var FROM_USER =request("from_user");

// page
var OFFSET = 5;
var page = 1;
var page_size = 9;
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
var maxScrollY = 0;
var hasMoreData = false;
var globalHeader =$("#globalHeader");
var $goods =request("goods");
var $receiverId =$("#receiverId");
var $submitBtn=$("#submitBtn");

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		initPageFuns();
	});
}, false);

//init 
function initPageFuns(){
	
	$submitBtn.click(function(){
		toOrderStep2();
	});
}

function toOrderStep2()
{
	if(isEmpty( $goods ))
	{
		alert("请先选中需要购买的商品");
		return ;
	}
	if(isEmpty( $receiverId.val() ))
	{
		alert("请选择收货地址");
		return ;
	}
	var params ={goods: $goods,receiverId: $receiverId.val()}
	$.ajax({
		type:"post",
		url:PageUrl,
		data:params,
		beforeSend: function (XMLHttpRequest){
			$submitBtn.attr("disabled","disabled");
		},
		success: function (data, textStatus){
			var code =data.code;
			if(code != 0)
			{
				alert(data.msg);
			}
			else
			{
				//清空购物车
				window.location.href =SITE_PATH +"/user/order/create-step3.do?orderNo="+data.oForm.ORDER_NO;
			}
		},
		complete: function (XMLHttpRequest, textStatus){
			$submitBtn.removeAttr("disabled");
		},
		error: function (data){
			alert(data.msg);
			$submitBtn.removeAttr("disabled");
		}
	});
	
}
