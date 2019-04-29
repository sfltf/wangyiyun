<template>
  <ul>
    <li v-for="(item,index) of list" :key="index">{{item.text}}</li>
    <button @click="addList">增加</button>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { text: '1233' }
      ]
    }
  },
  methods: {
  	addList() {
  		this.$http({
  			method: 'get',
  			url: 'search?keywords=海阔天空'
  		}).then(function(res) {
  			console.log(res)
  		}) 
  	}
  }
}

</script>
