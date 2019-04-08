<template>
    <div class="settings-header">
        <div class="settings-header_title">
            LAYOUT
        </div>
        <div>
            <img
              class="settings-header_icon"
              alt="settings icon"
              src="../assets/expandLayout.svg"
              @click="expand"
            />
            <img
              class="settings-header_icon  ml-2"
              alt="open site"
              src="../assets/collapseLayout.svg"
              @click="collapse"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsHeader',
    methods: {
        expand() {
            const elements = document.getElementsByClassName('js-table_header');
            Array.from(elements).forEach((element) => {
                if (element.getAttribute('aria-expanded') === 'false') {
                    element.click();
                }
            });
        },
        collapse() {
            const elements = document.getElementsByClassName('js-table_header');
            Array.from(elements).forEach((element) => {
                if (element.getAttribute('aria-expanded') === 'true') {
                    element.click();
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
