<template>
    <div class="notes-fixed-panel">
        <b-form-textarea
            @input="changeNote"
            @keydown.native.stop
            v-model="note"
            :rows="10"
            no-resize
            placeholder="Notes..."
            class="notes-fixed-panel_textarea"
       >
        </b-form-textarea>
        <div :class="['saved-label-block', showSaved ? 'show-saved-anim' : '']">
            <div :class="[saveNoteStatus ? 'saved-label_ok' : 'saved-label_error', 'saved-label']">
                {{ saveNoteStatus ? 'Saved' : 'Something went wrong, ' +
                'saving failed. Please try again later'}}
            </div>
        </div>
        <b-button class="notes-fixed-panel_btn" @click="saveNotes">SUBMIT</b-button>
    </div>
</template>

<script>
export default {
    name: 'NotesFixedPanel',
    data() {
        return {
            note: this.$store.state.note,
        };
    },
    computed: {
        showSaved() {
            return this.$store.state.saveNoteStatus;
        },
        saveNoteStatus() {
            return this.$store.state.saveNoteStatus === 200;
        },
    },
    methods: {
        changeNote() {
            this.$store.dispatch('setNote', this.note);
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
        text-align: center;
        margin: 0 auto;
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

    .saved-label {
        color: #0a1c34;
        font-size: 18px;
        width: 100px;
        margin: 0 auto;
        border-radius: 5px;
        &_ok {
            color: #0a1c34;
            border: 2px solid #1a3e6c;
        }
        &_error {
            background-color: #ff0008;
            width: 220px;
            color: #fff;
        }
    }
    .saved-label-block {
        position: absolute;
        width: 86%;
        bottom: 75px;
        border-left: 1px solid #ced4da;
        opacity: 0;
    }
    .show-saved-anim {
        opacity: 1;
        transition: 1s;
        animation: show 3s 1;
        animation-fill-mode: forwards;
        animation-delay: 1s;
    }
</style>
