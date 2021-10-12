const sequelize = require('../../../database/db');
 var models = require("../../../service/init-models").initModels(sequelize);

const {login,forgotPassword,resetPassword} = require('../../../controllers/auth');
let server;
const {User} = require('../../../service/models');

describe('Auth Controller', () => {
    describe('login', () => {
        const req = {
            query: {},
            params:{},
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            end: jest.fn()
        };
        const next = jest.fn();

        beforeEach(async () => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
            jest.restoreAllMocks();
        });
        it("should return 422 and error message if input validation failed", async () => {
            req.body={
                email: "notanemail",
                password: "somepassword"
            }
            const expectedOutput = {object : null, message: '"Email" must be a valid email'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)

        });

        it("should return 401 and error message if user not found", async () => {
            req.body={
                email: "notexistinguser@test.com",
                password: "somepassword"
            }
            const expectedOutput = {object : null, message: 'Incorrect email or password'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(401);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 401 and error message if incorrect credentials", async () => {
            req.body={
                email: "testmoh@test.com",
                password: "wrongpassword"
            }
            const expectedOutput = {object : null, message: 'Incorrect email or password'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(401);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 200 and user and token data if successfully logged", async () => {
            req.body={
                email: "testmoh@test.com",
                password: "password"
            }
            Date.now = jest.fn(() => new Date("2021-05-10T12:33:37.000Z"));
            const expectedOutput = {results : {
                    id:"903000006",
                    email:"testmoh@test.com",
                    accType:"MOH",
                    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rtb2hAdGVzdC5jb20iLCJ1c2VySUQiOiI5MDMwMDAwMDYiLCJhY2NUeXBlIjoiTU9IIiwiaWF0IjoxNjIwNjUwMDE3LCJleHAiOjE2MjMyNDIwMTd9.GAgVKoCIfm7IlggC_wxkCP3_zW-KEYMYEBqe9dUTahM"
                }, message: 'Logged in successfully'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 500 if Internal server error", async () => {
            req.body={
                email: "testmoh@test.com",
                password: "password"
            }
            User.findAll = jest.fn().mockImplementation(() => {
                return Promise.reject(new Error('Mock DB Error'))
            });
            const spy = jest.spyOn(User, "findAll")
            //console.log(await models.User.findAll())
            const expectedOutput = {object : null, message: 'Internal Server Error'};
            await login(req,res,next);
            //TODO
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    });
    describe('forgotPassword', () => {

        it("should return 422 and error message if input validation failed", async () => {

        });

        it("should return 404 and error message if entered email not found", async () => {

        });
        it("should return 200 and success message if email sent", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });

    });

    describe('resetPassword', () => {

        it("should return 422 and error message if input validation failed", async () => {

        });

        it("should return 400 and error message if token not found", async () => {

        });
        it("should return 200 and not success message if password reset successful", async () => {

        });
        it("should return 400 and error message if password reset failed", async () => {

        });
        it("should return 500 and error message if internal server error or password token expired", async () => {

        });

    });


});