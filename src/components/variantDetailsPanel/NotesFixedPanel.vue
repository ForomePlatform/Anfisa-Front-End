<template>
    <div class="notes-fixed-panel">
        <b-form-textarea
            @input="changeNotes"
            :value="notes"
            :rows="10"
            no-resize
            placeholder="Notes..."
            class="notes-fixed-panel_textarea">
        </b-form-textarea>
        <b-button class="notes-fixed-panel_btn" @click="saveNotes">SUBMIT</b-button>
    </div>
</template>

<script>
export default {
    computed: {
        notes() {
            return this.$store.state.note;
        },
    },
    methods: {
        changeNotes(value) {
            this.$store.commit('changeNote', value);
        },
        saveNotes() {
            this.$store.dispatch('saveNote');
        },
    },
};
</script>

<style lang="scss" scoped>
    .notes-fixed-panel {
        position: fixed;
        z-index: 10;
        display: flex;
        flex-direction: column;
        background-color: #2bb3ed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 300px;
        padding: 20px;
        &_textarea {
            resize: none;
            flex: 1 1 auto;
            border-radius: 3px 3px 0 0;
            font-size: 16px;
            color: #0a1c34;
        }
        &_btn {
            height: 43px;
            background-color: #0a1c34;
            border-radius: 0 0 3px 3px;
            font-size: 16px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            &:hover {
                background-color: #1a3e6c;
            }
        }
    }
</style>
