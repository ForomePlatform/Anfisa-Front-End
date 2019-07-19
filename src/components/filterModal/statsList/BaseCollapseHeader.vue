<template>
    <div :class="[filled ? 'collapse-header__filled' : '','collapse-header']">
        <div
          v-b-toggle="name"
          :hasFiltered="hasFiltered"
          :class="[
            primary ? 'collapse-header_primary' : 'collapse-header_secondary',
            disabled ? 'collapse-header_disabled' : '',
            className
          ]"
        >
            <div :class="[primary ? 'collapse-header_primary_title'
              : 'collapse-header_secondary_title']">
                {{title}}
            </div>
            <div v-if="primary" class="collapse-header_primary_icon"/>
        </div>
        <b-collapse :id="name">
            <slot></slot>
        </b-collapse>
    </div>
</template>

<script>

export default {
    props: {
        name: String,
        primary: Boolean,
        className: String,
        filled: Boolean,
        disabled: Boolean,
        hasFiltered: Boolean,
    },
    computed: {
        title() {
            return this.primary ? this.name.toUpperCase() : this.name;
        },
    },

};
</script>

<style lang="scss" scoped>
    .collapse-header {
        position: relative;
        &__filled:before {
            position: absolute;
            content: '';
            display: block;
            top: 6px;
            left: 6px;
            width: 17px;
            height: 17px;
            background-image: url('../../../assets/selectedConditionIcon.svg');
            background-position: center;
        }
        &_primary {
            white-space: nowrap;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 30px 0 30px;
            border-bottom: 1px solid #1a3e6c;
            height: 30px;
            cursor: pointer;
            overflow: hidden;
            &_title {
                font-size: 12px;
                letter-spacing: 0px;
                color: #1a3e6c;
                font-weight: 800;
            }
            &:hover {
                border-bottom-color: #2bb3ed;
                .collapse-header_primary_icon {
                    border-bottom-color: #2bb3ed;
                }
                .collapse-header_primary_title {
                    color: #2bb3ed;
                }
            }
            &_icon {
                width: 0;
                height: 0;
                border-top: 0;
                border-right: 4px solid transparent;
                border-bottom: 4px solid #1a3e6c;
                border-left: 4px solid transparent;
            }
            &[aria-expanded=true] {
                border-bottom: 0;
                .collapse-header_primary_icon {
                    border-top: 4px solid #2bb3ed;
                    border-bottom: 0;
                }
                .collapse-header_primary_title {
                    border-bottom: none;
                    color: #2bb3ed;
                }
            }
        }
        &_disabled.collapse-header_primary {
            cursor: default;
            border-bottom: 1px solid #a9a9a9;
            .collapse-header_primary_title {
                color: #a9a9a9;
            }
            .collapse-header_primary_icon {
                visibility: hidden;
            }
            &:hover {
                border-bottom-color: #a9a9a9;
                .collapse-header_primary_title {
                    color: #a9a9a9;
                }
            }
            &[aria-expanded=true] {
                border-bottom: 1px solid #a9a9a9;
                .collapse-header_primary_title {
                    color: #a9a9a9;
                }
            }
        }
        &_secondary {
            white-space: nowrap;
            height: 35px;
            line-height: 35px;
            font-size: 12px;
            letter-spacing: 0px;
            color: #1a3e6c;
            font-weight: bold;
            cursor: pointer;
            margin: 0 30px;
            padding: 0 10px;
            overflow: hidden;
            &:hover {
                background-color: #fff;
            }
            &[aria-expanded=true] {
                background-color: #fff;
                border-radius: 3px 3px 0 0;
            }
        }
        &_disabled.collapse-header_secondary {
            cursor: default;
            border-bottom: 1px solid inherit;
            background-color: inherit;
            .collapse-header_secondary_title {
                color: #a9a9a9;
            }
            &:hover {
                background-color: inherit;
            }
            &[aria-expanded=true] {
                border-bottom: none;
            }
        }
    }
</style>
