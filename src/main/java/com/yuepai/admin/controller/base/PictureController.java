package com.yuepai.admin.controller.base;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.yuepai.admin.constant.Constant;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/")
public class PictureController {

    @RequestMapping(value = "/upload-picture")
    public void uploadReplyImages(@RequestParam MultipartFile pic, HttpServletRequest request,
            HttpServletResponse response) {
        try {
            String name = request.getParameter("name");
            if (name == null || "".equals(name))
                name = "other";
            String baseDir = request.getServletContext().getRealPath("/");
            Map<String, Object> resultMp = new HashMap<String, Object>();
            String fileName = pic.getOriginalFilename();
            String filepath = Constant.PICTURE_UPLOAD_DIRECTORY_NAME + "/" + name + "/"
                    + fileName.substring(fileName.lastIndexOf("."));
            String tempFileName = baseDir + filepath;
            File file = new File(tempFileName);
            if (!file.exists()) {
                file.mkdirs();
            }
            pic.transferTo(file);
            resultMp.put("message", "success");
            resultMp.put("filepath", file.getPath());
            resultMp.put("fileurl", request.getContextPath() + "/" + filepath);
            response.getWriter().print(JSONObject.fromObject(resultMp));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
