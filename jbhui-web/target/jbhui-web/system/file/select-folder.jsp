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
<title><cc:message key="framework.nav.window" /></title>
<link href="<%=basePath%>/res/admin/css/common_pop.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/Http.js"></script>
<script src="<%=basePath%>/res/js/xtree2.js"></script>
<link href="<%=basePath%>/res/css/diymen/tipswindown.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="<%=basePath%>/res/css/xtree2.css" />
<script type="text/javascript">
var Current_Path =request("path");
var ParentDocumentTargetDomId =request("targetDomId");
$().ready(function() {

	//[@flash_message /]
	addEventHandlers();
	// init tree
	var path =request("path");
	console.log("--------------------->>"  + path);
	queryPreviewFoldersByPath( path );
	$("#targetDomId").val(ParentDocumentTargetDomId);
	$("#selectedDir").val(Current_Path);
});


/**
 * 查询指定路径下的所有直接子文件夹 
 * obj 被点击的图标节点
 * parent_path 当前选中的目录
 */
function queryFoldersByPath( parent_path ,obj){
	if (typeof parent_path =="undefined" || parent_path =="") {
		parent_path ="";
	}
	
	var treeItem =obj.parentNode.parentNode;
	var itemId =treeItem.getAttribute("id");
	var childrenId =itemId +"-children";
	var childrenNode =document.getElementById(childrenId);
	
	var params ={path: parent_path};
	var url="<%=basePath%>system/file/select-folder.do";
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		dataType: "json",
		cache: false,
		beforeSend: function (XMLHttpRequest){
		},
		success: function(ovo, textStatus) {
			var code =ovo.code;
			if(code >=0)
			{
				var folderList =ovo.oForm.FOLDER_DATA;
				var itemHtml ="";
				$.each(folderList, function (i,item){
					var dir_name =item;
					var dir_display_name ="";
					if(dir_name == "" )
					{
						dir_display_name ="我的电脑";
					}
					else
					{
						var fragments =dir_name.split("/");
						dir_display_name =fragments[ fragments.length -2 ];
					}
					itemHtml +="<div class=\"webfx-tree-item\" id=\"wfxt-"+TreeItemID+"\" >";
					
					// 计算padding 
					var treeRow =obj.parentNode;
					var itemLevel =treeRow.getAttribute("attrLevel");
					var dynNodeLevel =parseInt(itemLevel)+1;
					var paddingLeft =dynNodeLevel*19;
					//console.log("paddingLeft---------->>" +paddingLeft);
					var expand_icon ="";
					if ( Current_Path.indexOf(dir_name) != -1) {
						expand_icon ="images/Tminus.png";
					//console.log("path ——------------------》》"+dir_name);
					}
					else
					{
						expand_icon ="images/Lplus.png";
					}
					itemHtml +=" <div class=\"webfx-tree-row \" style=\"padding-left: "+ paddingLeft +"px\" attrVal=\""+dir_name+"\" attrLevel=\""+ dynNodeLevel +"\"> ";
					itemHtml +=" <img class=\"webfx-tree-expand-icon\" src=\"" + expand_icon + "\"  onclick=\"\expandHandler(this)\"/> ";
					itemHtml +=" <img class=\"webfx-tree-icon\" src=\"images/openfolder.png\" /> ";
					itemHtml +=" <a href=\"javascript:void(0)\" onclick=\"action('"+dir_name+"',this)\" class=\"webfx-tree-item-label\" >"+ dir_display_name +"</a> ";
					itemHtml +=" </div>";
					itemHtml +="<div class=\"webfx-tree-children\" style=\"display: block; background-position: -100px 0px;\"  id=\"wfxt-"+TreeItemID+"-children\" >";
					itemHtml +="</div>";
					itemHtml +="</div>";
					TreeItemID++;
				});
				
				childrenNode.innerHTML =itemHtml;
				//$("#table_items").html( itemHtml );
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
		},
		error: function (){
			$.message('error...');
		}
	});
	
}

/**
 * 查询指定路径下的所有直接子文件夹 
 */
