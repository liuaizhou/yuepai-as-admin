package com.yuepai.admin.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Description 日期工具类
 * @author Zhoutingting
 * @date 2017年8月16日
 */
public class DateUtil {

    /**
     * @Description 字符串转化为固定的时间类型：yyyy-MM-dd HH:mm:ss
     * @param dateStr
     * @return
     * @author Zhoutingting
     * @date 2017年8月16日
     */
    public static Date convertStr2Date(String dateStr) {
        Date result = null;
        if (dateStr == null)
            return null;
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            result = sf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * @Description 时间转化为固定的字符串类型：yyyy-MM-dd
     * @param srcDate
     * @return
     * @author Zhoutingting
     * @date 2017年8月16日
     */
    public static String convertDate2Str(Date srcDate) {
        if (srcDate == null)
            return null;
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        return sf.format(srcDate);
    }

    /**
     * 返回yyyy/MM/dd
     * 
     * @Description TODO
     * @param srcDate
     * @return
     * @author HouHui
     * @date 2017年8月28日
     */
    public static String convertDate3Str(Date srcDate) {
        if (srcDate == null)
            return null;
        SimpleDateFormat sf = new SimpleDateFormat("yyyy/MM/dd");
        return sf.format(srcDate);
    }

    /**
     * @Description 根据自己的需要把时间转化为字符串
     * @param srcDate
     * @param destFormat
     * @return
     * @author Zhoutingting
     * @date 2017年8月16日
     */
    public static String convertDate2Str(Date srcDate, String destFormat) {
        if (srcDate == null)
            return null;

        if (destFormat == null)
            destFormat = "yyyy-MM-dd HH:mm:ss";

        SimpleDateFormat sf = new SimpleDateFormat(destFormat);
        return sf.format(srcDate);

    }

    /**
     * @Description 根据自己的需要把字符串转化为时间
     * @param dateStr
     * @param destFormat
     * @return
     * @author Zhoutingting
     * @date 2017年8月16日
     */
    public static Date convertStr2Date(String dateStr, String destFormat) {
        Date result = null;
        if (dateStr == null)
            return null;
        if (destFormat == null)
            destFormat = "yyyy-MM-dd HH:mm:ss";

        SimpleDateFormat sf = new SimpleDateFormat(destFormat);
        try {
            result = sf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static Date convertStrToDate(String dateStr) {
        Date date = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
