const {getUserProfile,editUserProfile } = require('../../../controllers/user');
const sequelize = require('../../../database/db');
var models = require("../../../service/init-models").initModels(sequelize);
var User = models.User;

let server;

describe('User Controller', () => {
    describe('getUserProfile', () => {
        const req = {
            userID: "903000006",
            params:{}
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

        it("should return 200 and send user details if found", async () => {
           // const expectedUser = 1;

            const expectedUser = {
                "contact_no": "94777374839",
                    "email": "testmoh@test.com",
                    "name": "John Doe",
                    "user_id": "903000006",
                    "user_type": "MOH",
            }

            const expectedOutput = {results: expectedUser,message:"User Found"};
            await getUserProfile(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 422 if no user id provided", async () => {
            req.userID = null;
            await getUserProfile(req, res,next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'User ID required' });
        });

        it("should return 404 if user not found", async () => {
            req.userID = "999999999"; //unlikely to exist
            await getUserProfile(req, res,next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'User Not Found' });
        });

        it("should return 500 if Internal server error", async () => {
            req.userID = new Error("Mock Error");
           //const mock = jest.spyOn(User, "findByPk").mockImplementation(() => {return new Error('mock error')});

            await getUserProfile(req,res,next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
            //mock.mockRestore();
        });

    });
    describe('editUserProfile', () => {
        const req = {
            userID: "903000006",
            body:{
                name: "Jonathan Doe",
                contact: "94767374839",
                newPassword: "testpassword"
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

        it("should return 422 if no user id provided", async () => {
            req.userID = null;
            await editUserProfile(req, res,next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'User ID required' });
        });
        it("should return 422 if no password shorter than 5 characters", async () => {
            req.userID= "903000006";
            req.body.newPassword = "1234"
            await editUserProfile(req, res,next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: "\"Password\" length must be at least 5 characters long" });
        });
        it("should return 404 if user not found", async () => {
            req.userID = "999999999"; //unlikely to exist
            req.body.newPassword = "newpassword"
            await editUserProfile(req, res,next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'User Not Found' });
        });
        it("should update user and send success message", async () => {
            req.userID = "903000006"; //unlikely to exist
            req.body.newPassword = "newpassword"
            await editUserProfile(req, res,next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ results: {},message:"User Details Updated Successfully" });
        });
        it("should return 500 if Internal server error", async () => {
            req.userID = new Error("Mock Error");
            //const mock = jest.spyOn(User, "findByPk").mockImplementation(() => {return new Error('mock error')});

            await editUserProfile(req,res,next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
            //mock.mockRestore();
        });

    });

});