export const types = ['int', 'float', 'enum'];

const prepareStatDataByType = statItem => ({
    name: statItem[1].name,
    title: statItem[1].title,
    type: statItem[0],
    data: statItem[0] === 'enum' ? statItem[2] : statItem.splice(2),
});

export function prepareStatList(statList) {
    const tmpResult = [];
    const groupsData = {};
    let result = [];

    if (statList && Array.isArray(statList)) {
        statList.filter(statItem => types.includes(statItem[0])).forEach((statItem) => {
            const groupName = statItem[1].vgroup;
            if (groupName) {
                if (!Object.keys(groupsData).includes(statItem[1].vgroup)) {
                    tmpResult.push({
                        title: groupName,
                        type: 'group',
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
        if (item.type === 'group') {
            return ({
                ...item,
                data: groupsData[item.title],
            });
        }
        return item;
    });
    return result;
}
