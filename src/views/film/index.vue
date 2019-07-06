<template>
    <div class="page-film">
        <!--头部-->
        <div class="film-header">
            <div class="goBack" @click="goback">
                <img src="../../assets/images/back.png" alt="">
            </div>
            <div class="title" ref="top">{{ movieInfo.name }}</div>
        </div>
        <!--海报-->
        <div class="lazy-img film-poster" alt="filmPoster"
             style="width: 100%; background: rgb(249, 249, 249);">
            <!--<div class="padding" style="width: 100%; background: rgb(249, 249, 249);">
                <img src="../../assets/images/lazy-img.png" width="64px" alt="img">
            </div>-->
            <div class="lazy-img-wrap"
                 style="width: 100%; background: rgb(249, 249, 249); opacity: 1; display: block;">
                <img :src= movieInfo.poster class="target-img">
            </div>
        </div>
        <!--详情-->
        <div class="film-detail" >
            <div class="col">
                <div class="film-name">
                    <span class="name">
                        {{ movieInfo.name }}
                    </span>
                    <span class="item">
                        {{ movieInfo.filmType && movieInfo.filmType.name}}
                    </span>
                </div>
                <div class="film-grade">
                    <span class="grade">
                        {{ movieInfo.grade}}
                    </span>
                    <span class="grade-text">分</span>
                </div>
            </div>
            <div class="film-category grey-text">
                {{ movieInfo.category }}
            </div>
            <div class="film-premiere-time grey-text">
                {{ getTime(movieInfo.premiereAt * 1000) }} 上映
            </div>
            <div class="film-nation-runtime grey-text">
                {{ movieInfo.nation }} | {{ movieInfo.runtime }} 分钟
            </div>
            <div class="test grey-text">
                {{ movieInfo.synopsis }}
            </div>
            <div class="film-synopsis grey-text hidden " ref="details" >
                <p class="film-synopsis_txt" ref="details_txt">
                    {{ movieInfo.synopsis }}
                </p>
            </div>
            <div class="toggle" @click="showMore" >
                <img src="../../assets/images/toggle.png" alt="" ref="moreContent">
            </div>
        </div>
        <!--演员列表-->
        <div class="actors">
            <div class="actors-title-bar">
                <span class="actors-title-text">
                    演职人员
                </span>
            </div>
            <div class="row-scroll-wrapper actors-list">
                <ul class="row-scroll-items-nav">
                    <li
                            v-for="(item, index) in movieInfo.actors"
                            :key="index"
                            class="row-scroll-item">
                        <img class="target-img" :src="item.avatarAddress" alt="">
                        <span class="actors-name">{{ item.name }}</span>
                        <span class="actors-role">{{  item.role }}</span>
                    </li>

                </ul>
            </div>
        </div>
        <!--有剧照-->
        <div v-if="movieInfo.photos && movieInfo.photos.length > 1" class="photo">
            <div class="photos-title-bar">
                <span class="photos-title-text">剧照</span>
                <span  class="photos-to-all">
                    全部({{movieInfo.photos.length }})
                    <i> > </i>
                </span>

            </div>
            <div class="row-scroll-wrapper photos-list">
                <ul class="row-scroll-items-nav">
                    <li
                            v-for="(photo,index) in movieInfo.photos"
                            :key="index"
                            class="row-scroll-item photos-item-wrap">
                        <img :src="photo" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <!--无剧照-->
        <div v-else class="photo">
            <div class="photos-title-bar">
                <span class="photos-title-text">剧照</span>
            </div>
            <div class="row-scroll-wrapper photos-list">
                暂无剧照
            </div>
        </div>
        <button class="btn">选座购票</button>

    </div>

</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: "film",

        data(){
            return{
                flag: true
            }
        },
        computed: {
            ...mapState("details",["movieInfo"])
        },
        methods: {
            ...mapActions("details",["getFilmDetails"]),
            //返回上一页按钮
            goback(){
                window.history.go(-1);
            },
            //显示更多剧情
            showMore () {
                var details_box = this.$refs.details;
                var details_box_txt = this.$refs.details_txt;
                var arrow = this.$refs.moreContent;
                console.log(arrow);
                if(this.flag){
                    arrow.classList.add("upper");
                    details_box.style.height = details_box_txt.offsetHeight + "px";
                    details_box.classList.remove("hidden");
                    details_box.classList.add("show");
                    this.flag = false;
                }else{
                    arrow.classList.remove("upper");
                    details_box.style.height = "38px";
                    details_box.classList.add("hidden");
                    details_box.classList.remove("show");
                    this.flag = true;
                }


            },
            //补零操作
            addZero(num) {
                if (parseInt(num) < 10) {
                    num = "0" + num;
                }
                return num;
            },
            //根据时间戳计算时间
            getTime(timestamp) {
                var oDate = new Date(timestamp),
                    oYear = oDate.getFullYear(),
                    oMonth = oDate.getMonth() + 1,
                    oDay = oDate.getDate(),
                    oHour = oDate.getHours(),
                    oMin = oDate.getMinutes(),
                    oSen = oDate.getSeconds(),
                    oTime =
                        oYear +"-"+
                        this.addZero(oMonth) +
                        "-" +
                        this.addZero(oDay) +
                        " ";
                return oTime;
            },

        },
        //过滤数组获取其中的对象
        filters: {
            actorFormat (actors=[]) {
                let tmp = actors.map(actors => actors.name);
                return tmp.length ? tmp.join(" ") : "暂无主演";
            },

            actorFormatRole (actors=[]) {
                let tmp2 = actors.map(actors => actors.role)
                return tmp2.length ? tmp2.join(" ") : "暂无主演";
            },
            photoFormat (photos = []) {
                return photos.length ? photos.join(" ") : "暂无剧照";
            },
            fil2 ( value ) {
                return value
            }
        },
        created() {

            this.getFilmDetails();
        },
        mounted() {
            //    滚动出现标题
            window.addEventListener("scroll",() => {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                console.log(scrollTop);
                if(scrollTop > 44){
                    this.$refs.top.classList.remove("title");
                    this.$refs.top.classList.add("scroll_top");
                } else {
                    this.$refs.top.classList.remove("scroll_top");
                    this.$refs.top.classList.add("title");
                }
            })
        }
    }
</script>

<style lang="less">
    @import "./index.less";

</style>
