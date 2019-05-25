<template>
    <div class="stats-list">
        <div class="stats-list_controls">
            <BaseExpandButton :onClick="toggleFilters.bind(null, 'true')"/>
            <BaseExpandButton collapse :onClick="toggleFilters.bind(null, 'false')" class="ml-3"/>
        </div>
        <div class="stats-list_search">
            <b-form-input
              class="stats-list_search-field"
              v-model="searchQuery"
              type="text"
              placeholder="Search"
            />
        </div>
        <BaseNonzeroCheckbox :checked="nonzeroChecked" :onChange="toggleNonzeroCheckbox"/>
        <div v-for="stat in stats" v-bind:key="stat.name">
            <BaseCollapseHeader
              :className="className"
              :name="stat.title || stat.name"
              primary
              :disabled="primaryDisabled(stat)"
              :filled="filledStat(stat)"
            >
                <div v-if="stat.type === 'group'">
                    <BaseCollapseHeader
                      v-for="subStat in stat.data"
                      v-bind:key="subStat.name"
                      :className="className"
                      :name="subStat.title || subStat.name"
                      :disabled="secondaryDisabled(subStat)"
                      :filled="filledStat(subStat)"
                    >
                        <StatsListEditor
                          v-if="filledStat(subStat) || showStat(subStat)"
                          :type="subStat.type"
                          :data="subStat.data"
                          :name="subStat.name"
                          :render="subStat.render"
                        />
                    </BaseCollapseHeader>
                </div>
                <StatsListEditor
                  v-else-if="filledStat(stat) || showStat(stat)"
                  :type="stat.type"
                  :data="stat.data"
                  :name="stat.name"
                />
            </BaseCollapseHeader>
        </div>
    </div>
</template>

<script>
import { checkNonzeroStat } from '@/common/utils';
import { STAT_GROUP } from '@/common/constants';
import BaseCollapseHeader from './BaseCollapseHeader.vue';
import BaseExpandButton from './BaseExpandButton.vue';
import StatsListEditor from './StatsListEditor.vue';
import BaseNonzeroCheckbox from './BaseNonzeroCheckbox.vue';

export default {
    data() {
        return {
            className: 'js-toggle-filters',
            nonzeroChecked: false,
            searchQuery: '',
        };
    },
    computed: {
        stats() {
            return this.searchQuery ? this.$store.getters.getFilteredStats(this.searchQuery)
                : this.$store.state.stats;
        },
        oCurrentConditions() {
            return this.$store.getters.oCurrentConditions;
        },
    },
    components: {
        BaseCollapseHeader,
        BaseExpandButton,
        StatsListEditor,
        BaseNonzeroCheckbox,
    },
    methods: {
        toggleFilters(expand) {
            const elements = document.getElementsByClassName(this.className);
            Array.from(elements).forEach((element) => {
                if (element.getAttribute('aria-expanded') !== expand) {
                    element.click();
                }
            });
        },
        toggleNonzeroCheckbox() {
            this.nonzeroChecked = !this.nonzeroChecked;
        },
        filledStat(stat) {
            return Boolean(this.oCurrentConditions[stat.name] || (stat.type === STAT_GROUP
                && stat.data.filter(subStat => this.oCurrentConditions[subStat.name]).length));
        },
        showStat(stat) {
            return !this.nonzeroChecked || checkNonzeroStat(stat);
        },
        primaryDisabled(stat) {
            return !this.filledStat(stat) && (
                (stat.type === STAT_GROUP && !stat.data.length)
                || (stat.type !== STAT_GROUP && !this.showStat(stat.data[0]))
            );
        },
        secondaryDisabled(stat) {
            return !this.filledStat(stat) && !this.showStat(stat);
        },
        expandPreselectedStats() {
            const isStringTrue = value => value === 'true';
            const getStatName = stat => stat.title || stat.name;
            this.nonzeroChecked = false;
            this.searchQuery = '';
            const elements = document.getElementsByClassName(this.className);
            const expandSet = new Set();
            this.stats.forEach((stat) => {
                if (this.oCurrentConditions[stat.name]) {
                    expandSet.add(getStatName(stat));
                } else if (stat.type === STAT_GROUP) {
                    stat.data.forEach((subStat) => {
                        if (this.oCurrentConditions[subStat.name]) {
                            expandSet.add(getStatName(stat));
                            expandSet.add(getStatName(subStat));
                        }
                    });
                }
            });
            Array.from(elements).forEach((element) => {
                const statName = element.getAttribute('aria-controls');
                const currentExpand = isStringTrue('aria-expanded');
                const expectedExpand = expandSet.has(statName);
                if (currentExpand !== expectedExpand) {
                    element.click();
                }
            });
        },
    },
    mounted() {
        this.expandPreselectedStats();
    },
};
</script>

<style lang="scss" scoped>
    .stats-list {
        height: inherit;
        overflow-y: auto;
        width: 354px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        background-color: #e7e7e7;
        padding-bottom: 20px;
        &_controls {
            margin: 18px 24px 0 24px;
            display: flex;
        }
        &_search {
            margin: 10px 24px;
            &-field {
                height: 33px;
                border-radius: 3px;
                background-color: #e7e7e7;
                font-size: 13px;
                letter-spacing: 0px;
            }
        }
    }
</style>
