package com.yuepai.admin.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

/**
 * Description:excel导出工具类
 *
 * @author zhoutingting
 * @date: 2017年10月30日 下午4:20:18
 * @version 1.0
 * @since JDK 1.8
 */
public class ExcelUtil {
    private static Logger logger = LoggerFactory.getLogger(ExcelUtil.class);

    public static void exportToExcel(HttpServletRequest request, HttpServletResponse response,
            Map<String, Object> infos, String srcPath, String fileName) {
        XLSTransformer transformer = new XLSTransformer();
        try {
            FileInputStream fileInputStream = new FileInputStream(new File(srcPath));
            String sFileName = fileName + ".xls";
            response.setHeader("Content-Disposition",
                    "attachment;filename=".concat(String.valueOf(URLEncoder.encode(sFileName, "UTF-8"))));
            response.setHeader("Connection", "close");
            response.setHeader("Content-Type", "application/vnd.ms-excel");
            Workbook transformXLS = transformer.transformXLS(fileInputStream, infos);
            transformXLS.write(response.getOutputStream());
        } catch (FileNotFoundException e) {
            logger.error("exportToExcel发生异常", e);
        } catch (UnsupportedEncodingException e) {
            logger.error("exportToExcel发生异常", e);
        } catch (ParsePropertyException e) {
            logger.error("exportToExcel发生异常", e);
        } catch (InvalidFormatException e) {
            logger.error("exportToExcel发生异常", e);
        } catch (IOException e) {
            logger.error("exportToExcel发生异常", e);
        } catch (Exception e) {
            logger.error("exportToExcel发生异常", e);
        }
    }
}
