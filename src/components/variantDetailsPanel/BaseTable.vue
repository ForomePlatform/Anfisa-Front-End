<template>
    <div class="base-table">
        <div
          @click="$emit('expand-table')"
          :aria-expanded="expanded ? 'true' : 'false'"
          :class="['base-table_header', 'js-table_header',
            secondary ? 'base-table_header-secondary' : '',
            expanded ? null : 'collapsed']"
        >
            {{title.toUpperCase()}}
            <div class="base-table_icons">
                <div @click.stop class="base-table_icons_draggable js-table-draggable" />
                <div class="base-table_icons_collapse" />
            </div>
        </div>
        <b-collapse :id="'table_'+id" class="js-table_body" :visible="expanded">
            <div class="base-table_table-wrapper">
                <BaseScrollHorizontal :id="id">
                    <div v-if="content" class="base-table_html">
                        <pre>{{ content }}</pre>
                    </div>
                    <table v-else class="base-table_table">
                        <tr v-if="colhead">
                            <td/>
                            <td v-for="head in colhead" class="colhead" :key="head[0]">
                                {{ head[0] }}
                            </td>
                        </tr>
                        <tr v-for="(row, index) in data" v-bind:key="index">
                            <td
                                v-for="(cell, index) in row"
                                v-html="cell.data ? cell.data : cell"
                                :title="cell.title ? cell.title : false"
                                v-bind:key="index"
                                nowrap
                            />
                        </tr>
                    </table>
                </BaseScrollHorizontal>
            </div>
        </b-collapse>
    </div>
</template>

<script>
import BaseScrollHorizontal from '@/components/common/BaseScrollHorizontal.vue';

export default {
    props: {
        title: String,
        id: String,
        data: Array,
        secondary: Boolean,
        content: String,
        colhead: Array,
        expanded: Boolean,
    },
    components: {
        BaseScrollHorizontal,
    },
};
</script>

<style lang="scss" scoped>
    .base-table {
        border-radius: 5px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        background-color: #ffffff;
        &_header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            border-radius: 5px 5px 0 0;
            font-size: 16px;
            letter-spacing: 0px;
            color: #2bb3ed;
            font-weight: 800;
            line-height: 47px;
            box-shadow: 0px 2px 24px rgba(24,64,104,0.06);
            background-color: #ffffff;
            padding: 0 20px;
            user-select: none;
            &:hover {
                cursor: pointer;
                background-color: #12aaeb;
                box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
                color: #fff;
                .base-table_header_icon {
                    border-bottom-color: #fff;
                }
            }
            &-secondary:hover {
                background-color: #52002957;
                &[aria-expanded=false] {
                    &:hover {
                        background-color: #52002957;
                    }
                }
            }
            &[aria-expanded=false] {
                background-color: #a4b6c5;
                color: #ffffff;
                border-bottom: 0;
                .base-table_icons_draggable {
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                    background-image: url('../../assets/arrowsAlt.svg')
                }
                .base-table_icons_collapse {
                    border-top: 7px solid #ffffff;
                    border-bottom: 0;
                }
                .base-table_header_title {
                    border-bottom: none;
                    color: #ffffff;
                }
                &:hover {
                    cursor: pointer;
                    background-color: #12aaeb;
                    box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
                    color: #fff;
                    .base-table_header_icon {
                        border-bottom-color: #fff;
                    }
                }
            }
        }
        &_icons {
            display: flex;
            justify-content: center;
            align-items: center;
            &_collapse {
                margin-top: 2px;
                width: 0;
                height: 0;
                border-top: 0;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #b8cedd;
                border-left: 5px solid transparent;
            }
            &_draggable {
                width: 16px;
                height: 16px;
                margin-right: 8px;
                background-image: url('../../assets/arrowsAltActive.svg')
            }
        }
        &_html {
            width: fit-content;
            font-family: "Courier New", Courier, monospace;
        }
        &_table {
            width: 100%;
            tr {
                height: 30px;
                border-bottom: 1px solid #e8edf1;
                &:last-child {
                    border-bottom: none;
                }
            }
            td {
                font-size: 14px;
                letter-spacing: 0px;
                color: #586978;
                padding: 0 10px;
                &:nth-child(1) {
                    color: #1a3e6c;
                    font-weight: bold;
                }
            }
            &-wrapper {
                width: 100%;
                position: relative;
            }
        }
    }

    .colhead {
        color: #1a3e6c !important;
        font-weight: bold;
    }

</style>
