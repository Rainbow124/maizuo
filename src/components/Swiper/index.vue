<template>
    <div ref="banner" class="swiper-container swiper-container-initialized swiper-container-horizontal">
        <div class="swiper-wrapper">
            <div class="swiper-slide swiper-slide-active"
                 v-for="banner in List"
                 :key="banner.bannerId"
            >
                <img :src="banner.imgUrl" alt="">
            </div>
        </div>
        <!-- Add Pagination -->
        <div v-if="pagination"  class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
            <span class="swiper-pagination-bullet swiper-pagination-bullet-active min-swiper-pagination-bullet min-swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 1">

            </span>
        </div>

        <!-- 如果需要导航按钮 -->
        <template v-if="navigation">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </template>

        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar" v-if="scrollbar"></div>
    </div>
</template>

<script>
    import Swiper from "swiper";

    // import 'swiper/dist/css/swiper.css'

    export default {
        name: "bannerSwiper",

        props: {
            /*轮播项目*/
            List: {
                type: Array,
                default () {
                    return  []


                }
            },

            /*是否需要分页器*/
            pagination: {
                type: Boolean,
                default: false
            },
            /*是否需要导航箭头*/
            navigation: {
                type: Boolean,
                default: false
            },

            /*是否需要滚动条*/
            scrollbar: {
                type: Boolean,
                default: false
            },

            /*是否需要 无缝轮播*/
            loop: {
                type: Boolean,
                default:false
            },
            /*是否需要自动轮播*/
            disableOnInteraction: {
                type: Boolean,
                default: false
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            /*自动轮播的延时时间*/
            delay: {
                type: Number,
                default: 3000,
            }


        },

        watch: {
            List (newVal, oldVal) {
                if(this.mySwiper){

                //    已经被初始化
                    this.mySwiper.destroy();

                }
                this.$nextTick(() => {
                    this.initSwiper();
                })
            }
        },
        methods: {
          initSwiper () {
              /*不使用class来构建组件，这样调用时，多处调用就会导致class名冲突而发生错误*/
              let container = this.$refs.banner;

              this.mySwiper = new Swiper(container,{
                  loop: this.loop,
                  pagination: this.pagination
                  ? {
                      el: ".swiper-pagination"
                      }:{},
                  navigation: this.navigation
                    ? {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev"
                      }:{},
                  scrollbar: this.scrollbar
                    ? {
                      el: ".swiper-scrollbar"
                      }:{},
                  autoplay:this.autoplay
                    ? {
                      disableOnInteraction: this.disableOnInteraction,
                      delay: this.delay
                  }:{}
                  /*disableOnInteraction: this.disableOnInteraction,
                  delay: this.delay*/


              })
          }
        },

        components: {

        },
        created() {
        }


    }
</script>

<style lang="less">
    @import "~swiper/dist/css/swiper.css";

    @import "../../assets/styles/common/px2rem.less";

    .swiper-container {
        height: pxrem(210);

        .swiper-wrapper{
            position: relative;

            .swiper-pagination{
                position: absolute;
                right: 0;
                bottom: pxrem(10);


            }


        }

    }

    img {
        width: 100%;
    }
    .swiper-pagination-bullet {
        width: 3px !important;
        height: 3px !important;
        border: 1px solid hsla(0,0%,100%,.8)!important;
        display: inline-block!important;
        border-radius: 100%!important;
        background: hsla(0,0%,100%,0)!important;
        opacity: 0.2!important;
    }
    .swiper-pagination-bullet-active{
        opacity: 1!important;
        background: #fff!important;
    }

    .swiper-pagination-bullets {
        bottom: 10px!important;
        left:auto!important;
         right: 12px!important;
         width: 72px!important;
    }


</style>
