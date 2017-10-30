 var eventConditionTable = 
    '<tr class="js-event-condition-tr">' +
	    '<td>' +
	        '<select class="chzn-select-deselect span12" tabindex="-1" id="eventAttrId"> ' +
	        '</select>' +
    	'</td> ' +
	    '<td>' +
	        '<select class="chzn-select-deselect span12" tabindex="-1" id="operatorId"> ' +
	        '</select>' +
	    '</td> ' +
	    '<td>' +
	        '<select class="chzn-select-deselect span12" tabindex="-1" id="inputValue"> ' +
	        '</select>' +
	    '</td> ' +
	    '<td> <button class="js-event-condition-delete" class="btn green"> <i class="icon-remove"></i> 删除</button></td> ' +
    '</tr>';
    
   var indexTable = 
    '<tr class="js-index-tr">' +
	    '<td>' +
	        '<select class="chzn-select-deselect span12" tabindex="-1" id="eventId"> ' +
	        '</select>' +
    	'</td> ' +
	    '<td>' +
	        '<select class="chzn-select-deselect span12" tabindex="-1" id="indexOrAttrId"> ' +
	        '</select>' +
	    '</td> ' +
	    '<td>' +
	        '<select class="chzn-select-deselect span12" tabindex="-1" id="indexId"> ' +
	        '</select>' +
	    '</td> ' +
	    '<td> <button class="js-index-delete" class="btn green"> <i class="icon-remove"></i> 删除</button></td> ' +
    '</tr>';
