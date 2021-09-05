//convert the district stat to a better format
const districtStatsMutate = (arr,districtCoord) => {
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
                districtInfo: districtCoord[district]
            };
        }

        acc[district]['cases']+=districtCount;
        acc[district][allStatus[status]] += districtCount;
        acc[district][`today${todayStatus[status]}`] += parseInt(todayCount);

        return acc;
    }, {});
};

module.exports = {districtStatsMutate};

