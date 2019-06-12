<template>
  <el-carousel :interval="5000" arrow="always" ref="albums" style="margin: 20px 0 0;height: 186px; border: 1px solid #ccc;box-sizing:border-box;">
    <el-carousel-item v-for="(item,fIndex) in 2" :key="item" style="height: 184px;">
      <ul class="new-album-total" v-for="(item,index) of albums[fIndex]" :key="index">
        <li class="new-album-list ">
          <img class="album-list-img" :data-src="item.artist.picUrl" ref="albumsImg" alt="">
          <a href="javascript:;" class="album-list-bg cover-bg"></a>
          <p>
            <a href="javascript:;" class="album-list-link">
              {{item.name}}
            </a>
          </p>
          <p>
            <a href="" class="album-list-name">
              {{item.artist.name}}
            </a>
          </p>
        </li>
      </ul>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      albums: [
        [],
        []
      ]
    }
  },
  methods: {
    lazyImg () {
      let albumsImgHeight = this.$refs.albums.$el.getBoundingClientRect();
      let bodyScrollHeight = document.body.scrollTop; //滚动条滚动距离
      let windowClient = window.innerHeight; //浏览器可视高度
      let albumsImg = this.$refs.albumsImg;
      for(var i = 0; i < albumsImg.length; i++) {    
        if(albumsImgHeight.top < bodyScrollHeight + windowClient + 50) {
          albumsImg[i].setAttribute('src',albumsImg[i].getAttribute('data-src'));
        }
      }
    }
  },
  created() {
    // 新碟上架
    let _self = this;
    this.$http({
      method: 'get',
      url: '/top/album?offset=0&limit=10'
    }).then(function(res) {
      console.log(res)
      res.data.albums.forEach(function(item, index) {
        if (index > 4) {
          if (_self.albums[1] || (_self.albums[1] = [])) {
            _self.albums[1].push(item);
          }
        } else {
          if (_self.albums[0] || (_self.albums[0] = [])) {
            _self.albums[0].push(item);
          }
        }
      })
      console.log(_self.albums);
      //_self.albums = res.data.albums
    })
  },
  mounted() {
    let _self = this;
    window.onmousewheel = function() {
      _self.lazyImg()
    }
  }
}

</script>

<style src="./subContent1.css"></style>

