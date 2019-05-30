<template>
  <ul>
    <li :class="{'list-color': list[index].text}" v-for="(item,index) of list" :key="index">{{item.text}}</li>
    <button @click="addList">修改</button>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
  	let _self = this;
    for (let i = 0; i < 100; i++) {
      this.list.push({text: false})
    }
  },
  mounted() {
  	let _self = this;
  	let i = 0;	
  },
  methods: {
    addList() {
      this.list[1].text = true
    }
  }
}

</script>
<style>
	.list-color {
		color: #f00;
	}
</style>
