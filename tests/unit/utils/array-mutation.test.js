var fs = require('fs');
const { districtStatsMutate, countryStatsMutate, dateMapToValuesMutate, dateMapToTestsMutate, facilityBedsMutate, facilitybeds } = require("../../../utils/array-mutation");


describe('districtStatsMutate util',() => {
    it('should mutate district stats to the required format', async ()=>{
        const districtInfo = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));

        const overallDistrictStats = [
            { district: 'Colombo', districtCount: 5, todayCount: '2', status: 'Active' },
            { district: 'Colombo', districtCount: 3, todayCount: '1', status: 'Recovered' },
            { district: 'Colombo', districtCount: 2, todayCount: '0', status: 'Dead' },
            { district: 'Gampaha', districtCount: 5, todayCount: '1', status: 'Active' },
            { district: 'Kandy', districtCount: 2, todayCount: '1', status: 'Dead' },
        ];

        const expectedResult = {
            'Colombo': { cases: 10, active: 5, deaths: 2, recovered: 3, todayCases: 2, todayDeaths: 0, todayRecovered: 1, districtInfo: { "latitude": "6.925833", "longitude": "79.841667", "province": "Western", "pab": "CO" } },
            'Gampaha': { cases: 5, active: 5, deaths: 0, recovered: 0, todayCases: 1, todayDeaths: 0, todayRecovered: 0, districtInfo: { "latitude": "7.0917", "longitude": "79.9942", "province": "Western", "pab": "GQ" } },
            'Kandy': { cases: 2, active: 0, deaths: 2, recovered: 0, todayCases: 0, todayDeaths: 1, todayRecovered: 0, districtInfo: { "latitude": "7.2964", "longitude": "80.635", "province": "Central", "pab": "KY" } }
        };

        const res = districtStatsMutate(overallDistrictStats, districtInfo);
        expect(res).toEqual(expectedResult);
    });
});


describe('countryStatsMutate util',() => {
    it('should mutate country stats to the required format', async ()=>{
        const overallDistrictStats = [
            { district: 'Colombo', districtCount: 5, todayCount: '2', status: 'Active' },
            { district: 'Colombo', districtCount: 3, todayCount: '1', status: 'Recovered' },
            { district: 'Colombo', districtCount: 2, todayCount: '0', status: 'Dead' },
            { district: 'Gampaha', districtCount: 5, todayCount: '1', status: 'Active' },
            { district: 'Kandy', districtCount: 2, todayCount: '1', status: 'Dead' },
        ];

        const expectedResult = {
            cases: 17, active: 10, recovered: 3, deaths: 4, todayCases: 3, todayDeaths: 1, todayRecovered: 1
        };

        const res = countryStatsMutate(overallDistrictStats);
        expect(res).toEqual(expectedResult);
    });
});




describe('facility beds details util', () => {
    it('should mutate facility beds details to the required format', async () => {


        const FacilityBed = [
            { BedID: 41, WardID: 5, FacilityId: 12, FacilityName: 'Cibungur National Hospital', WardType: 'Covid', IsOccupied: null, Capacity: 5, Contactnumber: '0115031243' },
            { BedID: 42, WardID: 5, FacilityId: 12, FacilityName: 'Cibungur National Hospital', WardType: 'Covid', IsOccupied: true, Capacity: 5, Contactnumber: '0115031243' },
            { BedID: 46, WardID: 6, FacilityId: 12, FacilityName: 'Cibungur National Hospital', WardType: 'Normal', IsOccupied: true, Capacity: 5, Contactnumber: '0115031243' },
            { BedID: 47, WardID: 6, FacilityId: 12, FacilityName: 'Cibungur National Hospital', WardType: 'Normal', IsOccupied: null, Capacity: 5, Contactnumber: '0115031243' },
            { BedID: 22, WardID: 6, FacilityId: 12, FacilityName: 'Cibungur National Hospital', WardType: 'Normal', IsOccupied: true, Capacity: 5, Contactnumber: '0115031243' },
        ]


        const expectedResult = {
            Contactnumber: "0115031243", CovidBed: [{ BedID: 41, IsOccupied: null }, { BedID: 42, IsOccupied: true }], CovidBedFree: 1, CovidBedUsed: 1, CovidWardCapacity: 5, FacilityId: 12, FacilityName: "Cibungur National Hospital", NormalBed: [{ BedID: 46, IsOccupied: true }, { BedID: 47, IsOccupied: null }, { BedID: 22, IsOccupied: true }], NormalBedFree: 1, NormalBedUsed: 2, NormalWardCapacity: 5
        };

        const res = facilitybeds(FacilityBed);
        expect(res).toEqual(expectedResult);
    });
});

