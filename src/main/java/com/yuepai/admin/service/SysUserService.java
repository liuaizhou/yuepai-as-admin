package com.yuepai.admin.service;

import com.yuepai.admin.model.SysUser;

public interface SysUserService {

    /**
     * 根据SysUser相关的属性得到相应的实体对象
     * 
     * @param sysUser
     * @return
     * @author zhoutingting
     * @date 2017年10月30日 下午5:03:11
     */
    SysUser getLoginUser(SysUser sysUser);

}
