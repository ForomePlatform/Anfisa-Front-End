<template>
    <div :class="[settingsPanelCollapsed ? 'settings-panel__collapsed' : '', 'settings-panel']">
        <div
          class="settings-panel_collapse-icon"
          v-on:click="togglePanel"
        >
            <img :src="panelCollapsedIcon" />
        </div>
        <div v-if="!settingsPanelCollapsed">
        <img class="mb-4" alt="Foreme logo" src="../assets/foromeLogo.svg" />
        <div class="settings-panel_block">
            <SettingsHeader global title="PROJECT" :onClick="openWorkspacesModal"/>
            <div class="settings-panel_text">{{ workspace }}</div>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="FILTERS"/>
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
            <CustomButton class="mt-3" title="Get Annotations" :onClick="openGetAnnotationsModal"/>
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
              :select-size="8">

            </b-form-select>
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
        <b-modal
                ref="getAnnotationsModal"
                centered title="Get annotations"
                @ok="getAnnotationsData"
                :ok-disabled="false"
        >
            <div v-if="!isProcessingEnd">
                <div v-if="!processingStart">
                    <p>To get annotations for a specific mutation, please insert its description in Forome format in the form below.</p>
                    <p style="font-size: 0.7em;">
                        For example: <br>
                        chr15:89876828-89876836 TTGCTGCTGC&gt;TTGCTGC <br>
                        chrX:153009197 G&gt;C <br>
                    </p>

                    <div>
                        <p class="title-input">Anfisa json:</p>
                        <input
                            class="tags-panel_input"
                            v-model="annotations.anfisaJsonData"
                            placeholder="Anfisa json data"
                        />
                    </div>
                </div>

                <div v-else>
                    <p>
                        Query processing has been started. It may take a few minutes.
                        Please don't close this tab in your browser.
                    </p>
                </div>
            </div>

            <div v-else>
                <p>Query processing finished. Click "OK" to display the annotations found.</p>
            </div>

            <div slot="modal-footer" class="w-100">
                <b-button v-if="!isProcessingEnd" :disabled="processingStart" size="sm" class="float-right" variant="primary" @click="getAnnotationsData">Submit query</b-button>
                <b-button v-else size="sm" class="float-right" variant="primary" @click="viewAnnotationsData">OK</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import DropdownButton from './DropdownButton.vue';
import CustomButton from './CustomButton.vue';
import User from './User.vue';
import SettingsHeader from './SettingsHeader.vue';

const collapseIcon = require('../assets/collapseIcon.svg');
const expandIcon = require('../assets/expandIcon.svg');

export default {
    name: 'SettingsPanel',
    data() {
        return {
            processingStart: false,
            selectedWorkspace: '',
            annotations: {
                anfisaJsonData: "",
            },
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
        isProcessingEnd() {
            return this.$store.state.annotations.processingEnd;
        },
        settingsPanelCollapsed() {
            return this.$store.state.panels.settingsPanelCollapsed;
        }
    },
    methods: {
        togglePanel() {
            this.$store.state.panels.settingsPanelCollapsed = !this.$store.state.panels.settingsPanelCollapsed;
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
        openGetAnnotationsModal() {
            this.annotations.anfisaJsonData = "[{\"chromosome\":\"1\",\"start\":6484880,\"end\":6484880,\"alternative\":\"G\"}]";
            this.processingStart = false;
            this.$store.state.annotations.processingEnd = false;

            this.$refs.getAnnotationsModal.show();
        },
        getAnnotationsData() {
            this.processingStart = true;
            this.$store.dispatch('getAnfisaJson', this.annotations.anfisaJsonData);
        },
        viewAnnotationsData() {
            this.$refs.getAnnotationsModal.hide();
            this.toggleVariantsPanel();
        },
        toggleVariantsPanel() {
            this.$store.state.panels.variantsPanelCollapsed = true;
            setTimeout(() => window.dispatchEvent(new Event('resize')));
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
    },
    components: {
        DropdownButton,
        CustomButton,
        User,
        SettingsHeader,
    },
};
</script>

<style  scoped lang="scss">
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
