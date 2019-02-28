<template>
    <div class="second-header">
        <div class="second-header_separator">
            <div class="second-header_variants">
                SEE {{variants || 0}} VARIANTS
            </div>
        </div>
        <div class="second-header_filters">
            <b>{{filters || 0}}</b> Active Filters
        </div>
        <div class="second-header_clear">
            <img alt="close" src="../../assets/filterCloseIcon.svg"/>
            CLEAR ALL
        </div>
        <div class="second-header_save">
            <img alt="save" src="../../assets/filterSaveIcon.svg"/>
            SAVE
        </div>
        <div class="second-header_load">
            <img alt="load" src="../../assets/filterLoadIcon.svg"/>
            LOAD
        </div>
    </div>
</template>

<script>
export default {
    props: ['variants'],
};

        // color: #1a3e6c;
        // background-color: #15263e;
</script>

<style lang="scss" scoped>
    .second-header {
        height: 62px;
        background-color: #1a3e6c;
        display: flex;
        align-items: center;
        padding: 0 22px;
        &_variants {
            width: 166px;
            height: 33px;
            line-height: 33px;
            border-radius: 17px;
            background-color: #2bb3ed;
            font-size: 11px;
            letter-spacing: 0px;
            color: #0a1c34;
            font-weight: 800;
            text-align: center;
            &:hover {
                cursor: pointer;
                background-color: #48c3f7;
            }
        }
        &_filters {
            width: 150px;
            font-size: 14px;
            letter-spacing: 0px;
            color: #ffffff;
        }
        &_clear, &_save, &_load {
            width: 134px;
            height: 33px;
            border-radius: 17px;
            background-color: #396398;
            font-size: 11px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }
        &_clear {
            padding: 0 23px 0 13px;
            &:hover {
                background-color: #48c3f7;
            }
            margin-right: 280px;
        }
        &_save, &_load {
            width: 103px;
            padding: 0 25px 0 20px;
            background-color: #2bb3ed;
            &:hover {
                background-color: #48c3f7;
            }
            margin-left: 22px;
        }
        &_separator {
            height: 33px;
            width: 332px;
            background-image: linear-gradient(to bottom, #5b7596 25%, rgba(39, 63, 89, 0) 0%);
            background-position: right;
            background-size: 2px 6px;
            background-repeat: repeat-y;
            margin-right: 37px;
        }
    }
</style>
