<template>
	<div class="sub-content">
		<ul class="sub-content-total">
			<li class="sub-content-list" v-for="(item,index) in music" :key="index">
				<div style="position:relative">
					<a class="list-link" :href="item.linkSrc"></a>
					<img :src="item.imgSrc" alt="图片">
					<div class="list-playVolume"></div>
				</div>
				<div>
					<a :href="item.linkSrc" class="link-title">{{item.title}}</a>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				music: [
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/1.jpg',title: '人生没有解药但止疼片很多 比如音乐',playVolume:'460万'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/2.jpg',title: '「以诗开篇」一腔诗意赋予谁',playVolume:'84万'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/3.jpg',title: '晚安，听完这首男友音我就睡了',playVolume:'543万'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/4.jpg',title: '巴黎圣母院大火：时光难留 没有来日方长',playVolume:'33997'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/5.jpg',title: '如果思念有声，大概是这样的旋律',playVolume:'359万'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/6.jpg',title: '多少友情，现在唯一的联系只剩下点赞',playVolume:'7063'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/7.jpg',title: '经典老歌，久听不厌',playVolume:'7796万'},
					{linkSrc: 'javascript:;', imgSrc: '/static/hotImages/8.jpg',title: '庸人自扰（张家旺cover）',playVolume:'210万'}
				]
			}
		},
		methods: {

		}
	}
</script>
<style src="./subContent.css"></style>