function queryPreviewFoldersByPath( parent_path ){
	if (typeof parent_path =="undefined" || parent_path =="") {
		parent_path ="";
	}
	var params ={path: parent_path};
	var url="<%=basePath%>system/file/preview-folder.do?path="+parent_path;
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		dataType: "json",
		cache: false,
		beforeSend: function (XMLHttpRequest){
		},
		success: function(ovo, textStatus) {
			var code =ovo.code;
			if(code >=0)
			{
				var folderData =ovo.oForm.FOLDER_DATA;
				var treeHtml ="";
				var dir_name =folderData.dir_name;
				var childrenData =folderData.children;
				//alert( typeof childrenData);
				treeHtml =buildTreeItemHtml( folderData );
				$("#treeDiv").html( treeHtml );
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
		},
		error: function (){
			$.message('error...');
		}
	});
	
}

var TreeItemID =0;
var TreeItemLevel =0; // 节点层级，从0开始，每增加一个层级，+1 padding-left =TreeItemLevel*19 px

/**
 * 构建tree item
 */
function buildTreeItemHtml( folderData )
{
	var html ="";
	var dir_name =folderData.dir_name;
	var dir_display_name ="";
	if(dir_name == "" )
	{
		dir_display_name ="我的电脑";
	}
	else if(dir_name == "/" )
	{
		dir_display_name ="/";
	}
	else
	{
		var fragments =dir_name.split("/");
		dir_display_name =fragments[ fragments.length -2 ];
	}
	html +="<div class=\"webfx-tree-item\" id=\"wfxt-"+TreeItemID+"\" >";
	
	var paddingLeft =TreeItemLevel*19;
	//console.log("paddingLeft---------->>" +paddingLeft);
	var expand_icon ="";
	if ( Current_Path.indexOf(dir_name) != -1) {
		expand_icon ="images/Tminus.png";
	//console.log("path ——------------------》》"+dir_name);
	}
	else
	{
		expand_icon ="images/Lplus.png";
	}
	var isSelected ="";
	if( Current_Path == dir_name )
	{
		isSelected ="selected";
	}
	html +=" <div class=\"webfx-tree-row "+ isSelected +"\" style=\"padding-left: "+ paddingLeft +"px\" attrVal=\""+dir_name+"\" attrLevel=\""+ TreeItemLevel +"\"> ";
	//html +=" <img class=\"webfx-tree-expand-icon\" src=\"images/Lplus.png\"/> ";
	html +=" <img class=\"webfx-tree-expand-icon\" src=\"" + expand_icon + "\"  onclick=\"\expandHandler(this)\"/> ";
	html +=" <img class=\"webfx-tree-icon\" src=\"images/openfolder.png\" /> ";
	html +=" <a href=\"javascript:void(0)\" onclick=\"action('"+dir_name+"',this)\" class=\"webfx-tree-item-label\" >"+ dir_display_name +"</a> ";
	html +=" </div>";
	//html +=builderNodeChildrenHtml( folderData.children );
	html +="<div class=\"webfx-tree-children\" style=\"display: block; background-position: -100px 0px;\"  id=\"wfxt-"+TreeItemID+"-children\" >";
	TreeItemID ++; 
	TreeItemLevel =TreeItemLevel+1;
	$.each(folderData.children ,function(i,item){
		html +=buildTreeItemHtml(item);
	});
	// 结束一个children
	html +="</div>";
	TreeItemLevel =TreeItemLevel -1;
	// 结束一个item
	html +="</div>";
	return html;
}


/**
 * 构建tree item 子节点
 */
function builderNodeChildrenHtml(list){
	var html ="";
	html +="<div class=\"webfx-tree-children\" style=\"display: block; background-position: -100px 0px;\">";
	TreeItemLevel =TreeItemLevel+1;
	$.each(list ,function(i,item){
		html +=buildTreeItemHtml(item);
	});
	html +="</div>";
	TreeItemLevel =TreeItemLevel -1;
	return html;
	
}


/**
 * 给tree 赋值事件处理
 */
