const {validateLogin,validateForgotPassword,validateResetPassword} = require('../../../../utils/validationSchemas/authValidationSchemas');

describe('auth validateLogin schema',() => {
    it('should return error fields not given', async ()=>{
        let data = {
        };
        const { error, value } = validateLogin(data.email,  data.password);
        expect(error.details[0].message).toEqual('"Email" is required')

    });
    it('should return error if email is not valid', async ()=>{
        let data = {
            email: 'invalidemail.com',
            password: 'password',
        };
        const { error, value } = validateLogin(data.email,  data.password);
        expect(error.details[0].message).toEqual('"Email" must be a valid email')
    });
    it('should return error password not given', async ()=>{
        let data = {
            email: 'someemail@mail.com'
        };
        const { error, value } = validateLogin(data.email,  data.password);
        expect(error.details[0].message).toEqual('"Password" is required')

    });
    it('should give no error if field inputs are correct', async ()=>{
        let data = {
            email: 'someemail@mail.com',
            password: 'password'
        };
        const { error, value } = validateLogin(data.email,  data.password);
        expect(error).toEqual(undefined)

    });
});

describe('auth validateForgotPassword schema',() => {
    it('should return error fields not given', async ()=>{
        let data = {
        };
        const { error, value } = validateForgotPassword(data.email);
        expect(error.details[0].message).toEqual('"Email" is required')

    });
    it('should return error if email is not valid', async ()=>{
        let data = {
            email: 'invalidemail.com',
        };
        const { error, value } = validateForgotPassword(data.email);
        expect(error.details[0].message).toEqual('"Email" must be a valid email')
    });
    it('should give no error if field inputs are correct', async ()=>{
        let data = {
            email: 'someemail@mail.com',
        };
        const { error, value } = validateForgotPassword(data.email);
        expect(error).toEqual(undefined)

    });

});

describe('auth validateResetPassword schema',() => {
    it('should return error fields not given', async ()=>{
        let data = {
        };
        const { error, value } = validateResetPassword(data.password);
        expect(error.details[0].message).toEqual('"Password" is required')

    });
    it('should return error if password is not at least 5 characters long', async ()=>{
        let data = {
            password: '1234',
        };
        const { error, value } = validateResetPassword(data.password);
        expect(error.details[0].message).toEqual('"Password" length must be at least 5 characters long')
    });
    it('should give no error if field inputs are correct', async ()=>{
        let data = {
            password: 'newpassword'
        };
        const { error, value } = validateResetPassword(data.password);
        expect(error).toEqual(undefined)

    });
});