import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as mutations from './mutations';
import { checkStatByQuery, includes } from '../common/utils';
import { STAT_TYPE_ZYGOSITY, STAT_GROUP } from '../common/constants';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        records: [],
        workspace: '',
        total: 0,
        filtered: 0,
        listView: true,
        selectedVariant: null,
        variantDetails: {},
        listViewDetails: [],
        allTags: [],
        selectedTags: [],
        selectedGenTags: [],
        workspacesList: [],
        note: '',
        notes: [],
        saveNoteStatus: null,
        exportFileUrl: null,
        exportFileLoading: false,
        zones: {},
        presets: [],
        selectedPreset: null,
        selectedPresetSaved: true,
        stats: [],
        currentConditions: [],
        rulesData: [],
        rulesParams: '',
        filterDetails: [],
        version: '',
        listMounting: false,
        tagFilterValue: '',
        filterSearchQuery: '',
        annotations: {
            showFinished: false,
            error: {
                show: false,
                message: '',
            },
            annotationsSearchResult: {
                variantsPanelCollapsed: false,
            },
        },
        panels: {},
        compiled: null,
        transcripts: null,
        meta: null,
    },
    actions,
    mutations,
    getters: {
        list: state => state.records.map(item => ({
            id: item[0],
            name: item[1],
            color: item[2],
        })),
        groups: (state) => {
            const regExp = /^\[.+\]/;
            const result = {};
            state.records.forEach((item) => {
                const group = regExp.exec(item[1]);
                if (group) {
                    if (!result[group]) {
                        result[group] = [];
                    }
                    result[group].push({
                        id: item[0],
                        name: item[1],
                        color: item[2],
                    });
                }
            });
            return result;
        },
        annotation: (state) => {
            const general = state.variantDetails.view_gen;
            const generalData = general && general.data;
            if (generalData) {
                return [
                    generalData[0],
                    generalData[1],
                    generalData[3],
                ];
            }
            return [];
        },
        getCurrentConditionsByStatTypes: state => statTypes =>
            state.currentConditions.filter(condition => statTypes.includes(condition[0])),
        getCurrentConditions: (state) => {
            const result = {};
            state.currentConditions.forEach((condition) => {
                if (condition[0] === STAT_TYPE_ZYGOSITY) {
                    const [type, name, family, , variants] = condition;
                    result[name] = {
                        type,
                        family,
                        variants,
                    };
                } else {
                    const [type, name, data, list] = condition;
                    result[name] = {
                        type,
                        data,
                        list,
                    };
                }
            });
            return result;
        },
        getFilteredStats(state) {
            return (searchQuery) => {
                const result = [];
                state.stats.forEach((stat) => {
                    let subResult;
                    if (stat.type === STAT_GROUP) {
                        if (includes(stat.title, searchQuery)) {
                            subResult = stat;
                        } else {
                            const data = stat.data.filter(subStat =>
                                checkStatByQuery(subStat, searchQuery));
                            subResult = { ...stat, data };
                        }
                    } else {
                        subResult = checkStatByQuery(stat, searchQuery) ? stat :
                            { ...stat, type: STAT_GROUP, data: [] };
                    }
                    result.push(subResult);
                });
                return result;
            };
        },
        getVariantDetails(state) {
            return state.variantDetails;
        },
        getListViewDetails(state) {
            return state.listViewDetails;
        },
        getListViewDetailsById: state => id =>
            state.listViewDetails.filter(detail => detail.id === id),
        getMeta(state) {
            return state.meta;
        },
        getWorkspace(state) {
            return state.workspace;
        },
        getNote(state) {
            return state.note;
        },
        getNotes(state) {
            return state.notes;
        },
        getZones(state) {
            return state.zones;
        },
        getNotesById: state => id => state.notes.filter(note => note.id === id),

        getTags(state) {
            return state.selectedGenTags;
        },
        getTagsById: state => id => state.selectedGenTags.filter(tags => tags.id === id),
        getSelectedId(state) {
            return state.selectedVariant;
        },
        getStats(state) {
            return state.stats;
        },
        getSelectedPreset(state) {
            return state.selectedPreset;
        },
        getSelectedPresetSaved(state) {
            return state.selectedPresetSaved;
        },
        getFilteredVariants(state) {
            return state.filtered;
        },
    },
});
