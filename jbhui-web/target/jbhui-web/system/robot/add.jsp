<%@ page language="java" import="java.util.*" pageEncoding="utf-8"
	isELIgnored="false"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/cctaglib" prefix="cc"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>代码生成器</title>
<link href="<%=basePath%>/res/admin/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/res/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/jquery.validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/input.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=basePath%>/res/css/diymen/tipswindown.js?version=1.4"></script>
<script type="text/javascript" src="<%=basePath%>/res/js/Map.js"></script>
<link href="<%=basePath%>/res/css/diymen/tipswindown.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$().ready(function() {
	var $inputForm = $("#inputForm");
	//[@flash_message /]
	// 表单验证
	$inputForm.validate({
		rules: {
		}
	});
	
});

/**
 * 弹出框 确认按钮事件
 */
function iframeSelectTarget()
{
	window.frames["selectSystemFolderIframeId"].selectTarget();
	
}

/**
 * 点击弹出框的确认按钮，将返回路径赋值到指定到节点
 */
function setSelectedPath(path,target)
{
	$("#"+target).val(path);
}

//获取指定数据库里面的表
function queryTablesFromDataBase()
{
	var db_id =$("#curDatabase").val();
	if( typeof db_id == "undefined" || db_id==""){
		
		alert("请选择数据库或者新建数据库!");
		return false;
	}
	var params ={id: db_id};
	var url ="<%=basePath%>" +"system/robot/database/query-tables.do";
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
				var tableList =ovo.oForm.TABLE_LIST;
				var itemHtml ="";
				$.each(tableList, function (i,item){
					itemHtml +="<div class=\"table-item\" onclick=\"tableClick('"+item.TABLE_NAME+"', this)\">"+item.TABLE_NAME+"</div>";
				});
				$("#table_items").html( itemHtml );
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
		},
		error: function (){
			alert('error...');
		}
	});
	
}

