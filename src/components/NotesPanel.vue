<template>
    <div class="notes-panel">
        <b-form-textarea
            @input="changeNotes"
            :value="notes"
            :rows="10"
            no-resize
            placeholder="Notes..."
            class="notes-panel_textarea">
        </b-form-textarea>
        <b-button class="mt-4" @click="saveNotes">Submit</b-button>
    </div>
</template>

<script>
export default {
    computed: {
        notes() {
            return this.$store.state.notes;
        },
    },
    methods: {
        changeNotes(value) {
            this.$store.commit('changeNotes', value);
        },
        saveNotes() {
            this.$store.dispatch('saveNotes');
        },
    },
};
</script>

<style lang="scss" scoped>
    .notes-panel {
        position: fixed;
        z-index: 10;
        display: flex;
        flex-direction: column;
        background-color: #deefde;
        top: 0;
        right: 0;
        bottom: 0;
        width: 300px;
        padding: 20px;
        &_textarea {
            resize: none;
            flex: 1 1 auto;
        }
    }
</style>
