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
    props: ['min', 'max', 'onSubmit'],
    data() {
        return {
            selectedMin: this.min,
            selectedMax: this.max,
        };
    },
    methods: {
        // onMinBlur() {
        //     if (this.selectedMin < this.min) {
        //         this.selectedMin = this.min;
        //     } else if (this.selectedMin > this.selectedMax) {
        //         this.selectedMin = this.selectedMax;
        //     }
        // },
        // onMaxBlur() {
        //     if (this.selectedMax > this.max) {
        //         this.selectedMax = this.max;
        //     } else if (this.selectedMax < this.selectedMin) {
        //         this.selectedMax = this.selectedMin;
        //     }
        // },
        addData() {
            this.onSubmit(this.selectedMin, this.selectedMax);
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
