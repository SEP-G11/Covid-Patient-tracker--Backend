const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


//const EMAIL_KEY = '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'

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:process.env.EMAIL_KEY
    }
}));


const forgotPwTemplate = (token) => {
    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    return `
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="" title="logo" target="_blank">
                            <img width="300" src="https://i.imgur.com/s8mBnkR.png" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested a password reset</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            Click the button below to reset your account password. If you didn't request a password reset, you can safely delete this email.
                                        </p>
                                        <a href="${resetUrl}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>
    `
};




const sendResetPasswordEmail = (emailTo,token) => {
    transporter.sendMail({
        to: emailTo,
        from: process.env.SENDER_EMAIL,
        subject: 'Password Reset',
        html: forgotPwTemplate(token)
    },function(err, res) {
        if (err) {
            console.log(err)
        }
        else{
            console.log(`Mail sent to ${emailTo}`);
        }
    });
};




module.exports = {
    sendResetPasswordEmail
};












