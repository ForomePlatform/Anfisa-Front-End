import axios from 'axios';
import * as utils from '../common/utils';

const commonHttp = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export function getList(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    commonHttp.post('/list', params)
        .then((response) => {
            const { data } = response;
            context.commit('setRecords', data.records);
            context.commit('setWorkspace', data.workspace);
            context.commit('setTotal', data.total);
            context.commit('setFiltered', data.filtered);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getListByFilter(context) {
    const params = utils.prepareParams({
        ws: context.state.workspace,
        filter: context.state.selectedPreset,
        zones: context.state.zones,
    });
    context.dispatch('getStatList', { filter: context.state.selectedPreset });
    return commonHttp.post('/list', params).then((response) => {
        const { data } = response;
        context.commit('setRecords', data.records);
        context.commit('setTotal', data.total);
        context.commit('setFiltered', data.filtered);
    }).catch((error) => {
        console.log(error);
    });
}

export function getListByConditions(context) {
    const params = utils.prepareParams({
        ws: context.state.workspace,
        conditions: context.state.currentConditions,
        zones: context.state.zones,
    });
    context.dispatch('getStatList', { conditions: context.state.currentConditions });
    return commonHttp.post('/list', params).then((response) => {
        const { data } = response;
        context.commit('setRecords', data.records);
        context.commit('setTotal', data.total);
        context.commit('setFiltered', data.filtered);
    }).catch((error) => {
        console.log(error);
    });
}

export function getListByTag(context, tag) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('tag', tag);
    commonHttp.post('/tag_select', params)
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

export function getVariantDetails(context, variant) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', variant);
    context.commit('setSelectedVariant', variant);
    commonHttp.post('/reccnt', params)
        .then((response) => {
            const result = utils.prepareVariantDetails(response.data);
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
    commonHttp.post('/tags', params)
        .then((response) => {
            const { data } = response;
            const NOTE_TAG = '_note';
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item] && item !== NOTE_TAG);
            context.commit('setAllTags', data['check-tags']);
            context.commit('setSelectedTags', selectedTags);
            context.commit('changeNote', data['rec-tags'][NOTE_TAG] || '');
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            console.log(error);
        });
}

export function saveNote(context) {
    const tagsObject = {
        _note: context.state.note,
    };
    context.state.selectedTags.forEach((item) => {
        tagsObject[item] = true;
    });
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', context.state.selectedVariant);
    params.append('tags', JSON.stringify(tagsObject));
    commonHttp.post('/tags', params)
        .catch((error) => {
            console.log(error);
        });
}

export function toggleVariantTag(context, tag) {
    const NOTE_TAG = '_note';
    const tagsObject = {};
    if (context.state.note) {
        tagsObject[NOTE_TAG] = context.state.note;
    }
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
    commonHttp.post('/tags', params)
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item] && item !== NOTE_TAG);
            context.commit('setAllTags', data['check-tags']);
            context.commit('setSelectedTags', selectedTags);
            context.commit('changeNote', data['rec-tags'][NOTE_TAG] || '');
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
            context.commit('setVersion', data.version);
        });
}

export function getExportFile(context) {
    context.commit('setExportFileUrl', null);
    context.commit('setExportFileLoading', true);
    const params = utils.prepareParams({
        ws: context.state.workspace,
        conditions: context.state.currentConditions,
        zones: context.state.zones,
    });
    commonHttp.post('/export', params)
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
    commonHttp.post('/zone_list', params)
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
    commonHttp.post('/zone_list', params)
        .then((response) => {
            const zones = response.data.filter(zone => zone[0].charAt(0) !== '_');
            zones.forEach(zone => getZoneData(context, zone));
        });
}

export function getRulesData(context) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    commonHttp.post('/rules_data', params).then((response) => {
        const { data } = response;
        context.commit('setRulesData', data.columns);
        context.commit('setRulesParams', data.params);
    }).catch((error) => {
        console.log(error);
    });
}

export function modifyRules(context, payload) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('it', payload.name);
    params.append('cnt', payload.data);

    commonHttp.post('/rules_modify', params)
        .catch((error) => {
            console.log(error);
        });
}