function expandHandler(obj){
	var imgUrl =obj.getAttribute("src");
	var plusImgUrl ="images/Lplus.png";
	var minusImgUrl ="images/Tminus.png";
	if (imgUrl == plusImgUrl) {
		// 展开 ，显示子节点
		obj.setAttribute("src",minusImgUrl);
		var treeItem =obj.parentNode.parentNode;
		var itemId =treeItem.getAttribute("id");
		var childrenId =itemId +"-children";
		var childrenNode =document.getElementById(childrenId);
		childrenNode.style.display ="block";
		// 如果当前子节点的内容为空，则从后台拉取数据
		if( ! childrenNode.hasChildNodes() )
		{
			var treeRow =obj.parentNode;
			var currentRowDir =treeRow.getAttribute("attrVal");
			//alert('no data ...'+currentRowDir);
			queryFoldersByPath( currentRowDir,obj );
		}
	}
	else if (imgUrl == minusImgUrl) {
		// 收起，隐藏子节点
		obj.setAttribute("src",plusImgUrl);
		var treeItem =obj.parentNode.parentNode;
		var itemId =treeItem.getAttribute("id");
		var childrenId =itemId +"-children";
		var childrenNode =document.getElementById(childrenId);
		childrenNode.style.display ="none";
	}
	
}

/**
 * 处理节点点击事件
 * 设置选中状态
 * 设置被选中的目录
 */
function action(dir,obj){
	if (typeof dir =="undefined") {
		dir ="";
	}
	$("#selectedDir").val(dir);
	//设置选中状态
	$(".webfx-tree-row ").removeClass("selected");
	$(obj).parent().addClass("selected");
}

/**
 * 新建文件夹事件
 */
function createNewFolder()
{
	// 找到当前被选中的节点
	var selectedRow =$("div .webfx-tree-row.selected");
	// show children 
	$(selectedRow).find(".webfx-tree-expand-icon").attr("src","images/Tminus.png");
	var treeItem =$(selectedRow).parent();
	var itemId =treeItem.attr("id");
	var childrenId =itemId +"-children";
	var childrenNode =document.getElementById(childrenId);
	childrenNode.style.display="block";
	// 构建一个新的节点
	var itemHtml ="";
	itemHtml +="<div class=\"webfx-tree-item\" id=\"wfxt-"+TreeItemID+"\" >";
	
	// 计算padding 
	var itemLevel =$(selectedRow).attr("attrLevel");
	var dynNodeLevel =parseInt(itemLevel)+1;
	var paddingLeft =dynNodeLevel*19;
	//console.log("paddingLeft---------->>" +paddingLeft);
	var expand_icon ="images/Lplus.png";
	itemHtml +=" <div class=\"webfx-tree-row \" style=\"padding-left: "+ paddingLeft +"px\" > ";
	itemHtml +=" <img class=\"webfx-tree-expand-icon\" src=\"" + expand_icon + "\"  /> ";
	itemHtml +=" <img class=\"webfx-tree-icon\" src=\"images/openfolder.png\" /> ";
	itemHtml +=" <input type=\"text\" class=\"webfx-tree-item-label\" value=\"新建文件夹\" id=\"new-folder-name\"></input> ";
	itemHtml +=" <input type=\"button\" class=\"webfx-tree-item-label\" value=\"确认\" onclick=\"saveNewFolder(this)\"></input> ";
	itemHtml +=" <input type=\"button\" class=\"webfx-tree-item-label\" value=\"取消\" onclick=\"cancelCreateNewFolder(this)\"></input> ";
	itemHtml +=" </div>";
	itemHtml +="<div class=\"webfx-tree-children\" style=\"display: block; background-position: -100px 0px;\"  id=\"wfxt-"+TreeItemID+"-children\" >";
	itemHtml +="</div>";
	itemHtml +="</div>";
	TreeItemID++;
	$(childrenNode).append(itemHtml);
	document.getElementById("new-folder-name").focus();
	//$(selectedRow).parent().
}

