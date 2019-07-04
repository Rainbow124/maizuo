<template>
    <div class="page-login">
        <div class="logo">
            <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="">
        </div>
        <div class="login-form">
            <div class="form-group">
                <input type="text" placeholder="用户名" class="input-control" v-model="username">
            </div>
            <div class="form-group">
                <input type="password" placeholder="密码" class="input-control" v-model="password">
            </div>
            <button
                class="submit login-btn"
                :disabled="!username || !password"
                @click="handleLogin({username, password})"
            >
                <span>登录</span>
            </button>
        </div>
    </div>
</template>

<script>
    import  { mapActions } from 'vuex';
    export default {
        name: "Login",
        data () {
            return{
                username: "",
                password: ""
            }
        },
        methods: {
            ...mapActions("user",["handleLogin"])
        }
    }
</script>

<style lang="less">
@import "index.less";
</style>
