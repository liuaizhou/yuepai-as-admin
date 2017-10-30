package com.yuepai.admin.service.impl;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.yuepai.admin.dao.SysUserMapper;
import com.yuepai.admin.model.SysUser;
import com.yuepai.admin.service.SysUserService;
import com.yuepai.admin.util.MD5Util;

public class SysUserServiceImpl implements SysUserService {

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser getLoginUser(SysUser sysUser) {
        if (sysUser == null || StringUtils.isEmpty(sysUser.getAccount())
                || StringUtils.isEmpty(sysUser.getPassword())) {
            return null;
        }
        sysUser.setPassword(MD5Util.encodePassword(sysUser.getPassword()));
        PageBounds pageBounds = new PageBounds();
        if (pageBounds.getOrders() == null || pageBounds.getOrders().size() < 1) {
            pageBounds.setOrders(Order.formString("updated_date.desc"));
        }
        PageList<SysUser> alist = sysUserMapper.querySysUserByEntity(sysUser, pageBounds);
        return (alist == null || alist.size() < 1 ? null : alist.get(0));
    }

}
