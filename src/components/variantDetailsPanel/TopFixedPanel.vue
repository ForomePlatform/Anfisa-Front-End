<template>
    <div class="top-fixed-panel" ref="fixedPanel">
        <table class="annotation-table">
            <tr v-for="(item, index) in data" v-bind:key="index">
                <th :title="item[0].title ? item[0].title : ''">
                    {{item[0].data ? item[0].data : item[0]}}
                </th>
                <td v-html="item[1]"/>
            </tr>
        </table>
        <TopFixedPanelTags />
    </div>
</template>

<script>
import TopFixedPanelTags from './TopFixedPanelTags.vue';

const sidesMargin = 20;
export default {
    methods: {
        adjustWidth() {
            const { fixedPanel } = this.$refs;
            const parentWidth = fixedPanel.parentElement.clientWidth;
            fixedPanel.style.width = `${parentWidth - sidesMargin}px`;
        },
    },
    props: {
        data: Array,
    },
    components: {
        TopFixedPanelTags,
    },
    mounted() {
        this.adjustWidth();
        window.addEventListener('resize', this.adjustWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.adjustWidth);
    },
};
</script>

<style scoped lang="scss">
    .top-fixed-panel {
        position: fixed;
        display: flex;
        flex-direction: row;
        height: 84px;
        overflow-y: auto;
        background-color: #fff;
        margin: 0 10px 0 10px;
        padding: 10px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        box-sizing: border-box;
        z-index: 3;
    }
    .annotation-table {
        flex: 0 0 220px;
        font-size: 12px;
        overflow: hidden;
        th {
            white-space: nowrap;
        }
        td {
            overflow: hidden;
        }
    }
</style>
