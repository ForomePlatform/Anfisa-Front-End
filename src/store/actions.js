import axios from 'axios';
import * as utils from '../common/utils';
import { ANNOTATION_SERVICE } from '../common/constants';

const httpParams = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
};
let anfisaJsonParams = new URLSearchParams();
const commonHttp = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: httpParams.headers,
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
            context.commit('setTranscripts', data.transcripts);
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
    if (context.state.compiled) {
        params.append('compiled', JSON.stringify(context.state.compiled));
    }
    return commonHttp.post('/list', params).then((response) => {
        const { data } = response;
        context.commit('setRecords', data.records);
        context.commit('setTotal', data.total);
        context.commit('setFiltered', data.filtered);
        context.commit('setTranscripts', data.transcripts);
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
    if (context.state.compiled) {
        params.append('compiled', JSON.stringify(context.state.compiled));
    }
    return Promise.all([
        context.dispatch('getStatList', { conditions: context.state.currentConditions }),
        commonHttp.post('/list', params).then((response) => {
            const { data } = response;
            context.commit('setRecords', data.records);
            context.commit('setTotal', data.total);
            context.commit('setFiltered', data.filtered);
            context.commit('setTranscripts', data.transcripts);
            context.commit('clearSelectedVariant');
            if (!zoneChanged) {
                const { selectedPreset, currentConditions } = context.state;
                context.commit('changePresetSaved', !selectedPreset && !currentConditions.length);
            }
        }),
    ]).catch((error) => {
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
export function setVariantsDetails(context, data) {
    const result = utils.prepareVariantDetails(data);
    context.commit('setVariantDetails', result);
}

export function getVariantDetails(context, variant) {
    const params = new URLSearchParams();
    params.append('ds', context.state.workspace);
    params.append('rec', variant);
    context.commit('setSelectedVariant', variant);
    commonHttp.post('/reccnt', params)
        .then((response) => {
            setVariantsDetails(context, response.data);
        })
        .catch((error) => {
            context.commit('setSelectedVariant', null);
            console.log(error);
        });
}
export function addDetails(context, data, id) {
    const details = utils.prepareVariantDetails(data);
    const result = {
        id,
        details,
    };
    context.commit('addDetailsToListView', result);
}
export function getListViewDetails(context, id) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', id);
    commonHttp.post('/reccnt', params)
        .then((response) => {
            addDetails(context, response.data, id);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getMeta(context) {
    const params = new URLSearchParams();
    params.append('ds', context.state.workspace);
    commonHttp.post('/dsmeta', params)
        .then((response) => {
            context.commit('setMeta', response.data);
        })
        .catch((error) => {
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
            const note = data['rec-tags'][NOTE_TAG] || '';
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('clearTagFilterValue');
            context.commit('setAllTags', allTags);
            context.commit('setSelectedTags', selectedTags);
            context.commit('setNote', note);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            context.commit('setNote', '');
            console.log(error);
        });
}

export function getListViewTags(context, variant) {
    const params = new URLSearchParams();

    const tags = {
        id: variant,
        tags: [],
    };
    const notes = {
        id: variant,
        note: '',
    };

    params.append('ws', context.state.workspace);
    params.append('rec', variant);
    commonHttp.post('/tags', params)
        .then((response) => {
            const { data } = response;
            const NOTE_TAG = '_note';
            tags.tags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item] && item !== NOTE_TAG);
            notes.note = data['rec-tags'][NOTE_TAG] || '';
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('clearTagFilterValue');
            context.commit('setAllTags', allTags);
            context.commit('addNote', notes);
            context.commit('addTags', tags);
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
                    selectedValues: [],
                    defaultValue: value,
                    values: data.variants,
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
        });
}

export function addNewTag(context, newTagTitle) {
    const NOTE_TAG = '_note';
    const id = context.state.selectedVariant;
    const tags = {
        id,
        tags: [],
    };
    const tagsObject = {
        [newTagTitle.trim()]: true,
        _note: context.state.note,
    };
    context.state.selectedTags.forEach((item) => {
        tagsObject[item] = true;
    });
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('rec', id);
    params.append('tags', JSON.stringify(tagsObject));
    commonHttp.post('/tags', params)
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item] && item !== NOTE_TAG);
            tags.tags = selectedTags;
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('setAllTags', allTags);
            context.commit('setSelectedTags', selectedTags);
            context.commit('addTags', tags);
            context.commit('clearTagFilterValue');
            getZoneList(context);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            context.commit('addTags', tags);
            console.log(error);
        });
}

