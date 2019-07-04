<template>
    <ul class="nowPlayingList">
        <li class="nowPlayingFilm-item"
            v-for="film in list"
            :key="film.filmId"
        >
            <router-link
                :to="{
                    name: 'film',
                    params:{
                        filmId:film.filmId
                    }
                }"
                class="nowPlayingFilm-wrap">
                <div  class="lazy-img nowPlayingFilm-img" alt="film" style="width: 66px; height: 94px; background: rgb(249, 249, 249); float: left;">
                    <div  class="lazy-img-wrap" style="width: 66px; height: 94px; background: rgb(249, 249, 249); opacity: 1; display: block;">
                        <img data-v-21c202bd="" :src="film.poster" class="target-img">
                    </div>
                </div>
                <div class="nowPlayingFilm-info" style="float: left;">
                    <div class="nowPlayingFilm-name info-col">
                        <span class="name">{{ film.name }} </span>
                        <span class="item">{{ film.item.name }}</span>
                    </div>
                    <div
                        v-show="filmType==='nowPlaying'"
                        class="nowPlayingFilm-grade info-col" style="visibility: visible;"
                    >
                        <span class="label">观众评分 </span>
                        <span class="grade">{{  film.grade }}</span>
                    </div>
                    <div class="nowPlayingFilm-actors info-col label" >

                        <span class="label">
                        主演：{{ film.actors | actorFormat }}
                        </span>
                    </div>
                    <div
                        v-show="filmType==='nowPlaying'"
                        class="nowPlayingFilm-detail info-col label"
                    >
                        <span class="label">{{ film.nation }} | {{ film.runtime }} 分钟</span>
                    </div>
                    <div
                        v-show="filmType==='comingSoon'"
                        class="nowPlayingFilm-detail info-col label"
                    >
                        <span class="label">上映日期： {{ timestampToTime(film.premiereAt) }} </span>
                    </div>
                </div>
                <div class="nowPlayingFilm-buy" style="float: right;" v-show="filmType==='nowPlaying'">购票</div>
                <div class="nowPlayingFilm-buy" style="float: right;" v-show="filmType==='comingSoon'">预购</div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Filmlist",

        props:{
            list: {
                type: Array,
                default () {
                    return [];
                }
            },
            filmType: String
        },
        methods: {

             timestampToTime (timestamp) {
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
                var D = date.getDate() + '日 ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                var w = date.getDay();
                var week = ["周日","周一","周二","周三","周四","周五","周六"]+' ';
                return   M+D;
             },


        },
        filters: {
            actorFormat (actors=[]) {
                let tmp = actors.map(film => film.name);
                return tmp.length ? tmp.join(" ") : "暂无主演";
            },

            fil1 (value) {
                return value.split('')[0];
            },
            fil2 ( value ) {
                return value
            }
        }
    }
</script>

<style  lang="less" >
    @import "~@/assets/styles/common/px2rem.less";
    @import "~@/assets/styles/common/mixins.less";


    .nowPlayingList{
        list-style: none;
        padding: 0;
        margin-left: px2rem(15);
        margin-bottom: 0;
        margin-top: 0;

    .nowPlayingFilm-item{
        padding: px2rem(15) px2rem(15) px2rem(15) 0;
        height: px2rem(94);
        position: relative;
        .mixin-border-bottom;

    .nowPlayingFilm-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;

    .nowPlayingFilm-img  {

    .lazy-img-wrap{
        width: px2rem(66);
        height: px2rem(94);
        background: rgb(249, 249, 249);
        opacity: 1;
        display: block;

    img{
        border-radius: px2rem(2);
    }
    .target-img{
        width: 100%;
        /* position: absolute;
         top: 50%;
         transform: translateY(-50%);*/
    }
    }

    }




    .nowPlayingFilm-info {
        width: calc(100% - px2rem(116));
        padding: 0 px2rem(10);

    .nowPlayingFilm-name{
    span{
        display: inline-block;
        vertical-align: middle;
    }
    .name {
        max-width: calc(100% - px2rem(25));
        color: #191a1b;
        font-size: 16px;
        height: px2rem(22);
        line-height: px2rem(22);
        margin-right: px2rem(5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .item {
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: px2rem(14);
        line-height: px2rem(14);
        padding: 0 px2rem(2);
        border-radius: px2rem(2);
    }

    }

    .nowPlayingFilm-grade{

    .grade {
        color: #ffb232;
        font-size: 14px;
    }
    }

    .nowPlayingFilm-actors{

    }

    .nowPlayingFilm-detail{

    }

    .label {
        font-size: 13px;
        margin-top: px2rem(4);
        color: #797d82;
    }

    .info-col {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    }
    }

    .nowPlayingFilm-buy {
        line-height: px2rem(25);
        height: px2rem(25);
        width: px2rem(50);
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: px2rem(2);
        position: relative;

    &::after {
         content: " ";
         transform: scale(.5);
         position: absolute;
         border: 1px solid #ff5f16;
         top: -50%;
         right: -50%;
         bottom: -50%;
         left: -50%;
         border-radius: px2rem(4);
     }
    }
    }


    }
</style>
