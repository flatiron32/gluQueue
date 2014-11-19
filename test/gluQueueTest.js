var assert = require("assert");
var should = require("should");

var GQ = require('../lib/gluQueue.js');

exports.testIt = function(test){
    var fileUrl = "file://./glu.json";
    var messages = [];
    test.expect(11);
    // Connect to queue to recieve
    queue.receiveMessage({}, function(err, data) {
      console.log(data);
      messages.push(data);
    });

  fs.readFile("glu.json", {encoding: 'utf-8'}, function(err,data){
    if (!err) {                                                  
      console.log('received data: ' + data);                     
      var model = JSON.parse(data);                              
      console.log(model);                                        
      callback(null, "message 1");                               
      callback(null, "message 2");
      callback(null, "message 3");
      callback(null, "message 4");
      callback(null, "message 5");
    } else {                                                     
      console.log("There was an error");                                          
      console.log(err);                                          
      callback(err, null)
    }                                                            
  });

    // call gluQueue with path to glu model json
//    GQ.processGluModel(fileUrl, function(err, data) {
//     console.log(data); 
//    });

    // expect the queue messages
//    test.equals(5, messages.length, "5 messages should have been produced.");

    // Test message 1
//    test.ok(messages[0]);
//    test.equals("orbitz-web-adt", messages[0].Messages[0].Body)

    // Test message 2
//    test.ok(messages[1]);
//    test.equals("message 2", messages[1].Messages[0].Body)

    // Test message 3
//    test.ok(messages[2]);
//    test.equals("message 3", messages[2].Messages[0].Body)

    // Test message 4
//    test.ok(messages[3]);
//    test.equals("message 4", messages[3].Messages[0].Body)

    // Test message 5
//    test.ok(messages[4]);
//    test.equals("message 5", messages[4].Messages[0].Body)

    test.done();
};
