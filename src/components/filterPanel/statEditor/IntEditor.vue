<template>
    <div class="int-editor">
        <div class="int-editor_center">
            <b-form-input
              class="int-editor_center_input"
              v-model.number="center"
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
              v-model="radius"
              :marks="[this.min, this.maxRadius]"
              :min="min"
              :max="maxRadius"
              :interval="1"
              @change="radiusHandler"
              tooltip="none"
              class="int-editor_slider"
            />
            <b-form-input
              class="int-editor_center_input"
              type="number"
              v-model.number="radius"
              step="1"
              :min="min"
              :max="maxRadius"
              @change="radiusHandler"
              placeholder="Coordinates range from center"
            />
        </div>
        <div class="int-editor_inputs">
            <b-form-input
              type="number"
              v-model.number="selectedMin"
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
              v-model.number="selectedMax"
              step="1"
              :min="selectedMin"
              :max="max"
              class="ml-2"
              @change="maxHandler"
              placeholder="Max bounds"
            />
        </div>
        <div class="int-editor_button" @click="addData">
            ADD
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

function getMaxRadius(min, max, center) {
    if (center) {
        if (max - center < min + center) {
            return max - center;
        }
        return min + center;
    }
    return 0;
}

export default {
    props: ['min', 'max', 'onSubmit', 'preselectedMin', 'preselectedMax'],
    data() {
        return {
            selectedMin: this.preselectedMin,
            selectedMax: this.preselectedMax,
            center: null,
            radius: null,
        };
    },
    methods: {
        addData() {
            this.onSubmit(this.selectedMin, this.selectedMax);
        },
        radiusHandler(value) {
            const maxRadius = getMaxRadius(this.min, this.max, this.center);
            const newRadiusValue = +value > maxRadius ? maxRadius : +value;
            this.radius = newRadiusValue;
            this.selectedMin = this.center - newRadiusValue;
            this.selectedMax = this.center + newRadiusValue;
        },
        centerHandler(value) {
            const newCenterValue = +value;
            if (!newCenterValue || newCenterValue < this.min) {
                this.radius = null;
                this.center = this.min;
                this.selectedMin = this.min;
                this.selectedMax = this.max;
            } else if (newCenterValue > this.max) {
                this.center = this.max;
                this.radius = 0;
                this.selectedMin = this.min;
                this.selectedMax = this.max;
            } else {
                const maxRadius = getMaxRadius(this.min, this.max, newCenterValue);
                const newRadius = this.radius > maxRadius ? maxRadius : this.radius;
                this.center = newCenterValue;
                this.radius = newRadius;
                this.selectedMin = newCenterValue - +newRadius;
                this.selectedMax = newCenterValue + +newRadius;
            }
        },
        minHandler(value) {
            if (value < this.min) {
                this.selectedMin = this.min;
            } else if (value > this.selectedMax) {
                this.selectedMin = this.selectedMax;
            } else {
                this.selectedMin = value;
            }
            this.center = null;
            this.radius = null;
        },
        maxHandler(value) {
            if (value > this.max) {
                this.selectedMin = this.max;
            } else if (value < this.selectedMin) {
                this.selectedMax = this.selectedMin;
            } else {
                this.selectedMax = value;
            }
            this.center = null;
            this.radius = null;
        },
    },
    computed: {
        maxRadius: {
            get() {
                return getMaxRadius(this.min, this.max, this.center);
            },
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
        &_slider {
            margin: 60px 10px 24px 10px;
            padding: 0 !important;
            /deep/ .vue-slider{
                &-marks {
                    background-image: url('./../../../assets/sliderBg.svg');
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
        }
    }
</style>
