import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as mutations from './mutations';


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
        allTags: [],
        selectedTags: [],
        workspacesList: [],
        notes: '',
        exportFileUrl: null,
        exportFileLoading: false,
        zones: {},
        presets: [],
        selectedPreset: null,
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
    },
});
