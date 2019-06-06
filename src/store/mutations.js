import Vue from 'vue';
import { STAT_GROUP } from '../common/constants';
import * as utils from '../common/utils';

/* eslint-disable no-param-reassign */

export function setRecords(state, records) {
    state.records = records;
}

export function setWorkspace(state, workspace) {
    state.workspace = workspace;
}

export function setTotal(state, total) {
    state.total = total || 0;
}

export function setFiltered(state, filtered) {
    state.filtered = filtered || 0;
}

export function toggleListView(state) {
    state.listView = !state.listView;
}

export function setVariantDetails(state, variantDetails) {
    state.variantDetails = variantDetails;
}

export function setSelectedVariant(state, selectedVariant) {
    state.selectedVariant = selectedVariant;
}

export function clearSelectedVariant(state) {
    state.selectedVariant = null;
    state.variantDetails = {};
}

export function setSelectedTags(state, tags) {
    state.selectedTags = tags;
}

export function setAllTags(state, tags) {
    state.allTags = tags;
}

export function setWorkspacesList(state, workspacesList) {
    const list = workspacesList.map(item => ({ value: item.name, text: item.name }));
    state.workspacesList = list;
}

export function setExportFileUrl(state, exportFileUrl) {
    state.exportFileUrl = exportFileUrl;
}

export function changeNote(state, note) {
    state.note = note;
}

export function setSaveNoteStatus(state, saveNoteStatus) {
    state.saveNoteStatus = saveNoteStatus;
}

export function setExportFileLoading(state, value) {
    state.exportFileLoading = value;
}

export function setZone(state, oZone) {
    state.zones = {
        ...state.zones,
        ...oZone,
    };
}

export function changeZoneValue(state, aZone) {
    const [zone, value] = aZone;
    state.zones[zone].selectedValue = value;
}

export function resetZones(state) {
    Object.keys(state.zones).forEach((zone) => { state.zones[zone].selectedValue = null; });
}

export function setPresets(state, filters) {
    state.presets = filters;
}

export function setPreset(state, filter) {
    state.selectedPreset = filter;
}

export function changePresetSaved(state, saved) {
    state.selectedPresetSaved = saved;
}

export function setStats(state, stats) {
    state.stats = stats;
}

export function setAllCurrentConditions(state, conditions) {
    state.currentConditions = conditions;
}

export function setCurrentConditions(state, condition) {
    const index = state.currentConditions.findIndex(item => item[1] === condition[1]);
    if (index === -1) {
        state.currentConditions.push(condition);
    } else {
        Vue.set(state.currentConditions, index, condition);
    }
}

export function removeCurrentCondition(state, name) {
    const index = state.currentConditions.findIndex(item => item[1] === name);
    if (index > -1) {
        state.currentConditions.splice(index, 1);
    }
}

export function removeAllCurrentConditions(state) {
    state.currentConditions = [];
}

export function changeConditionOperator(state, { name, operator }) {
    const index = state.currentConditions.findIndex(item => item[1] === name);
    if (index > -1) {
        state.currentConditions[index][2] = operator;
        Vue.set(state.currentConditions, index, state.currentConditions[index]);
    }
}

export function removeConditionItem(state, { name, itemIndex }) {
    const index = state.currentConditions.findIndex(item => item[1] === name);
    if (index > -1) {
        state.currentConditions[index][3].splice(itemIndex, 1);
        Vue.set(state.currentConditions, index, state.currentConditions[index]);
    }
}

export function removeZygosityItem(state, { name, itemIndex }) {
    const index = state.currentConditions.findIndex(item => item[1] === name);
    if (index > -1) {
        state.currentConditions[index][4].splice(itemIndex, 1);
        Vue.set(state.currentConditions, index, state.currentConditions[index]);
    }
}

export function setRulesData(state, rulesData) {
    state.rulesData = rulesData;
}

export function setRulesParams(state, rulesData) {
    state.rulesParams = rulesData;
}

export function setFilterDetails(state, filterDetails) {
    state.filterDetails = filterDetails;
}

export function setVersion(state, version) {
    state.version = version;
}

export function setListMounting(state, value) {
    state.listMounting = value;
}

export function setTagFilterValue(state, value) {
    state.tagFilterValue = value;
}

export function clearTagFilterValue(state) {
    state.tagFilterValue = '';
}

export function setZygosityVariants(state, payload) {
    let list = state.stats;
    if (payload[1].vgroup) {
        const targetGroup = list.find(item => item.title === payload[1].vgroup
            && item.type === STAT_GROUP);
        list = targetGroup.data;
    }
    const targetItemIndex = list.findIndex(item => item.name === payload[1].name);
    Vue.set(list, targetItemIndex, utils.prepareStatDataByType(payload));
}

export function resetListDependencies(state) {
    state.records = [];
    state.workspace = '';
    state.total = 0;
    state.filtered = 0;
    state.selectedPreset = null;
    state.selectedPresetSaved = true;
    state.selectedVariant = null;
    state.variantDetails = {};
    state.currentConditions = [];
}

export function setAnnotationsSearchResult(state, data) {
    state.annotations.annotationsSearchResult = data;
}

export function setShowFinished(state, value) {
    state.annotations.showFinished = value;
}

export function setAnnotationSearchShowError(state, value) {
    state.annotations.error.show = value;
}

export function setAnnotationSearchErrorMessage(state, value) {
    state.annotations.error.message = value;
}

export function setVariantsPanelCollapsed(state, value) {
    state.panels.variantsPanelCollapsed = value;
}

