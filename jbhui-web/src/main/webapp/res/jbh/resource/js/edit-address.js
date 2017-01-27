/**
 * 
 */
var URI="/user/address/save.do";
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

var $provinceId =$("#provinceId");
var $cityId =$("#cityId");
var $zoneId =$("#zoneId");

var $submitAddress =$("#submitAddress");

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		if( curpage == "edit"){
			initEditPage();
		}
	});
}, false);

function changeProvince ( val ) {
	if( isEmpty( val ) )
	{
		return;
	}
	$cityId.html("<option value=\"\" selected>请选择...</option>");
	$zoneId.html("<option value=\"\" selected>请选择...</option>");
	// find city list
	for(var i =0; i< city_list.length; i++){
		var city =city_list[i];
		var cityPid =city.provinceId;
		console.log("---->>----->> cpid>>" + cityPid );
		if( val ==  cityPid )
		{
			var optionHtml ="<option value=\""+city.id+"\" >"+ city.name +"</option>";
			$cityId.append( optionHtml );
		}
	}
}


function changeCity( val ) {
	if( isEmpty( val ) )
	{
		return;
	}
	$zoneId.html("<option value=\"\" selected>请选择...</option>");
	// find zone list
	for(var i =0; i< zone_list.length; i++) {
		var zone =zone_list[i];
		var zoneCid =zone.cityId;
		console.log("---->>----->> zoneCid>>" + zoneCid );
		if( val ==  zoneCid )
		{
			var optionHtml ="<option value=\""+zone.id+"\" >"+ zone.name +"</option>";
			$zoneId.append( optionHtml );
		}
	}
}

function saveaddress()
{
	var receiverName =$("#receiverName").val();
	var provinceId =$("#provinceId").val();
	var cityId =$("#cityId").val();
	var zoneId =$("#zoneId").val();
	var addressDetail =$("#addressDetail").val();
	var receiverMobile =$("#receiverMobile").val();
	var defaultAddr =$("#defaultAddr").val();
	var addressId =$("#addressId").val();
	if( isEmpty( addressId ) )
	{
		addressId ="";
	}
	console.log("--------------->>"  + defaultAddr );
	var params ={id: addressId,receiveName: receiverName,receiveTel:receiverMobile,isDefault:defaultAddr,address: addressDetail, provinceId: provinceId ,cityId: cityId,regionId: zoneId};
	$.ajax({
		type:"post",
		url:PageUrl,
		data:params,
		beforeSend: function (XMLHttpRequest){
			$submitAddress.attr("disabled","disabled");
		},
		success: function (ovo, textStatus){
			if( ovo.code < 0 )
			{
				alert(ovo.msg );
			}
			window.location.href=SITE_PATH + "/user/address/list.do";
		},
		complete: function (XMLHttpRequest, textStatus){
			$submitAddress.removeAttr("disabled");
		},
		error: function (){
			$submitAddress.removeAttr("disabled");
		}
	});
}

/**
 * init 
 */
function initEditPage()
{
	console.log("..............init edit page............");
	$("#provinceId").val( curProvinceId );
	//load city list
	changeProvince( curProvinceId );
	$("#cityId").val( curCityId );
	//load zone list
	changeCity( curCityId );
	$("#zoneId").val( curZoneId );
	console.log("..............init edit page............");
}
