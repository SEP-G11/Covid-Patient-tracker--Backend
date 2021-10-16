const {validateEditProfile} = require('../../../../utils/validationSchemas/userValidationSchemas');

describe('user validateEditProfile schema',() => {
    it('should give no error if fields not given', async ()=>{
        let data = {
        };
        const { error, value } = validateEditProfile(data.name,data.contact,data.newPassword);
        expect(error).toEqual(undefined)

    });
    it('should return error if password is not at least 5 characters long', async ()=>{
        let data = {
            newPassword: '1234',
        };
        const { error, value } = validateEditProfile(data.name,data.contact,data.newPassword);
        expect(error.details[0].message).toEqual('"Password" length must be at least 5 characters long')
    });
    it('should return error if contact number is not valid', async ()=>{
        let data = {
            contact: '84243938323',
        };
        const { error, value } = validateEditProfile(data.name,data.contact,data.newPassword);
        expect(error.details[0].message).toEqual('Must be a valid Contact Number')
    });
    it('should give no error if field inputs are correct', async ()=>{
        let data = {
            name:'New Name',
            contact: '94243938323',
            newPassword: 'newpassword'
        };
        const { error, value } = validateEditProfile(data.name,data.contact,data.newPassword);
        expect(error).toEqual(undefined)

    });
});