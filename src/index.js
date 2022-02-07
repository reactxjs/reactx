export default class ReactX {
  modules = {}
  module = null
  options = {}
  storage = null
  constructor(options = {}) {
    this.options = options
    this.storage = options.storage ? options.storage : null

    options.modules.forEach((module) => {
      if (this.modules.hasOwnProperty(module.name)) {
        console.module(`[reactx] Module of name ${module.name} already exists`)
        return
      }
      this.modules[module.name] = module
      if (this.modules[module.name].persistent && this.storage) {
        if (!this.storage) {
          console.error('[reactx] No storage provided')
          return
        }

        const storage = JSON.parse(this.storage.getItem('reactx'))
        if (storage) {
          this.modules[module.name].state[module.name] = storage[module.name]
        }
      }
    })
  }

  dispatch(type, payload) {
    const [module, action] = type.split('/')
    this.module = module
    this.modules[module].actions[action](
      { commit: (mutator, data) => this.commit(mutator, data) },
      payload
    )
    if (this.modules[module].persistent && this.storage) {
      if (!this.storage) {
        console.error('[reactx] No storage provided')
      }
      const storage = this.storage.getItem('reactx')
      const storageState = JSON.parse(storage) || {}
      this.options.modules.forEach((module) => {
        const key = Object.keys(module.state)
        if (this.modules[module.name].persistent) {
          storageState[module.name] =
            this.modules[module.name].state[key.toString()]
        }
      })

      this.storage.setItem('reactx', JSON.stringify(storageState))
    }
  }

  commit(mutator, data) {
    this.modules[this.module].mutations[mutator](
      this.modules[this.module].state,
      data
    )
  }

  getters(type) {
    const [module, getter] = type.split('/')
    return this.modules[module].getters[getter](this.modules[module].state)
  }
}
