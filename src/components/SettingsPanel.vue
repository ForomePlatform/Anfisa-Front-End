<template>
    <div :class="[panelCollapsed ? 'settings-panel__collapsed' : '', 'settings-panel']">
        <div
          class="settings-panel_collapse-icon"
          v-on:click="togglePanel"
        >
            <img :src="panelCollapsedIcon" />
        </div>
        <div v-if="!panelCollapsed">
        <img class="mb-4" alt="Foreme logo" src="../assets/foromeLogo.svg" />
        <div class="settings-panel_block">
            <SettingsHeader global title="PROJECT" :onClick="openWorkspacesModal"/>
            <div class="settings-panel_text">{{ workspace }}</div>
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
        <b-modal ref="workspaceModal" centered title="Select Workspace" @ok="selectWorkspace">
            <b-form-select
              v-model="selectedWorkspace"
              :options="workspacesList"
              class="mb-3"
              :select-size="8"
            />
        </b-modal>
        <b-modal
          ref="exportFileModal"
          centered title="Export"
          @ok="exportFile"
          :ok-disabled="!exportFileUrl"
        >
            <p v-if="exportFileLoading">Wait please...</p>
            <p v-else>Are you sure you want to download file?</p>
        </b-modal>
        <FilterModal ref="filterModal"/>
    </div>
</template>

<script>
import DropdownButton from './DropdownButton.vue';
import CustomButton from './CustomButton.vue';
import User from './User.vue';
import SettingsHeader from './SettingsHeader.vue';
import FilterModal from './filterPanel/FilterModal.vue';

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
        workspace() {
            return this.$store.state.workspace;
        },
        tags() {
            return this.$store.state.tags;
        },
        panelCollapsedIcon() {
            return this.panelCollapsed ? expandIcon : collapseIcon;
        },
        workspacesList() {
            return this.$store.state.workspacesList;
        },
        exportFileUrl() {
            return this.$store.state.exportFileUrl;
        },
        exportFileLoading() {
            return this.$store.state.exportFileLoading;
        },
        zones() {
            return this.$store.state.zones;
        },
        presets() {
            return this.$store.state.presets;
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
            this.$refs.workspaceModal.show();
        },
        openExportFileModal() {
            this.$store.dispatch('getExportFile');
            this.$refs.exportFileModal.show();
        },
        changeZoneValue(zone, value) {
            this.$store.dispatch('getListByZone', { zone, value });
        },
        changePreset(preset) {
            this.$store.dispatch('getListByPreset', preset);
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
