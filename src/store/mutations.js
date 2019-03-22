import Vue from 'vue';

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
