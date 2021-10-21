const {validateCreateReport} = require('../../../../utils/validationSchemas/reportValidationSchemas');

describe('Validate CreateReport schema',() => {
    it('should return error if Birth day is empty', async ()=>{
        let data = {
            id: '942222222221605052800000',
            testId: '9422222222216050528000001634230740000T',
            RATresult: '1',
            reportId: '9422222222216050528000001634230740000R',
            bedId: '21',
            allocationId: '9422222222216050528000001634230740000A',
            date: '2021-10-14T22:29',
            phonenumber: '+94222222222',
            bday: '',
            description: 'testing'
        };     
        const { error, value } = validateCreateReport(data.RATresult, data.date, data.bday, data.phonenumber, );
        expect(error.details[0].message).toEqual('"Date of Birthday" is not allowed to be empty')
    });

    it('should return error if Contact number is empty', async ()=>{
        let data = {
            id: '942222222221605052800000',
            testId: '9422222222216050528000001634230740000T',
            RATresult: '1',
            reportId: '9422222222216050528000001634230740000R',
            bedId: '21',
            allocationId: '9422222222216050528000001634230740000A',
            date: '2021-10-14T22:29',
            phonenumber: '',
            bday: '2021-01-05',
            description: 'testing'
        };     
        const { error, value } = validateCreateReport(data.RATresult, data.date, data.bday, data.phonenumber, );
        expect(error.details[0].message).toEqual('"Contact Number" is not allowed to be empty')
    });
  
    it('should return error if RAT result is empty', async ()=>{
        let data = {
            id: '942222222221605052800000',
            testId: '9422222222216050528000001634230740000T',
            RATresult: '',
            reportId: '9422222222216050528000001634230740000R',
            bedId: '21',
            allocationId: '9422222222216050528000001634230740000A',
            date: '2021-10-14T22:29',
            phonenumber: '+94222222222',
            bday: '2021-01-05',
            description: 'testing'
        };     
        const { error, value } = validateCreateReport(data.RATresult, data.date, data.bday, data.phonenumber, );
        expect(error.details[0].message).toEqual('"RAT Result" is not allowed to be empty')
    });
    it('should return error if Date is empty', async ()=>{
        let data = {
            id: '942222222221605052800000',
            testId: '9422222222216050528000001634230740000T',
            RATresult: '1',
            reportId: '9422222222216050528000001634230740000R',
            bedId: '21',
            allocationId: '9422222222216050528000001634230740000A',
            date: '',
            phonenumber: '+94222222222',
            bday: '2021-01-05',
            description: 'testing'
        };     
        const { error, value } = validateCreateReport(data.RATresult, data.date, data.bday, data.phonenumber, );
        expect(error.details[0].message).toEqual('" Date" is not allowed to be empty')
    });
});