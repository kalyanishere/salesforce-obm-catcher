var express = require('express');
var _ = require("lodash");
var router = express.Router();

router.post('/', function(req, res) {
  // get the obm as an object
 // console.log('req.body'+req.body);
 // console.log(req.headers['content-type']);
 //  console.log(req.toString());
  var message = unwrapMessage(req.body);
  if (!_.isEmpty(message)) {
    // some something #awesome with message
    console.log(message);
    // return a 'true' Ack to Salesforce
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>true</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  } else {
    // return a 'false' Ack to Salesforce
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>false</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  }

});

// unwrap the xml and return object
unwrapMessage = function(obj) {
  try {
    console.log(obj['soapenv:envelope']);
    console.log(obj['soapenv:envelope']['soapenv:body'][0]);
    console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0]);
    console.log('Org ID '+obj['soapenv:envelope']['soapenv:body'][0].notifications[0].organizationid[0]);
    var orgId = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].organizationid[0];
    console.log('body'+obj['soapenv:envelope']['soapenv:body'][0].notifications[0]);
    console.log('0');
    console.log('SF ID '+obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:id'][0]);
    var contactId = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:id'][0];
   console.log('1');
    console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0]);
    console.log('2');
    console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]);
    console.log('3');
    console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:Contact'][0]);
    console.log('4');
    console.log('Notifications'+obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:MobilePhone'][0]);
    console.log('Mobile ID '+obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[1]['sf:MobilePhone'][0]);
    var mobilePhone = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[1]['sf:MobilePhone'][0];

    return {
      orgId: orgId,
      contactId: contactId,
      mobilePhone: mobilePhone
    };
  } catch (e) {
    //res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>true</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    //);
    console.log('Could not parse OBM XML', e);
    return {};
  }
};

module.exports = router;
