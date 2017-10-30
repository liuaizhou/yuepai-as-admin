$(function(){
	/*弹出层*/
	
	var html = '<div class="defaultModal modal fade" id="" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">'+
	  '<div class="modal-dialog">'+
	    '<div class="modal-content">'+
	      '<div class="modal-header">'+
	        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
	       ' <h4 class="modal-title" id="myModalLabel"></h4>'+
	      '</div>'+
	     ' <div class="modal-body">'+
	     	
	     ' </div>'+
	     ' <div class="modal-footer">'+
	     	
	   '   </div>'+
	   ' </div>'+
	 ' </div>'+
'	</div>';

$("body").append(html);
	
	/*confirm 层*/
	
		var chtml = '<div class="confirmModal  modal fade" id="" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
		  '<div class="modal-dialog">'+
		    '<div class="modal-content">'+
		    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
		     ' <div class="modal-body">'+
		     	
		     ' </div>'+
		     ' <div class="modal-footer">'+
		     	
		   '   </div>'+
		   ' </div>'+
		 ' </div>'+
	'	</div>';
	
	$("body").append(chtml);
	
	/*弹层在弹出弹层。第二个层*/
	var htmltwo = '<div class="defaultModalTwo modal fade" id="" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
	  '<div class="modal-dialog">'+
	    '<div class="modal-content">'+
	      '<div class="modal-header">'+
	        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
	       ' <h4 class="modal-title" id="myModalLabel"></h4>'+
	      '</div>'+
	     ' <div class="modal-body">'+
	     	
	     ' </div>'+
	     ' <div class="modal-footer">'+
	     	
	   '   </div>'+
	   ' </div>'+
	 ' </div>'+
'	</div>';

$("body").append(htmltwo);


$(".modal .modal-body").css({
	maxHeight : $(window).height() - $(".modal .modal-header").height() - $(".modal .modal-footer").height() - 230
});
	
	/*弹出层*/
	
	$("[data-toggle='modal']").live("mouseover",function(){
		var idd = $(this).attr('data-target');
		var id = idd.substring(1,idd.length);
		var typed = $(this).attr('typed');
		if(typed == undefined || typed == null || typed == "" || typed == 'popup'){
			$(".defaultModal").attr("id",id);
		}else if(typed == 'confirm'){
			$(".confirmModal").attr("id",id);
		}else if(typed == 'popuptwo'){
			$(".defaultModalTwo").attr("id",id);
		}
		
	});
	
	$(".modal .modal-footer").find(".btn-primary").live('click',function(){
		var fun = $(this).attr("eval_fun");
		doCallback(eval(fun),[this]);
	});
	
	
	
	
	
//	/*select效果 公用JS*/
//	selectInut();
//	
//	function selectInut(){
//		$(".commonselectBox").each(function(){
//			var heig = $(this).height();
//			var ul = $(this).find("ul");
//			var len = $(this).find("ul li").length;
//			var b = $(".commonselectBox").find('b.selectIcon');
//			var num = 4;
//			
//			$(this).find(".selectIcon").width(heig);
//			
//			ul.css({
//				top:heig + 1,
//				height:len*heig
//			});
//			ul.find("li").css({
//				height : heig
//			});
//			$(this).find(".selectIcon span").css({
//				marginTop:heig/2.5,
//				marginLeft:heig/4
//			});
//			if(b.hasClass('noMenu')){
//				ul.css({
//					height : 'auto'
//				})
//			}else{
//				if(len >= num){
//					ul.css({
//						height : heig*num,
//						overflowX:'hidden',
//						overflowY:'auto'
//					})
//				}
//			}
//			
//			
//			
//		});
//	}
	/*$(".commonselectBox").live("hover",function(){
		
		$(this).find(".commonSelectUl").show();
	},function(){
			var _this = $(this);
			var hoverd = $(this).find(".commonSelectUl").attr('hoverd');
			if(hoverd == '' || hoverd == 'false' || hoverd == undefined || hoverd == null){
				_this.find(".commonSelectUl").hide();
				
			}
		
	});*/
	
	
//	$(".commonSelectUl").live("mouseover",function(){
//		$(this).attr("hoverd",'true');
//	});
//	
//	$(".commonSelectUl").live("mouseleave",function(){
//		$(this).hide();
//		$(this).attr("hoverd",'false');
//	});
//	
//	$(".commonselectBox").live("mouseleave",function(){
//		var _this = $(this);
//		var hoverd = $(this).find(".commonSelectUl").attr('hoverd');
//		if(hoverd == '' || hoverd == 'false' || hoverd == undefined || hoverd == null){
//			_this.find(".commonSelectUl").hide();
//			
//		}
//	});
//	
//	$(".commonselectBox .selectIcon").live("click",function(){
//		$(this).parent().find("ul").toggle();
//		selectInut();
//	});
//	
//	$(".setMbBtn .lookMore").live("click",function(){
//		$(".chooseImg").show();
//		var width = $(window).width();
//		var height = $(window).height();
//		var childheig = $(".chooseImg .chooseImgCon").height();
//		if(childheig >= height){
//			$(".chooseImg .chooseImgCon").css({
//				height : height,
//				marginTop : 0,
//				top:0
//			});
//			$(".chooseImg .chooseImgCon ul").css({
//				height : height - 60 - $(".chooseImg .chooseImgCon h4").height() - $(".chooseImg .chooseImgCon .chooseImgFun").height()
//			});
//			
//		}
//		
//	});
//	$(".chooseImg .chooseImgClose").live("click",function(){
//		$(this).parents(".chooseImg").hide();
//	});
//	
//	
//
//	
//	$(".modal .close").live("click",function(){
//		$(".qtip").remove();
//	});
	
	
});



