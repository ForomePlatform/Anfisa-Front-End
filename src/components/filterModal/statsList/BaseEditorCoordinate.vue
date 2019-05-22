<template>
    <div class="int-editor">
        <div class="int-editor_center">
            <b-form-input
              class="int-editor_center_input"
              :value="center"
              type="number"
              placeholder="Center coordinate"
              @change="centerHandler"
              :min="min"
              :max="max"
            />
            <div class="int-editor_center_descr">
                Range between {{min}} to {{max}}
            </div>
            <vue-slider
              v-model ="sliderRadius"
              :data="marks"
              :marks="true"
              @change="sliderRadiusHandler"
              tooltip="none"
              :class="[sliderRadius === null ? 'int-editor_slider__default' : '',
                'int-editor_slider']"
              :lazy="true"
            />
            <b-form-input
              class="int-editor_center_input"
              type="number"
              :value="radius"
              step="1"
              @change="radiusHandler"
              placeholder="Coordinates range from center"
            />
        </div>
        <div class="int-editor_inputs">
            <b-form-input
              type="number"
              :value="selectedMin"
              step="1"
              :min="min"
              :max="selectedMax"
              class="mr-2"
              @change="minHandler"
              placeholder="Min bounds"
            />
            &mdash;
            <b-form-input
              type="number"
              :value="selectedMax"
              step="1"
              :min="selectedMin"
              :max="max"
              class="ml-2"
              @change="maxHandler"
              placeholder="Max bounds"
            />
        </div>
        <div class="int-editor_button" @click="addData">
            {{buttonText}}
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

const marksData = {
    10: 10,
    30: 30,
    100: 100,
    '1kb': 1000,
    '3kb': 3000,
    '10kb': 10000,
    '30kb': 30000,
    '1mb': 100000,
};

export default {
    props: ['min', 'max', 'onSubmit', 'preselectedMin', 'preselectedMax', 'buttonText'],
    data() {
        return {
            selectedMin: this.preselectedMin,
            selectedMax: this.preselectedMax,
            center: null,
            radius: null,
            sliderRadius: null,
            marksData,
            marks: Object.keys(marksData),
        };
    },
    methods: {
        addData() {
            this.onSubmit(this.selectedMin, this.selectedMax);
        },
        radiusHandler(value) {
            const newRadiusValue = Number(value);
            if (this.center === null) {
                this.center = this.min;
            }
            this.radius = newRadiusValue;
            this.sliderRadius = null;
            this.selectedMin = Math.max(this.center - newRadiusValue, this.min);
            this.selectedMax = Math.min(this.center + newRadiusValue, this.max);
        },
        sliderRadiusHandler(selectedKey) {
            if (this.center === null) {
                this.center = this.min;
            }
            this.sliderRadius = selectedKey;
            this.radius = marksData[selectedKey];
            this.selectedMin = Math.max(this.center - marksData[selectedKey], this.min);
            this.selectedMax = Math.min(this.center + marksData[selectedKey], this.max);
        },
        centerHandler(data) {
            const value = Number(data);
            let newCenterValue;
            if (!value || value < this.min) {
                newCenterValue = this.min;
            } else if (value > this.max) {
                newCenterValue = this.max;
            } else {
                newCenterValue = value;
            }
            this.center = newCenterValue;
            this.sliderRadius = null;
            this.radius = null;
            this.selectedMin = newCenterValue;
            this.selectedMax = newCenterValue;
        },
        minHandler(data) {
            const value = Number(data);
            if (value < this.min) {
                this.selectedMin = this.min;
            } else if (value > this.selectedMax) {
                this.selectedMin = this.selectedMax;
            } else {
                this.selectedMin = value;
            }
            this.center = null;
            this.radius = null;
            this.sliderRadius = null;
        },
        maxHandler(data) {
            const value = Number(data);
            if (value > this.max) {
                this.selectedMin = this.max;
            } else if (value < this.selectedMin) {
                this.selectedMax = this.selectedMin;
            } else {
                this.selectedMax = value;
            }
            this.center = null;
            this.radius = null;
            this.sliderRadius = null;
        },
    },
    components: {
        VueSlider,
    },
    // Update data if min and max values were changed in the store
    // (e.g on change filter or on remove data via StatView)
    watch: {
        preselectedMin(newVal) {
            if (newVal !== this.selectedMin) {
                this.selectedMin = newVal;
                this.center = null;
                this.sliderRadius = null;
                this.radius = null;
            }
        },
        preselectedMax(newVal) {
            if (newVal !== this.selectedMax) {
                this.selectedMax = newVal;
                this.center = null;
                this.sliderRadius = null;
                this.radius = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .int-editor {
        background-color: #fff;
        margin: 0 30px;
        border-radius: 0 0 3px 3px;
        &_center {
            padding: 10px;
            padding-bottom: 13px;
            border-bottom: 1px solid #dfe4ea;
            &_input {
                height: 33px;
                color: #0a1c34;
                border-radius: 3px;
                background-color: #e7e7e7;
                font-size: 13px;
                letter-spacing: 0px;
            }
            &_descr {
                margin: 1px 10px;
                font-size: 10px;
                letter-spacing: 0px;
                color: #9da0a6;
            }
        }
        &_inputs {
            display: flex;
            color: #0a1c34;
            align-items: center;
            padding: 10px;
            padding-top: 13px;
            input {
                width: 112px;
                height: 33px;
                color: #0a1c34;
                border-radius: 3px;
                background-color: #e7e7e7;
                font-size: 13px;
                letter-spacing: 0px;
            }
        }
        &:hover .int-editor_button {
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
            margin: 60px 10px 24px 10px;
            padding: 0 !important;
            /deep/ .vue-slider{
                &-marks {
                    background-image: url('../../../assets/sliderBg.svg');
                    background-repeat: no-repeat;
                    background-size: 100%;
                    width: 100%;
                    height: 53px;
                    top: -50px;
                }
                &-mark {
                    &-step {
                        display: none;
                    }
                    &-label {
                        margin-top: 0px;
                        font-size: 9px;
                        letter-spacing: 0px;
                        color: #0a1c34;
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
                    display: none;
                }
            }
            &__default {
                /deep/ .vue-slider {
                    &-marks {
                        background-image: url('../../../assets/sliderDefaultBg.svg');
                    }
                    &-mark {
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
                }
            }
        }
    }
</style>
