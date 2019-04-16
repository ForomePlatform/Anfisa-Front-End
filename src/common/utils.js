import {
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    STAT_TYPE_INT,
    STAT_TYPE_FLOAT,
    STAT_TYPES,
    STAT_GROUP,
    EXPIRED_TIME,
    STAT_TYPE_ZYGOSITY,
} from './constants';

const prepareNumericStatData = statItem => ({
    type: statItem[0],
    name: statItem[1].name,
    title: statItem[1].title,
    render: statItem[1].render.split(',')[0],
    data: statItem.splice(2),
});

const prepareEnumStatData = statItem => ({
    type: statItem[0],
    name: statItem[1].name,
    title: statItem[1].title,
    data: statItem[2],
});

const prepareZygosityStatData = statItem => ({
    type: statItem[0],
    name: statItem[1].name,
    title: statItem[1].title,
    data: {
        family: statItem[1].family,
        selectedFamily: statItem[2],
        variants: statItem[3],
    },
});

export const prepareStatDataByType = (statItem) => {
    switch (statItem[0]) {
    case STAT_TYPE_INT:
    case STAT_TYPE_FLOAT:
        return prepareNumericStatData(statItem);
    case STAT_TYPE_ENUM:
    case STAT_TYPE_STATUS:
        return prepareEnumStatData(statItem);
    case STAT_TYPE_ZYGOSITY:
        return prepareZygosityStatData(statItem);
    default:
        return null;
    }
};

export function prepareStatList(statList) {
    const tmpResult = [];
    const groupsData = {};
    let result = [];

    if (statList && Array.isArray(statList)) {
        statList.filter(statItem => STAT_TYPES.includes(statItem[0])).forEach((statItem) => {
            const groupName = statItem[1].vgroup;
            if (groupName) {
                if (!Object.keys(groupsData).includes(statItem[1].vgroup)) {
                    tmpResult.push({
                        title: groupName,
                        type: STAT_GROUP,
                    });
                    groupsData[groupName] = [];
                }
                groupsData[groupName].push(prepareStatDataByType(statItem));
            } else {
                tmpResult.push(prepareStatDataByType(statItem));
            }
        });
    }

    result = tmpResult.map((item) => {
        if (item.type === STAT_GROUP) {
            return ({
                ...item,
                data: groupsData[item.title],
            });
        }
        return item;
    });
    return result;
}

export function prepareParams({
    ws, filter, conditions, zones,
}) {
    const params = new URLSearchParams();
    if (ws) {
        params.append('ws', ws);
    }
    if (filter) {
        params.append('filter', filter);
    }
    if (conditions && conditions.length) {
        params.append('conditions', JSON.stringify(conditions));
    }
    if (zones) {
        Object.keys(zones).forEach((currentZone) => {
            if (zones[currentZone].selectedValue !== null) {
                params.append('zone', JSON.stringify([currentZone, [zones[currentZone].selectedValue]]));
            }
        });
    }
    return params;
}

export function prepareVariantDetails(data) {
    const result = {};
    const getValuesForRow = row => (Array.isArray(row) ? row.map(val => val[0]) : []);
    data.forEach((item) => {
        if (item.type === 'table') {
            const tableData = item.rows.map(row => [row[1], ...getValuesForRow(row[2])]);
            result[item.name] = {
                title: item.title,
                data: tableData,
            };
        } else if (item.type === 'pre') {
            result[item.title] = {
                title: item.title,
                content: item.content,
            };
        }
    });
    return result;
}

export function expired(date) {
    const currentDate = new Date();
    const diffSeconds = (currentDate - date) / 1000;
    return diffSeconds > EXPIRED_TIME;
}

export function checkNonzeroStat(stat) {
    if (stat.type === STAT_TYPE_ENUM || stat.type === STAT_TYPE_STATUS) {
        const nonzeroItems = stat.data.filter(item => item[1]);
        return Boolean(nonzeroItems.length);
    } else if (stat.type === STAT_TYPE_INT || stat.type === STAT_TYPE_FLOAT) {
        return stat.data[0] || stat.data[1];
    } else if (stat.type === STAT_TYPE_ZYGOSITY) {
        return true;
    }
    return false;
}

export function getProblemGroup(currentConditions) {
    const zygosity = currentConditions.find(condition => condition[0] === STAT_TYPE_ZYGOSITY);
    return zygosity ? zygosity[2] : null;
}
