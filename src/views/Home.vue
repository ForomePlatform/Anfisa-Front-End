<template>
  <div class="home">
    <SettingsPanel />
    <Desktop />
    <BaseModal
      v-if="displayDisclaymer"
      ref="disclaymerModal"
      :title="disclaymer.title"
      :onSubmit="submithandler"
      :onHide="rejectHandler"
      :okTitle="disclaymer.ok"
      :cancelTitle="disclaymer.cancel"
      :noBgClose="true"
    >
        <p class="mt-3 ml-3">
          {{ disclaymer.text }}
        </p>
    </BaseModal>
  </div>
</template>

<script>
import SettingsPanel from '@/components/settingsPanel/SettingsPanel.vue';
import VariantsPanel from '@/components/variantsListPanel/VariantsPanel.vue';
import VariantDetailsPanel from '@/components/variantDetailsPanel/VariantDetailsPanel.vue';
import Desktop from '@/views/Desktop.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import { DISCLAIMER } from '@/common/constants';
import { expired } from '@/common/utils';

export default {
    name: 'home',
    components: {
        SettingsPanel,
        Desktop,
        VariantsPanel,
        VariantDetailsPanel,
        BaseModal,
    },
    methods: {
        openDisclaymerModal() {
            this.$refs.disclaymerModal.openModal();
        },
        rejectHandler(e) {
            e.preventDefault();
            window.location.href = DISCLAIMER.url;
        },
        submithandler() {
            localStorage.setItem('visited', new Date());
        },
    },
    computed: {
        disclaymer() {
            return DISCLAIMER;
        },
        displayDisclaymer() {
            return process.env.VUE_APP_DISCLAIMER_POPUP;
        },
    },
    mounted() {
        if (this.displayDisclaymer) {
            const visited = localStorage.getItem('visited');
            if (!visited || expired(Date.parse(visited))) {
                this.openDisclaymerModal();
            } else {
                localStorage.setItem('visited', new Date());
            }
        }
    },
};
</script>

<style lang="scss">
  .home {
    -webkit-font-smoothing: antialiased;
    display: flex;
    height: 100%;
    min-height: 600px;
    background-color: #f9f4e0;
    font-family: Arial;
  }
</style>
