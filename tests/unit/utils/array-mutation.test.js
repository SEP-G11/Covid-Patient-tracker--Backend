var fs = require('fs');
const { districtStatsMutate,countryStatsMutate,dateMapToValuesMutate,dateMapToTestsMutate,facilityBedsMutate} = require("../../../utils/array-mutation");

describe('district stats mutate util',() => {
    it('should mutate district stats to the required format', async ()=>{
        const districtInfo = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));

        const overallDistrictStats = [
            {district: 'Colombo',districtCount: 5,todayCount: '2',status: 'Active'},
            {district: 'Colombo',districtCount: 3,todayCount: '1',status: 'Recovered'},
            {district: 'Colombo',districtCount: 2,todayCount: '0',status: 'Dead'},
            {district: 'Gampaha',districtCount: 5,todayCount: '1',status: 'Active'},
            {district: 'Kandy',districtCount: 2,todayCount: '1',status: 'Dead'},
        ];

        const expectedResult = {
            'Colombo': {cases:10,active:5,deaths:2,recovered:3,todayCases:2,todayDeaths:0,todayRecovered:1,districtInfo:{"latitude": "6.925833", "longitude": "79.841667", "province": "Western", "pab":"CO"}},
            'Gampaha': {cases:5,active:5,deaths:0,recovered:0,todayCases:1,todayDeaths:0,todayRecovered:0,districtInfo:{"latitude": "7.0917", "longitude": "79.9942", "province": "Western", "pab":"GQ"}},
            'Kandy': {cases:2,active:0,deaths:2,recovered:0,todayCases:0,todayDeaths:1,todayRecovered:0,districtInfo:{"latitude": "7.2964", "longitude": "80.635", "province": "Central", "pab":"KY"}}
        };

        const res = districtStatsMutate(overallDistrictStats,districtInfo);
        expect(res).toEqual(expectedResult);
    });
});

describe('country stats mutate util',() => {
    it('should mutate country stats to the required format', async ()=>{

        const overallDistrictStats = [
            {district: 'Colombo',districtCount: 5,todayCount: '2',status: 'Active'},
            {district: 'Colombo',districtCount: 3,todayCount: '1',status: 'Recovered'},
            {district: 'Colombo',districtCount: 2,todayCount: '0',status: 'Dead'},
            {district: 'Gampaha',districtCount: 5,todayCount: '1',status: 'Active'},
            {district: 'Kandy',districtCount: 2,todayCount: '1',status: 'Dead'},
        ];

        const expectedResult = {
            cases:17,active:10,recovered:3,deaths:4,todayCases:3,todayDeaths:1,todayRecovered:1
        };

        const res = countryStatsMutate(overallDistrictStats);
        expect(res).toEqual(expectedResult);
    });
});