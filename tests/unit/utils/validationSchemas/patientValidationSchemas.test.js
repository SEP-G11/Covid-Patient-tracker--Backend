const { validateAdmitPatient, validateDischargePatient, validateTransferPatient } = require('../../../../utils/validationSchemas/patientValidationSchemas');

describe('Validate AdmitPatient schema', () => {
    it('should return error if Name is empty', async () => {
        let data = {
            name: '',
            id: '947101581251618876800000',
            age: 0.736,
            gender: '',
            address: '',
            contactnumber: '+94710158125',
            bloodtype: '',
            district: 'Batticaloa',
            testId: '9471015812516188768000001634200620000T',
            isvaccinated: '',
            RATresult: '1',
            medicalHistory: 'Not a covid patient',
            reportId: '9471015812516188768000001634200620000R',
            bedId: '36',
            allocationId: '9471015812516188768000001634200620000A',
            admitDateTime: '2021-10-14T14:07',
            bday: '2021-01-05',
            Type_vaccine: 'Sinopharm',
            Num_vaccine: '2',
        };

        const { error, value } = validateAdmitPatient(data.name, data.contactnumber, data.RATresult, data.admitDateTime, data.bday,);
        expect(error.details[0].message).toEqual('"Name" is not allowed to be empty')
    });

    it('should return error if Date of Birthday is empty', async () => {
        let data = {
            name: 'Dinuka',
            id: '947101581251618876800000',
            age: 0.736,
            gender: '',
            address: '',
            contactnumber: '+94710158125',
            bloodtype: '',
            district: 'Batticaloa',
            testId: '9471015812516188768000001634200620000T',
            isvaccinated: '',
            RATresult: '1',
            medicalHistory: 'Not a covid patient',
            reportId: '9471015812516188768000001634200620000R',
            bedId: '36',
            allocationId: '9471015812516188768000001634200620000A',
            admitDateTime: '2021-10-14T14:07',
            bday: '',
            Type_vaccine: 'Sinopharm',
            Num_vaccine: '2',
        };
        const { error, value } = validateAdmitPatient(data.name, data.contactnumber, data.RATresult, data.admitDateTime, data.bday,);
        expect(error.details[0].message).toEqual('"Date of Birthday" is not allowed to be empty')
    });

    it('should return error if Contact Number is empty', async () => {
        let data = {
            name: 'Dinuka',
            id: '947101581251618876800000',
            age: 0.736,
            gender: '',
            address: '',
            contactnumber: '',
            bloodtype: '',
            district: 'Batticaloa',
            testId: '9471015812516188768000001634200620000T',
            isvaccinated: '',
            RATresult: '1',
            medicalHistory: 'Not a covid patient',
            reportId: '9471015812516188768000001634200620000R',
            bedId: '36',
            allocationId: '9471015812516188768000001634200620000A',
            admitDateTime: '2021-10-14T14:07',
            bday: '2021-01-05',
            Type_vaccine: 'Sinopharm',
            Num_vaccine: '2',
        };
        const { error, value } = validateAdmitPatient(data.name, data.contactnumber, data.RATresult, data.admitDateTime, data.bday,);
        expect(error.details[0].message).toEqual('"Contact Number" is not allowed to be empty')
    });
    it('should return error if Length of Contact Number is not eqaul to 12', async () => {
        let data = {
            name: 'Dinuka',
            id: '947101581251618876800000',
            age: 0.736,
            gender: '',
            address: '',
            contactnumber: '+947100000158125',
            bloodtype: '',
            district: 'Batticaloa',
            testId: '9471015812516188768000001634200620000T',
            isvaccinated: '',
            RATresult: '1',
            medicalHistory: 'Not a covid patient',
            reportId: '9471015812516188768000001634200620000R',
            bedId: '36',
            allocationId: '9471015812516188768000001634200620000A',
            admitDateTime: '2021-10-14T14:07',
            bday: '2021-01-05',
            Type_vaccine: 'Sinopharm',
            Num_vaccine: '2',
        };
        const { error, value } = validateAdmitPatient(data.name, data.contactnumber, data.RATresult, data.admitDateTime, data.bday,);
        expect(error.details[0].message).toEqual('"Contact Number" length must be less than or equal to 12 characters long')
    });
    it('should return error if RAT Result is empty', async () => {
        let data = {
            name: 'Dinuka',
            id: '947101581251618876800000',
            age: 0.736,
            gender: '',
            address: '',
            contactnumber: '+94710158125',
            bloodtype: '',
            district: 'Batticaloa',
            testId: '9471015812516188768000001634200620000T',
            isvaccinated: '',
            RATresult: '',
            medicalHistory: 'Not a covid patient',
            reportId: '9471015812516188768000001634200620000R',
            bedId: '36',
            allocationId: '9471015812516188768000001634200620000A',
            admitDateTime: '2021-10-14T14:07',
            bday: '2021-01-05',
            Type_vaccine: 'Sinopharm',
            Num_vaccine: '2',
        };
        const { error, value } = validateAdmitPatient(data.name, data.contactnumber, data.RATresult, data.admitDateTime, data.bday,);
        expect(error.details[0].message).toEqual('"RAT Result" is not allowed to be empty')
    });
    it('should return error if Date is empty', async () => {
        let data = {
            name: 'Dinuka',
            id: '947101581251618876800000',
            age: 0.736,
            gender: '',
            address: '',
            contactnumber: '+94710158125',
            bloodtype: '',
            district: 'Batticaloa',
            testId: '9471015812516188768000001634200620000T',
            isvaccinated: '',
            RATresult: '1',
            medicalHistory: 'Not a covid patient',
            reportId: '9471015812516188768000001634200620000R',
            bedId: '36',
            allocationId: '9471015812516188768000001634200620000A',
            admitDateTime: '',
            bday: '2021-01-05',
            Type_vaccine: 'Sinopharm',
            Num_vaccine: '2',
        };
        const { error, value } = validateAdmitPatient(data.name, data.contactnumber, data.RATresult, data.admitDateTime, data.bday,);
        expect(error.details[0].message).toEqual('"Admit Date" is not allowed to be empty')
    });
});



