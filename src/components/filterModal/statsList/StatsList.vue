<template>
    <div class="stats-list">
        <div class="stats-list_controls">
            <BaseExpandButton :onClick="toggleFilters.bind(null, 'true')"/>
            <BaseExpandButton collapse :onClick="toggleFilters.bind(null, 'false')" class="ml-3"/>
        </div>
        <BaseNonzeroCheckbox :checked="nonzeroChecked" :onChange="toggleNonzeroCheckbox"/>
        <div v-for="stat in stats" v-bind:key="stat.name">
            <BaseCollapseHeader
              :className="className"
              :name="stat.title || stat.name"
              primary
              :disabled=" stat.type === 'group' && !stat.data.length"
              :filled="Boolean(oCurrentConditions[stat.name])"
            >
                <div v-if="stat.type === 'group'">
                    <BaseCollapseHeader
                      :className="className"
                      v-for="subStat in stat.data"
                      v-bind:key="subStat.name"
                      :name="subStat.title || subStat.name"
                      :filled="Boolean(oCurrentConditions[subStat.name])"
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
        };
    },
    computed: {
        stats() {
            return this.nonzeroChecked ? this.$store.getters.getNonzeroStats
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
    }
</style>
