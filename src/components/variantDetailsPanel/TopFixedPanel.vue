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
        <div class="annotation-table-wrapper">
            <TopFixedPanelTags />
            <input
                class="variant-details__search"
                v-model="variantDetailsFilterValue"
                placeholder="Search in Variant Details"
                title="Input at least 3 symbols"
            />
            <span class="variant-details__label">{{ searchLabel }}</span>
        </div>
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
        resultOfSearch: Number,
    },
    components: {
        TopFixedPanelTags,
    },
    computed: {
        variantDetailsFilterValue: {
            get() {
                return this.$store.state.variantDetailsFilterValue;
            },
            set(value) {
                this.$store.commit('setVariantDetailsFilterValue', value);
            },
        },
        searchLabel() {
            const query = this.$store.state.variantDetailsFilterValue.trim();
            let label = '';
            if (!query) {
                label = '';
            } else if (query.length < 3) {
                label = 'Input at least 3 symbols';
            } else {
                const matches = `match${this.resultOfSearch === 1 ? '' : 'es'}`;
                label = `Found ${this.resultOfSearch} ${matches}`;
            }
            return label;
        },
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
        height: 104px;
        overflow-y: auto;
        background-color: #fff;
        margin: 0 10px 0 10px;
        padding: 10px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        box-sizing: border-box;
        z-index: 3;
    }
    .annotation-table-wrapper {
        margin-left: 10px;
        padding-left: 10px;
        border-left: dotted 1px #DCDCDC;
        line-height: 18px;
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
    .variant-details {
        &__search {
            flex: 1;
            border: none;
            font-size: 12px;
            line-height: 16px;
            margin-left: 4px;
            width: 150px;
            font-size: 12px;
            letter-spacing: 0px;
            &:focus {
                border: none;
                outline: none;
            }
            &::-webkit-input-placeholder {color: #babfc3; font-size: 12px;}
            &::-moz-placeholder          {color: #babfc3; font-size: 12px;}
            &:-moz-placeholder           {color: #babfc3; font-size: 12px;}
            &:-ms-input-placeholder      {color: #babfc3; font-size: 12px;}
        }

        &__label {
            font-size: 12px;
            letter-spacing: 0px;
            color: #586978;
        }
    }
</style>
