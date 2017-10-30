/***
 * 上传图片
 * @param dom
 */
function uploadImage(dom, filedir, image_callbak) {
	if($(dom).val() == ''){
		return;
	}
	var filename = $(dom).val();
	if(!/^.+(jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG)$/.test(filename)){
		alertBox("图片格式不正确,请上传:jpg、jpeg、gif、png格式的图片",1200);
		return;
	}
	var curId = $(dom).attr("id");
	if(curId == null || curId == '' || !curId){
		curId = new Date().getTime();
		$(dom).attr("id",curId);
	}
	loadingShow();
	jQuery.ajaxFileUpload({
        url           : "/website-admin/upload-picture",
        secureuri     : false,
        fileElementId : dom.id, 
        data          : {name:filedir} ,
        success       : function (data){
        	loadingHide();
    		data = $.parseJSON($(data).text());
    		var message = data.message;
    	 	$(dom).val("");
    		if(message == 'success') {
    			image_callbak(data.fileurl);
    		} 
        },
        error: function (data, status, e) {
        	alert(e);
        	alertBox("图片上传失败,请重试",500);
        }
    });
}