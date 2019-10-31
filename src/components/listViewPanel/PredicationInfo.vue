<template>
    <div class="predication-wrapper">
        <div
                class="d-flex flex-row"
                v-if="genome.polyphen"
        >
            <div :class="getColor(genome.polyphen)"></div>
            <div class="subtitle">Polyphen:</div>
            {{ genome.polyphen }}
        </div>
        <div
                class="d-flex flex-row"
                v-if="genome.sift"
        >
            <div :class="getColor(genome.sift)"></div>
            <div class="subtitle">SIFT:</div>
            {{ genome.sift }}
        </div>
        <div
                class="d-flex flex-row"
                v-if="genome.mutation"
        >
            <div :class="getColor(genome.mutation)"></div>
            <div class="subtitle">MUT TASTER:</div>
            {{ genome.mutation }}
        </div>
        <div
                class="d-flex flex-row"
                v-if="genome.fathmm"
        >
            <div :class="getColor(genome.fathmm)"></div>
            <div class="subtitle">FATHMM:</div>
            {{ genome.fathmm }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "PredicationInfo",
        props: {
            genome: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                greenColorValues: ['benign', 'B', 'tolerated', 'T', 'P', 'N', 'L'],
                yellowColorValues: ['possibly_damaging', 'probably_damaging', 'P'],
                redColorValues: ['damaging', 'D', 'deleterious', 'D', 'A', 'M', 'H'],
            }
        },
        computed: {
            getColor() {
                return (value) => {
                    let result = '';
                    value = value.split(',')[0];
                    if (this.greenColorValues.includes(value)) {
                        result = 'circle-green';
                    } else if (this.yellowColorValues.includes(value)) {
                        result = 'circle-yellow';
                    } else if (this.redColorValues.includes(value)) {
                        result = 'circle-red';
                    }
                    return result;
                };
            },
        }
    }
</script>

<style lang="scss" scoped>
    .subtitle {
        font-size: 12px;
        font-weight: 600;
        margin: 0 5px 0 5px;
    }
    .circle-red {
        position: absolute;
        left: 0;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #e74c3c;
        margin-top: 4px;
    }
    .circle-green {
        position: absolute;
        left: 0;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #2ecc71;
        margin-top: 4px;
    }
    .circle-yellow {
        position: absolute;
        left: 0;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #f1c40f;
        margin-top: 4px;
    }
</style>