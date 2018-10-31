<template>
    <div class="variant-details">
        <CustomTable 
          :title="variantDetails.view_gen.title"
          id="view_gen"
          :data="variantDetails.view_gen.data"
        />
        <b-row no-gutters>
            <b-col cols="8">
                <CustomTable 
                  :title="variantDetails.view_qsamples.title"
                  id="view_qsamples"
                  :data="variantDetails.view_qsamples.data"
                />
                <CustomTable 
                  :title="variantDetails._main.title"
                  id="table_main"
                  :data="variantDetails._main.data"
                />
                <CustomTable 
                  :title="variantDetails.colocated_v.title"
                  id="colocated_v"
                  :data="variantDetails.colocated_v.data"
                />
            </b-col>
            <b-col cols="4">
                <CustomTable 
                  :title="variantDetails.view_gnomAD.title"
                  id="view_gnomAD"
                  :data="variantDetails.view_gnomAD.data"
                />
                <CustomTable 
                  :title="variantDetails.view_db.title"
                  id="view_db"
                  :data="variantDetails.view_db.data"
                />        
                <CustomTable 
                  :title="variantDetails.view_genetics.title"
                  id="view_genetics"
                  :data="variantDetails.view_genetics.data"
                />
            </b-col>
        </b-row>
        <CustomTable 
          :title="variantDetails.transcripts.title"
          id="transcripts"
          :data="variantDetails.transcripts.data"
        />
    </div>
</template>

<script>
import CustomTable from './CustomTable';

export default {
    components: {
        CustomTable,
    },
    computed: {
        variantDetails: function() {
            return this.$store.state.variantDetails
        }
    }
}
</script>

<style lang="scss" scoped>
    .variant-details {
        padding: 20px 10px 0 10px;
        overflow: hidden;
        overflow-y: scroll;
        background-color: #f9f4e0;
    }
</style>
