<template>
    <div class="page-home-center">
        <div class="avatar"v-if="userInfo">
            <div class="avator-icon">
                <img :src="userInfo.avatar" />
                <input type="file" @change="handleUpdAvatar" />
            </div>
            <div class="nickname">{{ userInfo.nickname }}</div>

        </div>
        <div class="avatar" v-else>
            <div class="avator-icon">
                <img src="../../assets/images/avatar.png" alt="">
            </div>
            <router-link to="/login" tag="div" class="nick-name">立即登录</router-link>

        </div>


        <ul class="my-order-tab">
            <li>
                <i class="iconfont icon-qiaquan"></i>
                <div class="common-p">电影订单</div>
            </li>
            <li>
                <i class="iconfont icon-dingdan"></i>
                <div class="common-p">拼团订单</div>
            </li>
        </ul>

        <router-link to="/card" tag="div" class="margin-set my-card">
            <i class="iconfont icon-icon1460192062515"></i>
            <span class="label">卖座卡</span>
        </router-link>
        <div class="margin-set my-red-envelope">
            <i class="iconfont icon-hongbao"></i>
            <span class="label">红包</span>
        </div>
        <div class="margin-set my-balance">
            <i class="iconfont icon-yue-copy"></i>
            <span class="label">余额</span>
        </div>
        <div class="margin-set system-set" @click="handleLogout">
            <i class="iconfont icon-shezhi"></i>
            <span class="label">退出登录</span>
        </div>
    </div>
</template>

<script>
    import { mapState , mapActions} from "vuex";

    export default {
        name: "conter",

        computed: {
            ...mapState("user",["userInfo"])
        },
        methods: {
            ...mapActions("user",["handleLogout","handleUpdAvatar"])
        },
        watch: {

        },


    };
</script>

<style lang="less">

    .page-home-center {
        .avatar {
            text-align: center;
            margin-top: -44px;
            height: 200px;
            padding-left: 22px;
            padding-top: 64px;
            background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.6837f67.png);
            background-size: cover;
            display: flex;
            align-items: center;
            color: #fff;

            .avator-icon {
                width: 63px;
                height: 63px;
                border-radius: 35px;
                margin-right: 20px;
                border: 2px solid #fff;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }

                input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }

            .nick-name {
                font-size: 16px;
            }
        }

        .my-order-tab {
            width: 100%;
            margin: 0 auto;
            display: flex;
            text-align: center;
            font-size: 13px;
            padding: 0;
            height: 79px;
            background: #fff;
            margin-bottom: 10px;
            align-items: center;

            li {
                position: relative;
                flex: 1;
                list-style: none;

                .iconfont {
                    font-size: 26px;

                }

                .icon-qiaquan {
                    color: #ffc82f;
                }

                .icon-dingdan {
                    color: #c6da5c;
                }


                .common-p {
                    margin-top: 10px;
                    color: #797d82;
                }
            }
        }

        .margin-set {
            position: relative;
            background: #fff;
            padding: 0 15px;
            height: 49px;
            display: flex;
            align-items: center;

            .icon-icon1460192062515 {
                color: #ff8462;
            }

            .icon-hongbao {
                color: #baa27a;
            }

            .icon-yue-copy {
                color: #ffb233;
            }

            .icon-shezhi {
                color: #bdcf5b;
            }

            .label {
                font-size: 16px;
                margin-left: 15px;
                color: #191a1b;
                flex: 1;
            };

            &::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                border-bottom: 1px solid #ededed;
                color: #ededed;
                transform-origin: 0 100%;
                transform: scaleY(0.5);
                left: 13px;
            }
        }
    }
</style>
