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
  		let obj = {};
  		obj.text = Math.ceil(Math.random() * 100);
  		this.list.push(obj);
  		console.log(this.list);
  	}
  }
}

</script>
