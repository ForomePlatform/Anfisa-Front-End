<template>
    <b-container>
        <b-row>
            <b-col cols="4" class="d-flex flex-column">
                <div v-if="genome.hgmd.toLowerCase() !== notPresent.toLowerCase()">
                    {{ genome.hgmd }}
                </div>
                <div class="title-wrapper">
                    <div class="title">
                        {{ genome.gene }}
                    </div>
                    <div class="note-icon-wrapper">
                        <img
                                v-if="note"
                                class="note-icon"
                                alt="Notes"
                                src="@/assets/bookIcon.svg"
                                @click="showNote = !showNote"
                        />
                    </div>
                </div>
                <div v-html="genome.gtex"></div>
                <BaseTagButton
                        v-for="(item, index) in getTags"
                        :key="index"
                        :title="item"
                />
            </b-col>
            <b-col cols="4" class="d-flex flex-column">
                <div>{{ genome.hg19.split(/\s+/)[0] }}</div>
                <div v-html="genome.hg19.split(/\s+/)[1]"></div>
                <div v-html="getIGVOpenLink"></div>
            </b-col>
            <b-col cols="4" class="d-flex flex-column">
                <div style="font-weight: 600;">
                    {{ genome.canonicalAnnotation }}
                </div>
                <div>{{ genome.canonicalPpos }}</div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import BaseTagButton from '../variantDetailsPanel/BaseTagButton.vue';

export default {
    name: 'BaseInfo',
    components: {
        BaseTagButton,
    },
    props: {
        genome: {
            type: Object,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
        },
    },
    data() {
        return {
            notPresent: 'Not Present',
            showNote: false,
        };
    },
    computed: {
        getTags() {
            const genTags = this.$store.getters.getTagsById(this.id);
            if (genTags && genTags[0]) {
                return genTags[0].tags;
            }
            return [];
        },
        getIGVOpenLink() {
            const { igv } = this.genome;
            const closeLinkTag = '</a>';
            const startLink = igv.indexOf('<a');
            const endLink = igv.indexOf(closeLinkTag);
            return igv.substring(startLink, endLink + closeLinkTag.length);
        },
    },
    watch: {
        showNote() {
            this.$emit('isShowNote');
        },
    },
};
</script>

<style lang="scss" scoped>
    .title-wrapper {
        font-size: 18px;
        letter-spacing: 0;
        font-weight: 800;
        margin-bottom: 5px;
        .title {
            display: inline-block;
        }
        .note-icon-wrapper {
            display: inline-block;
            margin-left: 10px;
        }
    }
    .note-icon {
        cursor: pointer;
        height: 20px;
        width: 20px;
        margin-right: 10px;
        transition-timing-function: ease-in-out;
        transition-duration: .2s;
        &:hover {
            transform: scale(1.3);
        }
    }
</style>