function saveNewFolder( obj )
{
	var folderName =document.getElementById("new-folder-name").value;
	if( typeof folderName == "undefined" || folderName == "")
	{
		$.message("error","请输入文件夹名称");
		document.getElementById("new-folder-name").focus();
	}
	// find full path 
	var treeItem =obj.parentNode.parentNode;
	var selectedRow =$("div .webfx-tree-row.selected");
	var parentPath =selectedRow.attr("attrval");
	var parentLevel =selectedRow.attr("attrlevel");
	var newFolderPath =parentPath+folderName+"/";
	//alert( newFolderPath );
	
	var params ={path: newFolderPath};
	var url="<%=basePath%>/system/file/create-folder.do";
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		dataType: "json",
		cache: false,
		beforeSend: function (XMLHttpRequest){
		},
		success: function(ovo, textStatus) {
			var code =ovo.code;
			if(code >=0)
			{
				cancelCreateNewFolder( obj );
				// new node
				var itemHtml ="";
				var dir_name =newFolderPath;
				var dir_display_name ="";
				if(dir_name == "" )
				{
					dir_display_name ="我的电脑";
				}
				else
				{
					var fragments =dir_name.split("/");
					dir_display_name =fragments[ fragments.length -2 ];
				}
				itemHtml +="<div class=\"webfx-tree-item\" id=\"wfxt-"+TreeItemID+"\" >";
				
				// 计算padding 
				var dynNodeLevel =parseInt(parentLevel)+1;
				var paddingLeft =dynNodeLevel*19;
				//console.log("paddingLeft---------->>" +paddingLeft);
				var expand_icon ="images/Lplus.png";
				itemHtml +=" <div class=\"webfx-tree-row \" style=\"padding-left: "+ paddingLeft +"px\" attrVal=\""+dir_name+"\" attrLevel=\""+ dynNodeLevel +"\"> ";
				itemHtml +=" <img class=\"webfx-tree-expand-icon\" src=\"" + expand_icon + "\"  onclick=\"\expandHandler(this)\"/> ";
				itemHtml +=" <img class=\"webfx-tree-icon\" src=\"images/openfolder.png\" /> ";
				itemHtml +=" <a href=\"javascript:void(0)\" onclick=\"action('"+dir_name+"',this)\" class=\"webfx-tree-item-label\" >"+ dir_display_name +"</a> ";
				itemHtml +=" </div>";
				itemHtml +="<div class=\"webfx-tree-children\" style=\"display: block; background-position: -100px 0px;\"  id=\"wfxt-"+TreeItemID+"-children\" >";
				itemHtml +="</div>";
				itemHtml +="</div>";
				
				var selectedRow =$("div .webfx-tree-row.selected");
				// show children 
				$(selectedRow).find(".webfx-tree-expand-icon").attr("src","images/Tminus.png");
				var treeItem =$(selectedRow).parent();
				var itemId =treeItem.attr("id");
				var childrenId =itemId +"-children";
				var childrenNode =document.getElementById(childrenId);
				$(childrenNode).append(itemHtml);
				TreeItemID++;
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
		},
		error: function (){
			$.message('error...');
		}
	});
}

function cancelCreateNewFolder( obj )
{
	
	var treeItem =obj.parentNode.parentNode;
	treeItem.parentNode.removeChild(treeItem);
}


</script>
<style type="">
.tree-wrapper {
    width: 100%;
    min-height: 400px;
    top: 0px;
    bottom: 62px;
    position: absolute;
    overflow-y: scroll;
}

.bottom {
    height: 62px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    border: 1px solid #c1bfbf;
}

