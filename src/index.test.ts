import ReactX from '.'

interface IState {
  test: string
}

const options = {
  storage: {} as any,
  modules: [
    {
      name: 'test',
      persistent: false,
      state: {
        test: 'test'
      },
      getters: {
        get: (state: IState) => state.test
      },
      actions: {
        test: (context: any, data: string) => {
          context.commit('test', data)
        }
      },
      mutations: {
        test: (state: IState, data: string) => {
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