function popup(obj,title,text,type,savetxt,closetxt,width){
	/*
	 * type： 1 -> 有取消和确定  2 ->　只有确定　　３　－＞　只有取消
	 * id : 转入一个ID
	 * width : 给弹出层设置宽度
	 * title:弹层的标题
	 * text : 弹层的内容，传入html或是文字
	 * savetxt: 确定按钮的文字。 默认是“确定” ， 如果是保存，发送等，就传值进去。
	 * closetxt就是取消按钮。同上
	 * 
	 * */
	
	
	var wid = width == undefined ? 600 : width;
	$(".defaultModal .modal-dialog").width(wid);	
	
	if(savetxt == "" || savetxt == undefined || savetxt == null){
		savetxt = "确定"
	}
	if(closetxt == "" || closetxt == undefined || closetxt == null){
		closetxt = "取消"
	}
	
	
	var typehtml = '';
	if(type == 1 || type == undefined || type==null || type==""){
		typehtml　=　'<button type="button" class="btn btn-default commonClose " data-dismiss="modal">'+closetxt+'</button>'+
        			'<button type="button" class="btn btn-primary">'+savetxt+'</button>'
	}else if(type == 2){
		typehtml　= '<button type="button" class="btn btn-primary">'+savetxt+'</button>'
	}else if(type == 3){
		typehtml　= '<button type="button" class="btn btn-default commonClose" data-dismiss="modal">'+closetxt+'</button>'
	}
	
	$(".defaultModal .modal-title").html(title);
	$(".defaultModal .modal-body").html(text);
	$(".defaultModal .modal-footer").html(typehtml);
	
			
	
}

function hidePopup(type){
	/*$(dom).parents(".modal").removeClass("in");
	$(".modal-backdrop").remove();*/
	if(type == 1 || type == undefined || type==null || type==""){
		$('.defaultModal').modal('hide')
	}else if(type == 2){
		$('.confirmModal').modal('hide')
	}else if(type == 3){
		$('.defaultModalTwo').modal('hide')
	}
	
}
/*confirm层*/
function cfpopup(obj,title,text,type,width,savetxt,closetxt){
	var wid = width == undefined ? 600 : width;
	$(".confirmModal .modal-dialog").width(wid);	
	
	if(savetxt == "" || savetxt == undefined || savetxt == null){
		savetxt = "确定"
	}
	if(closetxt == "" || closetxt == undefined || closetxt == null){
		closetxt = "取消"
	}
	
	
	var typehtml = '';
	if(type == 1 || type == undefined || type==null || type==""){
		typehtml　=　'<button type="button" class="btn btn-default commonClose " data-dismiss="modal">'+closetxt+'</button>'+
        			'<button type="button" class="btn btn-primary">'+savetxt+'</button>'
	}else if(type == 2){
		typehtml　= '<button type="button" class="btn btn-primary">'+savetxt+'</button>'
	}else if(type == 3){
		typehtml　= '<button type="button" class="btn btn-default commonClose" data-dismiss="modal">'+closetxt+'</button>'
	}
	
	$(".confirmModal .modal-title").html(title);
	$(".confirmModal .modal-body").html(text);
	$(".confirmModal .modal-footer").html(typehtml);
}