var CurrentSelectedTableName ="";
var CurrentSelectedTableColumns =null;
// 点击表，加载字段
function tableClick( tableName, obj){
	CurrentSelectedTableName =tableName;
	var $this =$(obj);
	//alert($this);
	// reset selected
	$(".table-item").removeClass("selected");
	$this.addClass("selected");
	var db_id =$("#curDatabase").val();
	if( typeof db_id == "undefined" || db_id==""){
		
		alert("请选择数据库或者新建数据库!");
		return false;
	}
	var tbName =tableName;
	var params ={dbId: db_id,tableName:tbName};
	var url ="<%=basePath%>" +"system/robot/database/query-fields.do";
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
				var tableList =ovo.oForm.FIELD_LIST;
				CurrentSelectedTableColumns =tableList;
				var itemHtml ="";
				// 展示表格的列属性
				$.each(tableList, function (i,item){
					itemHtml +="<div class=\"field-item\" title=\""+item.COLUMN_COMMENT+"\">";
					itemHtml +="<div class=\"field-td field-w4\">"+item.COLUMN_NAME+"</div>";
					itemHtml +="<div class=\"field-td field-w2\">"+item.COLUMN_TYPE+"</div>";
					itemHtml +="<div class=\"field-td field-w2\">"+item.IS_NULLABLE+"</div>";
					itemHtml +="<div class=\"field-td field-w2\">"+item.COLUMN_KEY+"</div>";
					itemHtml +="</div>";
				});
				$("#fieldList").html( itemHtml );
				
				var entityHtml ="";
				//列表界面展示的字段
				var listPageShowHtml ="";
				//列表界面搜索的字段
				var listPageSearchHtml ="";
				//添加界面展示的字段 add-page-show-fields
				var addPageShowHtml ="";
				//编辑界面展示的字段   edit-page-show-fields
				var editPageShowHtml ="";
				
				//删除界面条件字段   delete-page-where
				var deletePageWhereHtml ="";
				
				//列表接口 显示的字段  list-api-show-fields
				var listApiShowHtml ="";
				//列表接口 搜索的字段  list-api-show-fields
				var listApiSearchHtml ="";
				//添加接口 显示的字段  add-api-show-fields
				var addApiShowHtml ="";
				//编辑接口 显示的字段  edit-api-show-fields
				var editApiShowHtml ="";
				//删除接口 显示的字段 delete-api-where
				var deleteApiShowHtml ="";
				
				// 展示表对应的Entity对象属性
				$.each(tableList, function (i,item){
					entityHtml +="";
					entityHtml +="    <div class=\"entity-item\">";
					entityHtml +="    <div class=\"entity-td entity-w1\">";
					//entityHtml +="    	<span>"+item.COLUMN_NAME+"</span>";
					entityHtml +="    	<input type=\"text\" name=\"columnName\" value=\""+item.COLUMN_NAME+"\" class=\"entity-field-name\" readonly /> ";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">";
					entityHtml +="    	<span>"+item.COLUMN_TYPE+"</span>";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">";
					var entityAttributeName =convertColumnNameToAttributeName( item.COLUMN_NAME );
					entityHtml +="    	<input type=\"text\" id=\"attributeName"+item.COLUMN_NAME+"\" name=\"attributeName\" value=\""+ entityAttributeName +"\" class=\"entity-field-name\"/> ";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">";
					entityHtml +="    	<select id=\"attributeType"+item.COLUMN_NAME+"\" name=\"attributeType\"  class=\"entity-field-name\">   ";
					entityHtml += AttributeTypeSelectOptionHtml;
					entityHtml +="    	</select>";
					entityHtml +="    </div>";
					entityHtml +="    <div class=\"entity-td entity-w1\">    ";
					entityHtml +="    	<select id=\"mappingKind"+item.COLUMN_NAME+"\"  name=\"mappingKind\"> ";
					entityHtml +=getAttributeMappingKindOptionHtml( item.COLUMN_KEY );
					entityHtml +="    	</select> ";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">    ";
					entityHtml +="    	<select  id=\"updateable"+item.COLUMN_NAME+"\" name=\"updateable\"> ";
					entityHtml +=UpdateableSelectOptionHtml;
					entityHtml +="    	</select>";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">    ";
					entityHtml +="    	<select  id=\"insertable"+item.COLUMN_NAME+"\" name=\"insertable\">  ";
					entityHtml +=InsertableSelectOptionHtml;
					entityHtml +="    	</select> ";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">    ";
					entityHtml +="    	<select  id=\"getterScope"+item.COLUMN_NAME+"\" name=\"getterScope\"> ";
					entityHtml +=ScopeSelectOptionHtml;
					entityHtml +="    	</select>";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">    ";
					entityHtml +="    	<select  id=\"setterScope"+item.COLUMN_NAME+"\" name=\"setterScope\">  ";
					entityHtml +=ScopeSelectOptionHtml;
					entityHtml +="    	</select>";
					entityHtml +="    </div> ";
					entityHtml +="    <div class=\"entity-td entity-w1\">";
					entityHtml +="    	<input type=\"text\" id=\"attributeRemark"+item.COLUMN_NAME+"\" name=\"attributeRemark\" value=\"\" class=\"entity-field-name\"/> ";
					entityHtml +="    </div> ";
					entityHtml +="    </div> ";
					//列表界面展示的字段
					listPageShowHtml +="<input type=\"checkbox\" id=\"list-page-show-field-"+i+"\" name=\"list-page-show-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//列表界面搜索的字段 list-page-search-fields
					listPageSearchHtml +="<input type=\"checkbox\" id=\"list-page-search-field"+i+"\" name=\"list-page-search-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//添加界面展示的字段 add-page-show-fields
					addPageShowHtml +="<input type=\"checkbox\" id=\"add-page-show-field-"+i+"\" name=\"add-page-show-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//编辑界面展示的字段 edit-page-show-fields
					editPageShowHtml +="<input type=\"checkbox\" id=\"edit-page-show-field-"+i+"\" name=\"edit-page-show-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//删除界面条件字段   delete-page-where
					deletePageWhereHtml +="<input type=\"radio\" id=\"delete-page-where-field-"+i+"\" name=\"delete-page-where-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//列表接口 显示的字段  list-api-show-fields
					listApiShowHtml +="<input type=\"checkbox\" id=\"list-api-show-field-"+i+"\" name=\"list-api-show-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//列表接口搜索的字段  list-api-search-fields
					listApiSearchHtml +="<input type=\"checkbox\" id=\"list-api-search-field-"+i+"\" name=\"list-api-search-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//添加接口 显示的字段  add-api-show-fields
					addApiShowHtml +="<input type=\"checkbox\" id=\"add-api-show-field-"+i+"\" name=\"add-api-show-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//编辑接口 显示的字段  edit-api-show-fields
					editApiShowHtml +="<input type=\"checkbox\" id=\"edit-api-show-field-"+i+"\" name=\"edit-api-show-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
					//删除接口 显示的字段 delete-api-where
					deleteApiShowHtml +="<input type=\"checkbox\" id=\"delete-api-where-field-"+i+"\" name=\"delete-api-where-field\" value=\""+ entityAttributeName +"\" />"+entityAttributeName;
				});
				$("#entityFields").html( entityHtml );
				
				$("#list-page-show-fields").html( listPageShowHtml );
				
				$("#list-page-search-fields").html( listPageSearchHtml );
				
				$("#add-page-show-fields").html( addPageShowHtml );
				
				$("#edit-page-show-fields").html( editPageShowHtml );
				
				$("#delete-page-where").html( deletePageWhereHtml );
				$("#list-api-show-fields").html( listApiShowHtml );
				$("#list-api-search-fields").html( listApiSearchHtml );
				$("#add-api-show-fields").html( addApiShowHtml );
				$("#edit-api-show-fields").html( editApiShowHtml );
				$("#delete-api-where").html( deleteApiShowHtml );
			}
			else
			{
				$.message("error",ovo.msg);
			}
		},
		complete: function (XMLHttpRequest, textStatus){
		},
		error: function (){
			$.message("error","fail...");
		}
	});
	
	// entity 类名字
	var entityName =convertTableNameToEntityName( tbName );
	$("#entityName").val( entityName );
}


