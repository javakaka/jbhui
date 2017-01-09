/**
 * 
 */
var URI="/cart-goods.do";
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

var $redirect =request("redirect");
var $chooseAddr =$("input[name='chooseAddr']");

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
	$chooseAddr.click(function(){
		var $this =$(this);
		var id =$this.attr("value");
		if( ! isEmpty( $redirect ))
		{
			$redirect =$redirect+"&addr_id="+id;
			window.location.href=$redirect;
		}
	});
	
}

function initScroll()
{
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	hasMoreData = false;
	$("#pullUp").hide();
	pullDownEl.className = 'loading';
	pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';

	myScroll = new iScroll('wrapper-cartgoods-list', {
			useTransition: true,
			topOffset: pullDownOffset,
			onRefresh: function() {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = 'idle';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
					this.minScrollY = -pullDownOffset;
				}
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = 'idle';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更新...';
				}
			},
			onScrollMove: function() {
				if (this.y > OFFSET && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放更新...';
					this.minScrollY = 0;
				} else if (this.y < OFFSET && pullDownEl.className.match('flip')) {
					pullDownEl.className = 'idle';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新...';
					this.minScrollY = -pullDownOffset;
				} 
				if (this.y < (maxScrollY - pullUpOffset - OFFSET) && !pullUpEl.className.match('flip')) {
					if (hasMoreData) {
						this.maxScrollY = this.maxScrollY - pullUpOffset;
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放更新...';
					}
				} else if (this.y > (maxScrollY - pullUpOffset - OFFSET) && pullUpEl.className.match('flip')) {
					if (hasMoreData) {
						this.maxScrollY = maxScrollY;
						pullUpEl.className = 'idle';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更新...';
					}
				}
			},
			onScrollEnd: function() {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
					refresh();
				}
				if (hasMoreData && pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					nextPage();
				}
			}
		});
		myScroll.refresh();
		if (hasMoreData) {
			myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
		} else {
			myScroll.maxScrollY = myScroll.maxScrollY;
		}
		maxScrollY = myScroll.maxScrollY;
}


//追加数据
function appendData(list){
	var total =list.length;
	var html ="";
	if(typeof total !="undefined" && total !="")
	{
		var is_div_end =true;
		$.each(list, function (i,item){
		
			html +="<div class=\"product_list_wrap\" id=\"cart_item_"+item.ID+"\">";
			//price
			var price =0;
			if( ! isEmpty( item.IS_COUPON ) && item.IS_COUPON =="1")
			{
				price =item.COUPON_PRICE;
			}
			else
			{
				price =item.RAW_PRICE;
			}
			html +="<input type=\"checkbox\" class=\"check_box\" checkouttype=\"0\" name=\"goods_checkbox\" id=\"checkbox_"+item.ID+"\" checked=\"\" data-goods-id=\""+item.ID+"\" data-goods-price=\""+price+"\" onclick=\"calGoodsMoneyAndNum()\">";
			html +="<div class=\"product_content\">";
			html +="<div class=\"product_box\">";
			html +="<div class=\"product_pic\" >";
			if(isEmpty(item.FILE_PATH))
			{
				html +="<img onclick=\"\"  src=\""+SITE_PATH+"/res/jbh/resource/images/goods-list-default.png\">";
			}
			else
			{
				html +="<img onclick=\"\"  src=\""+item.FILE_PATH+"\">";
			}
			html +="</div>";
			html +="<a class=\"product_con\" href=\"javascript:void(0);\">";
			html +="<span class=\"product_title\" onclick=\"javasript:window.location.href='goods-detail.do?goodsId="+item.ID+"'\">"+item.NAME+"</span>";
			html +="<p class=\"product_from\"></p>";
			html +="<p class=\"cell_price\">";
			html +="<span class=\"sale_price\">¥"+price+"</span>";
			html +="</p>";
			html +="</a>";
			html +="<div class=\"product_option\">";
			html +="<div class=\"tool_num\">";
			html +="<div class=\"computing_act\">";
			html +="<input type=\"button\" value=\"-\" class=\"reduce\" onclick=\"\">";
			html +="</div>";
			html +="<div class=\"computing_num\">";
			html +="<select class=\"needsclick\" name=\"select_goods_num\" id=\"select_goods_"+item.ID+"\" onchange=\"calGoodsMoneyAndNum()\">";
			html +="<option value=\"1\" selected=\"true\">1</option>";
			html +="<option value=\"2\">2</option>";
			html +="<option value=\"3\">3</option>";
			html +="<option value=\"4\">4</option>";
			html +="<option value=\"5\">5</option>";
			html +="<option value=\"6\">6</option>";
			html +="<option value=\"7\">7</option>";
			html +="<option value=\"8\">8</option>";
			html +="<option value=\"9\">9</option>";
			html +="<option value=\"10\">10</option>";
			html +="<option value=\"11\">11</option>";
			html +="</select>";
			html +="</div>";
			html +="<div class=\"computing_act\">";
			html +="<input type=\"button\" value=\"+\" class=\"add\">";
			html +="</div>";
			html +="</div>";
			html +="<i class=\"icon-rabish\" onclick=\"delCartItem('"+item.ID+"')\"></i>";
			html +="</div>";
			html +="</div>";
			html +="</div>";
			html +="</div>";
			html +="";
		});
		$("#goods-list").append(html);
	}
	else
	{
		if(page == 1)
		{
			html ="<div style='margin:0 auto;width:60%;text-align: center;'>暂无数据</div>";
			$("#goods-list").html(html); 
		}
	}
}

