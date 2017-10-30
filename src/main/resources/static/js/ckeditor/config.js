/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.protectedSource.push(/<span[^>]><\/span>/g);
	CKEDITOR.dtd.$removeEmpty['span'] = false;
	config.protectedSource.push(/<title[^>]><\/title>/g);
	CKEDITOR.dtd.$removeEmpty['title'] = false;

	config.fullPage= true;



	config.allowedContent = true;
	config.enterMode = CKEDITOR.ENTER_BR;
	config.shiftEnterMode = CKEDITOR.ENTER_P;
	config.filebrowserImageBrowseUrl = '../a?Type=Images';
	config.filebrowserImageUploadUrl = "/website-admin/servlet/TestFlash?command=QuickUpload&Type=Images";
	
	config.font_names = '宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;' + config.font_names;
};
