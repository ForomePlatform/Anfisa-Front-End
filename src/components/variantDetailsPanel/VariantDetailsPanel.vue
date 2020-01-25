<template>
    <div class="variant-details">
        <TopFixedPanel v-if="isSelected" :data="annotation" />
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
            layout: [
                {
                    x: 0, y: 0, w: 6, h: 5, i: 0, name: 'view_gen', expanded: false,
                },
                {
                    x: 0, y: 5, w: 4, h: 5, i: 1, name: 'view_qsamples', expanded: false,
                },
                {
                    x: 4, y: 5, w: 2, h: 5, i: 2, name: 'view_gnomAD', expanded: false,
                },
                {
                    x: 0, y: 10, w: 4, h: 5, i: 3, name: 'view_genetics', expanded: false,
                },
                {
                    x: 4, y: 10, w: 2, h: 5, i: 4, name: 'view_db', expanded: false,
                },
                {
                    x: 0, y: 15, w: 3, h: 5, i: 5, name: 'colocated_v', secondary: true, expanded: false,
                },
                {
                    x: 3, y: 15, w: 3, h: 5, i: 6, name: '_main', secondary: true, expanded: false,
                },
                {
                    x: 0, y: 20, w: 6, h: 5, i: 7, name: 'view_pred', secondary: true, expanded: false,
                },
                {
                    x: 0, y: 25, w: 6, h: 5, i: 8, name: 'transcripts', secondary: true, expanded: false,
                },
                {
                    x: 0, y: 30, w: 6, h: 5, i: 9, name: 'VCF', secondary: true, expanded: false,
                },
                {
                    x: 0, y: 35, w: 6, h: 5, i: 10, name: 'view_cohorts', secondary: true, expanded: false,
                },
            ],
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
    },
    mounted() {
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
            margin-top: 100px;
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
