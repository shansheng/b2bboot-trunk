
/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

package com.haier.webservices.client.acg;

import java.util.logging.Logger;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 3.2.8
 * 2019-08-14T16:55:52.862+08:00
 * Generated source version: 3.2.8
 *
 */

@WebService(
                      serviceName = "AcgPushServiceImplService",
                      portName = "AcgPushServiceImplPort",
                      targetNamespace = "http://impl.acg.server.webservices.haier.com/",
                      wsdlLocation = "http://localhost:8090/soap/acg?wsdl",
                      endpointInterface = "com.haier.webservices.client.acg.AcgPushService")

public class AcgPushServiceImplPortImpl implements AcgPushService {

    private static final Logger LOG = Logger.getLogger(AcgPushServiceImplPortImpl.class.getName());

    /* (non-Javadoc)
     * @see com.haier.webservices.client.acg.AcgPushService#pushContractor(com.haier.webservices.client.acg.Dealer arg0)*
     */
    public com.haier.webservices.client.acg.AjaxJson pushContractor(com.haier.webservices.client.acg.Dealer arg0) {
        LOG.info("Executing operation pushContractor");
        System.out.println(arg0);
        try {
            com.haier.webservices.client.acg.AjaxJson _return = null;
            return _return;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

}