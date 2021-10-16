const {validateRegister} = require('../../../../utils/validationSchemas/mohValidationSchemas');

describe('moh validateRegister schema',() => {
    it('should return error if ID is not a valid NIC', async ()=>{
        let data = {
            id: '1844639',
            name: 'Some Name',
            email: 'someemail@mail.com',
            contact: '94563758123',
            password: 'password',
            accountType: 'DOC',
            facilityId: '3'
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error.details[0].message).toEqual('"ID" must be a valid NIC')

    });
    it('should return error if ID is empty string', async ()=>{
        let data = {
            id: '',
            name: 'Some Name',
            email: 'someemail@mail.com',
            contact: '94563758123',
            password: 'password',
            accountType: 'DOC',
            facilityId: '3'
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error.details[0].message).toEqual('"ID" is not allowed to be empty')
    });
    it('should return error if email is not valid', async ()=>{
        let data = {
            id: '768910489V',
            name: 'Some Name',
            email: 'invalidemail.com',
            contact: '94563758123',
            password: 'password',
            accountType: 'DOC',
            facilityId: '3'
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error.details[0].message).toEqual('"Email" must be a valid email')

    });
    it('should return error if facility not given for non MOH user', async ()=>{
        let data = {
            id: '768910489V',
            name: 'Some Name',
            email: 'someemail@mail.com',
            contact: '94563758123',
            password: 'password',
            accountType: 'DOC',
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error.details[0].message).toEqual('"Facility" is required')

    });
    it('should return error if contact number is not valid', async ()=>{
        let data = {
            id: '768910489V',
            name: 'Some Name',
            email: 'someemail@mail.com',
            contact: '9456375812',
            password: 'password',
            accountType: 'DOC',
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error.details[0].message).toEqual('Must be a valid Contact Number')

    });
    it('should return error if password is not at least 5 characters long', async ()=>{
        let data = {
            id: '768910489V',
            name: 'Some Name',
            email: 'someemail@mail.com',
            contact: '94563758123',
            password: '1234',
            accountType: 'MOH',
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error.details[0].message).toEqual('"Password" length must be at least 5 characters long')

    });
    it('should give no error if facility not given for MOH user', async ()=>{
        let data = {
            id: '768910489V',
            name: 'Some Name',
            email: 'someemail@mail.com',
            contact: '94563758123',
            password: 'password',
            accountType: 'MOH',
        };
        const { error, value } = validateRegister(data.id, data.name, data.email, data.contact, data.password, data.accountType,data.facilityId);
        expect(error).toEqual(undefined)

    });

});