<template>
    <div class="zigosity-view">
        <div class="zigosity-view_descr">
            <span class="zigosity-view_descr_text">{{name}} </span>
        </div>
        <div
         v-for="(item, index) in data"
         v-bind:key="item + '-' + index"
         class="zigosity-view_item"
         @click="() => removeItem(name, index)"
        >
            {{item}}
            <div class="zigosity-view_item_cross"/>
        </div>
    </div>
</template>

<script>

export default {
    props: ['name', 'data', 'remove', 'removeItem'],
};
</script>

<style lang="scss" scoped>
    .zigosity-view {
        &_descr{
            margin-bottom: 5px;
            &_text {
                color: #1a3e6c;
                font-weight: bold;
            }
        }
        &_item {
            border-radius: 3px;
            background-color: #e7e7e7;
            height: 33px;
            line-height: 33px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            letter-spacing: 0px;
            color: #0a1c34;
            font-weight: bold;
            margin: 0 10px 10px 0;
            padding: 0 8px 0 12px;
            width: fit-content;
            float: left;
            &:hover {
                background-color: #fae9e9;
                cursor: pointer;
                .enum-view_item_cross {
                    background-image: url('../../../assets/enumRemoveHoverIcon.png');
                }
            }
            &_cross {
                width: 24px;
                height: 24px;
                margin-top: -2px;
                margin-left: 4px;
                background-image: url('../../../assets/enumRemoveIcon.png');
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
</style>
