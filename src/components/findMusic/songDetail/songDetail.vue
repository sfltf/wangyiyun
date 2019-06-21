<template>
  <div class="song-margin">
    <div class="song-left">
      <div class="song-padding">
        <div class="play-disk">
          <img class="albums" :src="songDetail.al.picUrl" alt="头像">
          <span class="play-disk-bg cover-bg"></span>
        </div>
        <div class="song-detail">
            <div class="song-title">
                <span class="song-type icon-bg"></span>
                <span class="song-name1">{{songDetail.name}}</span>
                <router-link :to="{}" class="mv-link"><span v-if="songDetail.mv" class="mv icon-bg"></span></router-link>                
            </div>
            <p style="clear:both;text-align:left;margin-left: 68px;font-size: 14px;color:#bababa;">
                <span v-for="(item,index) of songDetail.alia" :key="index">
                    {{item}}
                </span>
            </p>
            <div class="song-singer">
                <p>
                    <span class="song-singer-title">歌手：</span>
                    <span class="song-name-total">
                        <router-link class="song-singer-name" :to="{}" v-for="(item,index) of songDetail.ar" :key="index">{{item.name}}</router-link>
                    </span>
                </p>
                <p>
                    <span class="song-singer-title">所属专辑：</span>
                    <span><router-link class="song-singer-name" :to="{}">{{songDetail.al.name}}</router-link></span>
                    <ul class="tns">
                        <li v-for="(item,index) of songDetail.al.tns" :key="index">
                            <span>-</span>
                            <span>({{item}})</span>
                        </li>
                    </ul>
                </p>
            </div>
            <div style="overflow:hidden;">
                <ul>
                    <li class="songs-first-list">
                        <router-link :to="{}" class="songs-bg icon-button" :data-id="songDetail.id">
                            <span class="play-name">播放</span>
                        </router-link>
                        <router-link :to="{}" class="songs-add-margin" :data-id="songDetail.id"><span class="songs-add icon-button"></span></router-link>
                    </li>
                    <li class="songs-list">
                        <router-link :to="{}" class="songs-bg1 icon-button" :data-id="songDetail.id">
                            <span class="play-name">收藏</span>
                        </router-link>
                        <span class="songs-down icon-button"></span>
                    </li>
                    <li class="songs-list">
                        <router-link :to="{}" class="songs-bg2 icon-button" :data-id="songDetail.id">
                            <span class="play-name">分享</span>
                        </router-link>
                        <span class="songs-down icon-button"></span>
                    </li>
                    <li class="songs-list">
                        <router-link :to="{}" class="songs-bg3 icon-button" :data-id="songDetail.id">
                            <span class="play-name">下载</span>
                        </router-link>
                        <span class="songs-down icon-button"></span>
                    </li>
                    <li class="songs-list songs-list1">
                        <router-link :to="{}" class="songs-bg4 icon-button" :data-id="songDetail.id">
                            <span class="play-name" style="padding: 0px 1px 0 30px;">({{songComment.total}})</span>
                        </router-link>
                        <span class="songs-down icon-button"></span>
                    </li>
                </ul>
            </div>
            <Lyrics />  
        </div> 
        <MyComment />  
        <Comment />     
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Lyrics from '@/components/lyrics/lyrics'
import MyComment from '@/components/myComment/myComment'
import Comment from '@/components/comment/comment'
export default {
    components: {
       Lyrics,
       MyComment,
       Comment
    },
  data() {
    return {
      songDetail: {
          al: {
              picUrl: ''
          }
      }, //歌曲详情
      songComment: {}, //歌曲评论
    };
  },
  computed: {
      //['songId','commentNum']
      ...mapState({
          songId: state => state.song.songId,
          commentNum: state => state.song.commentNum
      })
  },
  methods: {
      ...mapMutations('song',['setSongId','setCommentNum'])
  },
  mounted() {
    let _self = this;
    let id = this.$route.query.id;
    console.log(id);
    this.setSongId(id);
    console.log(this.songId)
    let urlDetail = "/song/detail?ids=" + id;
    let urlComment = "/comment/music?id=" + id; 
    console.log(this.$route);
    this.$http({
      method: "post",
      url: urlDetail
    }).then(function(res) {
      //console.log(res.data.songs[0]);
      _self.songDetail = res.data.songs[0];
      console.log(_self.songDetail)
    });

    this.$http({
        method: "get",
        url: urlComment
    }).then(function(res) {
        console.log(res.data);
        _self.songComment = res.data;
        _self.setCommentNum(res.data.total);
    })
  }
};
</script>
<style src="./songDetail.css"></style>


