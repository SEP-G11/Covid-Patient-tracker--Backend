const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");

const {User} = require('../service/models');

function validateEditProfile(name, contact,newPassword) {
    const schema = Joi.object({
        name: Joi.string().trim().max(255).label('Name'),
        contact: Joi.string().max(12).label('Contact'),
        newPassword: Joi.string().trim().min(5).label('Password'),
    });
    return schema.validate({ name: name, contact: contact, newPassword: newPassword})
}



const getUserProfile = async (req,res,next) => {
    const userId = req.userID;

    if (!userId){
        return errorMessage(res, 'User ID required', 422);
    }

    try{
        const user = await User.findByPk(userId,{
            attributes: { exclude: ['password','is_deleted']}
        });
        if (user){
            return successMessage(res, user.dataValues, 'User Found');
        }
        else {
            return errorMessage(res, 'User Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

const editUserProfile = async (req,res,next) => {
    const userId = req.userID;
    const {name,contact,newPassword} = req.body;
    if (!userId){
        return errorMessage(res, 'User ID required', 422);
    }
    const { error, value } = validateEditProfile(name,contact,newPassword);
    if (error) {
        return errorMessage(res, error.details[0].message, 422);
    }
    let updateValues = {};
    try{
        const user = await User.findByPk(userId);
        if (user){
            updateValues.name = value.name || user.name;
            updateValues.contact_no = value.contact || user.contact_no;
            if (value.newPassword){
                updateValues.password = await bcrypt.hash(value.newPassword, 12)
            }
            const updatedUser = await User.update(updateValues,{where: {user_id: userId}});
            if (updatedUser){
                return successMessage(res, {}, 'User Details Updated Successfully');
            }
        }
        else {
            return errorMessage(res, 'User Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

module.exports = {getUserProfile,editUserProfile};