var AttributeTypeSelectOptionHtml =" "
	+" <option value=\"\">请选择...</option> "
	+" <option value=\"boolean\">boolean</option> "
	+" <option value=\"Boolean\">Boolean</option> "
	+" <option value=\"byte\">byte</option> "
	+" <option value=\"Byte\">Byte</option> "
	+" <option value=\"byte[]\">byte[]</option> "
	+" <option value=\"char\">char</option> "
	+" <option value=\"char[]\">char[]</option> "
	+" <option value=\"Character\">Character</option> "
	+" <option value=\"Character[]\">Character[]</option> "
	+" <option value=\"double\">double</option> "
	+" <option value=\"Double\">Double</option> "
	+" <option value=\"float\">float</option> "
	+" <option value=\"Float\">Float</option> "
	+" <option value=\"int\">int</option> "
	+" <option value=\"Integer\">Integer</option> "
	+" <option value=\"long\">long</option> "
	+" <option value=\"Long\">Long</option> "
	+" <option value=\"Object\">Object</option> "
	+" <option value=\"short\">short</option> "
	+" <option value=\"Short\">Short</option> "
	+" <option value=\"String\">String</option> "
	+" <option value=\"java.math.BigDecimal\">java.math.BigDecimal</option> "
	+" <option value=\"java.math.BigInteger\">java.math.BigInteger</option> "
	+" <option value=\"java.util.Calendar\">java.util.Calendar</option> "
	+" <option value=\"java.util.Date\">java.util.Date</option> "
	+" <option value=\"java.sql.Date\">java.sql.Date</option> "
	+" <option value=\"java.sql.Time\">java.sql.Time</option> "
	+" <option value=\"java.sql.Timestamp\">java.sql.Timestamp</option> "
	+" ";
	
	
	var MappingKindSelectOptionHtml=""
		+" 	<option value=\"\">请选择...</option> "
		+" 	<option value=\"id\">id</option> "
		+" 	<option value=\"basic\">basic</option> "
		+" 	<option value=\"version\">version</option> "
		+" 	";
		
	var UpdateableSelectOptionHtml=" "
		//+" 	<option value=\"\">请选择...</option> "
		+" 	<option value=\"1\">可以</option> "
		+" 	<option value=\"0\">不可以</option> "
		+" 	";
		
	var InsertableSelectOptionHtml=" "
		//+" 	<option value=\"\">请选择...</option> "
		+" 	<option value=\"1\">可以</option> "
		+" 	<option value=\"0\">不可以</option> "
		+" 	";
		
	var ScopeSelectOptionHtml ="<option value=\"public\" >public</option> "
		+" <option value=\"protected\">protected</option> "
		+" <option value=\"private\">private</option>";
	
	/**
	*根据字段类型，返回映射类型选项html
	*/
	function getAttributeMappingKindOptionHtml (COLUMN_KEY)
	{
		var html ="";
		if(typeof COLUMN_KEY != "undefined" && COLUMN_KEY == "PRI"){
			
			html =""
				+" 	<option value=\"\">请选择...</option> "
				+" 	<option value=\"id\" selected>id</option> "
				+" 	<option value=\"basic\">basic</option> "
				+" 	<option value=\"version\">version</option> "
				+" 	";
		}
		else{
			
			html =""
				+" 	<option value=\"\">请选择...</option> "
				+" 	<option value=\"id\" >id</option> "
				+" 	<option value=\"basic\" selected>basic</option> "
				+" 	<option value=\"version\">version</option> "
				+" 	";
		}
		return html;
	}
	
	/**
	*将字段名称转成Entity属性名称
	*/
	function convertColumnNameToAttributeName(columnName){
		var attributeName =columnName;
		var posi =-1;
		do{
			posi =attributeName.indexOf("_");
			if( posi != -1 ){
				var tag =attributeName.charAt(posi);
				var upperChar ="";
				if( (posi+1) <= attributeName.length){
					tag +=attributeName.charAt(posi+1);
					upperChar =attributeName.charAt(posi+1).toUpperCase();
				}
				//alert(attributeName.charAt(posi));
				//alert(attributeName.charAt(posi+1));
				attributeName =attributeName.replace(tag, upperChar  );
				posi =attributeName.indexOf("_");
			}
		}while( posi != -1 );
		return attributeName;
	}
	
	/**
	*将字段名称转成Entity属性名称
	*/
	function convertTableNameToEntityName(tableName){
		var name =convertColumnNameToAttributeName(tableName);
		var firstChar =name.charAt(0);
		name =firstChar.toUpperCase() + name.substring(1, name.length);
		return name;
	}
	
	/**
	*entity 主键生成器策略改变
	*/
	function entityKeyGeneratorChange()
	{
		var val =$("#entityKeyGenerator").val();
		if( val == "sequence"){
			$("#sequenceName").val("");
			$("#sequenceName").removeAttr("disabled");
		}
		else
		{
			$("#sequenceName").attr("disabled","disabled");
			$("#sequenceName").val("");
		}
	}
	
	/**
	* 选择文件夹
	* id 目标对象的id值 
	*/
	function chooseSystemFolder(id){
		console.log('...........');
		title ="选择路径";
		var path =$("#"+id).val();
		console.log('...........'+path);
		var url="iframe:<%=basePath%>system/file/select-folder.jsp?path=" + path+"&targetDomId="+id;
		iframeName = "selectSystemFolderIframeId";
		popWindow(title, url, width, height, drag, time, showBg, cssName, iframeName);
	}

	/** 弹窗******************************************/
	var title;
	var url;
	var width = 700;
	var height = 540;
	var drag = "true";
	var time = "";
	var showBg = "true";
	var cssName = "leotheme";
	var iframeName = "selectIframeId";
	function popWindow(title, url, width, height, drag, time, showBg, cssName, iframeName) {
		tipsWindown(title, url, width, height, drag, time, showBg, cssName, iframeName);
	}

	function closeTipWindow() {
		tipsWindown.close();
	}
	/********************************************/
	function getCheckboxValue( list ){
		var value="";
		$.each(list,function(){
			if($(this).attr("checked")){
				if(value != ""){
					value +=",";
				}
				value += $(this).val();
			}
		});
		 
	}
	
	/**
	*提交
	*/
	function submitProduceCode(){
		var url ="<%=basePath%>" +"system/robot/engine.do";
		var params =new Map();
		// 收集参数
		//表名字
		var tableName =CurrentSelectedTableName;
		if (typeof tableName == "undefined" || tableName == "") {
			$.message("error","请选择表单");
			return false;
		}
		params.put("tableName",tableName);
		//*****************************************************配置项
		var databaseTemplate ="JPA";//数据库模版 JPA JDBC
		var project_path =$("#project_path").val(); //项目路径
		var entity_path =$("#entity_path").val(); //Entity保存路径
		var dao_path =$("#dao_path").val(); //dao保存路径
		var service_path =$("#service_path").val(); //service保存路径
		var controller_path =$("#controller_path").val(); //controller保存路径
		var api_path =$("#api_path").val(); //api保存路径
		var jsp_path =$("#jsp_path").val(); //jsp页面保存路径
		
		params.put("databaseTemplate",databaseTemplate);
		params.put("project_path",project_path);
		params.put("entity_path",entity_path);
		params.put("dao_path",dao_path);
		params.put("service_path",service_path);
		params.put("controller_path",controller_path);
		params.put("api_path",api_path);
		params.put("jsp_path",jsp_path);
		
		//*****************************************************模型
		var entityName =$("#entityName").val(); // entity 名字
		var entityKeyGenerator =$("#entityKeyGenerator").val(); // Entity 主键生成器
		var sequenceName =$("#sequenceName").val(); //序列名称
		/**模型的字段集合，各数据项：数据库字段名称 、属性名称、属性类型、映射类型、可更新、客插入、Getter域、Setter 域、字段对应的中文说明**/
		var dbColumns =$('input[name="columnName"]');
		var entityFieldsMapArray =new Array();
		$.each(dbColumns,function (i,item) {
			var dbColumnName =$(item).val();
			console.log("........."+ dbColumnName +".........");
			var columnMap =new Map();
			columnMap.put("columnName", dbColumnName);
			var attributeName =$("#attributeName" + dbColumnName).val();
			var attributeType =$("#attributeType" + dbColumnName).val();
			var mappingKind =$("#mappingKind" + dbColumnName).val();
			var updateable =$("#updateable" + dbColumnName).val();
			var insertable =$("#insertable" + dbColumnName).val();
			var getterScope =$("#getterScope" + dbColumnName).val();
			var setterScope =$("#setterScope" + dbColumnName).val();
			var attributeRemark =$("#attributeRemark" + dbColumnName).val();
			if(typeof attributeName =="undefined"  || attributeName ==""){
				$("#attributeName"+dbColumnName).focus();
				$.message("error","不能为空");
			}
			if(typeof attributeType =="undefined"  || attributeType ==""){
				$("#attributeType" + dbColumnName).focus();
				$.message("error","不能为空");
			}
			if(typeof mappingKind =="undefined"  || mappingKind ==""){
				$("#mappingKind" + dbColumnName).focus();
				$.message("error","不能为空");
			}
			if(typeof attributeRemark =="undefined"  || attributeRemark ==""){
				$("#attributeRemark" + dbColumnName).focus();
				$.message("error","不能为空");
			}
			columnMap.put("attributeName", attributeName);
			columnMap.put("attributeType", attributeType);
			columnMap.put("mappingKind", mappingKind);
			columnMap.put("updateable", updateable);
			columnMap.put("insertable", insertable);
			columnMap.put("getterScope", getterScope);
			columnMap.put("setterScope", setterScope);
			columnMap.put("attributeRemark", attributeRemark);
			entityFieldsMapArray.push( columnMap );
		});
		
		params.put("entityName",entityName);
		params.put("entityKeyGenerator",entityKeyGenerator);
		params.put("sequenceName",sequenceName);
		params.put("entityFieldsMapArray",entityFieldsMapArray);
		// 模块配置
		var adminControllerUri =$("#admin-controller-uri").val(); //后台Cotroller 模块路径
		var apiControllerUri =$("#api-controller-uri").val(); //api Cotroller 模块路径
		params.put("adminControllerUri",adminControllerUri);
		params.put("apiControllerUri",apiControllerUri);
		
		// 列表界面参数
		var listPageUri =$("#list-page-uri").val();
		var listPageMethod =$("#list-page-method").val();
		var listPageRemark =$("#list-page-remark").val();
		var listPageShowFields =$('input[name="list-page-show-field"]:checked').serialize();
		var listPageSearchFields =$('input[name="list-page-search-field"]:checked').serialize();
		var listPageFunctionBtns =$('input[name="list-page-function-btn"]:checked').serialize();
		params.put("listPageUri",listPageUri);
		params.put("listPageMethod",listPageMethod);
		params.put("listPageRemark",listPageRemark);
		params.put("listPageShowFields",listPageShowFields);
		params.put("listPageSearchFields",listPageSearchFields);
		params.put("listPageFunctionBtns",listPageFunctionBtns);
		// 添加界面参数
		var addPageUri =$("#add-page-uri").val();
		var addPageMethod =$("#add-page-method").val();
		var addPageRemark =$("#add-page-remark").val();
		var addPageShowFields =$('input[name="add-page-show-field"]:checked').serialize();
		params.put("addPageUri",addPageUri);
		params.put("addPageMethod",addPageMethod);
		params.put("addPageRemark",addPageRemark);
		params.put("addPageShowFields",addPageShowFields);
		// 编辑界面参数
		var editPageUri =$("#edit-page-uri").val();
		var editPageMethod =$("#edit-page-method").val();
		var editPageRemark =$("#edit-page-remark").val();
		var editPageShowFields =$('input[name="edit-page-show-field"]:checked').serialize();
		params.put("editPageUri",editPageUri);
		params.put("editPageMethod",editPageMethod);
		params.put("editPageRemark",editPageRemark);
		params.put("editPageShowFields",editPageShowFields);
		// 删除界面参数
		var deletePageUri =$("#delete-page-uri").val();
		var deletePageMethod =$("#delete-page-method").val();
		var deletePageRemark =$("#delete-page-remark").val();
		var deletePagewhereFields =$('input[name="delete-page-where-field"]:checked').serialize();
		params.put("deletePageUri",deletePageUri);
		params.put("deletePageMethod",deletePageMethod);
		params.put("deletePageRemark",deletePageRemark);
		params.put("deletePageShowFields",deletePagewhereFields);
		// 列表接口参数 list-api-uri
		var listApiUri =$("#list-api-uri").val();
		var listApiMethod =$("#list-api-method").val();
		var listApiRemark =$("#list-api-remark").val();
		var listApiShowFields =$('input[name="list-api-show-field"]:checked').serialize();
		var listApiSearchFields =$('input[name="list-api-search-field"]:checked').serialize();
		params.put("listApiUri",listApiUri);
		params.put("listApiMethod",listApiMethod);
		params.put("listApiRemark",listApiRemark);
		params.put("listApiShowFields",listApiShowFields);
		params.put("listApiSearchFields",listApiSearchFields);
		// 添加接口参数
		var addApiUri =$("#add-api-uri").val();
		var addApiMethod =$("#add-api-method").val();
		var addApiRemark =$("#add-api-remark").val();
		var addApiShowFields =$('input[name="add-api-show-field"]:checked').serialize();
		params.put("addApiUri",addApiUri);
		params.put("addApiMethod",addApiMethod);
		params.put("addApiRemark",addApiRemark);
		params.put("addApiShowFields",addApiShowFields);
		// 编辑接口参数
		var editApiUri =$("#edit-api-uri").val();
		var editApiMethod =$("#edit-api-method").val();
		var editApiRemark =$("#edit-api-remark").val();
		var editApiShowFields =$('input[name="edit-api-show-field"]:checked').serialize();
		params.put("editApiUri",editApiUri);
		params.put("editApiMethod",editApiMethod);
		params.put("editApiRemark",editApiRemark);
		params.put("editApiShowFields",editApiShowFields);
		// 删除接口参数
		var deleteApiUri =$("#delete-api-uri").val();
		var deleteApiMethod =$("#delete-api-method").val();
		var deleteApiRemark =$("#delete-api-remark").val();
		var deleteApiWhereFields =$('input[name="delete-api-where-field"]:checked').serialize();
		params.put("deleteApiUri",deleteApiUri);
		params.put("deleteApiMethod",deleteApiMethod);
		params.put("deleteApiRemark",deleteApiRemark);
		params.put("deleteApiWhereFields",deleteApiWhereFields);
		var postData ={"json":params.toJson()};
		$.ajax({
			url: url,
			type: "POST",
			data: postData,
			dataType: "json",
			cache: false,
			beforeSend: function (XMLHttpRequest){
			},
			success: function(ovo, textStatus) {
				var code =ovo.code;
				if(code >=0)
				{
					$.message("success","操作成功");
				}
				else
				{
					$.message("error",ovo.msg);
				}
			},
			complete: function (XMLHttpRequest, textStatus){
			},
			error: function (){
				$.message("error","操作失败");
			}
		});
	}
	
	/**
	*checkbox选择框的总按钮，全选或者取消全选
	*/
	function checkboxSwitch(obj,inputName)
	{
		if( obj.checked ==true ){
			console.log('.................................2');
			obj.checked =true;
			 $("[name = "+inputName+"]:checkbox").attr("checked", true);
		}
		else
		{
			console.log('.................................1');
			obj.checked =false;
			 $("[name = "+inputName+"]:checkbox").attr("checked", false);
		}
	}
	/**
	*radiobox选择框的总按钮，全选或者取消全选
	*/
	function radioboxSwitch(obj,inputName)
	{
		if( obj.checked ==true ){
			console.log('.................................2');
			obj.checked =true;
			 $("[name = "+inputName+"]:radio").attr("checked", true);
		}
		else
		{
			console.log('.................................1');
			obj.checked =false;
			 $("[name = "+inputName+"]:radio").attr("checked", false);
		}
	}
