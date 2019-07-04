<template>
    <div class="mz-tabbar">
        <ul class="mz-tabbar_ul">
           <li class="mz-tabbar_li" v-for="(tab,index) in tabs" :key="index">
                <router-link :to="tab.to" active-class="active">
                    <i class="iconfont" :class="tab.icon"></i>
                    <span> {{ tab.name }} </span>
                </router-link>
           </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Tabbar",
        props: {
            tabs: {
                type: Array,
                default () {
                    return [];
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/styles/common/px2rem.less";
    @import "../../assets/styles/common/mixins.less";
    .mz-tabbar {
        &:last-child::before{border: none;}
        .mixin-border-top;
        height: px2rem(50);
        background: #fff;

        .mz-tabbar_ul {
            display: flex;
            height: 100%;

            .mz-tabbar_li {
                flex: 1;
                a {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    height: 100%;
                    font-size: 12px;
                    color: #797d82;

                    .iconfont {
                        font-size: 24px;
                        margin-bottom: px2rem(4);
                    }

                    &.active {
                        color: #ff5f16;
                    }
                }
            }
        }


    }

</style>
