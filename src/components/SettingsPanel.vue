<template>
    <div class="settings-panel">
        <img class="mb-4" alt="Foreme logo" src="../assets/foromeLogo.svg" />
        <div class="settings-panel_block">
            <SettingsHeader title="PROJECT"/>
            <div class="settings-panel_text">{{ workspace }}</div>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="FILTERS"/>
            <div class="d-flex justify-content-between">
                <DropdownButton :text="selectedPreset" :data="presets" :onChange="changePreset"/>
                <div class="settings-panel_icon-button">
                    <img alt="presets icon" src="../assets/presetsIcon.svg" />
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <DropdownButton :text="selectedTag" :data="tags" :onChange="changeTag"/>
                <div class="settings-panel_icon-button">
                    <img alt="tags icon" src="../assets/tagsIcon.svg" />
                </div>
            </div>
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="REPORT"/>
            <CustomButton title="PUBLISH" />
            <CustomButton class="mt-3" title="EXPORT" />
        </div>
        <div class="settings-panel_block">
            <SettingsHeader title="USER" hideIcon />
            <User />
        </div>
    </div>
</template>

<script>
import DropdownButton from './DropdownButton.vue';
import CustomButton from './CustomButton.vue';
import User from './User.vue';
import SettingsHeader from './SettingsHeader.vue';

export default {
    name: 'SettingsPanel',
    computed: {
        workspace() {
            return this.$store.state.workspace;
        },
        presets() {
            return this.$store.state.presets;
        },
        tags() {
            return this.$store.state.tags;
        },
        selectedPreset() {
            return this.$store.state.selectedPreset ? this.$store.state.selectedPreset : 'PRESETS';
        },
        selectedTag() {
            return this.$store.state.selectedTag ? this.$store.state.selectedTag : 'TAGS';
        },
    },
    methods: {
        changePreset(preset) {
            this.$store.dispatch('getListByPrefilter', preset);
        },
        changeTag(tag) {
            this.$store.dispatch('getListByTag', tag);
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
    .settings-panel {
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
    }
</style>
