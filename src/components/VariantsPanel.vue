<template>
    <div :class="[settingsPanelCollapsed ? 'variants-panel__collapsed' : '', 'variants-panel']">
        <div v-if="settingsPanelCollapsed">
            <div
              class="variants-panel_collapse-icon"
              v-on:click="togglePanel"
            >
                <img src="../assets/expandIcon.svg" />
            </div>
        </div>
        <div v-else class="variants-panel_header">
            <CustomToggle :isActive="!listView" :toggle="toggleView" />
            <div class="variants-panel_count">
                {{countCurrent}} / <b>{{countAmount}}</b>
            </div>
            <div v-if="!listView"
              @click="toggleAllGroups"
              v-bind:class="{
                'variants-groups_common-control': true,
                'variants-groups_common-control__active': !collapseAllStatus
              }">
                <div/><div/><div/>
            </div>
            <div
              class="variants-panel_collapse-icon"
              v-on:click="togglePanel"
            >
                <img src="../assets/collapseIcon.svg" />
            </div>
        </div>
        <CustomScroll v-if="!settingsPanelCollapsed" className="variants-panel_list">
            <VariantsList
              v-if="listView"
              :data="list"
              :selectedItem="selectedItem"
              :selectItem="selectItem"
            />
            <VariantsGroups
              v-else :data="groups"
              :selectedItem="selectedItem"
              :selectItem="selectItem"
              :className="className"
            />
        </CustomScroll>
    </div >
</template>

<script>
import CustomToggle from './CustomToggle.vue';
import VariantsList from './VariantsList.vue';
import VariantsGroups from './VariantsGroups.vue';
import CustomScroll from './CustomScroll.vue';

export default {
    name: 'VariantsPanel',
    data() {
        return {
            collapseAllStatus: true,
            className: 'js-toggle-control',
            panelCollapsed: false,
        };
    },
    computed: {
        countCurrent() {
            return this.$store.state.filtered;
        },
        countAmount() {
            return this.$store.state.total;
        },
        list() {
            return this.$store.getters.list;
        },
        groups() {
            return this.$store.getters.groups;
        },
        listView() {
            return this.$store.state.listView;
        },
        selectedItem() {
            return this.$store.state.selectedVariant;
        },
        settingsPanelCollapsed() {
            return this.$store.state.panels.variantsPanelCollapsed;
        }
    },
    methods: {
        selectItem(id) {
            this.$store.dispatch('getVariantDetails', id);
            this.$store.dispatch('getVariantTags', id);
        },
        toggleView() {
            if (this.listView) {
                this.collapseAllStatus = true;
            }
            this.$store.dispatch('toggleListView');
        },
        toggleAllGroups() {
            const elements = document.getElementsByClassName(this.className);
            Array.from(elements).forEach((element) => {
                if ((element.getAttribute('aria-expanded') === 'true') !== this.collapseAllStatus) {
                    element.click();
                }
            });
            this.collapseAllStatus = !this.collapseAllStatus;
        },
        togglePanel() {
            this.$store.state.panels.variantsPanelCollapsed = !this.$store.state.panels.variantsPanelCollapsed;
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        },
    },
    components: {
        CustomToggle,
        VariantsList,
        VariantsGroups,
        CustomScroll,
    },
};
</script>

<style lang="scss" scoped>
    .variants-panel {
        flex-shrink: 0;
        position: relative;
        width: 326px;
        height: 100%;
        padding-bottom: 44px;
        &_header {
            display: flex;
            align-items: center;
            padding: 0 14px;
            background-color: #1a3e6c;
            color: #ffffff;
            height: 44px;
        }
        &_list {
            background-color: #0b2341;
            box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
            padding: 8px 0;
            height: 100%;
            overflow-y: scroll;
        }
        &_count {
            font-size: 13px;
            letter-spacing: 0px;
        }
        &_collapse-icon {
            position: absolute;
            top: 0px;
            right: 0px;
            padding: 8px 5px 0 0;
            cursor: pointer;
        }
        &__collapsed {
            width: 34px;
            background-color: #0b2341;
        }
    }
    .variants-groups_common-control {
        position: absolute;
        top: 10px;
        right: 40px;
        cursor: pointer;
        div {
            width: 0;
            height: 0;
            border-top: 0;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #12aaeb;
            border-left: 4px solid transparent;
            padding-bottom: 2px;
        }
        &__active {
            padding-top: 2px;
            div {
                border-right: 4px solid transparent;
                border-top: 4px solid #597a96;
                border-left: 4px solid transparent;
                border-bottom: 0;
            }
        }
    }
</style>
