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
