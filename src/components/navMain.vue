<!--本页为tab标签-->
<template>
<div>
<el-tabs v-model="editableTabsValue" type="card" closable @tab-click="handleClickTab($event)"  @tab-remove="removeTab">
  <el-tab-pane
    v-for="item in editableTabs"
    :key="item.name"
    :color="item.path"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>
</div>
</template>

<script>

export default {
  name: 'navMain',
  data () {
    return {
        editableTabsValue: '',
        editableTabs: [],
        tabIndex: 0,
        openedTab: []
    }
  },
  
  computed: {
    getOpenedTab () {
      return this.$store.state.nav.openedTab
    },
    changeTab () {
      return this.$store.state.nav.activeTab
    }
  },

  watch: {
      getOpenedTab (val) {
          if (val.length > this.openedTab.length) {
            let newTab = val[val.length - 1] // 新增的肯定在数组最后一个
            ++this.tabIndex
            this.editableTabs.push({ 
              title: newTab.componentName,
              name: newTab.componentName,
              path: newTab.componentPath,
              content: ''
            })

            this.editableTabsValue = newTab.componentName
            this.openedTab.push(newTab)
            // console.log(' this.openedTab', this.openedTab)
          }
          // console.log(val)
        },


        changeTab (val) {
          // 监听activetab以实现点击左侧栏时激活已存在的标签
          if (val.componentName !== this.editableTabsValue) {
            this.editableTabsValue = val.componentName
          }
        }
      
  },

  methods: {
        handleClickTab (e) {
            // console.log('ee',e)
            let componentMsg = {componentName:e.name,componentPath:e.$route.path}
            this.$store.commit('changeTab',componentMsg)
            let aname = e.$attrs.color;
            console.log('aname',aname)
            this.$router.push(aname)
        },

        removeTab(targetName) {
              let tabs = this.editableTabs;
              let activeName = this.editableTabsValue;
              console.log('tabs',tabs)
              if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    console.log('cc',nextTab.name)
                    if (nextTab) {
                      activeName = nextTab.name;         
                    }
                  }
                });
              }
              this.$store.commit('deductTab', targetName)
              console.log('33',this.openedTab)   
              let arr = [];
              this.openedTab.forEach(v=>{
                arr.push(v.componentName)
              })
              let deductIndex = arr.indexOf(targetName)
              this.openedTab.splice(deductIndex, 1);

              let arrs =[];
              console.log('44',this.openedTab)
              this.openedTab.forEach(v=>{
                arrs.push(v.componentName)
              })
              console.log('arrs',arrs)
              let lindex = arrs.indexOf(activeName)
            
              let lpath = this.openedTab[lindex].componentPath
              console.log('index',lpath)
              this.$router.push(lpath)
              this.editableTabsValue = activeName;
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
              if (this.openedTab.length === 0) {
              this.$store.commit('addTab', 'index')
              this.$router.push('/clue')
            }
        }
  },

}
</script>

<style scoped lang="scss">
/deep/ .el-tabs__nav-prev{
       line-height: 30px;
 } 
/deep/.el-tabs__item{
  height: 30px;
  line-height: 30px;
}  
</style>
