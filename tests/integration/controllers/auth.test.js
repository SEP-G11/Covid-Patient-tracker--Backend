const {login,forgotPassword,resetPassword} = require('../../../controllers/auth');
const {User,PasswordReset,sequelize} = require('../../../service/models');
const mailer = require("../../../utils/mailer");

let server;


describe('Auth Controller', () => {
    const req = {
        query: {},
        params:{},
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    beforeEach(async () => {
        server = require('../../../index');
        req.body ={};
        await sequelize.query("SET autocommit = OFF");
        await sequelize.query("BEGIN");
    });
    afterEach(async () => {
        await sequelize.query("ROLLBACK");
        await server.close();
        jest.restoreAllMocks();
    });
    describe('login', () => {
        it("should return 422 and error message if input validation failed", async () => {
            req.body={
                email: "notanemail",
                password: "somepassword"
            };
            const expectedOutput = {object : null, message: '"Email" must be a valid email'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)

        });

        it("should return 401 and error message if user not found", async () => {
            req.body={
                email: "notexistinguser@test.com",
                password: "somepassword"
            };
            const expectedOutput = {object : null, message: 'Incorrect email or password'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(401);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 401 and error message if incorrect credentials", async () => {
            req.body={
                email: "testmoh@test.com",
                password: "wrongpassword"
            };
            const expectedOutput = {object : null, message: 'Incorrect email or password'};
            await login(req,res,next);

            expect(res.status).toBeCalledWith(401);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 200 and user and token data if successfully logged", async () => {
            req.body={
                email: "testmoh@test.com",
                password: "password"
            };
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
            };
            jest.spyOn(User, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object : null, message: 'Internal Server Error'};
            await login(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    });
    describe('forgotPassword', () => {
        it("should return 422 and error message if input validation failed", async () => {
            req.body={
                email: "notanemail"
            };

            const expectedOutput = {object : null, message: '"Email" must be a valid email'};
            await forgotPassword(req,res,next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)

        });

        it("should return 404 and error message if entered email not found", async () => {
            req.body={
                email: "notexistinguser@test.com"
            };

            const expectedOutput = {object : null, message: 'Entered Email does not match an account'};
            await forgotPassword(req,res,next);

            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)

        });
        it("should return 200 and success message if email sent", async () => {
            req.body={
                email: "testmoh@test.com"
            };
            jest.spyOn(mailer, "sendResetPasswordEmail").mockImplementation(() => {console.log('Mock Email sent')});
            const expectedOutput = {results : {}, message: 'Email sent, Please check you Email'};
            await forgotPassword(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 if Internal server error", async () => {
            req.body={
                email: "testmoh@test.com"
            };
            jest.spyOn(User, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object : null, message: 'Internal Server Error'};
            await forgotPassword(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    });

    describe('resetPassword', () => {
        it("should return 422 and error message if input validation failed", async () => {
            req.body={
                password: "1234"
            };

            const expectedOutput = {object : null, message: '"Password" length must be at least 5 characters long'};
            await resetPassword(req,res,next);

            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 400 and error message if token not found", async () => {
            req.body={
                password: "newpassword",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdGV4aXN0aW5nZW1haWxAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.DjOodj2lay3WF9QdcS0LuDUwaulkGJsJm8z2QiueMYI"
            };

            const expectedOutput = {object : null, message: 'Password reset failed'};
            await resetPassword(req,res,next);

            expect(res.status).toBeCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 and error message if internal server error or password token expired", async () => {
            req.body={
                password: "newpassword",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZXNzY3ViZWNoZXNzY29tQGdtYWlsLmNvbSIsImlhdCI6MTYzMjM5MzU2MiwiZXhwIjoxNjMyMzk0NzYyfQ.JbPytwHIQKzgpQZa6ED7WfjVSPowUbPYqDDVKvNrGws"
            }; //token is expired

            const expectedOutput = {object : null, message: 'Failed or Expired Token'};
            await resetPassword(req,res,next);

            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 200 and not success message if password reset successful", async () => {
            req.body={
                password: "newpassword",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rtb2hAdGVzdC5jb20iLCJpYXQiOjE2MjA2NTAwMTcsImV4cCI6MTYyMDY1MTIxN30.aI1nQiKMsWAovW3MIh74jXAK6Z5JaBXo1eyOu5OBM4k"
            };
            Date.now = jest.fn(() => new Date("2021-05-10T12:33:37.000Z"));
            jest.spyOn(User, "update").mockImplementation(() => {return Promise.resolve(true)});
            jest.spyOn(PasswordReset, "update").mockImplementation(() => {return Promise.resolve(true)});

            const expectedOutput = {results : {}, message: 'Password reset successful'};
            await resetPassword(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 400 and error message if password reset failed", async () => {
            req.body={
                password: "password",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rtb2hAdGVzdC5jb20iLCJpYXQiOjE2MjA2NTAwMTcsImV4cCI6MTYyMDY1MTIxN30.aI1nQiKMsWAovW3MIh74jXAK6Z5JaBXo1eyOu5OBM4k"
            };
            Date.now = jest.fn(() => new Date("2021-05-10T12:33:37.000Z"));
            jest.spyOn(User, "update").mockImplementation(() => {return Promise.resolve(false)});
            jest.spyOn(PasswordReset, "update").mockImplementation(() => {return Promise.resolve(false)});

            const expectedOutput = {object : null, message: 'Password reset failed'};
            await resetPassword(req,res,next);

            expect(res.status).toBeCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    });


});