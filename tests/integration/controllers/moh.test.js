const { overallCountryStats,overallDistrictStats,overallDistrictsStats,
    historicalTests,historicalDeaths,historicalRecovered,historicalCases,
    facilityHistorical,getFacilitiesBeds,getFacilitiesActive,getFacilitiesDeaths,
    getFacilitiesRecovered,getFacilities,register} = require('../../../controllers/moh');
const {DistrictStatus,MedicalReport,Test,sequelize} = require('../../../service/models');
let server;

describe('MOH Controller', () => {
    const req = {
        query: {},
        params:{}
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
    describe('overallCountryStats', () => {

        it("should return 200 and send country stats if found", async () => {
            // const expectedUser = 1;
            Date.now = jest.fn(() => new Date("2021-05-10T12:33:37.000Z"));
            const expectedResult = {
                cases: 15, active: 4, recovered: 9, deaths: 2, todayCases: 0, todayDeaths: 0, todayRecovered: 0
            };

            const expectedOutput = {results: expectedResult,message:"Country Data Found"};
            await overallCountryStats(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

        it("should return 404 and not found message if no country stats", async () => {
            jest.spyOn(DistrictStatus, "findAll").mockImplementation(() => {return Promise.resolve([])});

            const expectedOutput = { object : null, message: 'Country Data Not Found' };
            await overallCountryStats(req, res,next);
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(expectedOutput);
        });
        it("should return 500 if Internal server error", async () => {
            jest.spyOn(DistrictStatus, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object : null, message: 'Internal Server Error'};
            await overallCountryStats(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    });
    describe('overallDistrictStats', () => {

        it("should return 200 and send district stats if found", async () => {
            req.params.district = 'Colombo';
            Date.now = jest.fn(() => new Date("2021-05-10T12:33:37.000Z"));
            const expectedResult = {
                Colombo: {
                    cases: 5, active: 1, recovered: 4, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '6.925833',
                        longitude: '79.841667',
                        pab: 'CO',
                        province: 'Western'
                    }
                }
            };

            const expectedOutput = {results: expectedResult,message:"District Data Found"};
            await overallDistrictStats(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 404 and not found message if district stats not found", async () => {
            req.params.district = 'sdfsdhfds';

            const expectedOutput = { object : null, message: 'District Data Not Found' };
            await overallDistrictStats(req, res,next);
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(expectedOutput);
        });
        it("should return 500 if Internal server error", async () => {
            req.params.district = 'Colombo';

            const expectedOutput = { object : null, message: 'Internal Server Error' };
            jest.spyOn(DistrictStatus, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});
            await overallDistrictStats(req, res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput);
        });

    });

    describe('overallDistrictsStats', () => {

        it("should return 200 and send districts stats if found", async () => {
            req.params.district = 'Colombo';
            Date.now = jest.fn(() => new Date("2021-05-10T12:33:37.000Z"));
            const expectedResult = {
                Colombo: {
                    cases: 5, active: 1, recovered: 4, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '6.925833',
                        longitude: '79.841667',
                        pab: 'CO',
                        province: 'Western'
                    }
                },
                Galle: {
                    cases: 2, active: 0, recovered: 2, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '6.0536',
                        longitude: '80.2117',
                        pab: 'GL',
                        province: 'Southern'
                    }
                },
                Kandy: {
                    cases: 1, active: 1, recovered: 0, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '7.2964',
                        longitude: '80.635',
                        pab: 'KY',
                        province: 'Central'
                    }
                },
                Kurunegala: {
                    cases: 1, active: 0, recovered: 0, deaths: 1, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '7.4867',
                        longitude: '80.3647',
                        pab: 'KG',
                        province: 'North Western'
                    }
                },
                Matale: {
                    cases: 2, active: 1, recovered: 0, deaths: 1, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '7.4717',
                        longitude: '80.6244',
                        pab: 'MT',
                        province: 'Central'
                    }
                },
                Mullaitivu: {
                    cases: 2, active: 1, recovered: 1, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '9.266667',
                        longitude: '80.816667',
                        pab: 'MP',
                        province: 'Northern'
                    }
                },
                NuwaraEliya: {
                    cases: 1, active: 0, recovered: 1, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '6.9697',
                        longitude: '80.77',
                        pab: 'NW',
                        province: 'Central'
                    }
                },
                Trincomalee: {
                    cases: 1, active: 0, recovered: 1, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
                    districtInfo: {
                        latitude: '8.5667',
                        longitude: '81.2333',
                        pab: 'TC',
                        province: 'Eastern'
                    }
                },
            };

            const expectedOutput = {results: expectedResult,message:"Districts Data Found"};
            await overallDistrictsStats(req,res,next);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 404 and not found message if districts stats not found", async () => {
            jest.spyOn(DistrictStatus, "findAll").mockImplementation(() => {return Promise.resolve([])});

            const expectedOutput = {object: null,message:"Districts Data Not Found"};
            await overallDistrictsStats(req,res,next);
            expect(res.status).toBeCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 if Internal server error", async () => {
            jest.spyOn(DistrictStatus, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object: null,message:"Internal Server Error"};
            await overallDistrictsStats(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });

    });

    describe('historicalCases', () => {
        it("should return 200 and send historical cases for given last days number", async () => {
            req.query.lastdays = '5';
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": 0,
                "10/12/21": 0,
                "10/11/21": 0,
                "10/10/21": 0,
                "10/9/21": 0
            };
            const expectedOutput = {results: expectedResult,message:"Historical Cases over last 5 days Found"};
            await historicalCases(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 200 and send historical cases of last 1 day if last days number not given", async () => {
            req.query.lastdays = undefined;
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": 0
            };

            const expectedOutput = {results: expectedResult,message:"Historical Cases over last 1 days Found"};
            await historicalCases(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 if Internal server error", async () => {
            req.query.lastdays = '5';
            jest.spyOn(MedicalReport, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object: null,message:"Internal Server Error"};
            await historicalCases(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
    });

    describe('historicalRecovered', () => {
        it("should return 200 and send historical recovered for given last days number", async () => {
            req.query.lastdays = '5';
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": 0,
                "10/12/21": 0,
                "10/11/21": 0,
                "10/10/21": 0,
                "10/9/21": 0
            };
            const expectedOutput = {results: expectedResult,message:"Historical Recovered over last 5 days Found"};
            await historicalRecovered(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 200 and send historical recovered of last 1 day if last days number not given", async () => {
            req.query.lastdays = undefined;
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": 0
            };

            const expectedOutput = {results: expectedResult,message:"Historical Recovered over last 1 days Found"};
            await historicalRecovered(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 if Internal server error", async () => {
            req.query.lastdays = '5';
            jest.spyOn(MedicalReport, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object: null,message:"Internal Server Error"};
            await historicalRecovered(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
    });

    describe('historicalDeaths', () => {
        it("should return 200 and send historical deaths for given last days number", async () => {
            req.query.lastdays = '5';
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": 0,
                "10/12/21": 0,
                "10/11/21": 0,
                "10/10/21": 0,
                "10/9/21": 0
            };
            const expectedOutput = {results: expectedResult,message:"Historical Deaths over last 5 days Found"};
            await historicalDeaths(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 200 and send historical deaths of last 1 day if last days number not given", async () => {
            req.query.lastdays = undefined;
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": 0
            };

            const expectedOutput = {results: expectedResult,message:"Historical Deaths over last 1 days Found"};
            await historicalDeaths(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 if Internal server error", async () => {
            req.query.lastdays = '5';
            jest.spyOn(MedicalReport, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object: null,message:"Internal Server Error"};
            await historicalDeaths(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
    });

    describe('historicalTests', () => {
        it("should return 200 and send historical tests for given last days number", async () => {
            req.query.lastdays = '5';
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": {"pcr": 0, "rat": 0},
                "10/12/21": {"pcr": 0, "rat": 0},
                "10/11/21": {"pcr": 0, "rat": 0},
                "10/10/21": {"pcr": 0, "rat": 0},
                "10/9/21": {"pcr": 0, "rat": 0}
            };
            const expectedOutput = {results: expectedResult,message:"Historical Tests over last 5 days Found"};
            await historicalTests(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 200 and send historical tests of last 1 day if last days number not given", async () => {
            req.query.lastdays = undefined;
            Date.now = jest.fn(() => new Date("2021-10-13T12:33:37.000Z"));
            const expectedResult = {
                "10/13/21": {"pcr": 0, "rat": 0}
            };
            const expectedOutput = {results: expectedResult,message:"Historical Tests over last 1 days Found"};
            await historicalTests(req,res,next);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
        it("should return 500 if Internal server error", async () => {
            req.query.lastdays = '5';
            jest.spyOn(Test, "findAll").mockImplementation(() => {return Promise.reject(new Error('Mock DB Error'))});

            const expectedOutput = {object: null,message:"Internal Server Error"};
            await historicalTests(req,res,next);
            expect(res.status).toBeCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedOutput)
        });
    });

    describe('getFacilities', () => {
        it("should return 200 and send facilities if found", async () => {

        });
        it("should return 404 and not found message if facilities not found", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });
    });

    describe('getFacilitiesRecovered', () => {
        it("should return 200 and send facilities recovered count if found", async () => {

        });
        it("should return 404 and not found message if facilities recovered count not found", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });
    });

    describe('getFacilitiesDeaths', () => {
        it("should return 200 and send facilities deaths count if found", async () => {

        });
        it("should return 404 and not found message if facilities deaths count not found", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });
    });

    describe('getFacilitiesActive', () => {
        it("should return 200 and send facilities active count if found", async () => {

        });
        it("should return 404 and not found message if facilities active count not found", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });
    });

    describe('getFacilitiesBeds', () => {
        it("should return 200 and send facilities beds count if found", async () => {

        });
        it("should return 404 and not found message if facilities beds count not found", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });
    });

    describe('facilityHistorical', () => {
        it("should return 200 and send facility historical data if found", async () => {

        });
        it("should return 404 and not found message if facility historical data not found", async () => {

        });
        it("should return 500 if Internal server error", async () => {

        });
    });

});