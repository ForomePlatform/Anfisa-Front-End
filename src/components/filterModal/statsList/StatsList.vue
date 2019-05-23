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
              :disabled=" stat.type === 'group' && !stat.data.length"
              :filled="filledStat(stat)"
            >
                <div v-if="stat.type === 'group'">
                    <BaseCollapseHeader
                      :className="className"
                      v-for="subStat in stat.data"
                      v-bind:key="subStat.name"
                      :name="subStat.title || subStat.name"
                      :filled="filledStat(subStat)"
                    >
                        <StatsListEditor
                          :type="subStat.type"
                          :data="subStat.data"
                          :name="subStat.name"
                          :render="subStat.render"
                        />
                    </BaseCollapseHeader>
                </div>
                <StatsListEditor v-else :type="stat.type" :data="stat.data" :name="stat.name"/>
            </BaseCollapseHeader>
        </div>
    </div>
</template>

<script>
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
            return this.$store.getters.getFilteredStats(this.searchQuery, this.nonzeroChecked);
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
            return Boolean(this.oCurrentConditions[stat.name] ||
                (stat.type === 'group' && stat.data.filter(subStat => this.oCurrentConditions[subStat.name]).length));
        },
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
