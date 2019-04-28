<template>
  <div style="float:right;width: 83.3333%;">
    <mainTab></mainTab>
  </div>
</template>
<script>
import mainTab from '../mainTab/mainTab'
export default {
  components: {
    mainTab
  },
  data() {
    return {

    }
  },
  methods: {
  	currentTab(val) {
      console.log('123')
  		console.log(val)
  	}
  },
  mounted() {
    
  }
}

</script>
