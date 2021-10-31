const {protect,authorize} = require('../../../middlewares/authorization');
const jwt = require("jsonwebtoken");


describe('protect middleware',() => {
    beforeEach(async () => {
        require('dotenv').config();
    });
    it('should populate req.userID and req.accType for users without a facility with the payload of valid JWT', async ()=>{
        let tokenData = {
            email: "abc@example.com",
            userID: "1234",
            accType: "MOH"
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '30d'});

        const req = {
            headers:{
                authorization: `Bearer ${token}`
            }
        };
        const res = {};
        const next = jest.fn();
        protect(req,res,next);

        expect(req.userID).toEqual("1234");
        expect(req.accType).toEqual("MOH");
        expect(req.facilityId).toEqual(undefined)
    });

    it('should populate req.userID and req.accType and req.facilityId for users with a facility with the payload of valid JWT', async ()=>{
        let tokenData = {
            email: "abc@example.com",
            userID: "1234",
            accType: "MOH",
            facilityId: 1
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '30d'});

        const req = {
            headers:{
                authorization: `Bearer ${token}`
            }
        };
        const res = {};
        const next = jest.fn();
        protect(req,res,next);

        expect(req.userID).toEqual("1234");
        expect(req.accType).toEqual("MOH");
        expect(req.facilityId).toEqual(1)
    });

    it('should generate error with status code 401 if no token', async ()=>{
        const token = undefined;
        const req = {
            headers:{
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();
        protect(req,res,next);
        let expectedOutput= { object : null, message: "Not authenticated,no token" };
        expect(res.send).toHaveBeenCalledWith(expectedOutput);
        expect(res.status).toBeCalledWith(401)

    });

    it('should generate error with status code 401 if token malformed', async ()=>{
        const req = {
            headers:{
                authorization: `Bearer thfghju65675757tgjgjgjgjgyhftrddhc`
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();
        protect(req,res,next);
        let expectedOutput= { object : null, message: "Not authorized, token failed" };
        expect(res.send).toHaveBeenCalledWith(expectedOutput);
        expect(res.status).toBeCalledWith(401)

    });
});

describe('authorize middleware',() => {
    it('should call next if authorized', async ()=>{
        const req = {
            accType: "DOC"
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();
        const authTest = authorize(["MOH","DOC"]);
        authTest(req,res,next);
        expect(next).toHaveBeenCalled()
    });

    it('should generate error with status code 401 if not authorized', async ()=>{
        const req = {
            accType: "HA"
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();
        let expectedOutput= { object : null, message: "Not authorized." };
        const authTest = authorize(["MOH","DOC"]);
        authTest(req,res,next);
        expect(res.send).toHaveBeenCalledWith(expectedOutput);
        expect(res.status).toBeCalledWith(401)
    });
});