var tableTrStr = 
	    '<tr class="js-condition-tr">' +
		    '<td>' +
		        '<select class="chzn-select-deselect span12" tabindex="-1" id="conditionId"> ' +
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
		    '<td> <button class="js-condition-delete" class="btn green"> <i class="icon-remove"></i> 删除</button></td> ' +
	    '</tr>';
   
$(function() {
   $("#js_condition_add").click(function(){
	   //新增条件tr
       if ($('.js-condition-tboby').children().size() == 0) {
           $('.js-condition-tboby').append(tableTrStr);
       } else {
           $('.js-condition-tr').last().after(tableTrStr);
       }
	   jQuery.ajax({
			type : "POST",
			url : "../chart/findConditionList",
			dataType : "json",
			success : function(data) {
				var conditionId = '';
				var operatorId = '';
				var inputValue = '';
				for(var i = 0; i < data.conditionMapList.length; i++){
					conditionId += '<option value="'+ data.conditionMapList[i].conditionId +'" >'+  data.conditionMapList[i].conditionName +'</option>';
					if(i == 0){
						for(var j = 0; j < data.conditionMapList[i].operatorList.length; j++){
							operatorId += '<option value="'+ data.conditionMapList[i].operatorList[j].operatorId +'" title="' + data.conditionMapList[i].operatorList[j].inputIsMany +'">'+  data.conditionMapList[i].operatorList[j].operatorAlias +'</option>';
						}
						if(data.conditionMapList[i].inputValueList != null){
							for(var j = 0; j < data.conditionMapList[i].inputValueList.length; j++){
								inputValue += '<option value="'+ data.conditionMapList[i].inputValueList[j].id +'" name="'+ data.conditionMapList[i].inputValueList[j].code +'">'+  data.conditionMapList[i].inputValueList[j].name +'</option>';
							}
						}else{
							var intputV = '<input id="inputValue" type="text" class="span11" maxlength="100"/>';
							$('.js-condition-tboby').children("tr:last-child").children().eq(2).children().eq(0).remove();
							$('.js-condition-tboby').children("tr:last-child").children().eq(2).append(intputV);
						}
					}
				}
				$('.js-condition-tboby').children("tr:last-child").children().eq(0).children().eq(0).append(conditionId);
				$('.js-condition-tboby').children("tr:last-child").children().eq(1).children().eq(0).append(operatorId);
				$('.js-condition-tboby').children("tr:last-child").children().eq(2).children().eq(0).append(inputValue);
			},
			error : function(data) {
				alert("新增异常，请联系管理员!");
			}
		});
   });
 
   $("#editable-sample").on("click",".js-condition-delete",function(){
	   $(this).parent().parent().remove();
   });
   
   
   $("#save_condition").click(function(){
	   var jsonStr = getChannelMap();
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
	   if('' == jsonStr.startTime || null == jsonStr.startTime){
		   alert("请选择开始时间")
		   return !1;
	   }
	   if('' == jsonStr.endTime || null == jsonStr.endTime){
		   alert("请选择结束时间")
		   return !1;
	   }
	   jsonStr.conditionList = getConditionList();
	   jQuery.ajax({
           type: 'post',
           url: "../chart/insertChartOfChannel",
           data: {jsonStr:JSON.stringify(jsonStr)},
           dataType: "json",
           success: function (data) {
               if (data.code == "0") {
                   alert('保存成功');
                   window.location.href = "/chart/showChartChannelRef";
               } else {
                   alert(data.msg);
               }
           },
           error: function (e) {
               alert("提交失败");
           }
       })
   });
   

   $("#editable-sample").on("change","[id=conditionId]",function(){
	   var conditionId = $(this).val();
	   var select = $(this);
	   	jQuery.ajax({
	   		type : "POST",
	   		data : {conditionId : conditionId},
	   		url : "../chart/findOperatorList",
	   		dataType : "json",
	   		success : function(data) {
	   			var operatorId = '';
	   			var inputValue = '';
	   			for(var j = 0; j < data.operatorList.length; j++){
	   				operatorId += '<option value="'+ data.operatorList[j].operatorId +'"  title="'+ data.operatorList[j].inputIsMany +'">'+  data.operatorList[j].operatorAlias +'</option>';
	   			}
	   			if(data.inputValueList != null){
	   				inputValue += '<select class="chzn-select-deselect span12" tabindex="-1" id="inputValue"> ';
	   				for(var j = 0; j < data.inputValueList.length; j++){
	   					inputValue += '<option value="'+ data.inputValueList[j].id +'"name="'+ data.inputValueList[j].code +'">'+  data.inputValueList[j].name +'</option>';
	   				}
	   				inputValue += '</select>';
	   			}else{
	   				inputValue = '<input id="inputValue" type="text" class="span11" maxlength="100" />';
	   			}
	   			var tr = select.parents("tr");//获取到tr，这样确定了当前循环的作用域。
	   			var operator = tr.find("[id=operatorId]");//第二个
	   			var inputValueTd = tr.find("[id=inputValue]").parent("td");//第三个
	   			operator.html(operatorId);
	   			inputValueTd.children().remove();
	   			inputValueTd.html(inputValue);
	   			
	   		},
	   		error : function(data) {
	   			alert("新增异常，请联系管理员!");
	   		}
	   	});
   }).change();
   
   $("#editable-sample").on("change","[id=operatorId]",function(){
		var operatorId = $(this).val();
		var inputIsMany = $(this).find("[value="+operatorId +"]").attr("title");
		console.log(operatorId);
		console.log(inputIsMany);
		if(inputIsMany == -1){		
			$(this).parents("tr").find("[id=inputValue]").css("display","none");
		}else{
			$(this).parents("tr").find("[id=inputValue]").css("display","block");
		}	
	}).change();
});

function getConditionList(){
	var conditionList = [];
	var trList = $(".js-condition-tr");
	trList.each(function () {
        var map = {};
        map.conditionId = $(this).children().eq(0).children().val();
        map.operatorId = $(this).children().eq(1).children().val();
        var status = $(this).children().eq(2).children().css("display");
        if(status != 'none'){        	
	        if($(this).children().eq(2).find("select").length > 0){
		        map.inputValue = $(this).children().eq(2).children().find("option:selected").val();
		        map.inputCode = $(this).children().eq(2).children().find("option:selected").attr("name");
	        }else{
	        	map.inputValue = $(this).children().eq(2).children().text();
	        	map.inputCode = $(this).children().eq(2).children().text();
	        }
        }
        conditionList.push(map);
    });
	return conditionList;
}

function getChannelMap(){
	var channelMap = {};
	var chartId = $("#chartId").val();
	if(null == chartId || "" == chartId){
		chartId = "";
	}
	channelMap.chartId = chartId;
	channelMap.crowdId = $("#crowdId").val();
	channelMap.chartName = $("#chartName").val();
	channelMap.indexId = $("#indexId").val();
	channelMap.chartBusinessId = 1101;
	channelMap.chartClassifyId = $("#chartClassifyId").val();
	channelMap.groupId = $("#groupId").val();
	channelMap.groupType= 3;
	channelMap.showTimeType=$("#show_time_sel").val();
	channelMap.startTime=$("#startTime").val()
	channelMap.endTime=$("#endTime").val()
	return channelMap;
}

