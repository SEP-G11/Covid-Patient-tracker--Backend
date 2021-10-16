<<<<<<< HEAD
const { getUserProfile, editUserProfile } = require('../../../controllers/user');
const { User, sequelize } = require('../../../service/models');
=======
const {getUserProfile,editUserProfile } = require('../../../controllers/user');
const {User,sequelize} = require('../../../service/models');
>>>>>>> master

let server;

describe('User Controller', () => {
    describe('getUserProfile', () => {
        const req = {
<<<<<<< HEAD
            userID: "903000006",
            params: {}
=======
            userID: "903000006V",
            params:{}
>>>>>>> master
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
            jest.restoreAllMocks();
        });

        it("should return 200 and send user details if found", async () => {
<<<<<<< HEAD
            // const expectedUser = 1;

            const expectedUser = {
                "contact_no": "94767374839",
                "email": "john@example.com",
                "name": "Jonathan Doe",
                "user_id": "903000006",
                "user_type": "MOH",
            }
=======
            const expectedUser = {
                "contact_no": "94777374839",
                    "email": "testmoh@test.com",
                    "name": "John Doe",
                    "user_id": "903000006V",
                    "user_type": "MOH",
            };
>>>>>>> master

            const expectedOutput = { results: expectedUser, message: "User Found" };
            await getUserProfile(req, res, next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 422 if no user id provided", async () => {
            req.userID = null;
            await getUserProfile(req, res, next);
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'User ID required' });
        });

        it("should return 404 if user not found", async () => {
            req.userID = "999999999"; //unlikely to exist
            await getUserProfile(req, res, next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'User Not Found' });
        });

        it("should return 500 if Internal server error", async () => {
<<<<<<< HEAD
            jest.spyOn(User, "findByPk").mockImplementation(() => { return Promise.reject(new Error('Mock DB Error')) });
=======
            jest.spyOn(User, "findByPk").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});
>>>>>>> master

            await getUserProfile(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
<<<<<<< HEAD
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'Internal Server Error' });
=======
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
>>>>>>> master
        });

    });
    describe('editUserProfile', () => {
        const req = {
<<<<<<< HEAD
            userID: "903000006",
            body: {
                name: "Jonathan Doe",
                contact: "94767374839",
                newPassword: "testpassword"
            }
=======
            userID: "903000006V",
            body:{}
>>>>>>> master
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
            jest.restoreAllMocks();
        });

        it("should return 422 if no user id provided", async () => {
            req.userID = null;
<<<<<<< HEAD
            await editUserProfile(req, res, next);
=======
            req.body = {name: "Jonathan Doe", contact: "94767374839", newPassword: "newpassword"};
            await editUserProfile(req, res,next);
>>>>>>> master
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'User ID required' });
        });
        it("should return 422 if no password shorter than 5 characters", async () => {
<<<<<<< HEAD
            req.userID = "903000006";
            req.body.newPassword = "1234"
            await editUserProfile(req, res, next);
=======
            req.userID= "903000006V";
            req.body = {name: "Jonathan Doe", contact: "94767374839", newPassword: "1234"};
            await editUserProfile(req, res,next);
>>>>>>> master
            expect(res.status).toBeCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: "\"Password\" length must be at least 5 characters long" });
        });
        it("should return 404 if user not found", async () => {
            req.userID = "999999999"; //unlikely to exist
<<<<<<< HEAD
            req.body.newPassword = "newpassword"
            await editUserProfile(req, res, next);
=======
            req.body = {name: "Jonathan Doe", contact: "94767374839", newPassword: "newpassword"};
            await editUserProfile(req, res,next);
>>>>>>> master
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'User Not Found' });
        });
<<<<<<< HEAD
        it("should update user and send success message", async () => {
            req.userID = "903000006";
            req.body.newPassword = "newpassword"
            await editUserProfile(req, res, next);
=======
        it("should update user and return 200 and send success message - name,contact,newpasssword given", async () => {
            req.userID = "903000006V";
            req.body = {name: "Jonathan Doe", contact: "94767374839", newPassword: "newpassword"};
            await editUserProfile(req, res,next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ results: {},message:"User Details Updated Successfully" });
        });
        it("should update user and return 200 and send success message - name only given", async () => {
            req.userID = "903000006V";
            req.body = {name: "Jonathan Doez"};
            await editUserProfile(req, res,next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ results: {},message:"User Details Updated Successfully" });
        });
        it("should update user and return 200 and send success message - contact only given", async () => {
            req.userID = "903000006V";
            req.body = {contact: "94767376839"};
            await editUserProfile(req, res,next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ results: {},message:"User Details Updated Successfully" });
        });
        it("should update user and return 200 and send success message - password only given", async () => {
            req.userID = "903000006V";
            req.body = {newPassword: "newpassword"};
            await editUserProfile(req, res,next);
>>>>>>> master
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ results: {}, message: "User Details Updated Successfully" });
        });
        it("should return 500 if Internal server error", async () => {
<<<<<<< HEAD
            jest.spyOn(User, "findByPk").mockImplementation(() => { return Promise.reject(new Error('Mock DB Error')) });
=======
            jest.spyOn(User, "findByPk").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});
>>>>>>> master

            await editUserProfile(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
<<<<<<< HEAD
            expect(res.send).toHaveBeenCalledWith({ object: null, message: 'Internal Server Error' });
=======
            expect(res.send).toHaveBeenCalledWith({ object : null, message: 'Internal Server Error' });
>>>>>>> master
        });

    });

});