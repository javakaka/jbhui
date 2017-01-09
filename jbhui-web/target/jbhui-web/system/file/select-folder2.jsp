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
<script src="<%=basePath%>/res/js/xtree2.js"></script>
<link href="<%=basePath%>/res/css/diymen/tipswindown.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="<%=basePath%>/res/css/xtree2.css" />
<script type="text/javascript">
$().ready(function() {

	//[@flash_message /]
	addEventHandlers();
});
</script>
</head>
<body>
	<div class="path">
		选择文件夹
		<span></span>
	</div>
	<form id="listForm" action="" method="get">
		<div style="width:100%;height:95%;position: absolute;">
<div id="treeDiv" style="width:20%;float: left;">
	<input type="button" value="收起/展开" onclick="tree.toggle()"/>
	<input type="button" value="全部展开" onclick="tree.expandAll()"/>
	<input type="button" value="一级目录" onclick="tree.collapseChildren()"/>
	<input type="button" value="刷新目录" onclick="javascript:window.location.reload();"/>
<div class="webfx-tree-item" id="wfxt-2" >
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
		<div class="webfx-tree-children"
			style="display: none; background-position: -100px 0px;">
			<div class="webfx-tree-item" id="wfxt-5">
				<div class="webfx-tree-row" style="padding-left: 19px">
					<img class="webfx-tree-expand-icon" src="images/Tminus.png"/>
					<img class="webfx-tree-icon" src="images/0open_pic.gif"/>
					<a href='javascript:action(" b10004,1,总经办,0")' class="webfx-tree-item-label" tabindex="-1" >总经办</a>
				</div>
				<div class="webfx-tree-children"
					style="display: block; background-position: 19px 0px;">
					<div class="webfx-tree-item" id="wfxt-6">
						<div class="webfx-tree-row" style="padding-left: 38px">
							<img class="webfx-tree-expand-icon" src="images/Lplus.png" />
							<img class="webfx-tree-icon" src="images/1pic.gif"/>
							<a href='javascript:action(" 1,p10000,总经理,1")'class="webfx-tree-item-label" tabindex="-1" >总经理</a>
						</div>
						<div class="webfx-tree-children"
							style="display: none; background-position: -100px 0px;">
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
			<div class="webfx-tree-item" id="wfxt-8">
				<div class="webfx-tree-row" style="padding-left: 19px">
					<img class="webfx-tree-expand-icon" src="images/T.png"/>
					<img class="webfx-tree-icon" src="images/0pic.gif"/>
					<a href='javascript:action(" b10004,2,财务部,0")'class="webfx-tree-item-label" tabindex="-1" >财务部</a>
				</div>
				<div class="webfx-tree-children" style="background-position: 19px 0; display: none;"></div>
			</div>
			<div class="webfx-tree-item" id="wfxt-9">
				<div class="webfx-tree-row" style="padding-left: 19px">
					<img class="webfx-tree-expand-icon" src="images/Tminus.png"/>
					<img class="webfx-tree-icon" src="images/0open_pic.gif"/>
					<a href='javascript:action(" b10004,3,市场部,0")'class="webfx-tree-item-label" tabindex="-1" >市场部</a>
				</div>
				<div class="webfx-tree-children"
					style="display: block; background-position: 19px 0px;">
					<div class="webfx-tree-item" id="wfxt-10">
						<div class="webfx-tree-row" style="padding-left: 38px">
							<img class="webfx-tree-expand-icon" src="images/Lminus.png"/>
							<img class="webfx-tree-icon" src="images/0open_pic.gif"/>
							<a href='javascript:action(" 3,7,销售部,0")'class="webfx-tree-item-label"  tabindex="-1">销售部</a>
						</div>
						<div class="webfx-tree-children"
							style="display: block; background-position: -100px 0px;">
							<div class="webfx-tree-item" id="wfxt-11">
								<div class="webfx-tree-row" style="padding-left: 57px">
									<img class="webfx-tree-expand-icon" src="images/T.png"/>
									<img class="webfx-tree-icon" src="images/4pic.gif"/>
									<a href='javascript:action(" 7,s10006,李玉,4")'class="webfx-tree-item-label"  tabindex="-1">李玉</a>
								</div>
								<div class="webfx-tree-children" style="background-position: 57px 0; display: none;"></div>
							</div>
							<div class="webfx-tree-item" id="wfxt-12">
								<div class="webfx-tree-row" style="padding-left: 57px">
									<img class="webfx-tree-expand-icon" src="images/T.png"/>
									<img class="webfx-tree-icon" src="images/4pic.gif"/>
									<a href='javascript:action(" 7,s10007,房东租客管理员,4")'class="webfx-tree-item-label" tabindex="-1" >房东租客管理员</a>
								</div>
								<div class="webfx-tree-children"
									style="background-position: 57px 0; display: none;"></div>
							</div>
							<div class="webfx-tree-item" id="wfxt-13">
								<div class="webfx-tree-row" style="padding-left: 57px">
									<img class="webfx-tree-expand-icon" src="images/L.png"/>
									<img class="webfx-tree-icon" src="images/4pic.gif"/>
									<a href='javascript:action(" 7,s10008,房租宝中介版管理员,4")'class="webfx-tree-item-label" tabindex="-1" >房租宝中介版管理员</a>
								</div>
								<div class="webfx-tree-children" style="background-position: -100px 0; display: none;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="webfx-tree-item" id="wfxt-14">
				<div class="webfx-tree-row" style="padding-left: 19px">
					<img class="webfx-tree-expand-icon" src="images/Lplus.png"/>
					<img class="webfx-tree-icon" src="images/0pic.gif"/>
					<a href='javascript:action(" b10004,4,研发部,0")'class="webfx-tree-item-label" tabindex="-1" >研发部</a>
				</div>
				<div class="webfx-tree-children"
					style="display: none; background-position: -100px 0px;">
					<div class="webfx-tree-item" id="wfxt-15">
						<div class="webfx-tree-row" style="padding-left: 38px">
							<img class="webfx-tree-expand-icon" src="images/T.png"/>
							<img class="webfx-tree-icon" src="images/0pic.gif"/>
							<a href='javascript:action(" 4,5,开发部,0")' class="webfx-tree-item-label" tabindex="-1" >开发部</a>
						</div>
						<div class="webfx-tree-children" style="background-position: 38px 0; display: none;"></div>
					</div>
					<div class="webfx-tree-item" id="wfxt-16">
						<div class="webfx-tree-row" style="padding-left: 38px">
							<img class="webfx-tree-expand-icon" src="images/L.png"/>
							<img class="webfx-tree-icon" src="images/0pic.gif"/>
							<a href='javascript:action(" 4,6,测试部,0")'class="webfx-tree-item-label" tabindex="-1" >测试部</a>
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
	</form>
</body>
<script type="text/javascript">
function selectTarget(){
	var selectedId=$('input[name="ids"]:checked').val();
	var target=$('input[name="ids"]:checked').attr("title");
	window.parent.setSelectedWindow(selectedId,target);
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