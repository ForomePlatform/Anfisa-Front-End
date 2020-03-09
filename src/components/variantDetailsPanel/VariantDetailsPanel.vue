<template>
    <div class="variant-details">
        <TopFixedPanel
            v-if="isSelected"
            :data="annotation"
            :resultOfSearch="resultOfSearch"
        />
        <BaseFixedButton
          v-if="isSelected"
          :onClick="openNote"
          :class="['fixed-button_form', showNotes ? 'fixed-button_form__active' : '',
          notesCount ? 'fixed-button_form_nonEmpty' : '']"
          title="Add/edit notes"
        >
            <img v-if="showNotes" src="@/assets/crossIcon.svg"/>
            <img v-else src="@/assets/bookIcon.svg"/>
        </BaseFixedButton>
        <NotesFixedPanel v-if="showNotes" />
        <div v-if="isSelected" class="variant-details_tables">
            <grid-layout
                :layout.sync="layout"
                :col-num="6"
                :is-draggable="true"
                :is-resizable="true"
                :vertical-compact="true"
                :use-css-transforms="true"
                :row-height="1"
                @layout-updated="saveLayout"
            >
                <grid-item
                    v-for="(item, index) in layout"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                    :key="item.i"
                    :min-h="5"
                    :min-w="2"
                    dragAllowFrom=".js-table-draggable"
                >
                    <BaseResizeSensor>
                        <BaseTable
                            v-if="variantDetails[item.name]"
                            :title="variantDetails[item.name].title"
                            :id="item.name"
                            :data="variantDetails[item.name].data"
                            :secondary="item.secondary"
                            :content="variantDetails[item.name].content"
                            :colhead="variantDetails[item.name].colhead"
                            :expanded="item.expanded"
                            @expand-table="expandHandler(index)"
                        />
                    </BaseResizeSensor>
                </grid-item>
            </grid-layout>
        </div>
        <NewTagModal/>
    </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '@/eventBus';
import { DEFAULT_TABLES_LAYOUT } from '@/common/constants';
import VueGridLayout from 'vue-grid-layout';
import BaseTable from './BaseTable.vue';
import TopFixedPanel from './TopFixedPanel.vue';
import BaseFixedButton from './BaseFixedButton.vue';
import NotesFixedPanel from './NotesFixedPanel.vue';
import NewTagModal from './NewTagModal.vue';
import BaseResizeSensor from './BaseResizeSensor.vue';

export default {
    data() {
        return {
            showNotes: false,
            layout: JSON.parse(JSON.stringify(DEFAULT_TABLES_LAYOUT)),
            resultOfSearch: 0,
        };
    },
    components: {
        BaseTable,
        TopFixedPanel,
        BaseFixedButton,
        NotesFixedPanel,
        NewTagModal,
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        BaseResizeSensor,
    },
    computed: {
        variantDetails() {
            return this.$store.state.variantDetails;
        },
        variantDetailsFilterValue() {
            return this.$store.state.variantDetailsFilterValue.trim().toLowerCase();
        },
        annotation() {
            return this.$store.getters.annotation;
        },
        isSelected() {
            return this.$store.state.selectedVariant !== null;
        },
        notesCount() {
            return this.$store.state.note.trim();
        },
    },
    methods: {
        openNote() {
            this.showNotes = !this.showNotes;
        },
        isDataFilled(obj) {
            return obj && obj.data && obj.data.length;
        },
        saveLayout() {
            localStorage.setItem('tables-config', JSON.stringify(this.layout));
        },
        expandHandler(index) {
            const item = this.layout[index];
            item.expanded = Vue.set(item, 'expanded', !item.expanded);
            this.saveLayout();
        },
        hasFiltered(table, query) {
            /* if (table.title.includes('VCF')) {
                return 0;
            } */
            console.log(table);
            const result = table.title.toLowerCase().includes(query) ? 1 : 0;
            return result + table.data.filter(item =>
                item[0].data && item[0].data.toLowerCase().includes(query)).length;
        },
    },
    mounted() {
        console.log(this.variantDetails);
        const tablesConfig = localStorage.getItem('tables-config');
        if (tablesConfig) {
            this.layout = JSON.parse(tablesConfig);
        }
        EventBus.$on('EXPAND_TABLES', (state) => {
            const { layout } = this;
            const tablesOrder = layout.slice().sort((a, b) => (a.y >= b.y ? 1 : -1))
                .map(item => item.i);
            for (let index = 0; index < layout.length; index += 1) {
                const delay = state ? tablesOrder.indexOf(layout[index].i) * 50 : 0;
                setTimeout(() => {
                    Vue.set(layout[index], 'expanded', state);
                }, delay);
            }
        });
        EventBus.$on('RESET_TABLES_LAYOUT', () => {
            this.layout = JSON.parse(JSON.stringify(DEFAULT_TABLES_LAYOUT));
        });
    },
    watch: {
        variantDetailsFilterValue(query) {
            if (query.length < 3) {
                return;
            }
            this.resultOfSearch = this.layout.filter(item => item.name !== 'VCF')
                .reduce((previous, item, index) => {
                    const result = this.hasFiltered(this.variantDetails[item.name], query);
                    this.layout[index].expanded = !!result;
                    return previous + result;
                }, 0);
        },
    },
};
</script>

<style lang="scss" scoped>
    .variant-details {
        flex: 1 1 auto;
        overflow: hidden;
        overflow-y: scroll;
        background-color: #f9f4e0;
        &_tables {
            margin-top: 130px;
        }
    }
    .fixed-button {
        &_form {
            top: 180px;
            right: 0;
            background-image: url('../../assets/fixedBtnBg.svg');
            background-position: center -14px;
            &__active {
                opacity: 1;
                right: 299px;
            }
            &_nonEmpty {
                opacity: 1;
            }
        }
    }
    .notes-count {
        padding-left: 5px;
    }
    .igv_comment {
        font-size:12px;
    }
    .vue-grid-item {
        overflow: hidden;
        /deep/ .vue-resizable-handle {
            background-origin: unset;
        }
    }
</style>
