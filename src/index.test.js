import ReactX from '.'

const options = {
  modules: [
    {
      name: 'test',
      state: {
        test: 'test'
      },
      getters: {
        get: (state) => state.test
      },
      actions: {
        test: ({ commit }, data) => {
          commit('test', data)
        }
      },
      mutations: {
        test: (state, data) => {
          state.test = data
        }
      }
    }
  ]
}

describe('ReactX', () => {
  it('is truthy', () => {
    expect(ReactX).toBeTruthy()
  })

  it('has options', () => {
    const reactx = new ReactX(options)
    expect(reactx.options).toEqual(options)
  })

  it('can get', () => {
    const reactx = new ReactX(options)
    const getter = reactx.getters('test/get')
    expect(getter).toEqual('test')
  })

  it('can dispatch', () => {
    const reactx = new ReactX(options)
    reactx.dispatch('test/test', 'abcd')
    const getter = reactx.getters('test/get')
    expect(getter).toEqual('abcd')
  })

  it('can use local storage', () => {
    options.modules[0].persistent = true
    const reactx = new ReactX(options)
    reactx.dispatch('test/test', 'abcd')
    const getter = reactx.getters('test/get')
    expect(getter).toEqual('abcd')
  })
})