/*弹层再弹弹层*/
function popupTwo(obj,title,text,type,savetxt,closetxt,width){
	/*
	 * type： 1 -> 有取消和确定  2 ->　只有确定　　３　－＞　只有取消
	 * id : 转入一个ID
	 * width : 给弹出层设置宽度
	 * title:弹层的标题
	 * text : 弹层的内容，传入html或是文字
	 * savetxt: 确定按钮的文字。 默认是“确定” ， 如果是保存，发送等，就传值进去。
	 * closetxt就是取消按钮。同上
	 * 
	 * */
	
	var wid = width == undefined ? 600 : width;
	$(".defaultModalTwo .modal-dialog").width(wid);	
	
	if(savetxt == "" || savetxt == undefined || savetxt == null){
		savetxt = "确定"
	}
	if(closetxt == "" || closetxt == undefined || closetxt == null){
		closetxt = "取消"
	}
	
	
	var typehtml = '';
	if(type == 1 || type == undefined || type==null || type==""){
		typehtml　=　'<button type="button" class="btn btn-default commonClose " data-dismiss="modal">'+closetxt+'</button>'+
        			'<button type="button" class="btn btn-primary">'+savetxt+'</button>'
	}else if(type == 2){
		typehtml　= '<button type="button" class="btn btn-primary">'+savetxt+'</button>'
	}else if(type == 3){
		typehtml　= '<button type="button" class="btn btn-default commonClose" data-dismiss="modal">'+closetxt+'</button>'
	}
	
	$(".defaultModalTwo .modal-title").html(title);
	$(".defaultModalTwo .modal-body").html(text);
	$(".defaultModalTwo .modal-footer").html(typehtml);
}


//提示弹出层
function alertBox(txt,time,width,height){
	var alertHtml = '<div class="alertBox" style="display:none">'+
	  '<div class="fankui_tanbox_filter"></div>'+
	  '<div id="dialog-feed-back" class="dialog-window common-dialog">'+	
	  '<div class="dialog-main common-dialog-main" id="dialog-main">'+
	  '</div>'+
	  '</div>'	
	$("body").append(alertHtml);
	$(".alertBox").fadeIn();
	editTanbox(".alertBox .dialog-window");
	$(".alertBox #dialog-main").html(txt);
	
	var mainHeig = $(".alertBox #dialog-main").height();
	$(".alertBox #dialog-feed-back").css({
		height: mainHeig+50+"px",
		borderRadius: (mainHeig+50)/2+"px"
	})
	if(!time){
		time = 2000
	}else{
		time = time;
	}
	setTimeout(function(){
		$(".alertBox").fadeOut();
	},time);
	
	var timed = time + 500
	setTimeout(function(){
		//$(".alertBox").remove();
	},timed);
	
	
	if(width){
		$(".alertBox #dialog-feed-back").css({
			width: width+"px",
			winWidth : width+"px"
		})
	};
	if(height){
		$(".alertBox #dialog-feed-back").css({
			height: height+"px",
			minHeight : height+"px"
		})
	}
	
	
}

/*设置弹出层的位置*/
function editTanbox(name){
	setTimeout(function(){
		var top = $(name).height();
		var left = $(name).width();
		$(name).css({
			marginTop: -(top/2) + "px",
			marginLeft:-(left/2) + "px" 	
		})
	},15)
}


/*设置确定按钮回调函数*/
function setButtonEval(eval_fun,type){
	if(type == 1 || type == undefined || type == "" || type == null){
		$(".defaultModal .modal-footer").find(".btn-primary").attr("eval_fun",eval_fun);
		$(".defaultModal .modal-footer").find(".btn-primary").attr("disabled",false);
	}else if(type == 2){
		$(".confirmModal .modal-footer").find(".btn-primary").attr("eval_fun",eval_fun);
		$(".confirmModal .modal-footer").find(".btn-primary").attr("disabled",false);
	}else if(type == 3){
		$(".defaultModalTwo .modal-footer").find(".btn-primary").attr("eval_fun",eval_fun);
		$(".defaultModalTwo .modal-footer").find(".btn-primary").attr("disabled",false);
	}
	
}
function setButtonAttribute(name,value,type){
	if(type == 1 || type == undefined || type == "" || type == null){
		$(".defaultModal .modal-footer").find(".btn-primary").attr(name,value);
	}else if(type == 2){
		$(".confirmModal .modal-footer").find(".btn-primary").attr(name,value);
	}else if(type == 3){
		$(".defaultModalTwo .modal-footer").find(".btn-primary").attr(name,value);
	}
	
}
	
function doCallback(fn,args){    
    fn.apply(this, args);  
}  


/*load层*/
function loadingShow(txt){
	var hhtml = '<div class="LoadingFil filter6"></div>'
	if(txt == undefined){
		$("body").before(hhtml);
		var loadBox = '<div class="LoadingBox hide" id="loading_box"><div><img src="../../../img/load.gif"></div></div>';
	}else{
		var loadBox = '<div class="LoadingBox hide" id="loading_box"><div class="fil filter6"></div><div class="loadCon"><img src="../../../img/load.gif"><p>'+txt+'</P></div></div>';
	}
	
	$("body").before(loadBox);	
	$("#loading_box").removeClass('hide');
}

function loadingHide(){
	$("#loading_box").remove();
	$(".LoadingFil").remove();
}