function getFilterDetail(context, filter) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('ws', context.state.workspace);
        params.append('filter', filter);
        commonHttp.post('/stat', params).then((response) => {
            const { data } = response;
            resolve({
                name: filter,
                date: data.date,
                conditions: data.conditions,
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export function getFilters(context, ws) {
    const params = new URLSearchParams();
    params.append('ws', ws || context.state.workspace);
    commonHttp.post('/stat', params)
        .then((response) => {
            const filterList = response.data['filter-list'];
            if (filterList && Array.isArray(filterList)) {
                const data = filterList.map(item => item[0]);
                context.commit('setPresets', [null, ...data]);
            }
            const statList = response.data['stat-list'];
            context.commit('setStats', utils.prepareStatList(statList));
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getFilterDetails(context) {
    const filters = [...context.state.presets];
    Promise.all(filters.filter(filterName => filterName)
        .map(filterName => getFilterDetail(context, filterName)))
        .then((filterDetails) => { context.commit('setFilterDetails', filterDetails); })
        .catch((error) => { console.log(error); });
}

export function removeFilter(context, filterName) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('instr', `DELETE/${filterName}`);
    commonHttp.post('/stat', params).then((response) => {
        const filterList = response.data['filter-list'];
        if (filterList && Array.isArray(filterList)) {
            const data = filterList.map(item => item[0]);
            context.commit('setPresets', [null, ...data]);
            context.commit('setPreset', null);
        }
        const statList = response.data['stat-list'];
        context.commit('setStats', utils.prepareStatList(statList));
        context.commit('removeAllCurrentConditions');
        context.dispatch('getFilterDetails');
        context.dispatch('getListByFilter');
    }).catch((error) => {
        console.log(error);
    });
}

export function updateFilter(context, filterName) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('instr', `UPDATE/${filterName}`);
    if (context.state.currentConditions.length) {
        params.append('conditions', JSON.stringify(context.state.currentConditions));
    }
    commonHttp.post('/stat', params).then((response) => {
        const filterList = response.data['filter-list'];
        if (filterList && Array.isArray(filterList)) {
            const data = filterList.map(item => item[0]);
            context.commit('setPresets', [null, ...data]);
        }
        context.dispatch('getFilterDetails');
    }).catch((error) => {
        console.log(error);
    });
}

export function getConditionsByFilter(context, filter) {
    const params = utils.prepareParams({
        ws: context.state.workspace,
        filter,
    });
    commonHttp.post('/stat', params).then((response) => {
        const { data } = response;
        context.commit('setAllCurrentConditions', data.conditions || []);
    }).catch((error) => {
        console.log(error);
    });
}

export function getStatList(context, { conditions = null, filter = null }) {
    const params = utils.prepareParams({
        ws: context.state.workspace,
        conditions,
        filter,
    });
    commonHttp.post('/stat', params).then((response) => {
        const statList = response.data['stat-list'];
        context.commit('setStats', utils.prepareStatList(statList));
    }).catch((error) => {
        console.log(error);
        context.commit('changeZoneValue', [zone, null]);
    });
}

function showError(context, message) {
    context.commit('setErrorShow', true);
    context.commit('setErrorMessage', message);
    context.commit('setProcessingEnd', false);
    context.commit('setProcessingStart', false);
    context.commit('setSelectedVariant', null);
    context.commit('initVariantDetails');
    document.cookie = 'annotationJsonInputData = ';
    console.log(message);
}


export function getAnfisaJson(context, anfisaJsonData) {
    let params = new URLSearchParams();
    params.append('login', 'admin');
    params.append('password', 'b82nfGl5sdg');

    axios.post('/annotationservice/logon/login', params, headers).then((response) => {
        const { session } = response.data.data;

        params = new URLSearchParams();
        params.append('session', session);
        params.append('data', anfisaJsonData);

        axios.post('/annotationservice/GetAnfisaJSON', params, headers).then((resp) => {
            params = new URLSearchParams();
            const dataReq = resp.data.data[0].result[0];
            if (!dataReq) {
                showError(context, `Nothing found`);
                return;
            }
            params.append('record', JSON.stringify(dataReq));
            axios.post('/anfisa-anno/app/single_cnt', params, headers).then((res) => {
                if (!context.state.annotations.isFirstSearch) {
                    context.commit('setProcessingEnd', true);
                }

                context.commit('setIsFirstSearch', false);
                context.commit('setSelectedVariant', 1);
                setVariantsDetails(context, res);
            }).catch((error) => {
                showError(context, `${error.message} - ${error.request.responseURL}`);
            });
        }).catch((error) => {
            showError(context, `${error.response.data.error.comment}`);
        });
    }).catch((error) => {
        showError(context, `${error.message} - ${error.request.responseURL}`);
    });
}