</script>
<style type="text/css">
body {
width: 1690px;
}
.pageContent {
	width: 100%;
	height: auto;
	border: 1px solid #0e0e0e;
	overflow-y: scroll;
}

.left {
	float: left;
}

.right {
	float: right;
}

.tableList {
	width: 20%;
	height: 800px;
	border-right: #0e0e0e solid 1px;
}

.fields {
	width: 304px;
	height: 800px;
	overflow-y: scroll;
}

.code {
	min-width: 1000px;
	height: 800px;
	margin-left: 5px;
	overflow-y: scroll;
	overflow-x: hidden;
}

。page-item {
	width: 100%;
	border-bottum: 1px soild red;
}

.database {
	width: 100%;
	height: 50px;
}

.db-table {
	width: 100%;
	max-height: 720px;
	overflow-y: scroll;
}

.table-item-title {
	width: 100%;
	height: 30px;
	border: 1px solid #5d5656;
	margin-bottom: -1px;
	margin-left: -1px;
	font-size: medium;
	line-height: 26px;
	font-weight: 600;
}

.table-item {
	width: 100%;
	height: 30px;
	border: 1px solid #5d5656;
	margin-bottom: -1px;
	margin-left: -1px;
	font-size: medium;
	line-height: 26px;
}

.field-item {
	width: 100%;
	height: 24px;
	margin-bottom: -1px;
	margin-left: -1px;
	font-size: medium;
	line-height: 24px;
	border-left: 1px solid #5d5656;
	border-top: 1px solid #5d5656;
	border-bottom: 1px solid #5d5656;
}

