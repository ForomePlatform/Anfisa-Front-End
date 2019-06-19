<template>
    <div :class="[panelCollapsed ? 'settings-panel__collapsed' : '', 'settings-panel']">
        <div
          class="settings-panel_collapse-icon"
          v-on:click="togglePanel"
        >
            <img :src="panelCollapsedIcon" />
        </div>
        <div v-if="!panelCollapsed">
        <img class="mb-1 settings-panel_logo" alt="Foreme logo" src="@/assets/foromeLogo.png" />
        <div class="mb-2 settings-panel_title">
            Anfisa
        </div>
        <div class="mb-3 settings-panel_menu">
            <span>ver {{version.slice(7)}}</span> |
            <span> Help</span> |
            <span> About</span>
        </div>
        <div v-if="isAnnotationService" class="settings-panel_block">
            <BaseButton
              class="mt-3"
              title="Submit query"
              :onClick="openGetAnnotationsModal"
            />
        </div>
        <div v-if="demoText" class="settings-panel_block">
            <p class="settings-panel_demo-status">
                {{demoText}}
            </p>
        </div>
        <div class="settings-panel_block">
            <BaseHeader title="PROJECT" :onClick="openWorkspacesModal" type="project"/>
            <div class="settings-panel_text">{{ workspace }}</div>
        </div>
        <div class="settings-panel_block">
            <LayoutControl />
        </div>
        <div class="settings-panel_block">
            <BaseHeader title="FILTERS" :onClick="openFilterModal" type="filter"
                :active="!selectedPresetSaved"
            />
            <div class="d-flex justify-content-between mt-3">
                <BaseDropdownButton
                    :text="selectedPreset"
                    :data="presets"
                    :onChange="changePreset"
                />
                <!-- <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="@/assets/presetsIcon.svg" />
                </div> -->
            </div>
            <div
              v-for="zone in Object.keys(zones)"
              :key="zone"
              class="d-flex justify-content-between mt-3"
            >
                <BaseDropdownButton
                  :text="getZoneText(zones[zone])"
                  :data="zones[zone].values"
                  :onChange="value =>changeZoneValue(zone, value)"
                />
                <!-- <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="@/assets/tagsIcon.svg" />
                </div> -->
            </div>
        </div>
        <div class="settings-panel_block">
            <BaseHeader title="REPORT" />
            <!-- <BaseButton title="PUBLISH" /> -->
            <BaseButton class="mt-3" title="EXPORT" :onClick="openExportFileModal"/>
        </div>
        <div class="settings-panel_block">
            <BaseHeader title="USER" />
            <BaseUserControl />
        </div>
        </div>
        <BaseModal ref="workspaceModal" title="SELECT WORKSPACE" :onSubmit="selectWorkspace">
            <div v-on:dblclick="selectWorkspaceByDblClick">
                <b-form-select
                  v-model="selectedWorkspace"
                  :options="workspacesList"
                  class="mb-3"
                  :select-size="8"
                />
            </div>
        </BaseModal>
        <BaseModal ref="exportFileModal"
                   title="EXPORT"
                   :onSubmit="exportFile"
                   :enterKeyFunc="exportFile"
                   :okDisabled="!exportFileUrl">
            <p v-if="exportFileLoading" class="mt-3 ml-3">Wait please...</p>
            <p v-else class="mt-3 ml-3" >Are you sure you want to download file?</p>
        </BaseModal>
        <FilterModal ref="filterModal"/>
        <AnnotationSearchDialog ref="annotationSearchModal"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { DEMO_NOTIFICATION, ANNOTATION_SERVICE } from '@/common/constants';
import AnnotationSearchDialog from '../annotationService/AnnotationSearchDialog.vue';
import BaseDropdownButton from '../common/BaseDropdownButton.vue';
import BaseButton from '../common/BaseButton.vue';
import BaseUserControl from './BaseUserControl.vue';
import BaseHeader from './BaseHeader.vue';
import FilterModal from '../filterModal/FilterModal.vue';
import LayoutControl from './LayoutControl.vue';
import BaseModal from '../common/BaseModal.vue';
import router from '../../router';

const collapseIcon = require('@/assets/collapseIcon.svg');
const expandIcon = require('@/assets/expandIcon.svg');

export default {
    name: 'SettingsPanel',
    data() {
        return {
            panelCollapsed: false,
            selectedWorkspace: '',
        };
    },
    mounted() {
        if (this.isAnnotationService) {
            this.openGetAnnotationsModal();
        }
    },
    computed: {
        ...mapState(['tags', 'workspacesList', 'exportFileUrl', 'exportFileLoading', 'zones', 'presets', 'version']),
        workspace() {
            return this.$store.state.workspace;
        },
        panelCollapsedIcon() {
            return this.panelCollapsed ? expandIcon : collapseIcon;
        },
        selectedPreset() {
            if (this.$store.state.selectedPreset) {
                return this.$store.state.selectedPreset;
            }
            return this.selectedPresetSaved ? 'Presets' : 'New Filter';
        },
        selectedPresetSaved() {
            return this.$store.state.selectedPresetSaved;
        },
        demoText() {
            return process.env.VUE_APP_PANEL_WARNING ? DEMO_NOTIFICATION : null;
        },
        isAnnotationService() {
            return this.$store.state.workspace === ANNOTATION_SERVICE;
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
            router.push({ parh: '/', query: { ws: this.selectedWorkspace } });
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
            this.$refs.annotationSearchModal.show();
        },
        changeZoneValue(zone, value) {
            this.$store.commit('changeZoneValue', [zone, value]);
            this.$store.dispatch('getListByConditions', true);
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
        selectWorkspaceByDblClick(e) {
            if (e.target.nodeName === 'OPTION' && e.target.value) {
                this.selectWorkspace();
                this.$refs.workspaceModal.closeModal();
            }
        },
    },
    components: {
        BaseDropdownButton,
        BaseButton,
        BaseUserControl,
        BaseHeader,
        FilterModal,
        LayoutControl,
        BaseModal,
        AnnotationSearchDialog,
    },
};
</script>

<style  scoped lang="scss">
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
