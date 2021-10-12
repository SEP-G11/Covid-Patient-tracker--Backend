const e = require('express');
const { getAllFacility} = require('../../../controllers/facility');
const sequelize = require('../../../database/testingDB');
var models = require("../../../service/init-models").initModels(sequelize);
var User = models.User;

let server;

describe('Facility Controller', () => {

    describe('getAllFacility', () => {
        const req = { };

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
      
     
        it("should return 201 and send Facility details if found", async () => {
            // const expectedUser = 1;
 
            //  const expected = [{facility_id:1,name:'New York City National Hospital',address: '6 Rockefeller Street',contact_no:'0332606423'}]
        
            //  const expectedOutput = {results: expectedUser,message:"facility Data Found"};
             await getAllFacility(req,res,next);
 
             expect(res.status).toBeCalledWith(201);
            //  expect(res.send).toHaveBeenCalledWith(expectedOutput)
         });
     
     
        //     it("should return 500 if Internal server error", async () => {
        //     req.body = new Error("Mock Error");        
 
        //      await getAllFacility(req,res,next);
        //      expect(res.status).toHaveBeenCalledWith(500);
        //      expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
        //      //mock.mockRestore();
        //  });
     

    });
    



});