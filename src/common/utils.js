import {
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    STAT_TYPES,
    STAT_GROUP,
} from './constants';

export const prepareStatDataByType = statItem => ({
    name: statItem[1].name,
    title: statItem[1].title,
    type: statItem[0],
    data: statItem[0] === STAT_TYPE_ENUM || statItem[0] === STAT_TYPE_STATUS
        ? statItem[2] : statItem.splice(2),
});

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
