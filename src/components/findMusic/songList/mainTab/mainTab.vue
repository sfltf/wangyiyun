<template>
  <el-tabs v-model="editableTabsValue" type="card" @edit="handleTabsEdit" @tab-click="checkTab">
    <el-tab-pane :key="index" v-for="(item, index) in editableTabs" closable :label="item.title" :name="item.name">
      <component :is="comps[index]"></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import homeTabContent from '../homeTabContent/homeTabContent'
import secondSon from '../son/secondSon/secondSon'
import secondSon1 from '../son/secondSon1/secondSon1'
import secondSon2 from '../son1/secondSon2/secondSon2'
import secondSon3 from '../son1/secondSon3/secondSon3'
import son2 from '../son2/son2'
import son3 from '../son3/son3'
export default {
  components: {
    'homeTabContent': homeTabContent,
    'secondSon': secondSon,
    'secondSon1': secondSon1,
    'secondSon2': secondSon2,
    'secondSon3': secondSon3,
    'son2': son2,
    'son3': son3
  },
  data() {
    return {
      index: 0,
      editableTabsValue: '99',
      editableTabs: [{
        title: 'home',
        name: '99',
      }],
      comps: [homeTabContent,secondSon,secondSon1,secondSon2,secondSon3,son2,son3],
      apps: []
      //tabIndex: 99
    }
  },
  methods: {
    checkTab(e) {
    	console.log(e)
    	this.$bus.$emit('updateMenu',e.label);
      //console.log(this.apps);
    },
    /*currentTab(val) {
      let _self = this;
      this.editableTabs.forEach(function(item, index) {
        if (item.title === val.title) {
          _self.editableTabsValue = val.name.toString();
        } else {
          _self.editableTabs.push(val);
        }
      })
    },*/
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.$bus.$emit('updateMenu',activeName);
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  },
  mounted() {
    let _self = this;
    this.$bus.$on('maincontent', function(val) {
      console.log(val);
      let obj = {};
      obj = val;
      //_self.editableTabs.push(obj);
      console.log(_self.editableTabs);
      _self.editableTabs.some(function(item, index) {
        console.log(index);
        if (item.title === val.title) {
          _self.editableTabsValue = val.name;
          return true;
        }
        if (index === _self.editableTabs.length - 1 && item.title != val.title) {
          _self.editableTabs.push(val);
          _self.editableTabsValue = val.name;
          _self.index = val.serialN;
        }
      })

    })

  }
}

</script>
