
require('dotenv').config();
const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMS = async (phoneNumber, testId, testType, RATresult, date) => {

    RATresult=="1" ? (testResult="Positive"):(testResult="Negative")

  await  client.messages
        .create({
            body: '-------------- Covid patient tracker in sri lanka \r\n       Test Type : ' + `${testType}` + "\r\n       Test Result : " + `${testResult}` + "\r\n       Date : " + `${date}`,
            to: phoneNumber,
            from: '+13203373543',

        })
        // .then(message => console.log( "Test ID ("+`${testId}`+") SMS Send !"))
        .then()
        .catch((err) => console.log( " SMS not Send !"));

};

module.exports = {
    sendSMS
};

