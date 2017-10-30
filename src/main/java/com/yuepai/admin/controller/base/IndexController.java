package com.yuepai.admin.controller.base;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.yuepai.admin.constant.Constant;
import com.yuepai.admin.model.SysUser;
import com.yuepai.admin.service.SysUserService;
import com.yuepai.admin.util.LoginUserUtil;

@Controller
@RequestMapping(value = "/index")
/**
 * Description: 登录/登出
 *
 * @author zhoutingting
 * @date: 2017年10月30日 下午5:01:35
 * @version 1.0
 * @since JDK 1.8
 */
public class IndexController extends BaseController {

    @Resource
    private SysUserService sysUserService;

    /**
     * 首页
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "")
    public ModelAndView index(HttpServletRequest request) throws Exception {
        ModelAndView view = this.getShowModelAndView("login", request);
        SysUser loginUser = LoginUserUtil.getLoginUser(request);
        if (loginUser != null) {
            view.setViewName("/app/showAppList");
        }
        return view;
    }

    /** 登录验证 **/
    @RequestMapping(value = "/login")
    public ModelAndView login(HttpServletRequest request, String loginAccount, String loginPassword) {
        ModelAndView view = this.getShowModelAndView("login", request);
        SysUser sysUser = new SysUser();
        sysUser.setAccount(loginAccount);
        sysUser.setPassword(loginPassword);
        sysUser = sysUserService.getLoginUser(sysUser);
        if (sysUser != null) {
            request.getSession().setAttribute(Constant.LOGIN_USER_SESSION_KEY, sysUser);
            view.setViewName("/app/showAppList");
        }
        return view;
    }

    @RequestMapping(value = "/logout")
    public ModelAndView logout(HttpServletRequest request) {
        ModelAndView view = this.getShowModelAndView("/login", request);
        request.getSession().removeAttribute(Constant.LOGIN_USER_SESSION_KEY);
        return view;
    }

}
