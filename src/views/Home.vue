<template>
  <div class="home">
    <SettingsPanel />
    <VariantsPanel />
    <VariantDetails />
    <CustomPopup
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
    </CustomPopup>
    <NewTagPopup/>
  </div>
</template>

<script>
import SettingsPanel from '@/components/SettingsPanel.vue';
import VariantsPanel from '@/components/VariantsPanel.vue';
import VariantDetails from '@/components/VariantDetails.vue';
import CustomPopup from '@/components/CustomPopup.vue';
import NewTagPopup from '@/components/NewTagPopup.vue';
import { DISCLAIMER } from '@/common/constants';
import { expired } from '@/common/utils';

export default {
    name: 'home',
    components: {
        SettingsPanel,
        VariantsPanel,
        VariantDetails,
        CustomPopup,
        NewTagPopup,
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
    created() {
        const { ws } = this.$route.query;
        if (ws) {
            this.$store.commit('setWorkspace', ws);
        }
        this.$store.dispatch('getList');
        this.$store.dispatch('getZoneList');
        this.$store.dispatch('getFilters');
        this.$store.dispatch('getRulesData');
        this.$store.dispatch('getWorkspaces');
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
