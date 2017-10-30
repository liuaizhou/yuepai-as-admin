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
function CheckPassword(passwordStr){
    //规则是6-16位字母和数字
    var passwordReg="^(([A-z]|[0-9]){6,16})$";
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
