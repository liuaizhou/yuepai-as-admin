package com.yuepai.admin.controller.base;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;

import com.yuepai.admin.model.SysUser;
import com.yuepai.admin.util.LoginUserUtil;

/**
 * Description: controller的基础类
 *
 * @author zhoutingting
 * @date: 2017年10月30日 下午4:19:11
 * @version 1.0
 * @since JDK 1.8
 */
public class BaseController {

    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${system.title}")
    private String systemTitle;

    @Value("${system.server}")
    private String serverDomain;

    String pagePrefix = "/";

    // 对应菜单的页面时使用
    public ModelAndView getConfigModelAndView(String url, HttpServletRequest request, String menuCls,
            Integer menuIndex) {
        ModelAndView view = new ModelAndView((url.startsWith(pagePrefix) ? "" : pagePrefix) + url);
        view.addObject("pageTitle", systemTitle);
        view.addObject("context_path", serverDomain);
        view.addObject("menu", menuCls);
        view.addObject("mindex", menuIndex);
        return view;
    }

    // 不需要对应菜单
    public ModelAndView getShowModelAndView(String url, HttpServletRequest request) {
        ModelAndView view = new ModelAndView((url.startsWith(pagePrefix) ? "" : pagePrefix) + url);
        view.addObject("pageTitle", systemTitle);
        view.addObject("context_path", serverDomain);
        return view;
    }

    public SysUser getLoginUser(HttpServletRequest request) {
        return LoginUserUtil.getLoginUser(request);
    }

    public String getLoginShowName(HttpServletRequest request) {
        SysUser sysUser = LoginUserUtil.getLoginUser(request);
        return (sysUser == null ? null : sysUser.getUserName() + "_" + sysUser.getAccount());
    }

    public String getSystemTitle() {
        return systemTitle;
    }

    public void setSystemTitle(String systemTitle) {
        this.systemTitle = systemTitle;
    }

    public String getServerDomain() {
        return serverDomain;
    }

    public void setServerDomain(String serverDomain) {
        this.serverDomain = serverDomain;
    }

    public void debug(String message) {
        logger.debug(message);
    }

    public void error(String message) {
        logger.error(message);
    }

    public void info(String message) {
        logger.info(message);
    }

    public void responseContent(HttpServletResponse response, ByteArrayOutputStream os, String fileName)
            throws IOException {
        byte[] content = os.toByteArray();
        InputStream is = new ByteArrayInputStream(content);
        // 设置response参数，可以打开下载页面
        response.reset();
        response.setContentType("application/vnd.ms-excel;charset=utf-8");
        response.setHeader("Content-Disposition",
                "attachment;filename=" + new String((fileName + ".xls").getBytes(), "iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            bis = new BufferedInputStream(is);
            bos = new BufferedOutputStream(out);
            byte[] buff = new byte[2048];
            int bytesRead;
            while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
                bos.write(buff, 0, bytesRead);
            }
        } catch (final IOException e) {
            throw e;
        } finally {
            if (bis != null)
                bis.close();
            if (bos != null)
                bos.close();
        }
    }
}