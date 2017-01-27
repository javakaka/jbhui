/**
 * 
 */
var URI="/goods-page.do";
//page 页码、page_size 每页显示条数、id 当前用户Id
var PageUrl =SITE_PATH+URI;
var USER_ID =request("user_id");//
var FROM_USER =request("from_user");

//cateId
var cateId =request("cateId");

var $plusBtn =$("#plusBtn");
var $minusBtn =$("#minusBtn");
var goods_left_num =parseInt( $("#goods_left_num").val() );
var $buycount =$("#buycount");

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
	$plusBtn.click(function(){
		var buycount =$buycount.val();
		if( !checknumber( buycount ))
		{
			showMsg("请输入数字");
			return ;
		}
		buycount =parseInt( buycount );
		buycount =buycount+1;
		if( buycount >= goods_left_num )
		{
			buycount =goods_left_num;
		}
		$buycount.val( buycount );
	});
	$minusBtn.click(function(){
		var buycount =$buycount.val();
		if( !checknumber( buycount ))
		{
			showMsg("请输入数字");
			return ;
		}
		buycount =parseInt( buycount );
		buycount =buycount-1;
		if( buycount <= 0 )
		{
			buycount =1;
		}
		$buycount.val( buycount );
	});
	$buycount.change(function(){
		var buycount =$buycount.val();
		if( !checknumber( buycount ))
		{
			showMsg("请输入数字");
			return ;
		}
	});
	
}


function openLayer(url,w,h,title)
{
	$.layer({
	    type: 2,
	    shade: [0.5, '#f1f1f1'],
	    shadeClose: true,
	    border: [2, 0.3, '#000'],
	    fix: false,
	    title: title,
	    maxmin: false,
	    iframe: {src : url},
	    area: [w , h],
	    close: function(index){
	    }
	});
}

function addToShopCar(e)
{
	var buycount =$buycount.val();
	var goodsId =request("goodsId");
	addGoodsToCart(goodsId,buycount);
	console.log("---------stop ---------");
	if(e.stopPropagation)
	{
		e.stopPropagation();
		e.preventDefault();
	}
	else e.cancelBubble=true;
}

/**
 * 立即购买
 */
function buyNow()
{
	var buycount =$buycount.val();
	var goodsId =request("goodsId");
	var params =goodsId+"@"+buycount;
	var url =SITE_PATH+"/user/order/create-step1.do?goods="+params;
	window.location.href=url;
}