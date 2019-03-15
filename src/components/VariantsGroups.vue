<template>
    <div>
        <div v-for="(group, index) in groups" v-bind:key="group+index">
            <div v-b-toggle="'variant'+index" :class="[className, 'variants-groups_header']">
                <div class="variants-groups_header_title">
                    {{group}}
                </div>
                <div class="variants-groups_header_icon"/>
            </div>
            <b-collapse :id="'variant'+index">
                <VariantsList
                  :data="data[group]"
                  :selectedItem="selectedItem"
                  :selectItem="selectItem"
                />
            </b-collapse>
        </div>
    </div>
</template>

<script>
import VariantsList from './VariantsList.vue';

export default {
    props: {
        data: Object,
        collapseAllStatus: Boolean,
        className: String,
        selectedItem: Number,
        selectItem: Function,
    },
    computed: {
        groups() {
            return Object.keys(this.data);
        },
    },
    components: {
        VariantsList,
    },
    mounted() {
        this.$store.commit('setListMounting', false);
    },
};
</script>

<style lang="scss" scoped>
    .variants-groups_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        letter-spacing: 0px;
        color: #12aaeb;
        font-weight: 800;
        margin: 0 16px;
        border-bottom: 1px solid #12aaeb;
        height: 26px;
        cursor: pointer;
        &:hover {
            color: #ffffff;
            border-bottom-color: #ffffff;
            .variants-groups_header_icon {
                border-bottom-color: #ffffff;
            }
        }
        &_icon {
            width: 0;
            height: 0;
            border-top: 0;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #12aaeb;
            border-left: 4px solid transparent;
        }
        &[aria-expanded=true] {
            border-bottom: 0;
            .variants-groups_header_icon {
                border-top: 4px solid #597a96;
                border-bottom: 0;
            }
            .variants-groups_header_title {
                border-bottom: none;
                color: #597a96;
            }
        }
    }

</style>
