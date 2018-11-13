<template>
    <div>
        <img :src="iconUrl" class="user-info-img" />
    </div>
</template>

<script>
    import {
        VARIANT_ICON_GREEN,
        VARIANT_ICON_GREEN_BROKEN,
        VARIANT_ICON_YELLOW,
        VARIANT_ICON_YELLOW_BROKEN,
        VARIANT_ICON_RED,
        VARIANT_ICON_RED_BROKEN,
        VARIANT_ICON_GREY,
        VARIANT_ICON_GREY_BROKEN,
    } from '../common/constants';

    const ICONS_MAPPER = {
        [VARIANT_ICON_GREEN]: require('@/assets/greenIcon.svg'),
        [VARIANT_ICON_GREEN_BROKEN]: null,
        [VARIANT_ICON_YELLOW]: require('@/assets/yellowIcon.svg'),
        [VARIANT_ICON_YELLOW_BROKEN]: require('@/assets/yellowBrokenIcon.svg'),
        [VARIANT_ICON_RED]: require('@/assets/redIcon.svg'),
        [VARIANT_ICON_RED_BROKEN]: require('@/assets/redBrokenIcon.svg'),
        [VARIANT_ICON_GREY]: require('@/assets/greyIcon.svg'),
        [VARIANT_ICON_GREY_BROKEN]: require('@/assets/greyBrokenIcon.svg'),
    }

    export default {
        name: 'VariantIcon',
        props: {
            color: String,
        },
        computed: {
            iconUrl: function() {
                return ICONS_MAPPER[this.color]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
