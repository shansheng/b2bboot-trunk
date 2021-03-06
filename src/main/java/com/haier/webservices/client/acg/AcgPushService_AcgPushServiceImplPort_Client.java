
package com.haier.webservices.client.acg;

/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 3.2.8
 * 2019-08-14T16:55:52.851+08:00
 * Generated source version: 3.2.8
 *
 */
public final class AcgPushService_AcgPushServiceImplPort_Client {

    private static final QName SERVICE_NAME = new QName("http://impl.acg.server.webservices.haier.com/", "AcgPushServiceImplService");

    private AcgPushService_AcgPushServiceImplPort_Client() {
    }

    public static void main(String args[]) throws Exception {
        URL wsdlURL = AcgPushServiceImplService.WSDL_LOCATION;
        if (args.length > 0 && args[0] != null && !"".equals(args[0])) {
            File wsdlFile = new File(args[0]);
            try {
                if (wsdlFile.exists()) {
                    wsdlURL = wsdlFile.toURI().toURL();
                } else {
                    wsdlURL = new URL(args[0]);
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }

        AcgPushServiceImplService ss = new AcgPushServiceImplService(wsdlURL, SERVICE_NAME);
        AcgPushService port = ss.getAcgPushServiceImplPort();

        {
        System.out.println("Invoking pushContractor...");
        com.haier.webservices.client.acg.Dealer _pushContractor_arg0 = null;
        com.haier.webservices.client.acg.AjaxJson _pushContractor__return = port.pushContractor(_pushContractor_arg0);
        System.out.println("pushContractor.result=" + _pushContractor__return);


        }

        System.exit(0);
    }

}
