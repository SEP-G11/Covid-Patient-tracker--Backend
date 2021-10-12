const e = require('express');
const { createReport} = require('../../../controllers/report');
const sequelize = require('../../../database/db');
var models = require("../../../service/init-models").initModels(sequelize);
var User = models.User;

let server;

describe('Report Controller', () => {

    describe('createReport', () => {
        const req = {
            facilityId: "12",
            body: {
                id: '1236987451630886400000',
                testId: '12369874516308864000001633060920000T',
                RATresult: '1',
                reportId: '12369874516308864000001633060920000R',
                bedId: '25',
                allocationId: '12369874516308864000001633060920000A',
                date: '2021-10-01T09:32',
                phonenumber: '+94123698745',
                bday: '2021-09-01',
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
          
            // const expectedOutput = { results: null, message:" successfully  created!", };
            await createReport(req, res, next);
            expect(res.status).toBeCalledWith(201);
      
            
        });

        it("should return 422 and send bed has already used message", async () => {

            req.body.bedId = '47'
            const expectedOutput = { object: null, message: "Bed has already Occupied", };
            await createReport(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });


      
        it("should return 422 if no Bed ID provided", async () => {
            req.body.bedId = "";
            await createReport(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Bed ID\" is not allowed to be empty" });
          
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
                id: '946666666661618272000000',
                testId: '9466666666616182720000001633060680000T',
                RATresult: '1',
                reportId: '9466666666616182720000001633060680000R',
                bedId: '25',
                allocationId: '9466666666616182720000001633060680000A',
                date: '2021-10-01T09:28',
                phonenumber: '+94666666666',
                bday: '2021-04-13',
                description: 'testing'
              }


            const expectedOutput = { object: null, message: "Patient is not Registered", };
            await createReport(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        // it("should return 500 if Internal server error", async () => {
        //     req.body.reportId = undefined
        
 
        //      await createReport(req,res,next);
        //      expect(res.status).toHaveBeenCalledWith(500);
        //      expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
        //      //mock.mockRestore();
        //  });
     

    });
    



});