<template>
    <div :class="[settingsPanelCollapsed ? 'settings-panel__collapsed' : '', 'settings-panel']">
        <div class="settings-panel_collapse-icon" v-on:click="togglePanel">
            <img :src="panelCollapsedIcon" />
        </div>
        <div v-if="!panelCollapsed">
        <img class="mb-1 settings-panel_logo" alt="Foreme logo" src="../assets/foromeLogo.png" />
        <div class="mb-2 settings-panel_title">
            Anfisa
        </div>
        <div class="mb-3 settings-panel_menu">
            <span>ver {{version.slice(7)}}</span> |
            <span> Help</span> |
            <span> About</span>
        </div>
        <div class="settings-panel_block">
            <p class="settings-panel_demo-status">
                {{demoText}}
            </p>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="PROJECT" :onClick="openWorkspacesModal" type="project"/>
            <div class="settings-panel_text">{{ workspace }}</div>
        </div>
        <div class="settings-panel_block">
            <LayoutHeader />
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="FILTERS" :onClick="openFilterModal" type="filter"/>
            <div class="d-flex justify-content-between mt-3">
                <DropdownButton :text="selectedPreset" :data="presets" :onChange="changePreset"/>
                <!-- <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="../assets/presetsIcon.svg" />
                </div> -->
            </div>
            <div
              v-for="zone in Object.keys(zones)"
              :key="zone"
              class="d-flex justify-content-between mt-3"
            >
                <DropdownButton
                  :text="getZoneText(zones[zone])"
                  :data="zones[zone].values"
                  :onChange="value =>changeZoneValue(zone, value)"
                />
                <!-- <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="../assets/tagsIcon.svg" />
                </div> -->
            </div>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="REPORT" />
            <!-- <CustomButton title="PUBLISH" /> -->
            <CustomButton class="mt-3" title="EXPORT" :onClick="openExportFileModal"/>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="USER" />
            <User />
        </div>
        </div>
        <CustomPopup ref="workspaceModal" title="SELECT WORKSPACE" :onSubmit="selectWorkspace">
            <b-form-select
              v-model="selectedWorkspace"
              :options="workspacesList"
              class="mb-3"
              :select-size="8"
            />
        </CustomPopup>
        <CustomPopup ref="exportFileModal" title="EXPORT" :onSubmit="exportFile"
          :okDisabled="!exportFileUrl">
            <p v-if="exportFileLoading" class="mt-3 ml-3">Wait please...</p>
            <p v-else class="mt-3 ml-3" >Are you sure you want to download file?</p>
        </CustomPopup>
        <FilterModal ref="filterModal"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DropdownButton from './DropdownButton.vue';
import CustomButton from './CustomButton.vue';
import User from './User.vue';
import SettingsHeader from './SettingsHeader.vue';
import FilterModal from './filterPanel/FilterModal.vue';
import LayoutHeader from './LayoutHeader.vue';
import CustomPopup from './CustomPopup.vue';
import { DEMO_NOTIFICATION } from '../common/constants';

const collapseIcon = require('../assets/collapseIcon.svg');
const expandIcon = require('../assets/expandIcon.svg');

