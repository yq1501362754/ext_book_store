<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript">
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../ExtJS2/resources/images/default/s.gif';
	/*var jsonReader = new Ext.data.JsonReader({
                totalRecords: 'totalCount', 
                root: 'list',
                //id:'id',
                fields:[
                         {name:'author'},
                         {name:'bookName'},
                         {name:'brief'},
                         {name:'id'},
                         {name:'price'},
                         {name:'typeId'}
                       ]
    });
    var httpProxy = new Ext.data.HttpProxy({
			url:'showbook.action'
		});*/
	var bookStore = new Ext.data.Store({
		autoLoad:true,
		reader:new Ext.data.JsonReader({
                totalRecords: 'totalCount', 
                root: 'list',
                //id:'id',
                fields:[
                         {name:'id'},
                         {name:'title'},
                         {name:'detail'}
                       ]
    			}),
				proxy:new Ext.data.HttpProxy({
					url:'showbookType.action'
				})
	});
	var toolbar = new Ext.Toolbar([
		{text:'新增图书类型',iconCls:'add',handler:showAddBook},
		{text:'修改图书类型',iconCls:'option',handler:showModifyBook},
		{text:'删除图书类型',iconCls:'remove',handler:showDeleteBooks}
	]);
	var cb = new Ext.grid.CheckboxSelectionModel();
	var bookGrid = new Ext.grid.GridPanel({
		applyTo:'grid-div',
		frame:true,
		tbar:toolbar,
		store:bookStore,
		stripeRows:true,
		autoScroll:true,
		viewConfig:{
			autoFill:true
		},
		//height:200,
		sm:cb,
		columns:[
			new Ext.grid.RowNumberer({
				header:"行号",
				width:40
			}),
			cb,
			{header:"图书类型编号",width:80,dataIndex:'id',sortable:true},
			{header:"图书类型",width:80,dataIndex:'title',sortable:true},
			{header:"图书类型详情",width:80,dataIndex:'detail',sortable:true}
			
		]
	});
	//bookStore.load();
	
	//创建新增或修改书籍信息的form表单
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	var bookForm = new Ext.FormPanel({
		labelSeparator: ":",
		frame:true,
		border:false,
		items:[
			{
				xtype:'textfield', //文本区
				width:200,
				allowBlank:false,
				blankText:'图书类型不能为空',
				name:'title',
				fieldLabel:'图书类型'
			},{
				xtype:'textfield',
				width:200,
				allowBlank:false,
				blankText:'图书类型详情不能为空',
				name:'detail',
				fieldLabel:'图书详情'
			},{
				
				store:new Ext.data.Store({
					autoLoad:true,
					reader:new Ext.data.JsonReader({
						totalRecords:"totalCount",
						root:"list",
						id:"id"
						},
						Ext.data.Record.create([
							{name:'id'},
							{name:'title'},
							{name:'detail'}
						])
					),
					proxy:new Ext.data.HttpProxy({
						url:'showbookType.action'
					})
				})
			}
		],
		buttons:[
			{
				text:'关闭',
				handler:function(){
					win.hide();
				}
			},{
				text:'提交',
				handler:submitForm
			}
		]
	});
	var win = new Ext.Window({     //创建弹出窗口
		layout:'fit',
		width:380,
		closeAction:'hide',
		height:280,
		resizable:false,
		shadow:true,
		modal:true,
		closable:true,
		bodyStyle:'padding:5 5 5 5',
		animCollapse:true,
		items:[bookForm]
	});
	//显示新建书籍窗口
	function showAddBook(){
		bookForm.form.reset();
		bookForm.isAdd = true;
		win.setTitle('新增书籍信息');
		win.show();
	}
	//显示修改书籍窗口
	function showModifyBook(){
		var bookList = getBookIdList();
		var num = bookList.length;
		if(num > 1){
			Ext.MessageBox.alert('提示', '每次只能修改一条书籍信息');
		}else if(num == 1){
			bookForm.form.reset();
			bookForm.isAdd = false;
			win.setTitle('修改书籍信息');
			win.show();
			var bookId = bookList[0];
			loadForm(bookId);
		}
	}
	//显示删除书籍对话框
	function showDeleteBooks(){
		var bookList = getBookIdList();
		var num = bookList.length;
		if(num == 0){
			return;
		}
		Ext.MessageBox.confirm('提示', '您确定要删除所选书籍吗？',function(btnId){
			if(btnId = 'yes'){
				deleteBooks(bookList);
			}
		});
	}
	function deleteBooks(bookList){
		var bookIds = bookList.join('-');
		var msgTip = Ext.MessageBox.show({
			title:'提示',
			width:250,
			msg:'正在删除书籍信息请稍候......'
		});
		Ext.Ajax.request({
			url:'deletebookCRUD.action',
			params:{bookIds : bookIds},
			method:'post',
			success:function(response, options){
				msgTip.hide();
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success){
					for(var i = 0; i < bookList.length; i++){
						var index = bookStore.find('id', bookList[i]);
						if(index != -1){
							var rec = bookStore.getAt(index);
							bookStore.remove(rec);
						}
					}
					Ext.Msg.alert('提示', '删除书籍信息成功。');
				}else{
					Ext.Msg.alert('提示', '删除书籍信息失败！');
				}
			},
			failure:function(response, options){
				msgTip.hide();
				Ext.Msg.alert('提示', '删除书籍信息失败！');
			}
		});
	}
	//增加图书类型
	function submitForm(){
		if(bookForm.isAdd){
			bookForm.form.submit({
				clientValidation:true,
				waitMsg:'正在提交数据请稍候',
				waitTitle:'提示',
				url:'addbookType.action',
				method:'post',
				success:function(form, action){
					win.hide();
					updateBookList(action.result.id);
					Ext.Msg.alert('提示','新增类型成功');
				},
				failure:function(form, action){
					//alert(form);
					//alert(action);
					//alert('action.result.bookId'+action.result.bookId);
					Ext.Msg.alert('提示','新增类型失败');
				}
			});
		}else{
			bookForm.form.submit({
				clientValidation:true,
				waitMsg:'正在提交数据请稍候',
				waitTitle:'提示',
				url:'modifybookCRUD.action',
				method:'post',
				success:function(form, action){
					win.hide();
					alert(action.result.bookId);
					updateBookList(action.result.bookId);
					Ext.Msg.alert('提示', '修改书籍成功');
				},
				failure:function(form, action){
					Ext.Msg.alert('提示', '修改书籍失败');
				}
			});
		}
	}
	function updateBookList(bookId){
		var fields = getFormFieldsObj(bookId);
		var index = bookStore.find('id', fields.id);
		alert(index);
		if(index != -1){
			var item = bookStore.getAt(index);
			for(var fieldName in fields){
				item.set(fieldName, fields[fieldName]);
			}
			bookStore.commitChanges();
		}else{
			var rec = new Ext.data.Record(fields);
			bookStore.add(rec);
		}
	}
	function getFormFieldsObj(bookId){
		var fields = bookForm.items;
		var obj = {};
		for(var i = 0; i < fields.length ; i++){
			var item = fields.itemAt(i);
			var value = item.getValue();
			if(item.getXType() == 'combo'){
				var index = item.store.find('id', value);
				if(index != -1){
					var selItem = item.store.getAt(index);
				}
				value = selItem.get('title');
			}
			obj[item.name] = value;
		}
		if(Ext.isEmpty(obj['id'])){
			obj['id'] = bookId;
		}
		return obj;
	}
	
	//取得所选书籍
	function getBookIdList(){
		var recs = bookGrid.getSelectionModel().getSelections();
		var list = [];
		if(recs.length == 0){
			Ext.MessageBox.alert('提示', '请选择要进行操作的书籍！');
		}else{
			for(var i = 0; i < recs.length ; i++){
				var rec = recs[i];
				list.push(rec.get('id'));
			}
		}
		return list;
	}
	
	function loadForm(bookId){
		bookForm.form.load({
			waitMsg:'正在加载数据请稍候',
			waitTitle:'提示',
			url:'getBookById.action',
			params:{bookId:bookId},
			method:'get',
			success:function(form, action){
				//Ext.Msg.alert('提示', '数据加载成功');
			},
			failure:function(form, action){
				Ext.Msg.alert('提示', '数据加载失败');
			}
		});
	}
});
</script>
</head>
<body>
<div id="grid-div" style="width: 100%;height: 100%;"></div>
</body>
</html>