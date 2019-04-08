<template>
    <div class="settings-header">
        <div class="settings-header_title">
            {{title}}
        </div>
        <div>
            <img
              v-if="type === 'project'"
              class="settings-header_icon"
              alt="settings icon"
              src="../assets/selectProjectIcon.svg"
              @click="onClick"
            />
            <img
              v-if="type === 'project'"
              class="settings-header_icon  ml-2"
              alt="open site"
              src="../assets/projectIcon.svg"
            />
            <img
              v-if="type === 'filter'"
              class="settings-header_icon  ml-2"
              alt="open site"
              src="../assets/filterIcon.svg"
              @click="onClick"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsHeader',
    props: {
        title: String,
        type: String,
        onClick: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped>
    .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        &_title {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0px;
            color: #2bb3ed;
            font-family: "Arial";
            font-weight: 800;
        }
        &_icon:hover {
            cursor: pointer;
        }
    }
</style>