export default {
    name: 'SettingsPanel',
    data() {
        return {
            panelCollapsed: false,
            selectedWorkspace: '',
            annotations: {
                anfisaInputData: '',
            },
        };
    },
    mounted() {
        if (this.isAnnotationService) {
            const jsonData = this.getCookie('annotationJsonInputData');

            if (jsonData !== '' && jsonData !== undefined && jsonData !== null) {
                this.annotations.anfisaInputData = jsonData;
                this.getAnnotationsData();
            }

            this.openGetAnnotationsModal();
        }
    },
    computed: {
        ...mapState(['tags', 'workspacesList', 'exportFileUrl', 'exportFileLoading', 'zones', 'presets', 'version']),
        workspace() {
            return this.$store.state.workspace;
        },
        isAnnotationService() {
            return this.$store.state.workspace === 'ANNOTATION SERVICE';
        },
        tags() {
            return this.$store.state.tags;
        },
        panelCollapsedIcon() {
            return this.panelCollapsed ? expandIcon : collapseIcon;
        },
        selectedPreset() {
            return this.$store.state.selectedPreset ? this.$store.state.selectedPreset : 'Presets';
        },
        demoText() {
            return DEMO_NOTIFICATION;
        },
        isProcessingEnd() {
            return this.$store.state.annotations.processingEnd;
        },
        isProcessingStart() {
            return this.$store.state.annotations.processingStart;
        },
        settingsPanelCollapsed() {
            return this.$store.state.panels.settingsPanelCollapsed;
        },
        getErrorsShow() {
            return this.$store.state.annotations.error.show;
        },
        getErrorsMessage() {
            return this.$store.state.annotations.error.message;
        },
    },
    methods: {
        togglePanel() {
            this.panelCollapsed = !this.panelCollapsed;
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        },
        exportFile() {
            window.open(this.exportFileUrl);
        },
        selectWorkspace() {
            this.$store.commit('setWorkspace', this.selectedWorkspace);
            this.$store.dispatch('getList');
            this.$store.dispatch('getZoneList');
            this.$store.dispatch('getFilters');
            this.$store.dispatch('getRulesData');
        },
        openWorkspacesModal() {
            this.$store.dispatch('getWorkspaces');
            this.$refs.workspaceModal.openModal();
        },
        openExportFileModal() {
            this.$store.dispatch('getExportFile');
            this.$refs.exportFileModal.openModal();
        },
        openGetAnnotationsModal() {
            this.$store.state.annotations.error.show = false;
            this.$store.state.annotations.error.message = '';
            this.$store.state.annotations.processingStart = false;
            this.$store.state.annotations.processingEnd = false;

            this.$refs.getAnnotationsModal.show();
        },
        getAnnotationsData() {
            if (!this.$store.state.annotations.isFirstSearch) {
                this.$store.state.annotations.processingStart = true;
            }

            const jsonData = this.generateJsonFromInputData(this.annotations.anfisaInputData);

            if (jsonData === null) {
                return;
            }

            if (this.isValidJsonData(jsonData)) {
                document.cookie = `annotationJsonInputData = ${this.annotations.anfisaInputData}`;
                this.$store.state.annotations.error.show = false;
                this.$store.dispatch('getAnfisaJson', jsonData);
            }
        },
        viewAnnotationsData() {
            this.$refs.getAnnotationsModal.hide();
            this.toggleVariantsPanel();
        },
        toggleVariantsPanel() {
            this.$store.state.panels.variantsPanelCollapsed = true;
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        },
        generateJsonFromInputData(data) {
            const result = [];
            const element = {};
            const dataArray = data.split(',');

            for (let i = 0; i < dataArray.length; i++) {
                const elementArray = dataArray[i].trim().split(/[\s:]+/);
                const rangeArray = elementArray[1].split(/[-]+/);
                element.chromosome = elementArray[0].replace('chr', '');

                const start = Number.isNaN(Number(rangeArray[0])) ?
                    rangeArray[0] : Number(rangeArray[0]);
                let end;
                if (rangeArray.length === 1) {
                    end = start;
                } else if (Number.isNaN(Number(rangeArray[1]))) {
                    end = rangeArray[1];
                } else {
                    end = Number(rangeArray[1]);
                }
                element.start = start;
                element.end = end;
                const alternative = elementArray[2];
                if (alternative) {
                    if (alternative.indexOf('>') !== -1) {
                        element.alternative = alternative.split('>')[1];
                    } else {
                        element.alternative = alternative;
                    }
                }

                result.push(element);
            }

            return JSON.stringify(result);
        },
        isValidJsonData(jsonData) {
            try {
                const jsonObject = JSON.parse(jsonData);

                for (let i = 0; i < jsonObject.length; i += 1) {
                    const obj = jsonObject[i];
                    for (let j = 0; j < obj.length; j += 1) {
                        const key = obj[j];
                        switch (key) {
                        case 'alternative': {
                            if (!this.checkValue(jsonObject[i][key], 'string')) {
                                return false;
                            }

                            break;
                        }
                        case 'end': {
                            if (!this.checkValue(jsonObject[i][key], 'number')) {
                                return false;
                            }

                            break;
                        }
                        default: {
                            break;
                        }
                        }
                    }
                }

                return true;
            } catch (error) {
                this.showErrorGetAnnotations(error.message);
                return false;
            }
        },
        checkValue(value, type) {
            if (typeof (value) !== typeof type) {
                this.showErrorGetAnnotations(`Data entry error: ${value} not ${type}!`);
                return false;
            }

            return true;
        },
        showErrorGetAnnotations(message) {
            this.$store.state.annotations.error.message = message;
            this.$store.state.annotations.error.show = true;
            this.$store.state.annotations.processingStart = false;
            this.$store.state.annotations.processingEnd = false;
            console.log(message);
        },
        changeZoneValue(zone, value) {
            this.$store.commit('changeZoneValue', [zone, value]);
            this.$store.dispatch('getListByConditions');
        },
        changePreset(preset) {
            this.$store.commit('setPreset', preset);
            this.$store.commit('resetZones');
            this.$store.dispatch('getListByFilter');
            this.$store.dispatch('getConditionsByFilter', preset);
        },
        getZoneText(item) {
            return item.selectedValue === null ? item.defaultValue : String(item.selectedValue);
        },
        openFilterModal() {
            this.$store.commit('resetZones');
            this.$refs.filterModal.openModal();
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);

            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        },
    },
    components: {
        DropdownButton,
        CustomButton,
        User,
        SettingsHeader,
        FilterModal,
        LayoutHeader,
        CustomPopup,
    },
};
</script>

<style  scoped lang="scss">
    .error-message {
        color: darkred;
    }
    .title-input {
        margin-bottom: 0;
    }
    .tags-panel_input {
        width: 100%;
        margin-bottom: 5px;
    }
    .settings-panel {
        position: relative;
        flex-shrink: 0;
        width: 208px;
        height: 100%;
        padding: 18px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        background-color: #091b34;
        &_demo-status {
            font-size: 12px;
            color: #b01f28;
            margin-bottom: 0;
        }
        &_text {
            font-size: 14px;
            letter-spacing: 0px;
            color: #597a96;
            font-family: "Arial";
        }
        &_menu {
            font-size: 11px;
            letter-spacing: 0px;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            width: 80%;
            span {
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                    color: #2bb3ed;
                }
            }
        }
        &_title {
            font-size: 12px;
            letter-spacing: 0px;
            color: #fff9e4;
            font-weight: bold;
        }
        &_icon-button {
            flex: 1 0 auto;
            margin-left: 6px;
            height: 33px;
            width: 33px;
            border-radius: 3px;
            background-color: #15263e;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background-color: #2bb3ed;
                cursor: pointer;
            }
        }
        &_block {
            padding: 16px 0;
            background-image: linear-gradient(to right, rgb(39, 63, 89) 25%,rgba(39, 63, 89, 0) 0%);
            background-position: top;
            background-size: 8px 2px;
            background-repeat: repeat-x;
        }
        &_collapse-icon {
            position: absolute;
            right: 0;
            top: 0;
            color: #577693;
            font-size: 16px;
            line-height: 16px;
            font-weight: bold;
            padding: 9px 5px 0 0;
            cursor: pointer;
        }
        &__collapsed {
            width: 34px;
            padding: 0;
        }
    }
</style>
