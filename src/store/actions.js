import axios from 'axios';

const commonHttp = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export function getList(context) {
    commonHttp.get('/list')
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

export function getTags(context) {
    commonHttp.post('/tag_select')
        .then((response) => {
            context.commit('setTags', response.data['tag-list']);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getFilters(context) {
    commonHttp.post('/stat')
        .then((response) => {
            const filterList = response.data['filter-list'];
            if (filterList && Array.isArray(filterList)) {
                const data = filterList.map(item => item[0]);
                context.commit('setPreFilters', data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getListByPrefilter(context, prefilter) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('filter', prefilter);
    context.commit('setPreFilter', prefilter);
    commonHttp.post('/list', params, {
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

export function getListByTag(context, tag) {
    const params = new URLSearchParams();
    params.append('ws', context.state.workspace);
    params.append('tag', tag);
    context.commit('setTag', tag);
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
