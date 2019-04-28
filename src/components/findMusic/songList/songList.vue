<template>
  <div>
    <el-row class="tac">
      <el-col :span="4" style="position:absolute">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="selectedMenu" background-color="#545c64" text-color="#fff" unique-opened active-text-color="#ffd04b" :default-active="currentMenu" router>
          <siderBar :menu="newMenu"></siderBar>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
    <rightMain></rightMain>
  </div>
</template>
<script>
import siderBar from './siderBar'
import rightMain from './rightMain/rightMain'
export default {
  components: {
    siderBar,
    rightMain
  },
  data() {
    return {
      currentMenu: '/home',
      newMenu: [],
      result: {},
      menu: []
      /*menu: [{
          id: 99,
          name: 'home',
          iconName: 'el-icon-location',
          path: '/home',
          serialN: 0
        },
        {
          name: '导航一',
          iconName: 'el-icon-location',
          path: '/son',
          children: [
            { id: 0, name: '导航5', path: '/son/secondSon', serialN: 1 },
            { id: 1, name: '导航6', path: '/son/secondSon1', serialN: 2 }
          ]
        },
        {
          name: '导航二',
          iconName: 'el-icon-menu',
          path: '/son1',
          children: [
            { id: 2, name: '导航7', path: '/son1/secondSon2', serialN: 3 },
            { id: 3, name: '导航8', path: '/son1/secondSon3', serialN: 4 }
          ]
        },
        { id: 4, name: '导航三', iconName: 'el-icon-document', path: '/son2', serialN: 5 },
        { id: 5, name: '导航四', iconName: 'el-icon-setting', path: '/son3', serialN: 6 }
      ]*/
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    arrRecursive(arr, option) {
      var _self = this;
      for (var i = 0; i < arr.length; i++) {
        if (!arr[i].children && option === arr[i].path || !arr[i].children && option == arr[i].name || !arr[i].children && option == arr[i].id) {
          this.result = arr[i];
          break;
        } else if (arr[i].children) {
          _self.arrRecursive(arr[i].children, option);
        }
      }
      return this.result;
    },
    selectedMenu(index, indexPath) {
      this.currentMenu = this.$route.path;
      let _self = this;
      var menuOption = this.arrRecursive(_self.menu, index);
      console.log(menuOption);
      let obj = {};
      obj.title = menuOption.name;
      obj.name = menuOption.id;
      obj.serialN = menuOption.serialN;
      this.$bus.$emit('maincontent', obj) //触发事件
    },
    getPath() {
      console.log(this.$route)
      this.currentMenu = this.$route.path;
    },
    processMenu (data) {
    	let _self = this;
    	if(data !== null) {
    		let map = {};
    		data.forEach(function(item,index) {
    			map[item.id] = item;
    		})
    		data.forEach(function(item,index) {
    			var parent = map[item.parentId];
    			//console.log(parent);
    			if(parent) {
    				(parent.children || (parent.children = [])).push(item);
    			}else {
    				_self.newMenu.push(item)
    			}
    		})
    	}
    	console.log(this.newMenu);
    	return this.newMenu;
    	
    }
  },
  watch: {
    '$route': 'getPath'
  },
  created() {
  	let _self = this;
    this.$http({
      method: 'get',
      url: '/getMenu',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(res) {
      console.log(res);
      _self.menu = _self.processMenu(res.data);

    }).catch(function(e) {
      console.log(e);
    })
  },
  mounted() {
    let _self = this;
    let href = window.location.href;
    this.currentMenu = href.split('/#')[1];
    this.$bus.$on('updateMenu', function(val) {
      console.log(val);
      let obj = _self.arrRecursive(_self.menu, val);
      console.log(obj);
      _self.currentMenu = obj.path;
      console.log(_self.currentMenu)
    })
    console.log(_self.menu)
  }
}

</script>
<style>
.el-tabs__nav>.el-tabs__item:nth-child(1) span {
  display: none;
}

</style>
