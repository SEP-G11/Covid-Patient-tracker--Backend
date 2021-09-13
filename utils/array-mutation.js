const moment = require('moment');

const todayStatus = {
    Active: 'Cases',
    Dead: 'Deaths',
    Recovered: 'Recovered'
};
const allStatus = {
    Active: 'active',
    Dead: 'deaths',
    Recovered: 'recovered'
};

//convert the district stat to a better format
const districtStatsMutate = (arr,districtInfo) => {
    return  arr.reduce((acc, curr) => {
        const { district, districtCount,todayCount, status } = curr;

        if (!acc[district]) {
            acc[district] = {
                cases: 0,
                active: 0,
                deaths: 0,
                recovered: 0,
                todayCases: 0,
                todayDeaths: 0,
                todayRecovered: 0,
                districtInfo: districtInfo[district]
            };
        }

        acc[district]['cases']+=districtCount;
        acc[district][allStatus[status]] += districtCount;
        acc[district][`today${todayStatus[status]}`] += parseInt(todayCount);

        return acc;
    }, {});
};

const countryStatsMutate = (arr) => {
    return  arr.reduce((acc, curr) => {
        const { district, districtCount,todayCount, status } = curr;

        acc['cases']+=districtCount;
        acc[allStatus[status]] += districtCount;
        acc[`today${todayStatus[status]}`] += parseInt(todayCount);

        return acc;
    }, {cases: 0, active: 0, recovered: 0, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0});
};

const dateMapToValuesMutate = (arr,lastDays) => {
    const lastDaysArr = [...new Array(lastDays)].map((i, idx) => moment().subtract(idx, "days").format('YYYY-MM-DD'));
    const accumulator = lastDaysArr.reduce((acc,curr)=> {
        acc[curr]=0;
        return acc
    },{});
    return  arr.reduce((acc, curr) => {
        const { date, count} = curr.dataValues;

        acc[date] += count;


        return acc;
    }, accumulator);
};

module.exports = {districtStatsMutate,countryStatsMutate,dateMapToValuesMutate};

