<%@ page language="java" import="java.util.*" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>订单列表</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/list.js"></script>
<style type="text/css">
.moreTable th {
	width: 80px;
	line-height: 25px;
	padding: 5px 10px 5px 0px;
	text-align: right;
	font-weight: normal;
	color: #333333;
	background-color: #f8fbff;
}

.moreTable td {
	line-height: 25px;
	padding: 5px;
	color: #666666;
}

.promotion {
	color: #cccccc;
}

<!--  订单商品-->
.show-order-item {
display: block;
}

.hiden-order-item {
display: none;
}
</style>
<script type="text/javascript">
$().ready(function() {

	${flash_message}

	var $listForm = $("#listForm");
	var $moreButton = $("#moreButton");
	var $filterSelect = $("#filterSelect");
	var $filterOption = $("#filterOption a");
	var $exportButton = $("#exportButton");
	
	// 更多选项
	$moreButton.click(function() {
		$.dialog({
			title: "更多选项",
			content:'<table id="moreTable" class="moreTable">'
					+'<tr>'
					+'<th>111:<\/th>'
					+'<td>'
					+'<select name="productCategoryId">'
					+'<option value="">请选择...<\/option>'
					+'<option value="1" selected="selected">11<\/option>'
					+'<option value="2" >22<\/option><option value="3" >33<\/option>'
					+'<\/select>'
					+'<\/td>'
					+'<\/tr>'
					+'<\/table>',
			width: 470,
			modal: true,
			ok: "ok",
			cancel: "cancel",
			onOk: function() {
				$("#moreTable :input").each(function() {
					var $this = $(this);
					$("#" + $this.attr("name")).val($this.val());
				});
				$listForm.submit();
			}
		});
	});
	
	// 商品筛选
	$filterSelect.mouseover(function() {
		var $this = $(this);
		var offset = $this.offset();
		var $menuWrap = $this.closest("div.menuWrap");
		var $popupMenu = $menuWrap.children("div.popupMenu");
		$popupMenu.css({left: offset.left, top: offset.top + $this.height() + 2}).show();
		$menuWrap.mouseleave(function() {
			$popupMenu.hide();
		});
	});
	
	// 筛选选项
	$filterOption.click(function() {
		var $this = $(this);
		var $dest = $("#" + $this.attr("name"));
		if ($this.hasClass("checked")) {
			$dest.val("");
		} else {
			$dest.val($this.attr("val"));
		}
		$listForm.submit();
		return false;
	});
	
	$exportButton.click(function(){
		
		exportExcel();
	});

});


function exportExcel()
{
	/* var depart_id=$('#depart_id').val(); 
	var user_id=$('#user_id').val(); 
	var start_date=$('#start_date').val(); 
	var end_date=$('#end_date').val(); */
	var url ="<%=basePath%>/jbhpage/platform/order/profile/export-order.do?";
	/* url +="&user_id="+user_id; */	
	window.open(url);
}


function showOrderItems(order_id)
{
	// 显示对应的订单明细，同时隐藏其他订单的明细
	var div_id ="#item_div_"+order_id;
	var div_name ="order_item_div";
	$("[name='order_item_div']").hide();
	$(div_id).show();
	var url ="<%=basePath%>/jbhpage/platform/order/item/list-by-order-id.do"
	var params ={order_id : order_id};
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		dataType: "json",
		cache: false,
		beforeSend: function (XMLHttpRequest){
			//alert('.....');
		},
		success: function(ovo, textStatus) {
			var code =ovo.code;
			if(code >=0)
			{
				var item_list =ovo.oForm.ITEMS;
				var cdiv_id ="#order_item_div_content_"+order_id;
				var html="";
				html +="<thead><tr > <td>商品名称</td><td>数量</td><td>价格</td><td>小记</td></tr><thead>"
				html +="<tbody>";
				$.each(item_list, function (i , item ){
					//alert(item + i);
					html +="<tr>";
					html +="<td>"+item.GOODS_NAME+"</td>";
					html +="<td>"+item.GOODS_NUM+"</td>";
					html +="<td>"+item.GOODS_PRICE+"</td>";
					html +="<td>"+item.GOODS_MONEY+"</td>";
					html +="<／tr>";
				});
				html +="</tbody>";
				//html+="</table>";
				//alert(html);
				//alert(cdiv_id);
				$(cdiv_id).html("");
				$(cdiv_id).append(html);
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
			//alert("complete...");
		},
		error: function (){
			alert('error...');
		}
	});
}