.selected {
	background-color: #d83131;
	color: white;
}

.field-title {
	width: 284px;
	height: 50px;
}

.field-list {
	width: 284px;
	max-height: 800px;
	/*overflow-y: scroll;*/
}

.field-th {
	float: left;
	height: 50px;
	line-height: 50px;
	font-size: small;
	border-right: solid 1px #271e1e;
}

.field-td {
	float: left;
	height: 25px;
	line-height: 25px;
	font-size: small;
	border-right: solid 1px #271e1e;
}

.field-w1 {
	width: 50px;
}

.field-w2 {
	width: 60px;
}

.field-w3 {
	width: 70px;
}

.field-w4 {
	width: 100px;
}

.page-item {
	width: 999px;
	border-bottom: 1px solid #352d2d;
	border-right: 1px solid #2d2828;
}

.config-item {
	width: 100%;
	height: 30px;
}

.config-item .config-label {
	width: 120px;
	display: block;
	float: left;
	text-align: left;
}

.config-item .config-value {
	width: 400px;
	/* display: block; */
	text-align: left;
}

.entity-field-name {
	width: 80%;
}

.entity-title {
	width: 100%;
	height: 30px;
	border-bottom: 1px solid #2d2828;
}

.entity-th {
	float: left;
}

.entity-w1 {
	width: 90px;
}

.entity-w2 {
	width: 80px;
}

.entity-w3 {
	width: 50px;
}

