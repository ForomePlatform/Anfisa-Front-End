<template>
    <div :class="[panelCollapsed ? 'variants-panel__collapsed' : '', 'variants-panel']">
        <div v-if="panelCollapsed">
            <div
              class="variants-panel_collapse-icon"
              v-on:click="togglePanel"
            >
                <img src="@/assets/expandIcon.svg" />
            </div>
        </div>
        <div v-else class="variants-panel_header">
            <BaseGeneVariantToggle :isActive="!listView" :toggle="toggleView" />
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
                <img src="@/assets/collapseIcon.svg" />
            </div>
        </div>
        <BaseScrollVertical v-if="!panelCollapsed" className="variants-panel_list">
            <div v-if="mounting" class="variants-panel_list_status">
                Loading...
            </div>
            <VariantsPanelList
              :class="[mounting ? 'variants-panel_list__hidden' : '']"
              v-if="listView"
              :data="list"
              :selectedItem="selectedItem"
              :selectItem="selectItem"
              root
            />
            <VariantsPanelGroups
              :class="[mounting ? 'variants-panel_list__hidden' : '']"
              v-else :data="groups"
              :selectedItem="selectedItem"
              :selectItem="selectItem"
              :className="className"
            />
        </BaseScrollVertical>
    </div >
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BaseGeneVariantToggle from './BaseGeneVariantToggle.vue';
import VariantsPanelList from './VariantsPanelList.vue';
import VariantsPanelGroups from './VariantsPanelGroups.vue';
import BaseScrollVertical from '../common/BaseScrollVertical.vue';
import { ANNOTATION_SERVICE } from '../../common/constants';

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
        ...mapState({
            countCurrent: 'filtered',
            countAmount: 'total',
            listView: 'listView',
            selectedItem: 'selectedVariant',
            mounting: 'listMounting',
        }),
        ...mapGetters([
            'list',
            'groups',
        ]),
    },
    methods: {
        selectItem(id) {
            if (this.$store.state.workspace === ANNOTATION_SERVICE) {
                const data = this.$store.state.annotations.annotationsSearchResult[id].result[0];
                this.$store.commit('setSelectedVariant', id);
                this.$store.dispatch('setVariantsDetails', data);
            } else {
                this.$store.dispatch('getVariantDetails', id);
                this.$store.dispatch('getVariantTags', id);
            }
        },
        toggleView() {
            this.$store.commit('setListMounting', true);
            setTimeout(() => this.$store.commit('toggleListView'), 0);
            if (this.listView) {
                this.collapseAllStatus = true;
            }
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
            this.panelCollapsed = !this.panelCollapsed;
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        },
    },
    mounted() {
        const keydownHandler = (e) => {
            const { selectedVariant, filtered } = this.$store.state;
            if ((e.keyCode === 38 || e.keyCode === 40) && selectedVariant !== null) {
                e.preventDefault();
                let newIndex = 0;
                const { list } = this.$store.getters;
                const index = list.findIndex(item => item.id === selectedVariant);
                if (index === -1) {
                    newIndex = 0;
                } else if (e.keyCode === 38) {
                    newIndex = index === 0 ? 0 : index - 1;
                } else if (e.keyCode === 40) {
                    newIndex = filtered - 1 === index ? index : index + 1;
                }
                this.selectItem(list[newIndex].id);
            }
        };
        window.addEventListener('keydown', keydownHandler);
    },
    components: {
        BaseGeneVariantToggle,
        VariantsPanelList,
        VariantsPanelGroups,
        BaseScrollVertical,
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
            &_status {
                padding: 8px 18px;
                color: #95acbc;
                font-size: 14px;
            }
            &__hidden{
                display: none;
            }
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