function saveOrder(id)
{
	// 支付方式 支付状态 配送人 配送状态	
	var pay_type =$("#pay_type_"+id).val();
	var state =$("#order_state_"+id).val();
	var delivery_id =$("#select_deliver_"+id).val();
	var transfer_state =$("#tranfer_state_"+id).val();
	alert(pay_type + state + delivery_id + transfer_state);
	var url ="<%=basePath%>/jbhpage/platform/order/profile/update-ajax.do";
	var params ={id : id,state: state, delivery_id : delivery_id, transfer_state : transfer_state};
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		dataType: "json",
		cache: false,
		beforeSend: function (XMLHttpRequest){
			//alert('.....');
		},
		success: function(ovo, textStatus) {
			var code =ovo.code;
			if(code >=0)
			{
//				alert("保存成功");
				$.message("success","保存成功");
				window.location.reload();
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
			//alert("complete...");
		},
		error: function (){
			alert('error...');
		}
	});
}
</script>

</head>
<body>
	<div class="path">
		订单管理 &raquo;订单列表
		<span><cc:message key="admin.page.total" args="${page.total}"/></span>
	</div>
	<form id="listForm" action="list.do" method="get">
		<div class="bar">
			<!--
			<a href="add.do" class="iconButton">
				<span class="addIcon">&nbsp;</span><cc:message key="admin.common.add" />
			</a>
			-->
			<div class="buttonWrap">
				<a href="javascript:;" id="deleteButton" class="iconButton disabled">
					<span class="deleteIcon">&nbsp;</span><cc:message key="admin.common.delete" />
				</a>
				<a href="javascript:;" id="refreshButton" class="iconButton">
					<span class="refreshIcon">&nbsp;</span><cc:message key="admin.common.refresh" />
				</a>
				<!-- 
				<div class="menuWrap">
					<a href="javascript:;" id="filterSelect" class="button">
						筛选<span class="arrow">&nbsp;</span>
					</a>
					<div class="popupMenu">
						<ul id="filterOption" class="check">
							<li>
								<a href="javascript:;" name="SEX" val="0" <c:if test="${SEX == '1'}"> class="checked" </c:if> >男</a>
							</li>
							<li>
								<a href="javascript:;" name="SEX" val="1" <c:if test="${SEX == '2'}"> class="checked" </c:if> >女</a>
							</li>
							
						</ul>
					</div>
				</div>
				-->
				<div class="menuWrap">
					<a href="javascript:;" id="pageSizeSelect" class="button">
						<cc:message key="admin.page.pageSize" /><span class="arrow">&nbsp;</span>
					</a>
					<div class="popupMenu">
						<ul id="pageSizeOption">
							<li>
								<a href="javascript:;" <c:if test="${page.pageSize == 10}">class="current"</c:if> val="10" >10</a>
							</li>
							<li>
								<a href="javascript:;" <c:if test="${page.pageSize == 20}">class="current"</c:if> val="20">20</a>
							</li>
							<li>
								<a href="javascript:;" <c:if test="${page.pageSize == 50}"> class="current"</c:if>val="50">50</a>
							</li>
							<li>
								<a href="javascript:;"  <c:if test="${page.pageSize == 100}">class="current"</c:if>val="100">100</a>
							</li>
						</ul>
					</div>
					<a href="javascript:;" id="exportButton" class="iconButton">
						<span class="refreshIcon">&nbsp;</span>导出数据
					</a>
				</div>
			</div>
			<div class="menuWrap">
				<div class="search">
					<span id="searchPropertySelect" class="arrow">&nbsp;</span>
					<input type="text" id="searchValue" name="searchValue" value="${page.searchValue}" maxlength="200" />
					<button type="submit">&nbsp;</button>
				</div>
				<div class="popupMenu">
					<ul id="searchPropertyOption">
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'ORDER_NO'}"> class="current"</c:if> val="ORDER_NO">订单编号</a>
						</li>
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'USERNAME'}">class="current"</c:if> val="USERNAME">用户名</a>
						</li>
						<li>
							<a href="javascript:;" <c:if test="${page.searchProperty == 'TELEPHONE'}">class="current"</c:if> val="TELEPHONE">用户手机号</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<table id="listTable" class="list" style="width: 1500px;">
			<tr>
				<th class="check">
					<input type="checkbox" id="selectAll" />
				</th>
				<th>
					<a href="javascript:;" class="sort" name="ORDER_NO">订单编号</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="USERNAME">用户姓名</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="TELEPHONE">用户手机</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="ORDER_TYPE">订单类型</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="MONEY">订单金额</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="PAY_MONEY">已支付金额</a>
				</th>
				<!--
				<th>
					<a href="javascript:;" class="sort" name="RETURN_MONEY">退款金额</a>
				</th>
				-->
				<th>
					<a href="javascript:;" class="sort" name="PAY_TYPE">支付方式</a>
				</th>
				<th>
					<a href="javascript:;" class="sort" name="STATE">支付状态</a>
				</th>
				<th>
					<a href="javascript:;" >订单备注</a>
				</th>
				
				<th>
					<a href="javascript:;" >配送地址</a>
				</th>
				<!-- 
				<th>
					<a href="javascript:;" >配送人</a>
				</th>
				
				<th>
					<a href="javascript:;" class="sort" name="TRANSFER_STATE">配送状态</a>
				</th>
				-->
				<th>
					<a href="javascript:;" class="sort" name="CREATE_TIME">创建时间</a>
				</th>
				<th>
					<span><cc:message key="admin.common.handle" /></span>
				</th>
			</tr>
			<c:forEach items="${page.content}" var="row" varStatus="status">
				<tr onclick="showOrderItems('${row.ID}')">
					<td>
						<input type="checkbox" name="ids" value="${row.ORDER_ID}" />
					</td>
					<td>
						<span title="${row.ORDER_NO}">${row.ORDER_NO}</span>
					</td>
					<td>
						<span title="${row.USERNAME}">${row.USERNAME}</span>
					</td>
					<td>
						<span title="${row.TELEPHONE}">${row.TELEPHONE}</span>
					</td>
					
					<td>
						<c:choose>
							<c:when test="${row.ORDER_TYPE == 1}">在线支付</c:when>
							<c:when test="${row.ORDER_TYPE == 2}">货到付款</c:when>
							<c:when test="${row.ORDER_TYPE == 3}">水票支付</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
					</td>
					<td>
						<span title="${row.MONEY}">${row.MONEY}</span>
					</td>
					<td>
						<span title="${row.PAY_MONEY}">${row.PAY_MONEY}</span>
					</td>
					<td>
					<!-- 
						<c:choose>
							 <c:when test="${row.PAY_TYPE == 1}">账户余额支付</c:when> 
							<c:when test="${row.PAY_TYPE == 2}">支付宝支付</c:when>
							 <c:when test="${row.PAY_TYPE == 3}">银行卡支付</c:when> 
							<c:when test="${row.PAY_TYPE == 5}">水票付款</c:when>
							<c:when test="${row.PAY_TYPE == 4}">货到付款</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
						-->
						微信支付
						<!-- 
						<select id="pay_type_${row.ID }">
						<c:choose>
							<c:when test="${row.PAY_TYPE == 2}">
								<option value="2" selected> 支付宝支付 </option>
								<option value="5" > 水票支付 </option>
								<option value="4" > 货到付款 </option>
							</c:when>
							<c:when test="${row.PAY_TYPE == 5}">
								<option value="2" > 支付宝支付 </option>
								<option value="5" selected> 水票支付 </option>
								<option value="4" > 货到付款 </option>
							</c:when>
							<c:when test="${row.PAY_TYPE == 4}">
								<option value="2" > 支付宝支付 </option>
								<option value="5" > 水票支付 </option>
								<option value="4" selected> 货到付款 </option>
							</c:when>
							<c:otherwise>
								<option value="" > 等待付款 </option>
								<option value="2" > 支付宝支付 </option>
								<option value="5" > 水票支付 </option>
								<option value="4" > 货到付款 </option>
							</c:otherwise>
						</c:choose>
						</select>
						-->
					</td>
					<td>
						<select id="order_state_${row.ID }">
							<c:choose>
							<c:when test="${row.STATE == 0}">
								<option value="0" selected>待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == 1}">
								<option value="0" >待付款</option>
								<option value="1" selected>已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == 2}">
								<option value="0" >待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" selected>已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == 3}">
								<option value="0" >待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" selected>已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == 4}">
								<option value="0" >待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" selected>申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == 5}">
								<option value="0" >待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" selected>退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == 6}">
								<option value="0" >待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" selected>已退款</option>
								<option value="-1" >已取消</option>
							</c:when>
							<c:when test="${row.STATE == -1}">
								<option value="0" >待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" selected>已取消</option>
							</c:when>
							<c:otherwise>
								<option value="0" selected>待付款</option>
								<option value="1" >已付款未到账</option>
								<option value="2" >已到账待收货</option>
								<option value="3" >已收货</option>
								<option value="4" >申请退款</option>
								<option value="5" >退款未到账</option>
								<option value="6" >已退款</option>
								<option value="-1" >已取消</option>
							</c:otherwise>
						</c:choose>
						</select>
						<!-- 
						<c:choose>
							<c:when test="${row.STATE == 0}">待付款</c:when>
							<c:when test="${row.STATE == 1}">已付款未到账</c:when>
							<c:when test="${row.STATE == 2}">已到账待收货</c:when>
							<c:when test="${row.STATE == 3}">已收货</c:when>
							<c:when test="${row.STATE == 4}">申请退款</c:when>
							<c:when test="${row.STATE == 5}">退款未到账</c:when>
							<c:when test="${row.STATE == 6}">已退款</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
						-->
					</td>
					<td>
						<span title="${row.ORDER_MESSAGE}">${row.ORDER_MESSAGE}</span>
					</td>
					<td>
						<span title="${row.RECEIVE_NAME}">${row.RECEIVE_NAME} - ${row.ADDRESS} ${row.RECEIVE_TEL} ${row.ZIP_CODE}</span>
					</td>
					<!-- 
					<td>
						<select id="select_deliver_${row.ID }">
							<c:forEach items="${deliver_list}" var="deliver" varStatus="status">
								<c:choose>
									<c:when test="${row.deliver == row.DELIVERY_ID}">
										<option value="${deliver.ID }" selected>${deliver.NAME}</option>
									</c:when>
									<c:otherwise>
										<option value="${deliver.ID }">${deliver.NAME}</option>
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</select>
					</td>
					
					<td>
						<c:choose>
							<c:when test="${row.TRANSFER_STATE == 0}">未配送</c:when>
							<c:when test="${row.TRANSFER_STATE == 1}">配送中</c:when>
							<c:when test="${row.TRANSFER_STATE == 2}">配送完成</c:when>
							<c:otherwise>--</c:otherwise>
						</c:choose>
						
						<select id="tranfer_state_${row.ID }">
							<c:choose>
							<c:when test="${row.TRANSFER_STATE == 0}">
								<option value="0" selected>未配送</option>
								<option value="1" >配送中</option>
								<option value="2" >配送完成</option>
							</c:when>
							<c:when test="${row.TRANSFER_STATE == 1}">
								<option value="0" >未配送</option>
								<option value="1" selected>配送中</option>
								<option value="2" >配送完成</option>
							</c:when>
							<c:when test="${row.TRANSFER_STATE == 2}">
								<option value="0" >未配送</option>
								<option value="1" >配送中</option>
								<option value="2" selected>配送完成</option>
							</c:when>
							<c:otherwise>
								<option value="0" selected>未配送</option>
								<option value="1" >配送中</option>
								<option value="2" >配送完成</option>
							</c:otherwise>
						</c:choose>
						</select>
					</td>
						-->
					<td>
						${row.CREATE_TIME}
					</td>
					<td>
						<a href="edit.do?id=${row.ID}"><cc:message key="admin.common.edit" /></a>
						<a href="javascript:void(0);" onclick="openTabFromTopWindow('${row.ORDER_NO}','ORDER_NO')">明细</a>
						<!-- 
						<a href="javascript:void(0);" onclick="saveOrder('${row.ID}')">保存</a>
						-->
						<a href="print.do?id=${row.ID}">打印</a>
						<!--<a href="edit.do?id=${row.ID}"><cc:message key="admin.common.edit" /></a>-->
						<!--<a href="#" target="_blank"><cc:message key="admin.common.view" /></a>-->
					</td>
				</tr>
				<!-- 订单商品 -->
				<tr id="item_div_${row.ID }" name="order_item_div" class="hiden-order-item">
				<td colspan="15">
					<div style="    border: 1px solid #595D5B;">
						订单商品
					<table id="order_item_div_content_${row.ID }">
						
					</table>
					</div>
				</td>
				</tr>
			</c:forEach>
		</table>
		<%@ include file="/include/pagination.jsp" %> 
	</form>
<script type="text/javascript">

function openTabFromTopWindow(searchValue,searchProperty)
{
	var url ="<%=basePath%>/jbhpage/platform/order/item/list.do";
	if(typeof searchValue != "undefined" && searchValue !="")
	{
		url +="?searchValue="+searchValue;
		if(typeof searchProperty != "undefined" && searchProperty !="")
		{
			url +="&searchProperty="+searchProperty;
		}
	}
	var title="订单明细";
	var tab_pic_index ='1';
	var tabId ='fun_nav_order_items_of_paimai';
	var tabIcon ="";
	var iFrame =top.frames["iframe"];
	iFrame.addadd(url,title,tabId,tabIcon);
}
</script>
</body>
</html>