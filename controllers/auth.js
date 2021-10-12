// const sequelize = require('../database/db');
// var models = require("../service/init-models").initModels(sequelize);
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");
const { sendResetPasswordEmail } = require("../utils/mailer");


// var User = models.User;
// var FacilityStaff = models.FacilityStaff;
// var PasswordReset = models.PasswordReset;
const {User,FacilityStaff,PasswordReset,sequelize} = require('../service/models')
function validateLogin(email,password) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().label('Email'),
        password: Joi.required().label('Password')
    });
    return schema.validate({ email: email, password: password })
}

function validateForgotPassword(email){
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().label('Email'),
    });
    return schema.validate({ email: email})
}

function validateResetPassword(password){
    const schema = Joi.object({
        password: Joi.string().trim().min(5).required().label('Password')
    });
    return schema.validate({ password: password })
}


const login = async (req, res, next) => {
    const {email, password} = req.body;
    const { error, value } = validateLogin(email,password);
    if (error) {
        return errorMessage(res, error.details[0].message, 422);
    }
    let loadedUser;
    try {
        const result = await User.findAll({
            where: {
                email: value.email,
                is_deleted: 0
            },
            include: {
                model: FacilityStaff,
                as: 'facility_staffs'
            }
        });
        if (!result.length>0) {
            return errorMessage(res, 'Incorrect email or password', 401);
        }
        loadedUser = result[0].dataValues;

        const isEqual = await bcrypt.compare(password,loadedUser.password);
        if (!isEqual){
            return errorMessage(res, 'Incorrect email or password', 401);
        }
        let tokenData = {
            email: loadedUser.email,
            userID: loadedUser.user_id.toString(),
            accType: loadedUser.user_type
        };
        if (loadedUser.facility_staffs[0].dataValues.facility_id){
            tokenData["facilityId"]=loadedUser.facility_staffs[0].dataValues.facility_id;
        }

        const token = jwt.sign(tokenData,
            'somesupersecret',
            {expiresIn: '30d'}                 //put in ENV
        );
        return successMessage(res, {
            id: loadedUser.user_id.toString(),
            email: loadedUser.email,
            accType: loadedUser.user_type,
            token: token
        }, 'Logged in successfully')
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const forgotPassword = async (req,res,next) => {
    const {email} = req.body;
    const { error, value } = validateForgotPassword(email);
    if (error) {
        return errorMessage(res, error.details[0].message, 422);
    }
    let loadedUser;
    try {
        const user = await User.findAll({
            where: {
                email: value.email,
                is_deleted: 0
            }
        });

        if (!user.length>0) {
            return errorMessage(res, 'Entered Email does not match an account', 404);
        }
        loadedUser = user[0].dataValues;

        const tokenData = {
            email: loadedUser.email,
        };

        const token = jwt.sign(tokenData,
            'forgotpwsecret',                 //put in ENV
            {expiresIn: '20m'}
        );

        const result = await PasswordReset.create({
            email: value.email,
            token: token
        });

        if (result){
            sendResetPasswordEmail(value.email,token);
            return successMessage(res,{},"Email sent, Please check you Email")
        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

const resetPassword = async (req,res,next) => {
    const {password,token} = req.body;
    const { error, value } = validateResetPassword(password);
    if (error) {
        return errorMessage(res, error.details[0].message, 422);
    }
    let t;
    try{
        const {email,iat,exp} = jwt.verify(token,'forgotpwsecret');
        const pwResetRequest = await PasswordReset.findAll({where:{
                email: email,
                token: token,
                is_used: 0
            }
        });
        if (!pwResetRequest.length>0) {
            return errorMessage(res, 'Password reset failed', 400);
        }

        if (Date.now() >= exp * 1000){
            return errorMessage(res, 'Link expired', 400);
        }

        const hashedPw = await bcrypt.hash(value.password, 12);

        t =  await sequelize.transaction();

        const resetPw = await User.update({password: hashedPw},{where: {email: email}},{ transaction: t });
        const updateTokenUsed = await PasswordReset.update({is_used: 1},{where: { token: token } },{ transaction: t });

        await t.commit();
        if (resetPw && updateTokenUsed){
            return successMessage(res,{},'Password reset successful', 200);
        }
        else {
            return errorMessage(res, 'Password reset failed', 400);
        }

    }
    catch (err) {
        if (t){
            await t.rollback();
        }
        return errorMessage(res, 'Failed or Expired Token', 500);
    }

};


module.exports = {
    login,forgotPassword,resetPassword
};