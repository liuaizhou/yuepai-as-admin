package com.yuepai.admin.util;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Component;

@Component
public class StaticUtil {

    @Resource
    private Properties properties;

    private static Properties staticProperties;

    public static Properties getProperties() {
        return staticProperties;
    }

    public static void setAnalysisProperties(Properties properties) {
        StaticUtil.staticProperties = properties;
    }

    @PostConstruct
    public void init() {
        staticProperties = this.properties;
    }

}