$(function() {
	$("#js_index_add").click(function(){
	  //新增条件tr
	   if ($('.js-index-tboby').children().size() == 0) {
	       $('.js-index-tboby').append(indexTable);
	   } else {
	       $('.js-index-tr').last().after(indexTable);
	   }
	  jQuery.ajax({
			type : "POST",
			url : "../chart/findEventIndex",
			dataType : "json",
			success : function(data) {
				var eventId = '<option value="" >---请选择---</option>';
				var indexOrAttrId = '<option value="" >---请选择---</option>';
				for(var i = 0; i < data.eventList.length; i++){
					eventId += '<option value="'+ data.eventList[i].eventId +'" >'+  data.eventList[i].eventName +'</option>';
				}
				for(var i = 0; i < data.indexList.length; i++){
					indexOrAttrId += '<option value="'+ data.indexList[i].indexId +'" >'+  data.indexList[i].indexName +'</option>';
				}
				$('.js-index-tboby').children("tr:last-child").children().eq(0).children().eq(0).append(eventId);
				$('.js-index-tboby').children("tr:last-child").children().eq(1).children().eq(0).append(indexOrAttrId);
			},
			error : function(data) {
				alert("新增异常，请联系管理员!");
			}
		});
	});
   $("#js_event_condition_add").click(function(){
	   //判断是否已经添加了事件
	   var eventIds = "";
	   $("#eventId").each(function(){
		   eventIds += $(this).val() + ",";
	   });
	   if("" == eventIds){
		   alert("请选择事件");
		   return;
	   }
	   //新增条件tr
       if ($('.js-event-condition-tboby').children().size() == 0) {
           $('.js-event-condition-tboby').append(eventConditionTable);
       } else {
           $('.js-event-condition-tr').last().after(eventConditionTable);
       }
	   
	   jQuery.ajax({
			type : "POST",
			url : "../chart/findEventCondition",
			data : {eventIds : eventIds.substring(0,eventIds.length-1)},
			dataType : "json",
			success : function(data) {
				var eventAttrId = '';
				var operatorId = '';
				var inputValue = '';
				for(var i = 0; i < data.eventAttrMap.length; i++){
					eventAttrId += '<option value="'+ data.eventAttrMap[i].attrId +'" title="'+ data.eventAttrMap[i].attrType +'">'+  data.eventAttrMap[i].attrName +'</option>';
					if(i == 0){
						for(var j = 0; j < data.eventAttrMap[i].operatorList.length; j++){
							operatorId += '<option value="'+ data.eventAttrMap[i].operatorList[j].operatorId +'" >'+  data.eventAttrMap[i].operatorList[j].operatorAlias +'</option>';
						}
						if(null != data.eventAttrMap[i].inputValueList && data.eventAttrMap[i].inputValueList.length > 0){
							for(var j = 0; j < data.eventAttrMap[i].inputValueList.length; j++){
								inputValue += '<option value="'+ data.eventAttrMap[i].inputValueList[j].id +'" title="'+ data.eventAttrMap[i].inputValueList[j].code +'">'+  data.eventAttrMap[i].inputValueList[j].name +'</option>';
							}
							$('.js-event-condition-tboby').children("tr:last-child").children().eq(2).children().eq(0).append(inputValue);
						}else{
							var intputV = '<input id="inputValue" type="text" class="span11" maxlength="100"/>';
							$('.js-event-condition-tboby').children("tr:last-child").children().eq(2).children().eq(0).remove();
							$('.js-event-condition-tboby').children("tr:last-child").children().eq(2).append(intputV);
						}
					}
				}
				$('.js-event-condition-tboby').children("tr:last-child").children().eq(0).children().eq(0).append(eventAttrId);
				$('.js-event-condition-tboby').children("tr:last-child").children().eq(1).children().eq(0).append(operatorId);
			},
			error : function(data) {
				alert("新增异常，请联系管理员!");
			}
		});
   });
   
   $("#event-condition-editable-sample").on("change","[id=eventAttrId]",function(){
	   var select = $(this);
	   var attrId = $(this).val();
	   var attrType = $(this).find("[value="+attrId+"]").attr("title");
		jQuery.ajax({
			type : "POST",
			data : {attrId : attrId,attrType : attrType,},
			url : "../chart/findEventAttrOperator",
			dataType : "json",
			success : function(data) {
				var operatorId = '';
				var inputValue = '';
				for(var j = 0; j < data.operatorList.length; j++){
					operatorId += '<option value="'+ data.operatorList[j].operatorId +'" >'+  data.operatorList[j].operatorAlias +'</option>';
				}
				if(data.inputValueList != null && data.inputValueList.length >0){
					inputValue += '<select class="chzn-select-deselect span12" tabindex="-1" id="inputValue"> ';
					for(var j = 0; j < data.inputValueList.length; j++){
						inputValue += '<option value="'+ data.inputValueList[j].id +'" title="'+data.inputValueList[j].code+'">'+  data.inputValueList[j].name +'</option>';
					}
					inputValue += '</select>';
					
				}else{
					inputValue += '<input id="inputValue" type="text" class="span11" maxlength="100" />';
				}
				var operator = select.parents("tr").find("[id=operatorId]");//第二个
				var inputValueTd = select.parents("tr").find("[id=inputValue]").parent("td");//第三个
				operator.html(operatorId);
				inputValueTd.children().remove();
				inputValueTd.html(inputValue);
			},
			error : function(data) {
				alert("切换异常，请联系管理员!");
			}
		});
	}).change();
   
   $("#index-editable-sample").on("change","[id=eventId]",function(){
	   var eventId = $(this).val();
	   var select = $(this);
		jQuery.ajax({
			type : "POST",
			data : {eventId : eventId},
			url : "../chart/findEventAttr",
			dataType : "json",
			success : function(data) {
				var indexOrAttrId = '';
				for(var j = 0; j < data.indexList.length; j++){
					indexOrAttrId += '<option value="'+ data.indexList[j].indexId +'" title="1">'+  data.indexList[j].indexName +'</option>';
				}
				for(var j = 0; j < data.eventAttrList.length; j++){
					indexOrAttrId += '<option value="'+ data.eventAttrList[j].eventAttrId +'" title="2">'+  data.eventAttrList[j].eventAttrName +'</option>';
				}
				var tr = select.parents("tr");//获取到tr，这样确定了当前循环的作用域。
				var indexOrAttrTd = tr.find("[id=indexOrAttrId]");//第二个
				indexOrAttrTd.html(indexOrAttrId);
				findGroupList();
			},
			error : function(data) {
				alert("新增异常，请联系管理员!");
			}
		});
	}).change();
   
   $("#index-editable-sample").on("change","[id=indexOrAttrId]",function(){
	   var indexOrAttrId = $(this).val();
	   var titleType = $(this).find("[value="+indexOrAttrId+"]").attr("title");
	   var indexOrAttrTd = $(this).parents("tr").find("[id=indexId]");//第三个
	   if(titleType == 1){
		   indexOrAttrTd.html("");
		   return;
	   }else{
		   jQuery.ajax({
			   type : "POST",
			   data : {eventAttrId : indexOrAttrId},
			   url : "../chart/findIntegerIndex",
			   dataType : "json",
			   success : function(data) {
				   var indexId = '';
				   for(var j = 0; j < data.indexList.length; j++){
					   indexId += '<option value="'+ data.indexList[j].indexId +'">'+  data.indexList[j].indexName +'</option>';
				   }
				   indexOrAttrTd.html(indexId);
			   },
			   error : function(data) {
				   alert("新增异常，请联系管理员!");
			   }
		   });
	   }
	}).change();
   
 
   $("#index-editable-sample").on("click",".js-index-delete",function(){
	   $(this).parent().parent().remove();
   });
   
   $("#event-condition-editable-sample").on("click",".js-event-condition-delete",function(){
	   $(this).parent().parent().remove();
   });
   
   
   $("#save_event").click(function(){
	   var jsonStr = getEventMap();
	   if('' == jsonStr.chartName || null == jsonStr.chartName){
		   alert("请填写图表名称！");
		   $("#chartName").focus();
		   return !1;
	   }
	   if('' == jsonStr.groupId || null == jsonStr.groupId){
		   alert("请选择图表维度");
		   $("#groupId").focus();
		   return !1;
	   }
	   if('' == jsonStr.crowdId || null == jsonStr.crowdId){
		   alert("请选择人群");
		   $("#crowdId").focus();
		   return !1;
	   }
	   jsonStr.eventConditionList = getEventConditionList();
	   jsonStr.eventIndexList = getEventIndexList();
	   jQuery.ajax({
           type: 'post',
           url: "../chart/insertChartOfEvent",
           data: {jsonStr:JSON.stringify(jsonStr)},
           dataType: "json",
           success: function (data) {
               if (data.code == "0") {
                   alert('保存成功');
                   window.location.href = "/chart/showChartEventRef";
               } else {
                   alert(data.msg);
               }
           },
           error: function (e) {
               alert("提交失败");
           }
       })
   });
});
   
