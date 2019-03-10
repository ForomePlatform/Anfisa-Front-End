<template>
    <div :class="[panelCollapsed ? 'settings-panel__collapsed' : '', 'settings-panel']">
        <div
          class="settings-panel_collapse-icon"
          v-on:click="togglePanel"
        >
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
            <SettingsHeader global title="PROJECT" :onClick="openWorkspacesModal"/>
            <div class="settings-panel_text">{{ workspace }}</div>
        </div>
        <div class="settings-panel_block">
            <LayoutHeader />
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="FILTERS" :onClick="openFilterModal"/>
            <div class="d-flex justify-content-between mt-3">
                <DropdownButton :text="selectedPreset" :data="presets" :onChange="changePreset"/>
                <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="../assets/presetsIcon.svg" />
                </div>
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
                <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="../assets/tagsIcon.svg" />
                </div>
            </div>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="REPORT"/>
            <CustomButton title="PUBLISH" />
            <CustomButton class="mt-3" title="EXPORT" :onClick="openExportFileModal"/>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="USER" hideIcon />
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
            <p v-if="exportFileLoading">Wait please...</p>
            <p v-else>Are you sure you want to download file?</p>
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

const collapseIcon = require('../assets/collapseIcon.svg');
const expandIcon = require('../assets/expandIcon.svg');

export default {
    name: 'SettingsPanel',
    data() {
        return {
            panelCollapsed: false,
            selectedWorkspace: '',
        };
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
            return this.$store.state.selectedPreset ? this.$store.state.selectedPreset : 'Presets';
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
            this.$store.dispatch('getList', this.selectedWorkspace);
        },
        openWorkspacesModal() {
            this.$store.dispatch('getWorkspaces');
            this.$refs.workspaceModal.openModal();
        },
        openExportFileModal() {
            this.$store.dispatch('getExportFile');
            this.$refs.exportFileModal.openModal();
        },
        changeZoneValue(zone, value) {
            this.$store.dispatch('getListByZone', { zone, value });
        },
        changePreset(preset) {
            this.$store.dispatch('getListByPreset', preset);
            this.$store.dispatch('getConditionsByFilter', preset);
        },
        getZoneText(item) {
            return item.selectedValue === null ? item.defaultValue : String(item.selectedValue);
        },
        openFilterModal() {
            this.$refs.filterModal.openModal();
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
    .settings-panel {
        position: relative;
        flex-shrink: 0;
        width: 208px;
        height: 100%;
        padding: 18px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        background-color: #091b34;
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
