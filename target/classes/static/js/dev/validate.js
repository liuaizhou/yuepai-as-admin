/**
 * Created by CC on 2015/10/8.
 */
/*
 * @para cellphoneStr 要验证的手机字符串
 * 返回true,验证通过，false，验证失败
 * */
/*function CheckCellphone(cellphoneStr){
    //规则是11位的数字组合
    var cellphoneReg="^([0-9]{11})$";
    var cellphonePatt=new RegExp(cellphoneReg);
    return cellphonePatt.test(cellphoneStr);
}*/

/*
 * @para validecodeStr 要验证的手机验证码字符串
 * 返回true,验证通过，false，验证失败
 * */
function CheckValidecode(validecodeStr){
    //规则是4位的数字组合
    var validecodeReg="^([0-9]{4})$";
    var validecodePatt=new RegExp(validecodeReg);
    return validecodePatt.test(validecodeStr);
}

/*
 * @para passwordStr 要验证的密码字符串
 * 返回true,验证通过，false，验证失败
 * */
function checkPassword(passwordStr){
    //规则是6-16位字母和数字
    var passwordReg="^(([A-z]|[0-9]){2,32})$";
    var passwordPatt=new RegExp(passwordReg);
    return passwordPatt.test(passwordStr);
}

//是否手机号码
function checkCellPhone(objValue) {
	if(objValue == null || objValue == undefined || objValue == "") return false;
	var reg = new RegExp("^[1][3578][0-9]{9}$");  
	if(reg.test(objValue)){
		return true;
	}
	return false;
}

//是否是邮箱地址
function checkEmail(objValue) {
	if(objValue == null || objValue == undefined || objValue == "") return false;
	var reg = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");  
	if(reg.test(objValue)){
		return true;
	}
	return false;
}

//是否是正整数
function checkOverZeroInt(objValue) {
	if(objValue == null || objValue == undefined || objValue == "") return false;
	var reg = new RegExp("^[0-9]*[1-9][0-9]*$");  
	if(reg.test(objValue)){
		return true;
	}
	return false;
}

//是否大于等于0整数
function checkInt(objValue) {
	if(objValue == null || objValue == undefined || objValue == "") return false;
	var reg = new RegExp("^\\d+$");  
	if(reg.test(objValue)){
		return true;
	}
	return false;
}

//是否大于0的数字
function checkOverZeroNumber(objValue) {
	if(objValue == null || objValue == undefined || objValue == "") return false;
	var reg = new RegExp("^(?!0(\\d|\\.0+$|$))\\d+(\\.\\d{1,2})?$");  
	if(reg.test(objValue)){
		return true;
	}
	return false;
}

/*
 * @para passwordStr 要验证的密码字符串
 * 返回true,验证通过，false，验证失败
 * */
function checkPinying(objValue){
	if(objValue == null || objValue == undefined || objValue == "") return false;
    //规则是2-16位字母
    var passwordReg="^(([A-z]){2,32})$";
    var passwordPatt = new RegExp(passwordReg);
    return passwordPatt.test(objValue);
}

//验证form表单
function form_valid(formObj) {
	var form_flag = true;
	$(formObj).find("input[type=text],textarea").each(function(i, o) {
		var obj = $(o);
		var value = obj.val();
		value = (value == null || value == undefined ? "" : value);
		if(obj.attr("must") == "1" && value == "") {
			obj.attr("placeholder","必填项不能为空");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("int") == "1" && !checkInt(value)) {
			obj.val("");
			obj.attr("placeholder","请输入合法数字");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("number") == "1" && !checkOverZeroNumber(value)) {
			obj.val("");
			obj.attr("placeholder","请输入合法数字");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("oint") == "1" && !checkOverZeroInt(value)) {
			obj.val("");
			obj.attr("placeholder","请输入正整数");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("email") == "1" && !checkEmail(value)) {
			obj.val("");
			obj.attr("placeholder","请输入正确的邮箱地址");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("mobile") == "1" && !checkCellPhone(value)) {
			obj.val("");
			obj.attr("placeholder","请输入正确的手机号码");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("pin") == "1" && !checkPinying(value)) {
			obj.val("");
			obj.attr("placeholder","请输入2-32位纯字母");
			form_flag = false;
			return false;
		} else if(value != "" && obj.attr("pwd") == "1" && !checkPassword(value)) {
			obj.val("");
			obj.attr("placeholder","请输入2-32位字母和数字");
			form_flag = false;
			return false;
		}
	});
	return form_flag;
}
