<template>
    <div class="notes-fixed-panel">
        <b-form-textarea
            @input="changeNotes"
            :value="notes"
            :rows="10"
            no-resize
            placeholder="Notes..."
            class="notes-fixed-panel_textarea"
       >
        </b-form-textarea>
        <div class="saved-label-block" v-bind:class="{'show-saved-anim' : showSaved}">
            <div class="saved-label">Saved</div>
        </div>
        <b-button class="notes-fixed-panel_btn" @click="saveNotes">SUBMIT</b-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showSaved: false,
        };
    },
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
            this.showSaved = true;
            setTimeout(() => { this.showSaved = false; }, 3000);
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
        color: #fff;
        font-size: 14px;
        background-color: #959595;
        width: 100px;
        margin: 0 auto;
        border-radius: 5px;
    }
    .saved-label-block {
        position: absolute;
        width: 86%;
        bottom: 75px;
        border-left: 1px solid #ced4da;
        opacity: 0;
    }
    .show-saved-anim {
        opacity: 0.6;
        transition: 1s;
        animation: show 3s 1;
        animation-fill-mode: forwards;
        animation-delay: 1s;
    }
</style>
