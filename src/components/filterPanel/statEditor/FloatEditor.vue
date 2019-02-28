<template>
    <div class="float-editor">
        <div class="float-editor_inputs">
            <b-form-input
              type="number"
              v-model="selectedMin"
              step="0.01"
              :min="min"
              :max="selectedMax"
              class="mr-2"
            />
            &mdash;
            <b-form-input
              type="number"
              v-model="selectedMax"
              step="0.01"
              :min="selectedMin"
              :max="max"
              class="ml-2"
            />
        </div>
        <div class="float-editor_button" @click="addData">
            ADD
        </div>
    </div>
</template>

<script>
export default {
    props: ['min', 'max', 'onSubmit', 'preselectedMin', 'preselectedMax'],
    data() {
        return {
            selectedMin: this.preselectedMin,
            selectedMax: this.preselectedMax,
        };
    },
    methods: {
        addData() {
            this.onSubmit(this.selectedMin, this.selectedMax);
        },
    },
    // Update data if min and max values were changed in the store
    // (e.g on change filter or on remove data via StatView)
    watch: {
        preselectedMin(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.selectedMin = newVal;
            }
        },
        preselectedMax(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.selectedMax = newVal;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .float-editor {
        background-color: #fff;
        margin: 0 30px;
        border-radius: 0 0 3px 3px;
        &_inputs {
            display: flex;
            color: #0a1c34;
            align-items: center;
            padding: 10px;
            input {
                width: 69px;
                height: 33px;
                color: #0a1c34;
                border-radius: 3px;
                background-color: #e7e7e7;
                font-size: 13px;
                letter-spacing: 0px;
            }
        }
        &_button {
            height: 44px;
            line-height: 44px;
            background-color: #2bb3ed;
            font-size: 16px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            border-radius: 0 0 4px 4px;
            margin-top: 6px;
            cursor: pointer;
            &:hover {
                background-color: #48c3f7;
            }
        }
    }
</style>