.dir-value{
    width: 100%;
    height: 25px;
    padding-top: 5px;
    border-bottom: 1px solid #8c8585;
}
.selected-dir {
	width: 400px;
}
.new-folder-btn {
	width: 80px;
    border: 1px solid #8c8585;
    text-align: center;
    height: 22px;
    line-height: 22px;
}
</style>
</head>
<body>
	<form id="listForm" action="" method="get">
		<input type="hidden" value="" id="targetDomId"/>
	<div class="tree-wrapper">
	<!-- 
		<input type="button" value="收起/展开" onclick="tree.toggle()"/>
		<input type="button" value="全部展开" onclick="tree.expandAll()"/>
		<input type="button" value="一级目录" onclick="tree.collapseChildren()"/>
		<input type="button" value="刷新目录" onclick="javascript:window.location.reload();"/>
		-->
		<div id="treeDiv" style="width:20%;float: left;">
			<div class="webfx-tree-item" id="wfxt-0" >
			<div class="webfx-tree-row selected" style="padding-left: 0px">
				<img class="webfx-tree-expand-icon" src="images/Lplus.png"/>
				<img class="webfx-tree-icon" src="images/openfolder.png" />
				<a href="javascript:action()" class="webfx-tree-item-label" >我的电脑</a>
			</div>
			<div class="webfx-tree-children" style="display: block; background-position: -100px 0px;">
				<div class="webfx-tree-item" id="wfxt-4">
					<div class="webfx-tree-row" style="padding-left: 19px">
						<img class="webfx-tree-expand-icon" src="images/Lplus.png"/>
						<img class="webfx-tree-icon" src="images/openfolder.png"/>
						<a href='javascript:action(" -1,b10004,本地磁盘(C:),0")' class="webfx-tree-item-label" tabindex="-1">本地磁盘(C:)</a>
					</div>
					<div class="webfx-tree-children" style="display: none; background-position: -100px 0px;">
						<div class="webfx-tree-item" id="wfxt-5">
							<div class="webfx-tree-row" style="padding-left: 19px">
								<img class="webfx-tree-expand-icon" src="images/Tminus.png"/>
								<img class="webfx-tree-icon" src="images/0open_pic.gif"/>
								<a href='javascript:action(" b10004,1,总经办,0")' class="webfx-tree-item-label" tabindex="-1" >总经办</a>
							</div>
							<div class="webfx-tree-children" style="display: block; background-position: 19px 0px;">
								<div class="webfx-tree-item" id="wfxt-6">
									<div class="webfx-tree-row" style="padding-left: 38px">
										<img class="webfx-tree-expand-icon" src="images/Lplus.png" />
										<img class="webfx-tree-icon" src="images/1pic.gif"/>
										<a href='javascript:action(" 1,p10000,总经理,1")'class="webfx-tree-item-label" tabindex="-1" >总经理</a>
									</div>
									<div class="webfx-tree-children" style="display: none; background-position: -100px 0px;">
										<div class="webfx-tree-item" id="wfxt-7">
											<div class="webfx-tree-row" style="padding-left: 57px">
												<img class="webfx-tree-expand-icon" src="images/L.png"/>
												<img class="webfx-tree-icon" src="images/4pic.gif"/>
												<a href='javascript:action(" p10000,s10003,超级管理员,4")'class="webfx-tree-item-label" tabindex="-1" >超级管理员</a>
											</div>
											<div class="webfx-tree-children" style="background-position: -100px 0; display: none;"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="bottomDiv" class="bottom">
		<div id="selectedValueDiv" class="dir-value">
		<label>文件夹(F):</label>
			<input type="text" readonly="readonly" class="selected-dir" value="" id="selectedDir"/>
		</div>
		<div id="newFolderDiv" class="dir-value">
			<div id="newFolderBtn" class="new-folder-btn" onclick="createNewFolder()">新建文件夹</div>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
function selectTarget(){
	var path=$('#selectedDir').val();
	var parentTargetDomId =$("#targetDomId").val( );
	window.parent.setSelectedPath(path,parentTargetDomId);
	window.parent.closeTipWindow();
}

function closeFrame()
{
	window.parent.setSelectedImg();
	window.parent.closeTipWindow();
}

function addEventHandlers()
{
	var win_box =window.parent.document.getElementById("windown-box");
	var is_window_bottom_existed =window.parent.document.getElementById("window-bottom");
	if(typeof is_window_bottom_existed =="undefined" || is_window_bottom_existed == null || is_window_bottom_existed == "")
	{
		var b_div =window.parent.document.createElement("div");
		b_div.id="window-bottom";
		//b_div.style.width="";
		b_div.style.height="30px";
		b_div.style.border="1px solid #BDB9BA";
		b_div.style.marginRight="10px";
		
		var html="<div style=\"float:right;\"><input type=\"button\" name=\"submitBtn\" id=\"submitBtn\" value=\"确定\" class=\"button\" onclick=\"iframeSelectTarget()\"/></div>";
			html+="<div style=\"float:right;\"><input type=\"button\" name=\"closeBtn\" id=\"closeBtn\" value=\"取消\"  class=\"button\" onclick=\"closeTipWindow()\"/></div>";
		b_div.innerHTML=html;
		win_box.appendChild(b_div);
	}
}
</script>
</html>