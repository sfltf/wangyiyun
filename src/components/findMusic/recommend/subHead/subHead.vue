<template>
	<div class="topic-top">
		<span class="topic-top-sign topic-top-bg">
		</span>
		<span class="topic-top-title">{{topic.title}}</span>
		<slot name="breadCrumbs" v-if="topic.breadIsShow"></slot>
		<span class="topic-top-more"><a :href="topic.moreSrc">更多</a></span>
		<i class="more-icon topic-top-bg"></i>
	</div>
</template>
<script>
	export default {
		props: {
			result: Object
		},
		data () {
			return {
				topic: this.result
			}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>
<style src="./subHead.css"></style>