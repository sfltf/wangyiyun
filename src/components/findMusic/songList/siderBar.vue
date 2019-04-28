<template>
  <div>
    <template v-for="(item,index) of subMenu">
    	<!-- 无子 -->
      <el-menu-item :index="item.path" v-if="!item.children">
        <i :class="item.iconName"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <!-- 有子 -->
      <el-submenu :index="item.path" v-if="item.children">
        <template slot="title">
          <i :class="item.iconName"></i>
          <span>{{item.name}}</span>
        </template>
        <!-- 递归 -->
        <siderBar :menu="item.children"></siderBar>       
      </el-submenu> 

    </template>
    
  </div>

</template>
<script>
export default {
  name: "siderBar",
  props: {
      menu: Array
  },
  data() {
  	return {
  		subMenu: this.menu
  	}
    
  },
  methods: {
  },
  mounted() {
    //console.log(this.subMenu);
  }
}

</script>
