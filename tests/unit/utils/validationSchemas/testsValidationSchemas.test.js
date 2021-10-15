const {validateEnterResult} = require('../../../../utils/validationSchemas/testsValidationSchemas');

describe('Validate EnterResult schema',() => {
    it('should return error if Patient Id is empty', async ()=>{
        let data = {
            testId: '947101581259005472000001634788200000T',
                id: '',
                date: '2021-10-21T09:20',
                testType: 'PCR',
                RATresult: '1'
        };             
        const { error, value } = validateEnterResult(data.id, data.RATresult, data.testType, data.date, );
        expect(error.details[0].message).toEqual('"Patient Id" is not allowed to be empty')
    });

    it('should return error if RAT Result is empty', async ()=>{
        let data = {
            testId: '947101581259005472000001634788200000T',
                id: '94710158125900547200000',
                date: '2021-10-21T09:20',
                testType: 'PCR',
                RATresult: ''
        };     
        const { error, value } = validateEnterResult(data.id, data.RATresult, data.testType, data.date, );
        expect(error.details[0].message).toEqual('"RAT Result" is not allowed to be empty')
    });
  
    it('should return error if Test Type is empty', async ()=>{
        let data = {
            testId: '947101581259005472000001634788200000T',
            id: '94710158125900547200000',
            date: '2021-10-21T09:20',
            testType: '',
            RATresult: '1'
        };     
        const { error, value } = validateEnterResult(data.id, data.RATresult, data.testType, data.date, );
        expect(error.details[0].message).toEqual('"Test Type" is not allowed to be empty')
    });
    it('should return error if Date is empty', async ()=>{
        let data = {
            testId: '947101581259005472000001634788200000T',
                id: '94710158125900547200000',
                date: '',
                testType: 'PCR',
                RATresult: '1'
        };     
        const { error, value } = validateEnterResult(data.id, data.RATresult, data.testType, data.date, );
        expect(error.details[0].message).toEqual('"Date" is not allowed to be empty')
    });
});