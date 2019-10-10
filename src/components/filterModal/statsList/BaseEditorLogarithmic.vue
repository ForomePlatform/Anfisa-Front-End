<template>
    <div class="float-editor" @mouseup="onDragEnd">
        <div class="float-editor_inputs">
            <b-form-input
              type="number"
              v-model.number="selectedMin"
              :step="0.0001"
              :min="round(preselectedMin)"
              :max="selectedMax"
              class="mr-2"
            />
            &mdash;
            <b-form-input
              type="number"
              v-model.number="selectedMax"
              :step="0.0001"
              :min="selectedMin"
              :max="round(preselectedMax)"
              class="ml-2"
            />
        </div>
        <vue-slider
          ref="slider"
          :value="sliderValues"
          :enable-cross="false"
          :marks="scale"
          :min="0"
          :max="marks.length-1"
          :key="key"
          :interval="0.0001"
          @change="changeValues"
          tooltip="none"
          @drag-end="onDragEnd"
          :class="[defaultSlider ? 'float-editor_slider__default' : '', 'float-editor_slider']"
        />
        <div class="float-editor_button" @click="addData">
            {{buttonText}}
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import { LOG_EDITOR_MARKS } from '@/common/constants';

const MIN = 0;
const MAX = 1;

export default {
    props: ['onSubmit', 'preselectedMin', 'preselectedMax', 'buttonText'],
    data() {
        return {
            min: MIN,
            max: MAX,
            selectedMin: this.round(this.preselectedMin),
            selectedMax: this.round(this.preselectedMax),
            key: 0,
        };
    },
    methods: {
        addData() {
            this.onSubmit(this.selectedMin, this.selectedMax);
        },
        changeValues([min, max]) {
            this.selectedMin = this.interpolation(min);
            this.selectedMax = this.interpolation(max);
        },
        closestLeftMark(value) {
            const marks = LOG_EDITOR_MARKS;
            const index = marks.findIndex(item => value < item);
            const lastMark = marks[marks.length - 1];
            return (value >= lastMark ? lastMark : marks[index < 1 ? 0 : index - 1]);
        },
        closestRightMark(value) {
            const marks = LOG_EDITOR_MARKS;
            const mark = marks.find(item => value <= item);
            return mark || marks[0];
        },
        onDragEnd() {
            this.key += 1;
        },
        interpolation(x) {
            if (x <= 0) {
                return this.round(this.preselectedMin);
            }
            if (x >= this.marks.length - 1) {
                return this.round(this.preselectedMax);
            }
            const dot = Math.floor(x);
            let result = (this.marks[dot] * ((dot + 1) - x)) + (this.marks[dot + 1] * (x - dot));
            result = result < this.preselectedMin ? this.preselectedMin : result;
            result = result > this.preselectedMax ? this.preselectedMax : result;
            return this.round(result);
        },
        reverseInterpolation(x) {
            if (x <= this.marks[0]) {
                return 0;
            }
            if (x >= this.marks[this.marks.length-1]) {
                return this.marks.length-1;
            }
            const left = this.closestLeftMark(x);
            const right = this.closestRightMark(x);
            const index = this.marks.findIndex(item => left <= item);
            if (right === left) {
                return index;
            }
            const result = ((index * (right - x)) + ((index + 1) * (x - left))) / (right - left);
            return this.round(result);
        },
        round(value) {
            return Math.round(value * 10000) / 10000;
        },
    },
    computed: {
        marks() {
            return LOG_EDITOR_MARKS;
        },
        sliderValues() {
            const values = [this.selectedMin, this.selectedMax];
            return values.map(item => this.reverseInterpolation(item));
        },
        defaultSlider() {
            return this.min === this.sliderValues[0] && this.max === this.sliderValues[1];
        },
        scale() {
            let scale = {};
            this.marks.forEach((item, index) => {
                scale[String(index)] = String(item);
            });
            return scale;
        },
    },
    components: {
        VueSlider,
    },
    // Update data if min and max values were changed in the store
    // (e.g on change filter or on remove data via StatView)
    watch: {
        preselectedMin(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.selectedMin = this.round(newVal);
            }
        },
        preselectedMax(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.selectedMax = this.round(newVal);
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
                width: 86px;
                height: 33px;
                color: #0a1c34;
                border-radius: 3px;
                background-color: #e7e7e7;
                font-size: 13px;
                letter-spacing: 0px;
            }
        }
        &:hover .float-editor_button {
            background-color: #2bb3ed;
        }
        &_button {
            height: 44px;
            line-height: 44px;
            background-color: #a9a9a9;
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
        &_slider {
            margin: 30px 10px;
            /deep/ .vue-slider{
                &-marks {
                    background-color: #1a3e6c;
                    height: 2px !important;
                    margin-left: -1px;
                }
                &-mark {
                    top: 1px;
                    height: 8px !important;
                    width: 2px !important;
                    box-shadow: none;
                    &-step {
                        border-radius: 0;
                        background-color: #1a3e6c;
                        box-shadow: none;
                    }
                    &-label {
                        margin-top: 2px;
                    }
                }
                &-rail {
                    background-color: #fff;
                }
                &-dot {
                    top: -20px !important;
                    margin-left: -10px !important;
                    background-color: transparent;
                    &-handle {
                        border-radius: 0;
                        background-color: #1a3e6c;
                        width: 18px;
                        height: 16px;
                        border: 0;
                        border-radius: 3px 3px 0 0;
                        &:after {
                            content: '';
                            display: block;
                            position: relative;
                            top: 16px;
                            left: 0;
                            width: 0;
                            height: 0;
                            border-style: solid;
                            border-color: transparent;
                            border-top-color: #1a3e6c;
                            border-width: 9px;
                        }
                        &-focus {
                            box-shadow: none;
                            background-color: #2bb3ed;
                            &:after {
                                border-top-color: #2bb3ed;
                            }
                        }
                    }
                }
                &-process {
                    top: -24px !important;
                    margin-left: -2px;
                    border-radius: 0;
                    height: 24px !important;
                    background-color: #bfe8fa;
                }
            }
            &__default {
                /deep/ .vue-slider {
                    &-marks {
                        background-color: #cbd1d9;
                    }
                    &-mark {
                        &-step {
                            background-color: #cbd1d9;
                        }
                        &-label {
                            color: #afafaf;
                        }
                    }
                    &-dot {
                        &-handle {
                            background-color: #cbd1d9;
                            &:after {
                                border-top-color: #cbd1d9;
                            }
                        }
                    }
                    &-process {
                        background-color: #e7e7e7;
                    }
                }
            }
        }
    }
</style>
