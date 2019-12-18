<template>
    <div class="checkbox">
        <input
                id="checkbox"
                type="checkbox"
                :checked="checked"
                @change="$emit('change', $event.target.checked)"
        />
        <label for="checkbox">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'BaseCheckbox',
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        label: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
        },
    },
};
</script>

<style lang="scss" scoped>
.checkbox {
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: left;
    color: #597a96;
    font-size: 14px;
    margin-top: 5px;
    label {
        position: relative;
        display: inline-block;
        padding-left: 22px;
        margin: 0;
    }
    label::before,
    label::after {
        position: absolute;
        display: inline-block;
    }
    label::before{
        top: 3px;
        left: 0;
        content: "";
        height: 14px;
        width: 14px;
        border: 1px solid #2bb3ed;
        border-radius: 2px;
        background-color: #ecf0f1;
    }
    label::after {
        left: 3px;
        top: 6px;
        content: "";
        height: 6px;
        width: 9px;
        border-left: 2px solid #ecf0f1;
        border-bottom: 2px solid #ecf0f1;
        transform: rotate(-45deg);
    }
    input[type="checkbox"] {
        display: none;
    }
    input[type="checkbox"] + label::after {
        content: none;
    }
    input[type="checkbox"]:checked + label::after {
        content: "";
    }
    input[type="checkbox"]:checked + label:before {
        background-color: #2bb3ed;
    }
}
</style>
