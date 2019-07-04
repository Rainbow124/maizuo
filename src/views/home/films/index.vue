<template>
    <van-list v-model="filmLoading" @load="getFilmList" :finished="isFinished" finished-text="别拉了" ref="myBox" :immediate-check="true">
    <div class="page-home-films">
        <router-link
                tag="div"
                to="/city"
                class="city-fixed"
        >
            <span>{{ curCityInfo && curCityInfo.name }}</span>
            <i class="iconfont icon-down-trangle" style="font-size: 6px;"></i>
        </router-link>
        <bannerSwiper
                :List="bannerList"
                pagination
                loop
                autoplay
                :delay="2000"
        />
        <van-tabs v-model="curFilmType"  sticky>
            <van-tab title="正在热映">
                <Filmlist
                        filmType="nowPlaying" :list="filmList"
                />
            </van-tab>
            <van-tab title="即将上映">
                <Filmlist
                        filmType="comingSoon" :list="filmList"
                />
            </van-tab>
        </van-tabs>
    </div>

    </van-list>

</template>

<script>

    import bannerSwiper from '@/components/Swiper/index.vue';
    import Filmlist from '@/components/Filmlist/index.vue';
    import {mapState, mapGetters, mapActions} from "vuex";


    export default {
        name: "films",
        /*data() {
            return {
                active: 2
            };
        },*/
        components: {
            bannerSwiper,
            Filmlist,


        },

        computed: {
            ...mapState('film', ["bannerList", "filmList"]),
            ...mapGetters("film", ["isFinished"]),
            ...mapGetters("city", ["curCityInfo"]),

            curFilmType: {
                get() {
                    return this.$store.state.film.curFilmType;
                },

                set(value) {
                    this.$store.commit({
                        type: "film/setCurFilmType",
                        filmType: value
                    });
                }
            },
            filmLoading: {
                get() {
                    return this.$store.state.film.filmLoading;
                },
                set(value) {
                    this.$store.commit({
                        type: "film/setFilmLoading",
                        loading: value
                    });
                }
            }
        },
        watch: {
            curFilmType(newVal, oldVal) {
                // 当 curFilmType 发生变化了，这是重新发送请求

                //0 将滚动条滚动到顶部
                // scrollTop = 0;
                this.$refs.myBox.$el.scrollTop = 0;
                //1, 先将所有 filmList 数据有空， 然后将 pageNum 设置为1
                this.getFilmList(true);
            }
        },

        methods: {
            ...mapActions('film', ["getBannerList", "getFilmList"]),
            /**
             * 跳转到城市选择页面
             */
            /*handleGoCity() {
                this.$router.push("/city");
            }*/

        },
        created() {
            this.getBannerList();
            // this.getFilmList();

        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    @import "~@/assets/styles/common/px2rem.less";
    .page-home-films{
        position: relative;

        .city-fixed {
            position: absolute;
            top: px2rem(18);
            left: px2rem(7);
            color: #fff;
            z-index: 10;
            font-size: px2rem(13);
            background: rgba(0, 0, 0, .2);
            height: px2rem(30);
            line-height: px2rem(30);
            border-radius: px2rem(15);
            text-align: center;
            padding: 0 px2rem(5);

            span {
                margin-right: px2rem(5);
            }
        }
    }

</style>
