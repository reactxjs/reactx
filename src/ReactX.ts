/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { IModule, IOptions } from './interfaces'

export default class ReactX {
  options: IOptions
  modules: object = {}
  module: string = ''
  storage: any

  constructor(options: IOptions) {
    if (!options) {
      console.error('[reactx] No options provided')
      return
    }

    if (options.modules.length === 0) {
      console.error('[reactx] No modules provided')
      return
    }

    this.options = _.cloneDeep(options)
    this.storage = this.options.storage

    this.options.modules.forEach((module: IModule) => {
      if (this.modules) {
        if (module.name in this.modules) {
          console.error(`[reactx] Module of name ${module.name} already exists`)
          return
        }
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

  dispatch = (type: string, payload: any) => {
    const [module, action] = type.split('/')
    this.module = module
    this.modules[module].actions[action](
      {
        commit: (mutator: string, data: any) => {
          this.commit(mutator, data)
        }
      },
      payload
    )
    if (this.modules[module].persistent && this.storage) {
      if (!this.storage) {
        console.error('[reactx] No storage provided')
      }
      const storage = this.storage.getItem('reactx')
      const storageState = JSON.parse(storage) || {}
      this.options.modules.forEach((module: IModule) => {
        const key = Object.keys(module.state)
        if (this.modules[module.name].persistent) {
          storageState[module.name] =
            this.modules[module.name].state[key.toString()]
        }
      })

      this.storage.setItem('reactx', JSON.stringify(storageState))
    }
  }

  commit = (mutator: string, data: any) => {
    this.modules[this.module].mutations[mutator](
      this.modules[this.module].state,
      data
    )
  }

  getters = (type: string) => {
    const [module, getter] = type.split('/')
    return this.modules[module].getters[getter](this.modules[module].state)
  }
}
