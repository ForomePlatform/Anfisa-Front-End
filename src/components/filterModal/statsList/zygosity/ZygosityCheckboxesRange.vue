<template>
    <div class="checkboxSteps">
        <div class="step">
            <b-form-checkbox
                    :id="sampleId-0"
                    v-model="steps.step1"
                    name="steps"
                    value="0"
                    unchecked-value=""
            >
                0
            </b-form-checkbox>
        </div>
        <svg width="35%" height="7px"
             viewBox="0 0 100% 100%"
             xmlns="http://www.w3.org/2000/svg">

            <rect x="0" y="0"
                  width="100%" height="100%"
                  rx="5" ry="5"
                  :id="getRect1Id"/>
        </svg>
        <div class="step">
            <b-form-checkbox
                    :id="sampleId-1"
                    v-model="steps.step2"
                    name="steps"
                    value="1"
                    unchecked-value=""
            >
                1
            </b-form-checkbox>
        </div>
        <svg width="35%" height="7px"
             viewBox="0 0 100% 100%"
             xmlns="http://www.w3.org/2000/svg">

            <rect x="0" y="0"
                  width="100%" height="100%"
                  rx="3" ry="3"
                  :id="getRect2Id"/>
        </svg>
        <div class="step">
            <b-form-checkbox
                    :id="sampleId-2"
                    v-model="steps.step3"
                    name="steps"
                    value="2"
                    unchecked-value=""
            >
                2
            </b-form-checkbox>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ZygosityCheckboxesRange",
        props: {
            steps: {
                type: Object,
                required: true
            },
            sampleId: {
                type: String,
                required: true
            }
        },
        computed: {
            getRect1Id() {
                if ((this.steps.step1 && this.steps.step2) ||
                    (this.steps.step1 && this.steps.step3))
                {
                    return 'active-rect'
                } else {
                    return 'disabled-rect'
                }
            },
            getRect2Id() {
                if ((this.steps.step2 && this.steps.step3) ||
                    (this.steps.step1 && this.steps.step3))
                {
                    return 'active-rect'
                } else {
                    return 'disabled-rect'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .checkboxSteps {
        width: 80%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .step {
            width: 10%;
            margin-left: 5px;
        }
    }
    #disabled-rect {
        fill: #fff;
        stroke: #bdc3c7;
    }
    #active-rect {
        fill: #007bff;
        stroke: #bdc3c7;
    }
</style>