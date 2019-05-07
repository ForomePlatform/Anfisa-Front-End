<template>
    <div class="tags-panel">
        <div class="tags-panel_selected">
            <BaseTagButton
              v-for="(item, index) in selectedTags"
              :key="item + '_' + index"
              :title="item"
              type="primary"
              :onClick="toggleTag"
            />
            <input
              class="tags-panel_input"
              :value="tagFilterValue"
              @input="setTagFilterValue"
              placeholder="Search"
              @keyup.enter="openNewTagPopup"
            />
        </div>
        <BaseTagButton
          v-for="(item, index) in filteredList"
          :key="item + '_' + index"
          :title="item"
          type="secondary"
          :onClick="toggleTag"
        />
        <p v-if="notFoundTag" class="tags-panel_not-found">
            {{notFoundTagText}}
        </p>
    </div>
</template>

<script>
import { NOT_FOUND_TAG } from '@/common/constants';
import BaseTagButton from './BaseTagButton.vue';

export default {
    computed: {
        tagFilterValue() {
            return this.$store.state.tagFilterValue;
        },
        filteredList() {
            return this.allTags.filter(tag => this.selectedTags.indexOf(tag) === -1
              && tag.toLowerCase().indexOf(this.tagFilterValue.trim().toLowerCase()) >= 0);
        },
        allTags() {
            return this.$store.state.allTags;
        },
        selectedTags() {
            return this.$store.state.selectedTags;
        },
        notFoundTag() {
            const value = this.tagFilterValue.trim();
            return value && !this.filteredList.length && !this.selectedTags.includes(value);
        },
        notFoundTagText() {
            return NOT_FOUND_TAG;
        },
    },
    components: {
        BaseTagButton,
    },
    methods: {
        toggleTag(tag) {
            this.$store.dispatch('toggleVariantTag', tag);
        },
        openNewTagPopup() {
            const value = this.tagFilterValue.trim();
            if (value && !this.filteredList.length && !this.selectedTags.includes(value)) {
                this.$root.$emit('bv::show::modal', 'newTagModal', '.tags-panel_input');
            }
        },
        setTagFilterValue(e) {
            this.$store.commit('setTagFilterValue', e.target.value);
        },
    },
    destroyed() {
        this.$store.commit('clearTagFilterValue');
    },
};
</script>

<style lang="scss" scoped>
    .tags-panel {
        margin-left: 10px;
        padding-left: 10px;
        border-left: dotted 1px #DCDCDC;
        line-height: 18px;
        &_input {
            flex: 1;
            border: none;
            font-size: 12px;
            line-height: 16px;
            margin-left: 4px;
            width: 80px;
            font-size: 12px;
            letter-spacing: 0px;
            &:focus {
                border: none;
                outline: none;
            }
            &::-webkit-input-placeholder {color: #babfc3; font-size: 12px;}
            &::-moz-placeholder          {color: #babfc3; font-size: 12px;}
            &:-moz-placeholder           {color: #babfc3; font-size: 12px;}
            &:-ms-input-placeholder      {color: #babfc3; font-size: 12px;}
        }
        &_not-found {
            color: #babfc3;
            font-size: 12px;
        }
    }
</style>
