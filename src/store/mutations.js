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

export function setTags(state, tags) {
    state.tags = tags;
}

export function setPreFilters(state, filters) {
    state.presets = filters;
}

export function setTag(state, tag) {
    state.selectedTag = tag;
}

export function setPreFilter(state, filter) {
    state.selectedPreset = filter;
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

export function changeNotes(state, notes) {
    state.notes = notes;
}

export function setExportFileLoading(state, value) {
    state.exportFileLoading = value;
}
