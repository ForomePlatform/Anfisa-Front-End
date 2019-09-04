<template>
    <div class="load-view">
        <div class="load-view_header">
            <div class="load-view_header_sort">
                Sort By:
                <div
                     class="load-view_header_sort_btn"
                     :style="{'background-color': sortButtonStyle('date')}"
                     @click="onClickDateSort"
                >
                    Data saved
                </div>
                <div
                     class="load-view_header_sort_btn"
                     :style="{'background-color': sortButtonStyle('name')}"
                     @click="onClickNameSort"
                >
                    A-Z
                </div>
            </div>
            <div class="load-view_header_cancel" @click="onCancel">
                CANCEL
            </div>
        </div>
        <div class="load-view_cards">
            <LoadViewCard
                v-for="(filterData, index) in filterDetails"
                v-bind:key="index + '-' + filterData.name"
                :name="filterData.name"
                :isCommon="filterData.isCommon"
                :conditions="filterData.conditions"
                :date="filterData.date"
                :onLoad="() => onLoad(filterData.name, filterData.conditions)"
                :onRemove="() => onRemove(filterData.name)"
            />
        </div>
    </div>
</template>

<script>
import LoadViewCard from './LoadViewCard.vue';

export default {
    data() {
        return {
            sortField: 'date'
        }
    },
    props: ['onLoad', 'onRemove', 'onCancel'],
    components: {
        LoadViewCard,
    },
    computed: {
        filterDetails() {
            const field = this.sortField;
            let initialFilterDetails = this.$store.state.filterDetails.slice();
            return initialFilterDetails.sort(function(filter1, filter2) {
                if (filter1.isCommon !== filter2.isCommon) {
                    return filter1.isCommon ? 1 : -1;
                }
                if (filter1[field] === null) {
                    return 1;
                }
                if (filter2[field] === null) {
                    return -1;
                }
                const result = (filter1[field] > filter2[field] ? 1 : -1);
                return (field === 'date' ? -result : result);
            });
        },
    },
    mounted() {
        this.$store.dispatch('getFilterDetails');
    },
    methods: {
        onClickDateSort() {
            this.sortField = 'date';
        },
        onClickNameSort() {
            this.sortField = 'name';
        },
        sortButtonStyle(field) {
            return (this.sortField === field ? '#2bb3ed' : '');  
        },
    },
};
</script>

<style lang="scss" scoped>
    .load-view {
        &_header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #dfe4ea;
            &_sort {
                display: flex;
                align-items: center;
                font-size: 12px;
                letter-spacing: 0px;
                color: #627490;
                &_btn {
                    margin-left: 10px;
                    padding: 0 6px;
                    width: fit-content;
                    height: 21px;
                    line-height: 21px;
                    border-radius: 2px;
                    background-color: #d6dade;
                    font-size: 11px;
                    letter-spacing: 0px;
                    color: #ffffff;
                    &:hover {
                        background-color: #a5b7c6;
                        cursor: pointer;
                    }
                }
            }
            &_cancel {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 11px;
                letter-spacing: 0px;
                color: #0a1c34;
                font-weight: 800;
                text-align: center;
                width: 77px;
                height: 25px;
                border-radius: 13px;
                background-color: #e7e7e7;
                &:hover {
                    background-color: #ededed;
                    cursor: pointer;
                }
            }
        }
        &_cards {
            margin: 0 12px;
        }
    }
</style>

