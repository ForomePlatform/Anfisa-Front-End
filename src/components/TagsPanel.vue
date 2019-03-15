<template>
    <div class="tags-panel">
        <div class="tags-panel_selected">
            <TagButton
              v-for="(item, index) in selectedTags"
              :key="item + '_' + index"
              :title="item"
              type="primary"
              :onClick="toggleTag"
            />
            <input
                class="tags-panel_input"
                v-model="filterValue"
                placeholder="Search"
            />
        </div>
        <TagButton
          v-for="(item, index) in filteredList"
          :key="item + '_' + index"
          :title="item"
          type="secondary"
          :onClick="toggleTag"
        />
    </div>
</template>

<script>
import TagButton from './TagButton.vue';

export default {
    data() {
        return {
            filterValue: '',
        };
    },
    computed: {
        filteredList() {
            return this.allTags.filter(tag => this.selectedTags.indexOf(tag) === -1
              && tag.indexOf(this.filterValue) >= 0);
        },
        allTags() {
            return this.$store.state.allTags;
        },
        selectedTags() {
            return this.$store.state.selectedTags;
        },
    },
    components: {
        TagButton,
    },
    methods: {
        toggleTag(tag) {
            this.$store.dispatch('toggleVariantTag', tag);
        },
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
    }
</style>
