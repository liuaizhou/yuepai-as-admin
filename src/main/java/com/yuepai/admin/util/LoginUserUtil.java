package com.yuepai.admin.util;

import javax.servlet.http.HttpServletRequest;

import com.yuepai.admin.constant.Constant;
import com.yuepai.admin.model.SysUser;

public class LoginUserUtil {

    public static SysUser getLoginUser(HttpServletRequest request) {
        Object logins = request.getSession().getAttribute(Constant.LOGIN_USER_SESSION_KEY);
        if (logins == null) {
            return null;
        }
        return (SysUser) logins;
    }

}
