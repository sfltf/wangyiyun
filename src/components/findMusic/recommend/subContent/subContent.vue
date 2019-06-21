<template>
	<div class="sub-content">
		<ul class="sub-content-total">
			<li class="sub-content-list" v-for="(item,index) in music" :key="index">
				<div style="position:relative">
					<a class="list-link list-bg-position cover-bg" :href="item.linkSrc"></a>
					<img :src="item.coverImgUrl" alt="图片" style="width: 140px;height: 140px;">
					<div class="list-playVolume">
						<a class="play-bg list-playVolume-bg" :data-res-id="item.id" @click="playSong"></a>
						<span class="listen-bg list-playVolume-bg"></span>
						<span class="list-playCount">{{item.playCount}}</span>
					</div>
				</div>
				<div style="position:relative;height: 41px;">
					<a :href="item.linkSrc" class="link-title">{{item.name}}</a>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				music: []
			}
		},
		methods: {
			playSong(e) {
				var id = e.target.dataset.resId;
				var url = '/top/playlist?id=' + id
				this.$http({
					method: 'get',
					url: url
				}).then(function(res) {
					console.log(res)
				}).catch(function(e) {
					console.log(e)
				})
			}
		},
		created() {
			let _self = this;
			// 热门推荐
			this.$http({
				method: 'post',
				url: '/top/playlist?limit=8&order=hot'
			}).then(function(res) {
				console.log(res);
				_self.music = res.data.playlists;
				_self.music.forEach(function(item,index) {
					if(item.playCount.toString().length > 5) {
						var playCount = item.playCount.toString().length - 4;
						item.playCount = item.playCount.toString().slice(0,playCount) + '万';
						
					}
				})
			}).catch(function(e) {
				console.log(e)
			})
		}
	}
</script>
<style src="./subContent.css"></style>