/**
 * 
 */
var URI="/user/order/page-data.do";
//page 页码、pageSize 每页显示条数、id 当前用户Id
var PageUrl =SITE_PATH+URI;
var USER_ID =request("user_id");//
var FROM_USER =request("from_user");

// page
var OFFSET = 5;
var page = 1;
var pageSize = 5;
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
var maxScrollY = 0;
var hasMoreData = false;
var globalHeader =$("#globalHeader");

//status
var $status =$("#status");

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		initPageFuns();
		//loadData();
		initScroll()
		refresh();
	});
}, false);

//init 
function initPageFuns(){
	
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

	myScroll = new iScroll('wrapper-order-list', {
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
			html +="<div class=\"package_detail\">";
			html +="<p><em>"+item.CREATE_TIME.substring(0,10)+"</em><span class=\"amount\">￥"+item.MONEY+"</span></p>";
			html +="<a href=\"<%=basePath %>goods-detail.do?goodsId="+item.ID+"\" class=\"items a_link\">";
			html +="<ul>";
			if(isEmpty( item.FILE_PATH ))
			{
				html +="<li><img src=\"<%=basePath %>jbhpage/demo/resource/order-goods.jpg\"></li>";
			}
			else
			{
				html +="<li><img src=\""+item.FILE_PATH+"\"></li>";
			}
			html +="</ul>";
			html +="<span>(共"+item.TOTAL_GOODS_NUM+"件)</span>";
			html +="</a>";
			html +="<div class=\"order_info\">";
			html +="<div class=\"info\" onclick=\"toOrderDetailpage("+item.ID+")\">";
			html +="<span>订单号</span>";
			html +="<span>"+item.ORDER_NO+"</span>";
			html +="</div>";
			html +="</div>";
			html +="<div class=\"order_info\">";
			if(! isEmpty(item.STATE)  && item.STATE == 0)
			{
				html +="<div class=\"status\">";
				//html +="<em class=\"timer countDown\"><i class=\"hour\">23</i>:<i class=\"minute\">46</i>:<i class=\"seconds\">33</i></em>";
				html +="<a data-tpa=\"1490\" href=\""+SITE_PATH+"/user/order/detail.do?id="+item.ID+"\" class=\"btn_pay\">立即支付</a>";
				html +="</div>";
			}
			html +="</div>";
			html +="</div>";
		});
		$("#order-list").append(html);
	}
	else
	{
		if(page == 1)
		{
			html ="<div style='margin:0 auto;width:60%;text-align: center;'>暂无数据</div>";
			$("#order-list").html(html); 
		}
	}
}


/**
*下一页
**/
function nextPage() {
	page++;
	var params ={status: $status.val(),page:page,pageSize:pageSize};
	console.log("params -------------------->>" + params);
	$.ajax({
		type:"post",
		url:SITE_PATH+URI,
		data:params,
		beforeSend: function (XMLHttpRequest){
		},
		success: function (data, textStatus){
			appendData(data.oForm.ORDER_LIST);
			var data_len = data.oForm.ORDER_LIST.length;
			console.log("data len -------------------->>" + data_len);
			if (data_len < pageSize) 
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
	var params ={status: $status.val(),page:page,pageSize:pageSize};
	console.log("params -------------------->>" + params);
	$.ajax({
		type:"post",
		url:SITE_PATH+URI,
		data:params,
		beforeSend: function (XMLHttpRequest){
		},
		success: function (data, textStatus){
			$("#order-list").html("");
			appendData(data.oForm.ORDER_LIST);
			var data_len = data.oForm.ORDER_LIST.length;
			console.log("data len -------------------->>" + data_len);
			if (data_len < pageSize)
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

function toOrderDetailpage(id)
{
	
window.location.href=SITE_PATH+"/user/order/detail.do?id="+id;
}
