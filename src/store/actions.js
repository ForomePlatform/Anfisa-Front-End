import axios from 'axios';

const commonHttp = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export function getList(context, ws) {
    const url = ws ? `/list?ws=${ws}` : '/list';
    commonHttp.get(url)
        .then((response) => {
            const { data } = response;
            context.commit('setRecords', data.records);
            context.commit('setWorkspace', data.workspace);
            context.commit('setTotal', data.total);
            context.commit('setFiltered', data.filtered);
            context.dispatch('getZoneList', ws);
            context.dispatch('getPresets', ws);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getListByTag(context, tag) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('tag', tag);
    commonHttp.post('/tag_select', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            context.commit('setRecords', data.records);
            context.commit('setTotal', data.total);
            context.commit('setFiltered', data.filtered);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function toggleListView(context) {
    context.commit('toggleListView');
}

export function getVariantDetails(context, variant) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', variant);
    context.commit('setSelectedVariant', variant);
    commonHttp.post('/reccnt', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const result = {};

            const getValuesForRow = row => (Array.isArray(row) ? row.map(val => val[0]) : []);

            data.forEach((item) => {
                if (item.type === 'table') {
                    const tableData = item.rows.map(row => [row[1], ...getValuesForRow(row[2])]);
                    result[item.name] = {
                        title: item.title,
                        data: tableData,
                    };
                }
            });
            context.commit('setVariantDetails', result);
        })
        .catch((error) => {
            context.commit('setSelectedVariant', null);
            console.log(error);
        });
}

export function getVariantTags(context, variant) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', variant);
    commonHttp.post('/tags', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item]);
            context.commit('setAllTags', data['check-tags']);
            context.commit('setSelectedTags', selectedTags);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            console.log(error);
        });
}

export function saveNotes(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', context.state.selectedVariant);
    params.append('_notes', context.state.notes);
    commonHttp.post('/tags', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(() => {
            console.log('notes are saved');
        })
        .catch((error) => {
            console.log(error);
        });
}

export function toggleVariantTag(context, tag) {
    const tagsObject = {};
    context.state.selectedTags.forEach((item) => {
        tagsObject[item] = true;
    });
    if (tagsObject[tag]) {
        tagsObject[tag] = false;
    } else {
        tagsObject[tag] = true;
    }
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', context.state.selectedVariant);
    params.append('tags', JSON.stringify(tagsObject));
    commonHttp.post('/tags', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item]);
            context.commit('setAllTags', data['check-tags']);
            context.commit('setSelectedTags', selectedTags);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            console.log(error);
        });
}

export function getWorkspaces(context) {
    commonHttp.get('/dirinfo')
        .then((response) => {
            const { data } = response;
            context.commit('setWorkspacesList', data.workspaces);
        });
}

export function getExportFile(context) {
    context.commit('setExportFileUrl', null);
    context.commit('setExportFileLoading', true);
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    commonHttp.post('/export', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            context.commit('setExportFileLoading', false);
            context.commit('setExportFileUrl', `${process.env.VUE_APP_API_URL}/${data.fname}`);
        })
        .catch((error) => {
            console.log(error);
            context.commit('setExportFileLoading', false);
        });
}

function getZoneData(context, aZone) {
    const [zone, value] = aZone;
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('zone', zone);
    commonHttp.post('/zone_list', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const { data } = response;
            const oZone = {
                [zone]: {
                    selectedValue: null,
                    defaultValue: value,
                    values: [null, ...data.variants],
                },
            };
            context.commit('setZone', oZone);
        });
}

export function getZoneList(context, ws) {
    const params = new URLSearchParams();
    params.append('ws', ws || context.state.workspace);
    commonHttp.post('/zone_list', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const zones = response.data.filter(zone => zone[0].charAt(0) !== '_');
            zones.forEach(zone => getZoneData(context, zone));
        });
}

export function getPresets(context, ws) {
    const params = new URLSearchParams();
    params.append('ws', ws || context.state.workspace);
    commonHttp.post('/stat', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            const filterList = response.data['filter-list'];
            if (filterList && Array.isArray(filterList)) {
                const data = filterList.map(item => item[0]);
                context.commit('setPresets', [null, ...data]);
                context.commit('setPreset', null);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function getListByFilters(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);

    const { zones } = context.state;
    Object.keys(zones).forEach((currentZone) => {
        if (zones[currentZone].selectedValue !== null) {
            params.append('zone', JSON.stringify([currentZone, [zones[currentZone].selectedValue]]));
        }
    });
    params.append('filter', context.state.selectedPreset);

    return commonHttp.post('/list', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        const { data } = response;
        context.commit('setRecords', data.records);
        context.commit('setTotal', data.total);
        context.commit('setFiltered', data.filtered);
    });
}

export function getListByPreset(context, preset) {
    context.commit('setPreset', preset);
    getListByFilters(context).catch((error) => {
        console.log(error);
        context.commit('setPreset', null);
    });
}

export function getListByZone(context, { zone, value }) {
    context.commit('changeZoneValue', [zone, value]);
    getListByFilters(context).catch((error) => {
        console.log(error);
        context.commit('changeZoneValue', [zone, null]);
    });
}