/**
*下一页
**/
function nextPage() {
	page++;
	var params ={typeId: cateId,page:page,pageSize:page_size,keyword: searchInput.val(), order: orderValue.val() ,transFree: getTransFreeStatus(),discount: getDiscountStatus()};
	$.ajax({
		type:"post",
		url:PageUrl,
		data:params,
		beforeSend: function (XMLHttpRequest){
		},
		success: function (data, textStatus){
			appendData(data.oForm.GOODS_LIST);
			var data_len = data.oForm.GOODS_LIST.length;
			if (data_len < page_size) 
			{
				hasMoreData = false;
				$("#pullUp").hide();
			} 
			else
			{
				hasMoreData = true;
				$("#pullUp").show();
			}
			myScroll.refresh();
			if (hasMoreData) {
				myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
			} else {
				myScroll.maxScrollY = myScroll.maxScrollY;
			}
			maxScrollY = myScroll.maxScrollY;
		},
		complete: function (XMLHttpRequest, textStatus){
		
		},
		error: function (){
			alert('error');
		}
	});
}

/**
*刷新
**/
function refresh() {
	page=1;
	var goodsIds =loadShopCardGoods();
	if(isEmpty( goodsIds ))
	{
		window.location.href=SITE_PATH+"/cart-empty.do"
	}
	var params ={ids: goodsIds};
	$.ajax({
		type:"post",
		url:PageUrl,
		data:params,
		beforeSend: function (XMLHttpRequest){
		},
		success: function (data, textStatus){
			$("#goods-list").html("");
			appendData(data.oForm.GOODS_LIST);
			var data_len = data.oForm.GOODS_LIST.length;
			if (data_len < page_size)
			{
				hasMoreData = false;
				$("#pullUp").hide();
			}
			else
			{
				hasMoreData = true;
				$("#pullUp").show();
			}
			myScroll.refresh();
			if (hasMoreData) {
				myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
			} else {
				myScroll.maxScrollY = myScroll.maxScrollY;
			}
			maxScrollY = myScroll.maxScrollY;
		},
		complete: function (XMLHttpRequest, textStatus){
		
		},
		error: function (){
			alert('error');
		}
	});
	calGoodsMoneyAndNum();
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

function delCartItem(id)
{
	$page_alert_tip.css("display","block");
	delGoodsId =id;
}

var orderParams ="";
// 计算总价格和总数量
function calGoodsMoneyAndNum()
{
	// price 
	var cart_total_money =parseFloat("0");
	var cart_total_num =0;
	var selectedGoods =$(".product_list .product_list_wrap input[type='checkbox']");
	$.each(selectedGoods,function(i,item){
		var $this =$(this);
		if($this.prop("checked"))
		{
			var goodsPrice =$this.attr("data-goods-price");
			goodsPrice =parseFloat( goodsPrice );
			var goodsId =$this.attr("data-goods-id");
			var goodsNum =$("#select_goods_"+goodsId).val();
			goodsNum =parseInt( goodsNum );
			var goodsMoney =(goodsPrice*10000*goodsNum)/10000;
			cart_total_money =(cart_total_money*10000+ goodsMoney*10000)/10000;
			cart_total_num +=parseInt( goodsNum );
			// params
			if(orderParams == "" )
			{
				orderParams +=goodsId+"@"+goodsNum;
			}
			else
			{
				orderParams +=","+goodsId+"@"+goodsNum;
			}
		}
	});
	$total_price.html("¥"+cart_total_money.toFixed(2));
	$total_goods_num.html("结算("+ cart_total_num +")");
}

function toOrderStep1()
{
	if(isEmpty( orderParams ))
	{
		alert("请先选中需要购买的商品");
		return ;
	}
	window.location.href =SITE_PATH +"/user/order/create-step1.do?goods="+orderParams;
	
}
