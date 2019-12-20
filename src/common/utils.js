import {
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    STAT_TYPE_INT,
    STAT_TYPE_FLOAT,
    STAT_TYPES,
    STAT_GROUP,
    EXPIRED_TIME,
    STAT_TYPE_ZYGOSITY,
    STAT_TYPE_TRANSCRIPT_MULTISET,
    STAT_TYPE_TRANSCRIPT_STATUS,
    NUMERIC_RENDER_TYPES,
} from './constants';

export function includes(stringA, stringB) {
    return stringA.toUpperCase().includes(stringB.toUpperCase());
}

const prepareNumericStatData = statItem => ({
    type: statItem[0],
    name: statItem[1].name,
    title: statItem[1].title,
    tooltip: statItem[1].tooltip,
    render: statItem[1].render ? statItem[1].render.split(',')[0] : NUMERIC_RENDER_TYPES.LINEAR,
    data: statItem.splice(2),
});

const prepareEnumStatData = statItem => ({
    type: statItem[0],
    name: statItem[1].name,
    title: statItem[1].title,
    tooltip: statItem[1].tooltip,
    data: statItem[2],
    render: statItem[1].render,
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
    case STAT_TYPE_TRANSCRIPT_MULTISET:
    case STAT_TYPE_TRANSCRIPT_STATUS:
        return prepareEnumStatData(statItem);
    case STAT_TYPE_ZYGOSITY:
        return prepareZygosityStatData(statItem);
    default:
        return null;
    }
};

export function getStatListWithOperativeStat(data) {
    const statsToAdd = (data && data['avail-import']) || [];
    let statList = data['stat-list'];
    if (statList && Array.isArray(statList)) {
        statsToAdd.forEach((statToAdd, index) => {
            const dubbedHetStat = statList.findIndex(statItem => statItem[1].name === statToAdd);
            if (dubbedHetStat === -1) {
                const target = [STAT_TYPE_ENUM, {
                    vgroup: 'Inheritance',
                    name: statToAdd,
                    render: 'operative',
                    title: data['avail-import-titles'] ? data['avail-import-titles'][index] : '',
                }, [['Proband', null]]];
                statList = [...statList, target];
            }
        });
    }
    return statList;
}

export function prepareStatList(statList) {
    const tmpResult = [];
    const groupsData = {};

    if (statList && Array.isArray(statList)) {
        statList.filter(statItem => STAT_TYPES.includes(statItem[0])).forEach((statItem) => {
            const groupName = statItem[1].vgroup;
            if (groupName) {
                if (!Object.keys(groupsData).includes(groupName)) {
                    tmpResult.push({
                        title: groupName,
                        type: STAT_GROUP,
                    });
                    groupsData[groupName] = [];
                }
                groupsData[groupName].push(prepareStatDataByType(statItem));
            } else {
                const data = prepareStatDataByType(statItem);
                tmpResult.push({ ...data, title: data.name });
            }
        });
    }

    return tmpResult.map((item) => {
        if (item.type === STAT_GROUP) {
            return ({
                ...item,
                data: groupsData[item.title],
            });
        }
        return item;
    });
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
            if (zones[currentZone].selectedValues.length !== 0) {
                params.append('zone', JSON.stringify([currentZone, zones[currentZone].selectedValues]));
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
            const tableData = item.rows.map(row => [{
                data: row[1],
                title: row[3],
            },
            ...getValuesForRow(row[2]),
            ]);
            result[item.name] = {
                title: item.title,
                data: tableData,
                ...item.colhead ? { colhead: item.colhead } : {},
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
        return stat.data.some(item => item[1]);
    } else if (stat.type === STAT_TYPE_INT || stat.type === STAT_TYPE_FLOAT) {
        return Boolean(stat.data[0] || stat.data[1]);
    } else if (stat.type === STAT_TYPE_ZYGOSITY) {
        return stat.data.variants.some(item => item[1]);
    } else if (stat.type === STAT_TYPE_TRANSCRIPT_MULTISET
               || stat.type === STAT_TYPE_TRANSCRIPT_STATUS) {
        return stat.data.some(item => item[2]);
    }
    return false;
}

export function checkStatByQuery(stat, query = '') {
    if (includes(stat.name, query)) {
        return true;
    } else if (stat.type === STAT_TYPE_ENUM || stat.type === STAT_TYPE_STATUS) {
        return stat.data.some(item => includes(item[0], query));
    } else if (stat.type === STAT_TYPE_ZYGOSITY) {
        return stat.data.family.some(item => includes(item, query))
            || stat.data.variants.some(item => includes(item[0], query));
    }
    return false;
}

export function getProblemGroup(currentConditions) {
    const zygosity = currentConditions.find(condition => condition[0] === STAT_TYPE_ZYGOSITY);
    return zygosity ? zygosity[2] : null;
}

export function generateJsonFromInputData(data) {
    const result = [];
    data.forEach((input) => {
        const element = {};
        const dataArray = input.text.split(',');

        for (let i = 0; i < dataArray.length; i += 1) {
            const elementArray = dataArray[i].trim()
                .split(/[\s:]+/);
            const rangeArray = elementArray[1].split(/[-]+/);
            element.chromosome = elementArray[0].replace('chr', '');

            const start = Number.isNaN(Number(rangeArray[0])) ?
                rangeArray[0] : Number(rangeArray[0]);
            let end;
            if (rangeArray.length === 1) {
                end = start;
            } else if (Number.isNaN(Number(rangeArray[1]))) {
                [, end] = rangeArray;
            } else {
                end = Number(rangeArray[1]);
            }
            element.start = start;
            element.end = end;
            const alternative = elementArray[2];
            if (alternative) {
                if (alternative.indexOf('>') !== -1) {
                    [, element.alternative] = alternative.split('>');
                } else {
                    element.alternative = alternative;
                }
            }
            result.push(element);
        }
    });
    if (result.length) {
        return JSON.stringify(result);
    }
    return null;
}
