/**
 * 
 */
var URI="/goods-page.do";
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
// search 
var searchBox =$(".search_box");
var searchInput =$("#keyword");
var searchForm =$("#searchForm");
var searchDelBtn =$(".icon_delete");
var searchSubmitBtn =$("#searchBtn");
var searchSuggest =$("#searchSuggest");
var clearSearchHistory =$(".clear_history");
var searchMask =$("#searchMask");
var historyList =$("#history_list");

// order
var orderUl =$(".select");
var orderItems =$(".select li");
var orderBtn =$("#orderBtn");
var transFreeBtn =$("#transFreeBtn");
var discountBtn =$("#discountBtn");
var orderValue =$("#orderValue");

//cateId
var cateId =request("cateId");

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
	// load cookie
	renderSearchList();
	
	//init search
	searchInput.focus(function(){
	globalHeader.addClass("search_show");
		searchMask.css("display","block");
	});
	
	searchMask.click(function(){
		searchMask.css("display","none");
		globalHeader.removeClass("search_show");
	});
	
	searchSubmitBtn.click(function(){
		//save cookie
		var searchKeyword =searchInput.val();
		if( typeof  searchKeyword == "undefined" || searchKeyword == "" )
		{
			return;
		}
		search();
		setSearchCookie(searchKeyword);
		renderSearchList();
	});
	
	orderBtn.click(function(){
		orderBtn.toggleClass("cur");
		orderUl.toggle();
		//searchMask.css("display","block");
	});
	
	orderItems.click(function(){
		orderItems.removeClass("cur");
		$(this).addClass("cur");
		var linktype =$(this).attr("linktype");
		orderValue.val( linktype );
		if(linktype == "order_default"){
			orderBtn.html("综合排序<i></i>");
		}
		else if(linktype == "order_sale"){
			orderBtn.html("销量从高到低<i></i>");
		}
		else if(linktype == "order_price_up"){
			orderBtn.html("价格从低到高<i></i>");
		}
		else if(linktype == "order_price_down"){
			orderBtn.html("价格从高到低<i></i>");
		}
		refresh();
		orderBtn.toggleClass("cur");
		orderUl.toggle();
	});
	
	clearSearchHistory.click(function(){
		delSearchCookie();
		renderSearchList();
	});
	
	transFreeBtn.click(function(){
		refresh();
		orderBtn.removeClass("cur");
		orderUl.removeClass("cur");
		orderUl.css("display","none")
	});
	
	discountBtn.click(function(){
		refresh();
		orderBtn.removeClass("cur");
		orderUl.removeClass("cur");
		orderUl.css("display","none");
	});
}

function getTransFreeStatus()
{
	var state =transFreeBtn.attr('checked');
	if( state == "checked" || state == "true")
	{
		return "1";
	}
	else
	{
		return "";
	}
}

function getDiscountStatus()
{
	var state =discountBtn.attr('checked');
	if( state == "checked" || state == "true")
	{
		return "1";
	}
	else
	{
		return "";
	}
}

function loadSearchCookie()
{
	var hisKeywords =$.cookie('keyword');
	return hisKeywords;
}

function renderSearchList()
{
	var historyCookie =loadSearchCookie();
	if( typeof  historyCookie == "undefined" || historyCookie == "" || historyCookie == null || historyCookie == "null")
	{
		historyCookie ="";
	}
	var html ="";
	var hisArr =historyCookie.split(",");
	for( var i=0; i < hisArr.length; i++ )
	{
		if( hisArr[i] != "" )
		html +="<li><a class=\"link_text\" onclick=\"goSearch('"+hisArr[i]+"')\" href=\"javascript:void(0);\"><span class=\"icon gicon-history\"></span><span class=\"text\">"+hisArr[i]+"</span><span class=\"icon_arrow gicon-right_arrow\"></span></a></li>";
	}
	historyList.html( html );
}

function setSearchCookie(val)
{
	var hisKeywords =$.cookie('keyword');
	if( typeof  hisKeywords == "undefined" || hisKeywords == "" || hisKeywords == null || hisKeywords == "null")
	{
		hisKeywords =val;
	}
	else
	{
		var hisArr =hisKeywords.split(",");
		for( var i=0; i < hisArr.length; i++ )
		{
			if( hisArr[i] != "" && hisArr[i] != val)
				hisKeywords +=","+val;
		}
	}
	$.cookie('keyword', hisKeywords, { expires: 30 });
}

function delSearchCookie()
{
	$.cookie('keyword', null);
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

	myScroll = new iScroll('wrapper-goods-list', {
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
			html +="<li>";
			html +="<a href=\"goods-detail.do?goodsId="+item.ID+"\" class=\"item\">";
			html +="<div class=\"pic_box\">";
			html +="<img src="+SITE_PATH+"/res/jbh/resource/goods1.jpg>";
			html +="</div>";
			html +="<div class=\"middle\">";
			html +="<div class=\"title_box\">"+item.NAME+" "+item.WEIGHT+"/"+item.UNIT+"</div>";
			html +="<div class=\"active_box\"></div>";
			html +="</div>";
			html +="<div class=\"price_box\">";
			html +="<span class=\"new_price\">";
			html +="<small>¥</small><i>"+item.RAW_PRICE+"</i>";
			html +="</span>";
			html +="<span class=\"bug_car\" categoryid=\"34743\" pmid=\"962118\" buynum=\"1\" serial=\"0\" isonekeygo=\"0\" islpprod=\"0\" isoversea=\"0\" isyhd=\"1\" todetail=\"0\" merchantid=\"3\" productid=\"40929\" >";
			html +="<i class=\"icon-shop_cart\" onclick=\"addToShopCar('"+item.ID+"','1',event)\"></i>";
			html +="</span>";
			html +="</div>";
			html +="</a>";
			html +="<div class=\"recommend-box\" style=\"display: none;\"></div>";
			html +="</li>";
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

function search()
{
	page =1;
	// reset nav 
	orderBtn.html("综合排序<i></i>");
	orderItems.removeClass("cur")
	$(orderItems[0]).addClass("cur");
	orderBtn.removeClass("cur");
	transFreeBtn.removeAttr("checked");
	discountBtn.removeAttr("checked");
	orderValue.val("order_default");
	refresh();
}

function goSearch(key)
{
	searchInput.val(key);
	search();
}

function queryWithFilter()
{
	page =1;
	refresh();
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
			appendData(data.oForm.DATA);
			var data_len = data.oForm.DATA.length;
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
	var params ={typeId: cateId,page:page,pageSize:page_size,keyword: searchInput.val(), order: orderValue.val() ,transFree: getTransFreeStatus(),discount: getDiscountStatus()};
	$.ajax({
		type:"post",
		url:PageUrl,
		data:params,
		beforeSend: function (XMLHttpRequest){
		},
		success: function (data, textStatus){
			$("#goods-list").html("");
			appendData(data.oForm.DATA);
			var data_len = data.oForm.DATA.length;
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

function addToShopCar(goodsId,goodsNum,e)
{
	addGoodsToCart(goodsId,goodsNum);
	console.log("---------stop ---------");
	if(e.stopPropagation)
	{
		e.stopPropagation();
		e.preventDefault();
	}
	else e.cancelBubble=true;
}