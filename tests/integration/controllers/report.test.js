const { createReport} = require('../../../controllers/report');
const {sequelize,} = require('../../../service/models');
const {getPatientById, updatePatient} = require("../../../controllers/patient");

let server;

describe('Report Controller', () => {

    describe('createReport', () => {
        const req = {
            facilityId: "12",
            body: {
                id: '942222222221605052800000',
                testId: '9422222222216050528000001634230740000T',
                RATresult: '1',
                reportId: '9422222222216050528000001634230740000R',
                bedId: '21',
                allocationId: '9422222222216050528000001634230740000A',
                date: '2021-10-14T22:29',
                phonenumber: '+94222222222',
                bday: '2020-11-11',
                description: 'testing'
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
      
            await createReport(req, res, next);
            expect(res.status).toBeCalledWith(201);
      
            
        });

     
        it("should return 422 and send bed has already used message", async () => {

            req.body.bedId = '5'
            const expectedOutput = { object: null, message: "Bed has already Occupied", };
            await createReport(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
           
        
        it("should return 422 if no RAT Result provided", async () => {
            req.body.RATresult = "";
            await createReport(req, res, next);
           
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message:"\"RAT Result\" is not allowed to be empty"});
            
        });

        it("should return 422 if no Contact number provided", async () => {
            req.body.phonenumber = "";
            await createReport(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Contact Number\" is not allowed to be empty"});
           
        });
        it("should return 422 if no Date of Birthday provided", async () => {
            req.body.bday = "";
            await createReport(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Date of Birthday\" is not allowed to be empty"});
           
        });   
           

        it("should return 422 and send not registerd message", async () => {

            req.body= {
                id: '962222222221605052800000',
                testId: '9422222222216050528000001634230740000T',
                RATresult: '1',
                reportId: '9422222222216050528000001634230740000R',
                bedId: '21',
                allocationId: '9422222222216050528000001634230740000A',
                date: '2021-10-14T22:29',
                phonenumber: '+94222222222',
                bday: '2020-11-11',
                description: 'testing'
              }

            const expectedOutput = { object: null, message: "Patient is not Registered", };
            await createReport(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });


    });


});