export function toggleVariantTag(context, tag) {
    const NOTE_TAG = '_note';
    const id = context.state.selectedVariant;
    const tags = {
        id,
        tags: [],
    };
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
    params.append('rec', id);
    params.append('tags', JSON.stringify(tagsObject));
    commonHttp.post('/tags', params)
        .then((response) => {
            const { data } = response;
            const selectedTags = Object.keys(data['rec-tags'])
                .filter(item => data['rec-tags'][item] && item !== NOTE_TAG);
            tags.tags = selectedTags;
            const notes = {
                id,
                note: data['rec-tags'][NOTE_TAG] || '',
            };
            const allTags = [...data['check-tags'], ...data['op-tags']].filter(item => item !== NOTE_TAG);
            context.commit('setAllTags', allTags);
            context.commit('setSelectedTags', selectedTags);
            context.commit('addTags', tags);
            context.commit('setNote', data['rec-tags'][NOTE_TAG] || '');
            context.commit('addNote', notes);
        })
        .catch((error) => {
            context.commit('setAllTags', []);
            context.commit('setSelectedTags', []);
            context.commit('addTags', tags);
            context.commit('setNote', '');
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
        if (context.state.compiled) {
            params.append('compiled', JSON.stringify(context.state.compiled));
        }
        commonHttp.post('/stat', params).then((response) => {
            const { data } = response;
            const info = data['filter-list'].find(item => item[0] === filter);
            resolve({
                name: filter,
                isCommon: info[1],
                date: info[3],
                conditions: data.conditions,
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export function getFilters(context, ws) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('ws', ws || context.state.workspace);
        if (context.state.compiled) {
            params.append('compiled', JSON.stringify(context.state.compiled));
        }
        commonHttp.post('/stat', params)
            .then((response) => {
                const filterList = response.data['filter-list'];
                if (filterList && Array.isArray(filterList)) {
                    const data = filterList.map(item => item[0]);
                    context.commit('setPresets', [null, ...data]);
                }
                const statList = utils.getStatListWithOperativeStat(response.data);
                context.commit('setStats', utils.prepareStatList(statList));
                context.commit('setCompiled', response.data.compiled);
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
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
    if (context.state.compiled) {
        params.append('compiled', JSON.stringify(context.state.compiled));
    }
    commonHttp.post('/stat', params).then((response) => {
        const filterList = response.data['filter-list'];
        if (filterList && Array.isArray(filterList)) {
            const data = filterList.map(item => item[0]);
            context.commit('setPresets', [null, ...data]);
        }
        const statList = utils.getStatListWithOperativeStat(response.data);
        context.commit('setCompiled', response.data.compiled);
        context.commit('setStats', utils.prepareStatList(statList));
        context.commit('removeAllCurrentConditions');
        context.commit('setTranscripts', response.data.transcripts);
        context.commit('setPreset', null);
        context.commit('changePresetSaved', true);
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
        const ctx = utils.getProblemGroup(context.state.currentConditions);
        if (ctx) {
            params.append('ctx', JSON.stringify(ctx));
        }
    }
    if (context.state.compiled) {
        params.append('compiled', JSON.stringify(context.state.compiled));
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
    if (context.state.compiled) {
        params.append('compiled', JSON.stringify(context.state.compiled));
    }
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
    if (context.state.compiled) {
        params.append('compiled', JSON.stringify(context.state.compiled));
    }
    return commonHttp.post('/stat', params).then((response) => {
        context.commit('setCompiled', response.data.compiled);
        const statList = utils.getStatListWithOperativeStat(response.data);
        context.commit('setStats', utils.prepareStatList(statList));
    }).catch((error) => {
        console.log(error);
    });
}

export function getZygosityByFamily(context, { name, family }) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('units', JSON.stringify([name]));
    params.append('ctx', JSON.stringify({ problem_group: family }));
    if (context.state.currentConditions.length) {
        params.append('conditions', JSON.stringify(context.state.currentConditions));
    }
    commonHttp.post('/statunits', params).then((response) => {
        context.commit('setZygosityVariants', response.data);
    }).catch((error) => {
        console.log(error);
    });
}

function showError(context, message) {
    context.commit('setAnnotationSearchShowError', true);
    context.commit('setAnnotationSearchErrorMessage', message);
    context.commit('setShowFinished', false);
    console.log(message);
}

export function getAnfisaJson(context, formatUrl, formatHeader) {
    const loginParams = new URLSearchParams();
    loginParams.append('login', `${process.env.VUE_APP_ANNOTATION_SERVICE_LOGIN}`);
    loginParams.append('password', `${process.env.VUE_APP_ANNOTATION_SERVICE_PASSWORD}`);
    axios.post('/annotationservice/logon/login', loginParams, httpParams).then((response) => {
        const { session } = response.data.data;
        anfisaJsonParams.append('session', session);
        axios.post(formatUrl, anfisaJsonParams, formatHeader).then((resp) => {
            context.commit('setSelectedVariant', 0);
            const dataReq = resp.data.data[0].result[0];
            if (!dataReq) {
                showError(context, 'Nothing found');
                return;
            }
            const records = [];
            resp.data.data.forEach((item) => {
                if (item.result.length) {
                    const index = resp.data.data.indexOf(item);
                    const name = `[${item.result[0][0].rows[0][2][0][0]}] chr${item.result[0][0].rows[1][2][0][0]}`;
                    const record = [index, name, 'grey', false];
                    records.push(record);
                }
            });
            context.commit('setRecords', records);
            context.commit('setWorkspace', ANNOTATION_SERVICE);
            context.commit('setTotal', records.length);
            context.commit('setFiltered', records.length);
            context.commit('setAnnotationsSearchResult', resp.data.data);
            context.commit('setShowFinished', true);
            const data = resp.data.data[0].result[0];
            setVariantsDetails(context, data);
        }).catch((error) => {
            let message;
            if (error.response.data.error) {
                message = `Server error: ${error.response.data.error.code.replace('_', ' ')}`;
            } else {
                message = 'Server error: unknown error';
            }
            showError(context, message);
        });
    }).catch((error) => {
        showError(context, `${error.message} - ${error.request.responseURL}`);
    });
}

export function formatAnfisa(context, data) {
    const formatUrl = '/annotationservice/FormatAnfisa/get';
    const formatHeader = httpParams;
    anfisaJsonParams = new URLSearchParams();
    anfisaJsonParams.append('data', data);
    getAnfisaJson(context, formatUrl, formatHeader);
}

export function formatVcf(context, data) {
    const formatUrl = '/annotationservice/FormatVcf/get';
    const formatHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    anfisaJsonParams = new FormData();
    anfisaJsonParams.append('data', data);
    getAnfisaJson(context, formatUrl, formatHeader);
}

export function setNote(context, note) {
    const notes = {
        id: context.state.selectedVariant,
        note,
    };
    context.commit('setNote', note);
    context.commit('addNote', notes);
}
