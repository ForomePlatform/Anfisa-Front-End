<template>
    <div class="user-info">
        <img :src="imgUrl" class="user-info-img" />
        <span class="user-info-title ml-1" href="#foo">{{title}}</span>
    </div>
</template>
<script>
const unknownUser = require('../assets/unknownUser.svg');

export default {
    name: 'User',
    data() {
        return {
            title: 'LOGIN',
        };
    },

    computed: {
        imgUrl() {
            return unknownUser;
        },
    },
};
</script>
<style scoped lang="scss">
    .user-info {
        display: flex;
        align-items: center;
        justify-content: left;
        &-img {
            border-radius: 50%;
            width: 34px;
            height: 34px;
        }
        &-title {
            font-size: 11px;
            color: #2bb3ed;
            text-decoration: underline;
            letter-spacing: 0px;
            width: fit-content;
            &:hover {
                cursor: pointer;
                color: #587a97;
            }
        }
    }
</style>
