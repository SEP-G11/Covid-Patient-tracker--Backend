const {bedSearch } = require('../../../controllers/bed');
const sequelize = require('../../../database/testingDB');
var models = require("../../../service/init-models").initModels(sequelize);
var User = models.User;

let server;

describe('Bed Controller', () => {
    describe('bedSearch', () => {
        const req = {
            facilityId: "12",
            params:{ facilityId: "12",}
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

        it("should return 201 and send bed details if found", async () => {
           // const expectedUser = 1;
           await bedSearch(req,res,next);
 
           expect(res.status).toBeCalledWith(201);
        });

        it("should return 404 if no user id provided", async () => {
           
            req.params={ facilityId: "10002",}
            await bedSearch(req, res,next);
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Beds Data Not Found' });
        });

    
        it("should return 500 if Internal server error", async () => {
            req.params={ facilityId: undefined,}
           //const mock = jest.spyOn(User, "findByPk").mockImplementation(() => {return new Error('mock error')});

            await bedSearch(req,res,next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
            //mock.mockRestore();
        });

    });
  


});