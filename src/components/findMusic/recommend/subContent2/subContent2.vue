<template>
	<div style="margin: 20px 0 42px;">
		<ul class="bangdan-total">
			<li class="bangdan-list">
				<div class="bangdan-top">
					<img class="bangdan-img" src="/static/images/biaosheng.jpg" alt="">
					<a class="bangdan-bg cover-bg" href="javascript:;"></a>
					<p class="bangdan-title">云音乐飙升榜</p>
					<div style="bangdan-operat">
						<a href="javascript:;" class="bangdan-play list-bg"></a>
						<a href="javascript:;" class="bangdan-collection list-bg"></a>
					</div>
				</div>
				<ul class="bangdan-content-total">
					<li class="bangdan-content-list" v-for="(item,index) of soaring" :key="index">
						<span class="serialN">{{index + 1}}</span>
						<a :href="item.href" class="bangdan-content-name" :title="item.name">{{item.name}}</a>
						<span class="bangdan-content-opreat">
							<a href="javascript:;" class="bangdan-content-play list-bg" title="播放"></a>
							<a href="javascript:;" class="bangdan-content-add icon-bg" title="添加到播放列表"></a>
							<a href="javascript:;" class="bangdan-content-collection list-bg" title="收藏"></a>
						</span>
					</li>
				</ul>
				<div class="allLink">
					<a href="javascript:;">查看全部></a>
				</div>
			</li>
			<li class="bangdan-list">
				<div class="bangdan-top">
					<img class="bangdan-img" src="/static/images/newSong.jpg" alt="">
					<a class="bangdan-bg cover-bg" href="javascript:;"></a>
					<p class="bangdan-title">云音乐新歌榜</p>
					<div style="bangdan-operat">
						<a href="javascript:;" class="bangdan-play list-bg"></a>
						<a href="javascript:;" class="bangdan-collection list-bg"></a>
					</div>
				</div>
				<ul class="bangdan-content-total">
					<li class="bangdan-content-list" v-for="(item,index) of newSong" :key="index">
						<span class="serialN">{{index + 1}}</span>
						<a href="javascript" class="bangdan-content-name" :title="item.name">{{item.name}}</a>
						<span class="bangdan-content-opreat">
							<a href="javascript:;" class="bangdan-content-play list-bg" title="播放" @click="addPlay"></a>
							<a href="javascript:;" class="bangdan-content-add icon-bg" title="添加到播放列表"></a>
							<a href="javascript:;" class="bangdan-content-collection list-bg" title="收藏"></a>
						</span>
					</li>
				</ul>
				<div class="allLink allLink1">
					<a href="javascript:;">查看全部></a>
				</div>
			</li>
			<li class="bangdan-list">
				<div class="bangdan-top">
					<img class="bangdan-img" src="/static/images/yuanchuang.jpg" alt="">
					<a class="bangdan-bg cover-bg" href="javascript:;"></a>
					<p class="bangdan-title">网易原创歌曲榜</p>
					<div style="bangdan-operat">
						<a href="javascript:;" class="bangdan-play list-bg"></a>
						<a href="javascript:;" class="bangdan-collection list-bg"></a>
					</div>
				</div>
				<ul class="bangdan-content-total">
					<li class="bangdan-content-list" v-for="(item,index) of collection" :key="index">
						<span class="serialN">{{index + 1}}</span>
						<a href="javascript" class="bangdan-content-name" :title="item.name">{{item.name}}</a>
						<span class="bangdan-content-opreat">
							<a href="javascript:;" class="bangdan-content-play list-bg" title="播放"></a>
							<a href="javascript:;" class="bangdan-content-add icon-bg" title="添加到播放列表"></a>
							<a href="javascript:;" class="bangdan-content-collection list-bg" title="收藏"></a>
						</span>
					</li>
				</ul>
				<div class="allLink allLink2">
					<a href="javascript:;">查看全部></a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				soaring: [],
				newSong: [],
				collection: []
			}
		},
		methods: {

		},
		created() {
			let _self = this;
			// 音乐飙升榜
			this.$http({
				method: 'get',
				url: '/top/list?idx=3'
			}).then(function(res) {
				console.log(res.data.playlist);
				res.data.playlist.tracks.forEach(function(item,index) {
					if(index <= 9) {
						_self.soaring.push(item);
						item.href = '/song?id=' + item.id;
					}
				})
			}).catch(function(e) {
				console.log(e)
			});
			//云音乐新歌榜
			this.$http({
				method: 'get',
				url: '/top/list?idx=0'
			}).then(function(res) {
				res.data.playlist.tracks.forEach(function(item,index) {
					if(index <= 9) {
						_self.newSong.push(item);
						item.href = '/song?id=' + item.id;
					}
				})
			}).catch(function(e) {
				console.log(e)
			});
			// 网易原创歌曲榜
			this.$http({
				method: 'get',
				url: '/top/list?idx=2'
			}).then(function(res) {
				res.data.playlist.tracks.forEach(function(item,index) {
					if(index <= 9) {
						_self.collection.push(item);
						item.href = '/song?id=' + item.id;
					}
				})
			}).catch(function(e) {
				console.log(e)
			});


		}
	}
</script>
<style src="./subContent2.css"></style>