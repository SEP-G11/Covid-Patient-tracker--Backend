//convert the district stat to a better format
const districtStatsMutate = (arr,districtCoord) => {
    return  arr.reduce((acc, curr) => {
        const { district, districtCount, status } = curr;

        if (!acc[district]) {
            acc[district] = {
                cases: 0,
                active: 0,
                dead: 0,
                recovered: 0,
                districtInfo: districtCoord[district]
            };
        }

        acc[district]['cases']+=districtCount;
        acc[district][status.toLowerCase()] += districtCount;

        return acc;
    }, {});
};

module.exports = {districtStatsMutate};

