<template>
    <div class="annotation-dev">
        <SettingsPanel/>
        <VariantsPanel/>
        <VariantDetails/>
        <footer>
            <cookie-law theme="forome"
                        message="This website uses cookies
                        to ensure you get the best experience on our website.">
            </cookie-law>
        </footer>
    </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law';
import SettingsPanel from '@/components/settingsPanel/SettingsPanel.vue';
import VariantsPanel from '@/components/variantsListPanel/VariantsPanel.vue';
import VariantDetails from '@/components/variantDetailsPanel/VariantDetailsPanel.vue';
import { ANNOTATION_SERVICE } from '../common/constants';

export default {
    name: 'annotation-dev',
    components: {
        SettingsPanel,
        VariantsPanel,
        VariantDetails,
        CookieLaw,
    },
    created() {
        this.$store.commit('setWorkspace', ANNOTATION_SERVICE);
        this.$store.commit('setVariantsPanelCollapsed', true);
    },
    beforeDestroy() {
        this.$store.commit('setWorkspace', '');
    },
};
</script>

<style lang="scss">
    .Cookie--forome {
        background: #091b34;
        color: #fff;
        padding: 1.25em
    }

    .Cookie--forome .Cookie__button {
        background: #2bb3ed;
        padding: .625em 3.125em;
        color: #fff;
        border-radius: 17px;
        border: 0;
    }

    .Cookie--forome .Cookie__button:hover {
        background: #597995
    }
</style>

<style lang="scss">
    .annotation-dev {
        -webkit-font-smoothing: antialiased;
        display: flex;
        height: 100%;
        min-height: 600px;
        background-color: #f9f4e0;
    }
</style>
