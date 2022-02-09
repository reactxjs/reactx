export default interface IModule {
  name: string
  state: Object | Array<any>
  persistent: boolean
  getters: Object
  mutations: Object
  actions: Object
}
