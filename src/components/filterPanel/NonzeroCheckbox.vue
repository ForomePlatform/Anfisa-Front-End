<template>
    <b-form-checkbox
      class="nonzero-checkbox"
      @change="onChange"
      :checked="checked"
    >
        <div class="nonzero-checkbox_title">Nonzero Only</div>
    </b-form-checkbox>
</template>

<script>
export default {
    props: ['checked', 'onChange'],
};
</script>

<style lang="scss" scoped>
    .nonzero-checkbox{
        display: block;
        margin: 5px 24px 0;
        &_title {
            padding-left: 4px;
            font-size: 13px;
            letter-spacing: 0px;
            color: #77869f;
        }
    }
    /deep/ .custom-control-label {
        width: 100%;
        cursor: pointer;
        &::before {
            width: 19px;
            height: 19px;
            top: 0;
            background-color: #d8d8d8;
            border-radius: 3px;
        }
        &::after {
            width: 20px;
            height: 19px;
            top: 0;
            background-size: 55%;
            left: -1.55rem;
        }
    }
    .custom-checkbox /deep/ .custom-control-input:checked ~ .custom-control-label::after {
        background-image: url('../../assets/checkIcon.svg');
    }
    .custom-checkbox /deep/ .custom-control-input:checked ~ .custom-control-label::before {
        background-color: #12aaeb;
    }
    .custom-checkbox /deep/ .custom-control-input:checked ~ .custom-control-label
      .enum-editor_list_item_descr {
          color: #1a3e6c;
    }
</style>
