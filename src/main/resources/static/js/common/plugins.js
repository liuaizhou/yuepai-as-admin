jQuery.extend({
	checkAll : function(checkid, clickid) {
		var obj = $("#" + clickid).click(function() {
			var chk = this;
			$(":input[id='" + checkid + "']").each(function() {
				this.checked = chk.checked;
			})
		})
	}
})

jQuery.extend({
	loading : function() {
				if ($("#loading").length == 0) {
					$("<div id='loading'></div>").appendTo("body").append(
							"<img src='/img/load.gif' border='0'>").css({
						position : "absolute",
						//width : "205px",
						//height : "60px",
						//border : "solid 1px #fed68e",
						//background : "#ffffe3",
						"z-index" : "9999"
					}).each(
							function() {
								var left = document.documentElement.clientWidth
										/ 2 - $(this).width() / 2;
								var top = document.documentElement.clientHeight
										/ 2 - $(this).height() / 2;
								$(this).css({
									left : (left + 30) + "px",
									top : (top - 100) + "px"
								});
							}).ajaxStart(function() {
						$(this).show();
					}).ajaxSuccess(function() {
						$(this).hide();
					});
					$(window)
							.scroll(
									function() {
										$("#loading")
												.each(
														function(i) {
															var left = document.documentElement.clientWidth
																	/ 2
																	- $(this)
																			.width()
																	/ 2
																	+ document.documentElement.scrollLeft;
															var top = document.documentElement.clientHeight
																	/ 2
																	- $(this)
																			.height()
																	/ 2
																	+ document.documentElement.scrollTop;
															$(this)
																	.css(
																			{
																				left : (left + 30)
																						+ "px",
																				top : (top - 100)
																						+ "px"
																			});
														});
									});
				}
			}
		});


jQuery.extend({
	showTip : function(content, url) {

		$("#result_div").appendTo("body").css({
			position : "absolute",
			display : "block",
			"z-index" : "10000"
		}).each(
				function() {
					$("#tip").html(content);
					var left = document.documentElement.clientWidth / 2
							- $(this).width() / 2;
					var top = document.documentElement.scrollTop
							+ document.documentElement.clientHeight / 2
							- $(this).height() / 2;
					$(this).css({
						left : (left) + "px",
						top : (top - 35) + "px"

					});
				});
		if (url == null) {
			crTimeout = window.setTimeout("$('#result_div').hide()", 3000);
		} else {

			// window.setTimeout("localtion.href="+url, 3000);
			window.setTimeout('location   =   "' + url + '" ', 3000);

		}

	}
});

jQuery.extend({
	showFloatTip : function(content, $obj) {
		$("#result_float_tip_div").css({
			position : "absolute",
			display : "block",
			"z-index" : "10000"
		}).each(
				function() {
					var left;
					var top;
					$("#result_float_tip_div div[id='tip']").html(content);
					if ($obj) {
						left = $obj.offset().left;
						top = $obj.offset().top - $obj.height();
					} else {
						left = document.documentElement.clientWidth / 2
								- $(this).width() / 2;
						top = document.documentElement.scrollTop
								+ document.documentElement.clientHeight / 2
								- $(this).height() / 2;
					}

					$(this).css({
						left : left + "px",
						top : top + "px"

					});
				});

		window.setTimeout("$('#result_float_tip_div').hide()", 2000);

	}
});


jQuery.fn.extend({
	getCurPos : function() {
		var e = $(this).get(0);
		e.focus();
		if (e.selectionStart) { // FF
			return e.selectionStart;
		}
		if (document.selection) { // IE
			var r = document.selection.createRange();
			if (r == null) {
				return e.value.length;
			}
			var re = e.createTextRange();
			var rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);
			return rc.text.length;
		}
		return e.value.length;
	},
	setCurPos : function(pos) {
		var e = $(this).get(0);
		if (e.setSelectionRange) {
			setTimeout(function() {
				e.setSelectionRange(pos, pos);
				e.focus();
			}, 0);
		} else if (e.createTextRange) {
			var range = e.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
});

jQuery.extend({
	/**
	 * @see 将json字符串转换为对象
	 * @param json字符串
	 * @return 返回object,array,string等对象
	 */
	evalJSON : function(strJson) {
		return eval("(" + strJson + ")");
	}
});
jQuery.extend({
	/**
	 * @see 将javascript数据类型转换为json字符串
	 * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
	 * @return 返回json字符串
	 */
	toJSON : function(object) {
		var type = typeof object;
		if ('object' == type) {
			if (Array == object.constructor)
				type = 'array';
			else if (RegExp == object.constructor)
				type = 'regexp';
			else
				type = 'object';
		}
		switch (type) {
		case 'undefined':
		case 'unknown':
			return;
			break;
		case 'function':
		case 'boolean':
		case 'regexp':
			return object.toString();
			break;
		case 'number':
			return isFinite(object) ? object.toString() : 'null';
			break;
		case 'string':
			return '"'
					+ object.replace(/(\\|\")/g, "\\$1").replace(
							/\n|\r|\t/g,
							function() {
								var a = arguments[0];
								return (a == '\n') ? '\\n'
										: (a == '\r') ? '\\r'
												: (a == '\t') ? '\\t' : ""
							}) + '"';
			break;
		case 'object':
			if (object === null)
				return 'null';
			var results = [];
			for ( var property in object) {
				var value = jQuery.toJSON(object[property]);
				if (value !== undefined)
					results.push(jQuery.toJSON(property) + ':' + value);
			}
			return '{' + results.join(',') + '}';
			break;
		case 'array':
			var results = [];
			for ( var i = 0; i < object.length; i++) {
				var value = jQuery.toJSON(object[i]);
				if (value !== undefined)
					results.push(value);
			}
			return '[' + results.join(',') + ']';
			break;
		}
	}
});

jQuery.fn.loadImage = function(width, height,zoom) {
	return this.each(function() {
		var t = $(this);
		var image = new Image();
		image.src = $(this).attr("src");
		// 自动缩放图片
		var autoZoom = function() {
			if (zoom) {
				if (image.width > 0 && image.height > 0) {
					if (image.width / image.height >= width / height) {
						if (image.width > width) {
							t.width(width);
							t.height((image.height * width) / image.width);
							// t.css("margin-top", (height-t.height())/2);
						} else {
							t.width(image.width);
							t.height(image.height);
							// t.css("margin-top", (height-t.height())/2);
						}
					} else {
						if (image.height > height) {
							t.height(height);
							t.width((image.width * height) / image.height);
							// t.css("margin-top", (height-t.height())/2);
						} else {
							t.width(image.width);
							t.height(image.height);
							// t.css("margin-top", (height-t.height())/2);
						}
					}
				}

			}
		};
		//处理火狐下会自动读取缓存图片
		if (image.complete) {
			autoZoom();
			return;
		}
		//$(this).removeAttr("src");
		var loading = $("<span><img src='/images/loading.gif'/></span>");
		t.hide();
		t.after(loading);
		$(image).load(function() {
			autoZoom();
			loading.remove();
			t.attr("src", this.src);
			t.show();
		});
	});
};
