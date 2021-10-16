<<<<<<< HEAD
const { enterResult } = require('../../../controllers/tests');
const sms = require("../../../utils/sms");
const { Patient, sequelize } = require('../../../service/models');
=======
const e = require('express');
const { enterResult} = require('../../../controllers/tests');
const sequelize = require('../../../database/db');
var models = require("../../../service/init-models").initModels(sequelize);
var User = models.User;
>>>>>>> master

let server;

  describe('Tests Controller', () => {

     describe('enterResult', () =>  {
        const req = {
            facilityId: "12",
            body: {
                testId: '947101581259005472000001634788200000T',
                id: '94710158125900547200000',
                date: '2021-10-21T09:20',
                testType: 'PCR',
                RATresult: '1'
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

            await enterResult(req, res, next);
            expect(res.status).toBeCalledWith(201);

        });

     
        it("should return 422 if no testType provided", async () => {
            req.body.testType = "";
            await enterResult(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Test Type\" is not allowed to be empty" });

        });

        it("should return 422 if no RAT Result provided", async () => {
            req.body.RATresult = "";
            await enterResult(req, res, next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"RAT Result\" is not allowed to be empty" });

        });

        it("should return 422 if no Patient Id provided", async () => {
            req.body.id = "";
            await enterResult(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Patient Id\" is not allowed to be empty" });

        });

        it("should return 422 and send not active report message", async () => {
            req.body = {
                testId: '009987525V1633059960000T',
                id: '009987525V',
                date: '2021-10-01T09:16',
                testType: 'PCR',
                RATresult: '1'
            }
            const expectedOutput = { object: null, message: "Not have active Medical Report for this Patient", };
            await enterResult(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    

    });




});