const { admitPatient, dischargePatient, transferPatient, getPatients, getPatientById, updatePatient, filterPatients} = require('../../../controllers/patient');
const { sequelize, Allocation, User} = require('../../../service/models');
const {bedSearch} = require("../../../controllers/bed");
const {editUserProfile} = require("../../../controllers/user");

let server;

describe('Patient Controller', () => {

    describe('admitPatient', () => {
        const req = {
            facilityId: "12",
            body: {
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
                bday: '2021-01-05',
                Type_vaccine: 'Sinopharm',
                Num_vaccine: '2',
            }
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()

        beforeEach(async () => {
            server = require('../../../index');
            await sequelize.query("SET autocommit = OFF");
            await sequelize.query("BEGIN");
        });
        afterEach(async () => {
            await sequelize.query("ROLLBACK");
            await server.close();
        });

        it("should return 201 and send success message", async () => {

            await admitPatient(req, res, next);
            expect(res.status).toBeCalledWith(201);


        });
        it("should return 422 and send bed has already used message", async () => {

            req.body.bedId = '41'
            const expectedOutput = { object: null, message: "Bed has already Occupied", };
            await admitPatient(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });


        it("should return 404 and send Not admit message", async () => {

            req.body =  {
                name: 'Dinuka',
                id: '1236987451630886400000',
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
                reportId: '12369874116308864000001632796619000R',
                bedId: '22',
                allocationId: '9471015812516188768000001634200620000A',
                admitDateTime: '2021-10-14T14:07',
                bday: '2021-01-05',
                Type_vaccine: 'Sinopharm',
                Num_vaccine: '2',
            }

            const expectedOutput = { object: null, message: "Patient  not Admited.Please Check again Details!", };
            await admitPatient(req, res, next);
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

      


        it("should return 422 if no AdmitDateTime provided", async () => {
            req.body.admitDateTime = "";
            await admitPatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Admit Date\" is not allowed to be empty" });

        });


        it("should return 422 if no Contactnumber provided", async () => {
            req.body.contactnumber = "";
            await admitPatient(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Contact Number\" is not allowed to be empty" });

        });

        it("should return 422 if no Birth Day provided", async () => {
            req.body.bday = "";
            await admitPatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Date of Birthday\" is not allowed to be empty" });

        });

        it("should return 422 if no Name provided", async () => {
            req.body.name = "";
            await admitPatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Name\" is not allowed to be empty" });

        });
  
    });


    describe('dischargePatient', () => {
        var req = {
            facilityId: "12",
            body: {
                patient_id: '1111112131632700800000',
                discharged_at: '2021-10-01T07:29',
                description: 'Testing',
                status: 'Dead'
            }
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()
        beforeEach(async () => {
            server = require('../../../index');
            await sequelize.query("SET autocommit = OFF");
            await sequelize.query("BEGIN");
        });
        afterEach(async () => {
            await sequelize.query("ROLLBACK");
            await server.close();
        });

        it("should return 201 and send success message", async () => {

            await dischargePatient(req, res, next);
            expect(res.status).toBeCalledWith(201);

        });

        it("should return 404 and send Not Discharged message", async () => {

            req.body.patient_id = "K1111112131632700800000";
            await dischargePatient(req, res, next);

            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "Patient  not Discharged!", });

        });

        it("should return 422 if no DischargeDateTime provided", async () => {
            req.body.discharged_at = "";
            await dischargePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Discharge Date\" is not allowed to be empty" });

        });

        it("should return 422 if no Status provided", async () => {
            req.body.status = "";
            await dischargePatient(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Status\" is not allowed to be empty" });

        });

        it("should return 422 if no Patient Id provided", async () => {
            req.body.patient_id = "";
            await dischargePatient(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Patient Id\" is not allowed to be empty" });

        });


     

    });

    describe('transferPatient', () => {
        const req = {
            facilityId: "12",
            body: {
                patient_id: '942222222221633046400000',
                dest_bed_id: '24',
                transfer_date: '2021-10-01T07:29',
            }
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()

        beforeEach(async () => {
            server = require('../../../index');
            await sequelize.query("SET autocommit = OFF");
            await sequelize.query("BEGIN");
        });
        afterEach(async () => {
            await sequelize.query("ROLLBACK");
            await server.close();
        });

        it("should return 201 and send success message", async () => {

            // const expectedOutput = { results: null, message:"Patient successfully  Transfered!", };
            await transferPatient(req, res, next);
            expect(res.status).toBeCalledWith(201);


        });
        it("should return 404 and send Not Transfer message", async () => {

            req.body = {
                patient_id: '394434569811617580800000',
                dest_bed_id: '37',
                transfer_date: '2021-10-01T07:29',
            }

            const expectedOutput = { object: null, message: "Patient  not Transfered!", };
            await transferPatient(req, res, next);


            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });


        it("should return 422 if no Transfer Date provided", async () => {
            req.body.transfer_date = "";
            await transferPatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Transfer Date\" is not allowed to be empty" });

        });

        it("should return 422 if no Destination Bed Idprovided", async () => {
            req.body.dest_bed_id = "";
            await transferPatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Destination Bed Id\" must be a number" });

        });

        it("should return 422 if no Patient Id provided", async () => {
            req.body.patient_id = "";
            await transferPatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Patient Id\" is not allowed to be empty" });

        });


    });

    describe('getPatients', () => {
        const req = {
            facilityId: "4"
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()

        beforeEach(async () => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it("should return 500 if Internal server error", async () => {
            req.facilityId = { facilityId: undefined, }
            await getPatients(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'Internal Server Error!' });
        });

    });

    describe('getPatientById', () => {
        const req = {
            params: { id: "674849922X", }
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()

        beforeEach(async () => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it("should return 500 if Internal server error", async () => {
            req.params = { id: undefined, }
            await getPatientById(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'Internal Server Error!' });
        });

    });

    describe('updatePatient', () => {
        const req = {
            params: { id: "674849922X", },
            body: {
                patient_id: '674849922X',
                name: 'Reagen McIlwaine',
                bday: '2020-10-07',
                gender: 'Female',
                blood_type: 'O+',
                contact_no: '0783523930',
                address: '09402 Mockingbird Park',
                district: 'Matara',
                is_Vaccinated: 'Vaccinated',
                Num_vaccine: ' - 2nd dose',
                Type_vaccine: ' - Pfizer',
            }
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()

        beforeEach(async () => {
            server = require('../../../index');
            await sequelize.query("SET autocommit = OFF");
            await sequelize.query("BEGIN");
        });
        afterEach(async () => {
            await sequelize.query("ROLLBACK");
            await server.close();
        });

        it("should return 422 if Vaccinated and Vaccine Type is not provided", async () => {
            req.body = {is_Vaccinated: 'Vaccinated',Type_vaccine: null};
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "'Vaccine Type' is not allowed to be empty" });

        });

        it("should return 422 if Vaccinated and Number of Vaccines is not provided", async () => {
            req.body = {is_Vaccinated: 'Vaccinated', Type_vaccine: ' - Pfizer', Num_vaccine: null};
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "'Number of Vaccines' is not allowed to be empty" });

        });

        it("should return 422 if name is not provided", async () => {
            req.body.name = "";
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "'Name' is not allowed to be empty" });

        });

        it("should return 422 if district is not provided", async () => {
            req.body = {name: 'Reagen McIlwaine', district: ''};
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "'District' is not allowed to be empty" });

        });

        it("should return 422 if blood type is not provided", async () => {
            req.body = {name: 'Reagen McIlwaine', district: 'Matara', blood_type: ''};
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "'Blood Type' is not allowed to be empty" });

        });

        it("should return 422 if gender is not provided", async () => {
            req.body = {name: 'Reagen McIlwaine', district: 'Matara', blood_type: 'O+', gender: ''};
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "'Gender' is not allowed to be empty" });

        });

        it("should return 422 if contact number is invalid", async () => {
            req.body = {name: 'Reagen McIlwaine', district: 'Matara', blood_type: 'O+', gender: 'Female',contact_no:'078352393' };
            await updatePatient(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "Please Check again Contact Number !" });

        });

        it("should return 500 if Internal server error", async () => {
            req.body = {name: 'Reagen McIlwaine', district: 'Matara', blood_type: 'O+', gender: 'Female',contact_no:'0783523930' };
            req.params = { id: undefined, }
            await updatePatient(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'Internal Server Error!' });
        });



    });

    describe('filterPatients', () => {
        const req = {
            facilityId: "4"
        };

        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn()

        beforeEach(async () => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it("should return 500 if Internal server error", async () => {
            req.facilityId = { facilityId: undefined, }
            await filterPatients(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'Internal Server Error!' });
        });

    });




});