Ext.ux.ThemeChange = Ext.extend(Ext.form.ComboBox, {
	editable : false,
	displayField : 'theme',
	valueField : 'css',
	typeAhead : true,
	mode : 'local',
	triggerAction : 'all',
	selectOnFocus : true,
	initComponent : function(){
		var themes = [
			['Ĭ��', 'ext-all.css'],
			['��ɫ', 'xtheme-black.css'],
			['�ɿ�fɫ', 'xtheme-black.css'],
			['���ɫ', 'xtheme-darkgray.css'],
			['ǳ��ɫ', 'xtheme-gray.css'],
			['��ɫ', 'xtheme-green.css'],
			['���ɫ', 'xtheme-olive.css'],
			['����ɫ', 'xtheme-peppermint.css'],
			['��ɫ', 'xtheme-pink.css'],
			['��ɫ', 'xtheme-purple.css'],
			['����ɫ', 'xtheme-slate.css'],
			['����ɫ', 'xthem-indigo.css'],
			['��ҹ', 'xtheme-midnight.css'],
			['���ɫ', 'xtheme-silverCherry.css']
		];
		this.store = new Ext.data.SimpleStore({
			fields : ['theme', 'css'],
			data :themes
		});
		this.value = 'Ĭ��';
	},
	initEvents : function(){
		this.on('collapse', function(){
			Ext.util.CSS.swapStyleSheet('theme', '../ExtJS2/resources/css/'+this.getValue());
		});
	}
});
Ext.reg('themeChange', Ext.ux.ThemeChange);