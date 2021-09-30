const { successMessage,errorMessage } = require("../../../utils/message-template");


describe('successMessage util',() => {
    it('should send success message along with results with 200(default) status code', async ()=>{
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const results = 'can be anything str/num/array/obj';
        const message = "Success Message";

        const success = successMessage(res,results,message);
        expect(res.send).toHaveBeenCalledWith({results: results, message: message});
        expect(res.status).toBeCalledWith(200)

    });
    it('should send success message along with results with 201 status code', async ()=>{
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const results = 'can be anything str/num/array/obj';
        const message = "Success Message";

        const success = successMessage(res,results,message,201);
        expect(res.send).toHaveBeenCalledWith({results: results, message: message});
        expect(res.status).toBeCalledWith(201)

    });
});

describe('errorMessage util',() => {
    it('should send error message with 400(default) status code', async ()=>{
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const message = "Error Message";

        const success = errorMessage(res,message);
        expect(res.send).toHaveBeenCalledWith({object: null, message: message});
        expect(res.status).toBeCalledWith(400)

    });
    it('should send error message with 401 status code', async ()=>{
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const message = "Error Message";

        const success = errorMessage(res,message,401);
        expect(res.send).toHaveBeenCalledWith({object: null, message: message});
        expect(res.status).toBeCalledWith(401)

    });
});