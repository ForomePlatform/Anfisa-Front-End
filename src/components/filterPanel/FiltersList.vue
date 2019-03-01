<template>
    <div class="filters-list">
        <div class="filters-list_controls">
            <ExpandButton :onClick="toggleFilters.bind(null, 'true')"/>
            <ExpandButton collapse :onClick="toggleFilters.bind(null, 'false')" class="ml-3"/>
        </div>
        <div v-for="stat in stats" v-bind:key="stat.name">
            <CollapseHeader :className="className" :name="stat.title || stat.name" primary>
                <div v-if="stat.type === 'group'">
                    <CollapseHeader
                      :className="className"
                      v-for="subStat in stat.data"
                      v-bind:key="subStat.name"
                      :name="subStat.title || subStat.name"
                    >
                        <StatEditor :type="subStat.type" :data="subStat.data" :name="subStat.name"/>
                    </CollapseHeader>
                </div>
                <StatEditor v-else :type="stat.type" :data="stat.data" :name="stat.name"/>
            </CollapseHeader>
        </div>
    </div>
</template>

<script>
import CollapseHeader from './CollapseHeader.vue';
import ExpandButton from './ExpandButton.vue';
import StatEditor from './statEditor/StatEditor.vue';

export default {
    data() {
        return {
            className: 'js-toggle-filters',
        };
    },
    computed: {
        stats() {
            return this.$store.state.stats;
        },
    },
    components: {
        CollapseHeader,
        ExpandButton,
        StatEditor,
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
    },
};
</script>

<style lang="scss" scoped>
    .filters-list {
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
