var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        howdy = /Howdy|Sully/i,
        whoop = /Red( )?ass|Good Bull|Old Army/i;
        hiss = /t(-| )?sip|2%er|Two( |-)Percenter|Offsides/i;
        gigem = /Thanks/i;
        wildcat16 = /2016/i;
        wildcat17 = /2017/i;
        wildcat18 = /2018/i;
        wildcat19 = /2019/i;

    if (request.text && request.sender_type != "bot") {
        this.res.writeHead(200);
        if (howdy.test(request.text)) {
            postMessage("Howdy, " + request.name + "!!");
        } else if (whoop.test(request.text)) {
            postMessage("WHOOP");
        } else if (hiss.test(request.text)) {
            postMessage("hisssssss");
        } else if (gigem.test(request.text)) {
            postMessage("... and Gig 'Em");
        } else if (wildcat16.test(request.text)) {
            postMessage("A WHOOP");
        } else if (wildcat17.test(request.text)) {
            postMessage("A-A-A WHOOP");
        } else if (wildcat18.test(request.text)) {
            postMessage("A-A-A-A-A");
        } else if (wildcat19.test(request.text)) {
            postMessage("AAAAAAAAA");
        } else {
            console.log("don't care");
        }
        this.res.end();
    } else {
        console.log("don't care");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(message) {
    var botResponse, options, body, botReq;

    botResponse = message;

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function (res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function (err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function (err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}


exports.respond = respond;