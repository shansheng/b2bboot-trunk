package com.jhmis.modules.gen.template;

import freemarker.template.Configuration;
import freemarker.template.Template;
import java.io.StringWriter;
import java.util.Map;

public class FreemarkerHelper {
    @SuppressWarnings("deprecation")
	private static Configuration _tplConfig = new Configuration();
    
    static {
        _tplConfig.setClassForTemplateLoading(FreemarkerHelper.class, "/");
    }

    public FreemarkerHelper() {
    }

    public String parseTemplate(String tplName, String encoding, Map<String, Object> paras) {
        try {
            StringWriter swriter = new StringWriter();
            Template mytpl = null;
            mytpl = _tplConfig.getTemplate(tplName, encoding);
            mytpl.process(paras, swriter);
            return swriter.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
    }

    public String parseTemplate(String tplName, Map<String, Object> paras) {
        return this.parseTemplate(tplName, "utf-8", paras);
    }
}