describe('Validate DischargePatient schema', () => {
    it('should return error if Patient Id is empty', async () => {
        let data = {
            patient_id: '',
            discharged_at: '2021-10-01T07:29',
            description: 'Testing',
            status: 'Dead'
        };

        const { error, value } = validateDischargePatient(data.patient_id, data.discharged_at, data.status,);
        expect(error.details[0].message).toEqual('"Patient Id" is not allowed to be empty')
    });

    it('should return error if Status is empty', async () => {
        let data = {
            patient_id: '1111112131632700800000',
            discharged_at: '2021-10-01T07:29',
            description: 'Testing',
            status: ''
        };
        const { error, value } = validateDischargePatient(data.patient_id, data.discharged_at, data.status,);
        expect(error.details[0].message).toEqual('"Status" is not allowed to be empty')
    });

    it('should return error if Discharge Date is empty', async () => {
        let data = {
            patient_id: '1111112131632700800000',
            discharged_at: '',
            description: 'Testing',
            status: 'Dead'
        };
        const { error, value } = validateDischargePatient(data.patient_id, data.discharged_at, data.status,);
        expect(error.details[0].message).toEqual('"Discharge Date" is not allowed to be empty')
    });


});



describe('Validate TransferPatient schema', () => {
    it('should return error if Patient Id is empty', async () => {
        let data = {
            patient_id: '',
            dest_bed_id: '24',
            transfer_date: '2021-10-01T07:29',
        };

        const { error, value } = validateTransferPatient(data.patient_id, data.transfer_date, data.dest_bed_id,);
        expect(error.details[0].message).toEqual('"Patient Id" is not allowed to be empty')
    });

    it('should return error if Status is empty', async () => {
        let data = {
            patient_id: '942222222221633046400000',
            dest_bed_id: '',
            transfer_date: '2021-10-01T07:29',
        };
        const { error, value } = validateTransferPatient(data.patient_id, data.transfer_date, data.dest_bed_id,);
        expect(error.details[0].message).toEqual('"Destination Bed Id" must be a number')
    });

    it('should return error if Transfer Date is empty', async () => {
        let data = {
            patient_id: '942222222221633046400000',
            dest_bed_id: '24',
            transfer_date: '',
        };
        const { error, value } = validateTransferPatient(data.patient_id, data.transfer_date, data.dest_bed_id,);
        expect(error.details[0].message).toEqual('"Transfer Date" is not allowed to be empty')
    });


});