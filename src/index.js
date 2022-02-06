export default class ReactX {
  state = {}
  store = null
  options = {}
  storage = null;
  constructor(options = {}) {
    this.options = options;
    this.storage = options.storage;
    options.modules.forEach((module) => {
      this.state[module.name] = module
      if (this.state[module.name].persistent) {
        const storage = this.storage.getItem('reactx')
        if (storage) {
          console.log(storage)
          // this.state[module.name].state = storage[module.name]
        }
      }
    })
  }

  dispatch(type, payload) {
    const [store, action] = type.split('/')
    this.store = store
    this.state[store].actions[action](
      { commit: (mutator, data) => this.commit(mutator, data) },
      payload
    )
    if (this.state[store].persistent) {
      // const storage = this.storage.getItem('reactx')
      this.storage.setItem(
        'reactx',
        JSON.stringify({
          [store]: this.state[store].state
        })
      )
    }
  }

  commit(mutator, data) {
    this.state[this.store].mutations[mutator](
      this.state[this.store].state,
      data
    )
  }

  getters(type) {
    const [store, getter] = type.split('/')
    return this.state[store].getters[getter](this.state[store].state)
  }
}
