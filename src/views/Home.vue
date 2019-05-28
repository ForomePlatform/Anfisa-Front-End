<template>
  <div class="home">
    <SettingsPanel />
    <VariantsPanel />
    <VariantDetailsPanel />
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
import BaseModal from '@/components/common/BaseModal.vue';
import { DISCLAIMER } from '@/common/constants';
import { expired } from '@/common/utils';
import { version, backendVersion } from '../../package.json';

export default {
    name: 'home',
    components: {
        SettingsPanel,
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
        updateAppData() {
            this.$store.dispatch('getList');
            this.$store.dispatch('getZoneList');
            this.$store.dispatch('getFilters');
            this.$store.dispatch('getRulesData');
            this.$store.dispatch('getWorkspaces').then(() => {
                console.log(`back v.${this.$store.state.version.slice(7)} | front v.${version} | back-required v.${backendVersion}`);
            });
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
    created() {
        const { ws } = this.$route.query;
        if (ws) {
            this.$store.commit('setWorkspace', ws);
        }
        this.updateAppData();
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
    beforeRouteUpdate(to, from, next) {
        if (to.path === '/' && to.query.ws !== from.query.ws) {
            const nextWs = to.query.ws || null;
            this.$store.commit('setWorkspace', nextWs);
            this.updateAppData();
        }
        next();
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