describe('dateMapToTestsMutate util',() => {
    it('should mutate date to tests mapping to the required format', async ()=>{
        Date.now = jest.fn(() => new Date("2021-09-29T12:33:37.000Z"));
        const lastDays = 5;
        const mutableArr = [
            {dataValues:  { test_date: '2021-09-27', count: 2, test_type: 'PCR' }},
            {dataValues:  { test_date: '2021-09-27', count: 5, test_type: 'RAT' }},
            {dataValues: { test_date: '2021-09-25', count: 1, test_type: 'PCR' }},
            {dataValues: { test_date: '2021-09-25', count: 2, test_type: 'RAT' }},
        ];

        const expectedResult = {
            '9/29/21':{pcr: 0,rat: 0},
            '9/28/21':{pcr: 0,rat: 0},
            '9/27/21':{pcr: 2,rat: 5},
            '9/26/21':{pcr: 0,rat: 0},
            '9/25/21':{pcr: 1,rat: 2},

        };

        const res = dateMapToTestsMutate(mutableArr,lastDays);
        expect(res).toEqual(expectedResult);
    });
});

describe('dateMapToValuesMutate util',() => {
    it('should mutate date to count mapping to the required format', async ()=>{
        Date.now = jest.fn(() => new Date("2021-09-29T12:33:37.000Z"));
        const lastDays = 5;
        const mutableArr = [
            {dataValues:  { date: '2021-09-27', count: 2}},
            {dataValues: { date: '2021-09-25', count: 1}},
        ];

        const expectedResult = {
            '9/29/21':0,
            '9/28/21':0,
            '9/27/21':2,
            '9/26/21':0,
            '9/25/21':1,

        };

        const res = dateMapToValuesMutate(mutableArr,lastDays);
        expect(res).toEqual(expectedResult);
    });
});

describe('facilityBedsMutate util',() => {
    it('should mutate facility beds to the required format', async ()=>{

        const mutableArr = [
            {dataValues: { facilityId: 4, wardType: 'Covid', isOccupied: 1 }},
            {dataValues: { facilityId: 4, wardType: 'Normal', isOccupied: 0 }},
            {dataValues: { facilityId: 4, wardType: 'Covid', isOccupied: 0 }},
            {dataValues: { facilityId: 8, wardType: 'Covid', isOccupied: 0 }},
            {dataValues: { facilityId: 12, wardType: 'Covid', isOccupied: 0 }},
            {dataValues: { facilityId: 12, wardType: 'Normal', isOccupied: 1 }}
        ];

        const expectedResult = {
            4:{totalCovidBeds: 2, occupiedCovidBeds: 1, totalNormalBeds: 1, occupiedNormalBeds: 0},
            8:{totalCovidBeds: 1, occupiedCovidBeds: 0, totalNormalBeds: 0, occupiedNormalBeds: 0},
            12:{totalCovidBeds: 1, occupiedCovidBeds: 0, totalNormalBeds: 1, occupiedNormalBeds: 1}

        };

        const res = facilityBedsMutate(mutableArr);
        expect(res).toEqual(expectedResult);

    });
});