function getEventConditionList(){
	var eventConditionList = [];
	$('.js-event-condition-tr').each(function () {
        var map = {};
        var eventConditionId = $(this).children().eq(0).children().val();
        map.eventConditionId = eventConditionId;
        map.eventConditionType = $(this).children().eq(0).children().find("[value=" + eventConditionId + "]").attr("title");
        map.operatorId = $(this).children().eq(1).children().val();
        if($(this).children().eq(2).find("select").length > 0){
        	var inputValue = $(this).find("[id=inputValue]").val();
	        map.inputValue = $(this).children().eq(2).children().find("option:selected").val();
	        map.inputCode = $(this).children().eq(2).children().find("option:selected").attr("title");
        }else{
        	map.inputValue = $(this).find("[id=inputValue]").val();
        	map.inputCode = null;
        }
        eventConditionList.push(map);
    });
	return eventConditionList;
}
function getEventIndexList(){
	var eventIndexList = [];
	$('.js-index-tr').each(function () {
        var map = {};
        map.eventIndexId = $(this).children().eq(0).children().val();
        var indexOrAttrId = $(this).children().eq(1).children().val();
        var titleType = $(this).children().eq(1).children().find("[value="+indexOrAttrId+"]").attr("title");
        if(titleType == 1){
        	map.indexId = indexOrAttrId;
        }else{
        	map.eventAttrId = indexOrAttrId;
        	map.indexId = $(this).children().eq(2).children().val();
        }
        eventIndexList.push(map);
    });
	return eventIndexList;
}
function getEventMap(){
	var eventMap = {};
	eventMap.chartId = $("#chartId").val();
	eventMap.crowdId = $("#crowdId").val();
	eventMap.chartName = $("#chartName").val();
	eventMap.chartBusinessId = 1201;
	eventMap.chartClassifyId = $("#chartClassifyId").val();
	var groupId = $("#groupId").val();
	eventMap.groupId = groupId;
	eventMap.groupType= $("#groupId").find("[value="+groupId+"]").attr("title");
	eventMap.showTimeType=$("#show_time_sel").val();
	eventMap.startTime=$("#startTime").val()
	eventMap.endTime=$("#endTime").val()
	return eventMap;
}
function findGroupList(){
	//判断是否已经添加了事件
   var eventIds = "";
   $("#eventId").each(function(){
	   eventIds += $(this).val() + ",";
   });
   if("" == eventIds){
	   alert("请选择事件");
	   return;
   }
   jQuery.ajax({
		type : "POST",
		url : "../chart/findEventCondition",
		data : {eventIds : eventIds.substring(0,eventIds.length-1)},
		dataType : "json",
		success : function(data) {
			var groupId = '';
			for(var i = 0; i < data.eventAttrMap.length; i++){
				groupId += '<option value="'+ data.eventAttrMap[i].attrId +'" title="'+ data.eventAttrMap[i].attrType +'">'+  data.eventAttrMap[i].attrName +'</option>';
			}
			$("#groupId").append(groupId);
		},
		error : function(data) {
			alert("新增异常，请联系管理员!");
		}
	});
}