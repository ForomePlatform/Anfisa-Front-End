import Vue from 'vue';
import { STAT_GROUP, STAT_TYPE_ENUM, STAT_TYPE_ZYGOSITY } from '../common/constants';
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

export function setListViewDetails(state, details) {
    state.listViewDetails = details;
}

export function addDetailsToListView(state, details) {
    state.listViewDetails.push(details);
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

export function setNote(state, note) {
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
    const [zone, values] = aZone;
    state.zones[zone].selectedValues = values;
}

export function resetZones(state) {
    Object.keys(state.zones).forEach((zone) => { state.zones[zone].selectedValues = []; });
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
    const index = state.currentConditions
        .findIndex(item => item[1] === condition[1] && item[0] === condition[0]);
    if (index === -1) {
        state.currentConditions.push(condition);
    } else {
        const conditionFixed = JSON.parse(JSON.stringify(condition));
        if (condition[0] === STAT_TYPE_ENUM) {
            [,, conditionFixed[2]] = state.currentConditions[index];
        }
        if (condition[0] === STAT_TYPE_ZYGOSITY) {
            [,,, conditionFixed[3]] = state.currentConditions[index];
        }
        Vue.set(state.currentConditions, index, conditionFixed);
    }
}

export function removeCurrentCondition(state, { name, type = null }) {
    const index = state.currentConditions
        .findIndex(item => item[1] === name && (!type || item[0] === type));
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
    const units = payload.units[0];
    if (units[1].vgroup) {
        const targetGroup = list.find(item => item.title === units[1].vgroup
            && item.type === STAT_GROUP);
        list = targetGroup.data;
    }
    const targetItemIndex = list.findIndex(item => item.name === units[1].name);
    Vue.set(list, targetItemIndex, utils.prepareStatDataByType(units));
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

export function setFilterSearchQuery(state, value) {
    state.filterSearchQuery = value;
}

export function setCompiled(state, value = null) {
    state.compiled = value;
}

export function setTranscripts(state, transcripts) {
    state.transcripts = transcripts;
}

export function setMeta(state, meta) {
    state.meta = meta;
}

export function addNote(state, note) {
    const { notes } = state;
    const foundNote = notes.findIndex(addedNote => addedNote.id === note.id);
    if (foundNote !== -1) {
        notes[foundNote] = note;
    } else {
        notes.push(note);
    }
}

export function addTags(state, tags) {
    const { selectedGenTags } = state;
    const foundTags = selectedGenTags.findIndex(addedTags => addedTags.id === tags.id);
    if (foundTags !== -1) {
        selectedGenTags[foundTags] = tags;
    } else {
        selectedGenTags.push(tags);
    }
}
