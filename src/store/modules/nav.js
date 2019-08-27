
const nav = {
  state: {
    openedTab: [],
    activeTab: [],
  },
  mutations: {
    addTab (state, componentMsg) {
      state.openedTab.push(componentMsg)
    },
    changeTab (state, componentMsg) {
      state.activeTab = componentMsg
    },
    deductTab (state, componentMsg) {
      let arr = []
      state.openedTab.forEach((v,k) => {
         arr.push(v.componentName)
      })
      let index =  arr.indexOf(componentMsg)
      state.openedTab.splice(index, 1)      
    }
  }
}
export default nav