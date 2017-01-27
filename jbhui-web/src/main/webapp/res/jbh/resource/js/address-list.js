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