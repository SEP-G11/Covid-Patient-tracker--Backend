const { getAllFacility } = require('../../../controllers/facility');

let server;
const { Facility } = require('../../../service/models');

describe('Facility Controller', () => {

    describe('getAllFacility', () => {
        const req = {};

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

        it("should return 201 and send Facility details if found", async () => {
            await getAllFacility(req, res, next);
            expect(res.status).toBeCalledWith(201);

        });


        it("should return 500 if Internal server error", async () => {
            Facility.findAll = jest.fn().mockImplementation(() => {
                return Promise.reject(new Error('Mock DB Error'))
            });
            const expectedOutput = { object: null, message: 'Internal Server Error' };
            await getAllFacility(req, res, next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });


    });




});