.entity-fields {
	min-height: 150px;
	overflow-y: scroll;
}

.entity-item {
	border-bottom: 1px solid #2d2828;
	height: 26px;
}

.entity-td {
	float: left;
}

.choose-fold-btn {
	width: 100px;
}
</style>
</head>
<body>
	<div class="path">代码管理 &raquo; 生成代码</div>
	<form id="inputForm" action="save.do" method="post">
		<div class="pageContent">
			<div id="left" class="left tableList">
				<div id="db_list" class="database">
					数据库:<select id="curDatabase">
						<option value="" selected>请选择...</option>
						<c:forEach items="${db_list}" var="db" varStatus="status">
							<option value="${db.ID }">${db.DB_NAME }</option>
						</c:forEach>
					</select> <input type="button" onclick="queryTablesFromDataBase()"
						value="连 接"></input>
				</div>
				<div class="table-item-title">Table 列表</div>
				<div id="table_items" class="db-table "></div>
			</div>
			<div id="center" class="left fields">
				<div class="field-title">
					<div class="field-th field-w4">字段名</div>
					<div class="field-th field-w2">类型</div>
					<div class="field-th field-w2">允许空</div>
					<div class="field-th field-w2">约束</div>
				</div>
				<div class="field-list" id="fieldList">
					<div class="field-item" title="remark">
						<div class="field-td field-w4">id</div>
						<div class="field-td field-w2">int</div>
						<div class="field-td field-w2">NO</div>
						<div class="field-td field-w2">PRI</div>
					</div>
					<div class="field-item" title="remark">
						<div class="field-td field-w4">id</div>
						<div class="field-td field-w2">int</div>
						<div class="field-td field-w2">NO</div>
						<div class="field-td field-w2">PRI</div>
					</div>
				</div>
			</div>
			<div id="right" class="left code">
				<div id="config" class="page-item">
					<fieldset>
						<legend>配置项</legend>
						<div class="config-item">
							<label class="config-label">数据库模版：</label> 
							<input type="radio" name="dbModel" value="jpa" checked="checked" />JPA模式 
							<input type="radio" name="dbModel" value="jdbc" />JDBC模式
						</div>
						<div class="config-item">
							<label class="config-label">项目路径：</label> 
							<input type="text" id="project_path" name="project_path" value="" class="config-value" /> 
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('project_path')" />
						</div>
						<div class="config-item">
							<label class="config-label">Entity保存路径：</label> 
							<input type="text" id="entity_path" name="entity_path" value="" class="config-value" /> 
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('entity_path')" />
						</div>
						<div class="config-item">
							<label class="config-label">dao保存路径：</label> 
							<input type="text" id="dao_path" name="dao_path" value="" class="config-value" />
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('dao_path')" />
						</div>
						<div class="config-item">
							<label class="config-label">service保存路径：</label> 
							<input type="text" id="service_path" name="service_path" value="" class="config-value" /> 
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('service_path')" />
						</div>
						<div class="config-item">
							<label class="config-label">controller保存路径：</label> 
							<input type="text" id="controller_path" name="controller_path" value="" class="config-value" /> 
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('controller_path')" />
						</div>
						<div class="config-item">
							<label class="config-label">api保存路径：</label> 
							<input type="text" id="api_path" name="api_path" value="" class="config-value" />
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('api_path')" />
						</div>
						<div class="config-item">
							<label class="config-label">jsp页面保存路径：</label> 
							<input type="text" id="jsp_path" name="jsp_path" value="" class="config-value" />
							<input type="button" name="choose_path" value="选择..." class="choose-fold-btn" onclick="chooseSystemFolder('jsp_path')" />
						</div>
					</fieldset>
				</div>
				<div id="entity" class="page-item">
					<fieldset>
						<legend>模型</legend>
						<div class="config-item">
							<label class="config-label">Entity 名字：</label> 
							<input type="text" id="entityName" name="entityName" value="" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Entity 主键生成器：</label> 
							<select id="entityKeyGenerator" name="entityKeyGenerator" class="config-value"
								onchange="entityKeyGeneratorChange()">
								<option value="AUTO">auto</option>
								<option value="IDENTITY">identity</option>
								<option value="SEQUENCE">sequence</option>
								<option value="TABLE">table</option>
								<option value="NONE">none</option>
							</select>
						</div>
						<div class="config-item">
							<label class="config-label">序列名称：</label> 
							<input type="text" name="sequenceName" value="" class="config-value" id="sequenceName" disabled="disabled" />
						</div>
						<div>
							<div class="entity-title">
								<div class="entity-th entity-w1">字段名称</div>
								<div class="entity-th entity-w1">字段类型</div>
								<div class="entity-th entity-w1">属性名称</div>
								<div class="entity-th entity-w1">属性类型</div>
								<div class="entity-th entity-w1">映射类型</div>
								<div class="entity-th entity-w1">可更新</div>
								<div class="entity-th entity-w1">可插入</div>
								<div class="entity-th entity-w1">Getter域</div>
								<div class="entity-th entity-w1">Setter域</div>
								<div class="entity-th entity-w1">字段中文</div>
							</div>
							<div id="entityFields" class="entity-fields">
								<div class="entity-item">
									<div class="entity-td entity-w1">
										<span>id</span>
									</div>
									<div class="entity-td entity-w1">
										<span>int</span>
									</div>
									<div class="entity-td entity-w1">
										<input type="text" name="entity_name" value="id"
											class="entity-field-name" />
									</div>
									<div class="entity-td entity-w1">
										<select name="" class="entity-field-name">
											<option value="">请选择...</option>
											<option value="boolean">boolean</option>
											<option value="Boolean">Boolean</option>
											<option value="byte">byte</option>
											<option value="Byte">Byte</option>
											<option value="byte[]">byte[]</option>
											<option value="char">char</option>
											<option value="char[]">char[]</option>
											<option value="Character">Character</option>
											<option value="Character[]">Character[]</option>
											<option value="double">double</option>
											<option value="Double">Double</option>
											<option value="float">float</option>
											<option value="Float">Float</option>
											<option value="int">int</option>
											<option value="Integer">Integer</option>
											<option value="long">long</option>
											<option value="Long">Long</option>
											<option value="Object">Object</option>
											<option value="short">short</option>
											<option value="Short">Short</option>
											<option value="String">String</option>
											<option value="java.math.BigDecimal">java.math.BigDecimal</option>
											<option value="java.math.BigInteger">java.math.BigInteger</option>
											<option value="java.util.Calendar">java.util.Calendar</option>
											<option value="java.util.Date">java.util.Date</option>
											<option value="java.sql.Date">java.sql.Date</option>
											<option value="java.sql.Time">java.sql.Time</option>
											<option value="java.sql.Timestamp">java.sql.Timestamp</option>
										</select>
									</div>
									<div class="entity-td entity-w1">
										<select name="">
											<option value="">请选择...</option>
											<option value="id">id</option>
											<option value="basic">basic</option>
											<option value="version">version</option>
										</select>
									</div>
									<div class="entity-td entity-w1">
										<select name="">
											<option value="">请选择...</option>
											<option value="1">可以</option>
											<option value="0">不可以</option>
										</select>
									</div>
									<div class="entity-td entity-w1">
										<select name="">
											<option value="">请选择...</option>
											<option value="1">可以</option>
											<option value="0">不可以</option>
										</select>
									</div>
									<div class="entity-td entity-w1">
										<select name="">
											<option value="public" selected>public</option>
											<option value="protected">protected</option>
											<option value="private">private</option>
										</select>
									</div>
									<div class="entity-td entity-w1">
										<select name="">
											<option value="public" selected>public</option>
											<option value="protected">protected</option>
											<option value="private">private</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<div id="addPage" class="page-item">
					<fieldset>
						<legend>模块配置</legend>
						<div class="config-item">
							<label class="config-label">后台Cotroller 模块路径：</label> 
							<input type="text" id="admin-controller-uri" name="admin-controller-uri" value="" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">API Cotroller 模块路径：</label> 
							<input type="text" id="api-controller-uri" name="api-controller-uri" value="" class="config-value" />
						</div>
					</fieldset>
				</div>
				<div id="listPage" class="page-item">
					<fieldset>
						<legend>列表界面</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="list-page-uri" name="list-page-uri" value="list" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="list-page-method" name="list-page-method" value="list" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="list-page-remark" name="list-page-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<!-- 快捷操作按钮，全选或者全部取消选择 -->
							<label class="config-label">展示的字段
							<input type="checkbox" id="list-page-show-field-switch" name="list-page-show-field-switch" onclick="checkboxSwitch(this,'list-page-show-field')"/>
							：</label> 
							<div id="list-page-show-fields">
							<!-- 
								<input type="checkbox" id="list-page-show-field-1" name="list-page-show-field" value="add" />字段1
								<input type="checkbox" id="list-page-show-field-2" name="list-page-show-field" value="add" />字段2
								<input type="checkbox" id="list-page-show-field-3" name="list-page-show-field" value="add" />字段3
								<input type="checkbox" id="list-page-show-field-4" name="list-page-show-field" value="add" />字段4
								<input type="checkbox" id="list-page-show-field-5" name="list-page-show-field" value="add" />字段5
							 -->
							</div>
						</div>
						<div class="config-item">
							<label class="config-label">搜索的字段
							<input type="checkbox" id="list-page-search-field-switch" name="list-page-search-field-switch" onclick="checkboxSwitch(this,'list-page-search-field')"/>
							：</label> 
							<div id="list-page-search-fields">
							<!-- 
								<input type="checkbox" id="list-page-search-field1" name="list-page-search-field" value="add" />字段
								<input type="checkbox" id="list-page-search-field2" name="list-page-search-field" value="add" />字段
								<input type="checkbox" id="list-page-search-field3" name="list-page-search-field" value="add" />字段
								<input type="checkbox" id="list-page-search-field4" name="list-page-search-field" value="add" />字段
								<input type="checkbox" id="list-page-search-field5" name="list-page-search-field" value="add" />字段
							 -->
							</div>
						</div>
						<div class="config-item">
							<label class="config-label">操作按钮
							<input type="checkbox" id="list-page-function-btn-switch" name="list-page-function-btn-switch" onclick="checkboxSwitch(this,'list-page-function-btn')"/>
							：</label> 
							<input type="checkbox" id="list-page-add-btn" name="list-page-function-btn" value="add" />添加
							<input type="checkbox" id="list-page-delete-btn" name="list-page-function-btn" value="delete" />删除
							<input type="checkbox" id="list-page-refresh-btn" name="list-page-function-btn" value="refresh" />刷新
							<input type="checkbox" id="list-page-preview-btn" name="list-page-function-btn" value="preview" />预览
							<input type="checkbox" id="list-page-edit-btn" name="list-page-function-btn" value="edit" />编辑
						</div>
					</fieldset>
				</div>
				<div id="addPage" class="page-item">
					<fieldset>
						<legend>添加界面</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="add-page-uri" name="add-page-uri" value="add" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="add-page-method" name="add-page-method" value="add" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="add-page-remark" name="add-page-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">展示的字段
							<input type="checkbox" id="add-page-show-field-switch" name="add-page-show-field-switch" onclick="checkboxSwitch(this,'add-page-show-field')"/>
							：</label> 
							<div id="add-page-show-fields">
							<!-- 
								<input type="checkbox" id="add-page-show-field-1" name="add-page-show-field" value="add" />字段1
								<input type="checkbox" id="add-page-show-field-2" name="add-page-show-field" value="add" />字段2
							-->
							</div>
						</div>
					</fieldset>
				</div>
				<div id="editPage" class="page-item">
					<fieldset>
						<legend>编辑界面</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="edit-page-uri" name="edit-page-uri" value="edit" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="edit-page-method" name="edit-page-method" value="edit" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="edit-page-remark" name="edit-page-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">展示的字段
							<input type="checkbox" id="edit-page-show-field-switch" name="edit-page-show-field-switch" onclick="checkboxSwitch(this,'edit-page-show-field')"/>
							：</label> 
							<div id="edit-page-show-fields">
							<!-- 
								<input type="checkbox" id="edit-page-show-field-1" name="edit-page-show-field" value="add" />字段1
								<input type="checkbox" id="edit-page-show-field-2" name="edit-page-show-field" value="add" />字段2
								<input type="checkbox" id="edit-page-show-field-3" name="edit-page-show-field" value="add" />字段3
								<input type="checkbox" id="edit-page-show-field-4" name="edit-page-show-field" value="add" />字段4
								<input type="checkbox" id="edit-page-show-field-5" name="edit-page-show-field" value="add" />字段5
							 -->
							</div>
						</div>
					</fieldset>
				</div>
				<div id="editPage" class="page-item">
					<fieldset>
						<legend>删除界面-ajax</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="delete-page-uri" name="delete-page-uri" value="delete" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="delete-page-method" name="delete-page-method" value="delete" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="delete-page-remark" name="delete-page-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">条件字段：</label> 
							<div id="delete-page-where">
							<!-- 
								<input type="radio" id="delete-page-where-field-1" name="delete-page-where-field" value="add" />字段1
								<input type="radio" id="delete-page-where-field-2" name="delete-page-where-field" value="add" />字段2
								<input type="radio" id="delete-page-where-field-3" name="delete-page-where-field" value="add" />字段3
							 -->
							</div>
						</div>
					</fieldset>
				</div>
				<div id="apiPage" class="page-item">
					<fieldset>
						<legend>API 列表接口</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="list-api-uri" name="list-api-uri" value="list" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="list-api-method" name="list-api-method" value="list" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="list-api-remark" name="list-api-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">展示的字段
							<input type="checkbox" id="list-api-show-field-switch" name="list-api-show-field-switch" onclick="checkboxSwitch(this,'list-api-show-field')"/>
							：</label> 
							<div id="list-api-show-fields">
								<input type="checkbox" id="list-api-show-field-1" name="list-api-show-field" value="add" />字段1
							</div>
						</div>
						<div class="config-item">
							<label class="config-label">搜索的字段
							<input type="checkbox" id="list-api-search-field-switch" name="list-api-search-field-switch" onclick="checkboxSwitch(this,'list-api-search-field')"/>
							：</label> 
							<div id="list-api-search-fields">
							<!-- 
								<input type="checkbox" id="list-api-search-field1" name="list-api-search-field" value="add" />字段
								<input type="checkbox" id="list-api-search-field2" name="list-api-search-field" value="add" />字段
							-->
							</div>
						</div>
						<div class="config-item">
							<label class="config-label">入参：</label> 
						</div>
						<div class="config-item">
							<label class="config-label">入参：</label> 
							<input type="text" id="list-page-show-field-1" name="list-page-show-field" value="add" />
						</div>
						<div class="config-item">
							<label class="config-label">是否分页：</label> 
							<input type="radio" id="list-page-search-field5" name="list-page-search-field" value="add" />
						</div>
					</fieldset>
				</div>
				<div id="apiPage" class="page-item">
					<fieldset>
						<legend>API 添加接口</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="add-api-uri" name="add-api-uri" value="add" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="add-api-method" name="add-api-method" value="add" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="add-api-remark" name="add-api-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">展示的字段
							<input type="checkbox" id="add-api-show-field-switch" name="add-api-show-field-switch" onclick="checkboxSwitch(this,'add-api-show-field')"/>
							：</label> 
							<div id="add-api-show-fields">
							<!-- 
								<input type="checkbox" id="add-api-show-field-1" name="add-api-show-field" value="add" />字段1
								<input type="checkbox" id="add-api-show-field-2" name="add-api-show-field" value="add" />字段2
							 -->
							</div>
						</div>
					</fieldset>
				</div>
				<div id="apiPage" class="page-item">
					<fieldset>
						<legend>API 编辑接口</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="edit-api-uri" name="edit-api-uri" value="edit" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="edit-api-method" name="edit-api-method" value="edit" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="edit-api-remark" name="edit-api-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">展示的字段
							<input type="checkbox" id="edit-api-show-field-switch" name="edit-api-show-field-switch" onclick="checkboxSwitch(this,'edit-api-show-field')"/>
							：</label> 
							<div id="edit-api-show-fields">
							<!-- 
								<input type="checkbox" id="edit-api-show-field-1" name="edit-api-show-field" value="add" />字段1
							 -->
							</div>
						</div>
					</fieldset>
				</div>
				<div id="apiPage" class="page-item">
					<fieldset>
						<legend>API 删除接口</legend>
						<div class="config-item">
							<label class="config-label">URI：</label> 
							<input type="text" id="delete-api-uri" name="delete-api-uri" value="delete" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">Cotroller 方法名：</label> 
							<input type="text" id="delete-api-method" name="delete-api-method" value="delete" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">方法备注：</label> 
							<input type="text" id="delete-api-remark" name="delete-api-remark" value="备注" class="config-value" />
						</div>
						<div class="config-item">
							<label class="config-label">条件字段
							<input type="checkbox" id="delete-api-where-field-switch" name="delete-api-where-field-switch" onclick="checkboxSwitch(this,'delete-api-where-field')"/>
							：</label> 
							<div id="delete-api-where">
							<!-- 
								<input type="checkbox" id="delete-api-show-field-1" name="delete-api-show-field" value="add" />字段1
							 -->
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
		<div>
			<input type="button" id="submitBtn"class="button" value="提交" onclick="submitProduceCode()" /> 
		</div>
	</form>
</body>
</html>