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
            context.commit('setPreset', null);
            context.commit('clearSelectedVariant');
            context.commit('changePresetSaved', true);
            context.commit('removeAllCurrentConditions');
        })
        .catch((error) => {
            context.commit('resetListDependencies');
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
        context.commit('clearSelectedVariant');
        context.commit('changePresetSaved', true);
    }).catch((error) => {
        console.log(error);
    });
}

export function getListByConditions(context, zoneChanged) {
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
        context.commit('clearSelectedVariant');
        if (!zoneChanged) {
            const { selectedPreset, currentConditions } = context.state;
            context.commit('changePresetSaved', !selectedPreset && !currentConditions.length);
        }
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
            context.commit('clearSelectedVariant');
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
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('clearTagFilterValue');
            context.commit('setAllTags', allTags);
            context.commit('setSelectedTags', selectedTags);
            context.commit('changeNote', data['rec-tags'][NOTE_TAG] || '');
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            context.commit('changeNote', '');
            console.log(error);
        });
}

function saveNoteStatus(context, response, timeout) {
    context.commit('setSaveNoteStatus', response);
    setTimeout(() => {
        context.commit('setSaveNoteStatus', null);
    }, timeout);
}

export function saveNote(context) {
    const tagsObject = {
        _note: context.state.note.trim(),
    };
    context.state.selectedTags.forEach((item) => {
        tagsObject[item] = true;
    });
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', context.state.selectedVariant);
    params.append('tags', JSON.stringify(tagsObject));

    commonHttp.post('/tags', params)
        .then((response) => {
            saveNoteStatus(context, response.status, 3000);
        })
        .catch((error) => {
            saveNoteStatus(context, error, 10000);
            console.log(error);
        });
}

export function addNewTag(context, newTagTitle) {
    const NOTE_TAG = '_note';
    const tagsObject = {
        [newTagTitle.trim()]: true,
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
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item] && item !== NOTE_TAG);
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('setAllTags', allTags);
            context.commit('setSelectedTags', selectedTags);
            context.commit('clearTagFilterValue');
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
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
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('setAllTags', allTags);
            context.commit('setSelectedTags', selectedTags);
            context.commit('changeNote', data['rec-tags'][NOTE_TAG] || '');
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            context.commit('changeNote', '');
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
            response.data.forEach(zone => getZoneData(context, zone));
            context.commit('resetZones');
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
        context.commit('setRulesData', []);
        context.commit('setRulesParams', '');
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
        }
        const statList = response.data['stat-list'];
        context.commit('setStats', utils.prepareStatList(statList));
        context.commit('removeAllCurrentConditions');
        context.dispatch('getFilterDetails');
        context.dispatch('getListByFilter');
        context.commit('setPreset', null);
        context.commit('changePresetSaved', true);
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
        const ctx = utils.getProblemGroup(context.state.currentConditions);
        if (ctx) {
            params.append('ctx', JSON.stringify(ctx));
        }
    }
    commonHttp.post('/stat', params).then((response) => {
        const filterList = response.data['filter-list'];
        if (filterList && Array.isArray(filterList)) {
            const data = filterList.map(item => item[0]);
            context.commit('setPresets', [null, ...data]);
            context.commit('setPreset', filterName);
            context.commit('changePresetSaved', true);
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
        context.commit('setAllCurrentConditions', []);
        console.log(error);
    });
}

export function getStatList(context, { conditions = null, filter = null }) {
    const params = utils.prepareParams({
        ws: context.state.workspace,
        conditions,
        filter,
    });
    if (conditions && conditions.length) {
        const ctx = utils.getProblemGroup(conditions);
        if (ctx) {
            params.append('ctx', JSON.stringify(ctx));
        }
    }
    commonHttp.post('/stat', params).then((response) => {
        const statList = response.data['stat-list'];
        context.commit('setStats', utils.prepareStatList(statList));
    }).catch((error) => {
        console.log(error);
    });
}

export function getZygosityByFamily(context, { name, family }) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('unit', name);
    params.append('ctx', JSON.stringify({ problem_group: family }));
    if (context.state.currentConditions.length) {
        params.append('conditions', JSON.stringify(context.state.currentConditions));
    }
    commonHttp.post('/statunit', params).then((response) => {
        context.commit('setZygosityVariants', response.data);
    }).catch((error) => {
        console.log(error);
    });
}
