<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="ExtJS2/resources/css/ext-all.css"></link>
<link rel="stylesheet" type="text/css" href="pages/css/style.css"></link>
<script type="text/javascript" src="ExtJS2/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="ExtJS2/ext-all.js"></script>
<script type="text/javascript" src="ExtJS2/ext/themeChange.js"></script>
<title>Insert title here</title>
</head>
<body>
<script type="text/javascript">
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = 'ExtJS2/resources/images/default/s.gif';
	var root = new Ext.tree.TreeNode('系统说明');
	var node1 = new Ext.tree.TreeNode({
		text:'书籍类型维护',
		url:'pages/bookTypeList.jsp'
	});
	var node2 = new Ext.tree.TreeNode({
		text:'书籍维护',
		url:'pages/bookList.jsp'
	});
	root.appendChild(node1);
	root.appendChild(node2);
	var menu = new Ext.tree.TreePanel({
		border:false,
		root:root,
		//rootVisible:false,
		//hrefTarget:'mainContent',
		listeners:{
			click:function(node, e){
				mainPanel.load({
					url:node.attributes.url,
					callback:function(){
						mainPanel.setTitle(node.text);
					},
					scripts:true
				});
			}
		},
		//在菜单面板中增加顶端工具栏，在该工具栏中添加上一步中创建的主题切换组件Ext.ux.ThemeChange
		tbar: [
			'皮肤选择:',
				{
					xtype : 'themeChange',
					width : 80 ,
					listWidth : 80
				},
				'->'
		]
	});
	
	new Ext.Viewport({
		layout:'border',
		items:[{
			title:'简易书籍管理系统ExtJs版',
			collapsible:true,
			html:'<br><center><font size=6>简易图书管理系统</font></center>',
			region:'north',
			height:100
		},{
			title:'功能菜单',
			items:menu,
			split:true,
			collapsible:true,
			region:'west',
			width:150
		},{
			title:'系统说明',
			contentEl:'aboutDiv',
			collapsible:true,
			id:'mainContent',
			region:'center'
		}]
	});
	var mainPanel = Ext.getCmp('mainContent');
});
</script>
<div id="aboutDiv" style="text-align: left;padding-top: 200px;padding-left: 350px;">简易图书系统实现了书籍类型及图书<br>的新增、修改和删除，包含了书籍类型列<br>表及书籍列表，它不具备一个真的图书管<br>理系统的全部功能，创建它的目的在于演<br>示常见Web框架到ExtJS的转化。</div>
</body>
</html>