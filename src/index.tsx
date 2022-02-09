/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'

import ReactX from './ReactX'
import connect from './connect'

const Provider = (props: any) => {
  const store: ReactX = new ReactX(props.options)

  const child: React.Component = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      store
    })
  })

  const modules = Object.entries(store.modules)
  modules.forEach(([name]) => {
    useEffect(() => {
      console.log('rerender')
      console.log(store.modules[name].state)
    }, [store.modules[name].state])
  })

  return <React.Fragment>{child}</React.Fragment>
}

/* class Provider extends React.Component {
  store: ReactX
  child: any

  constructor(props: any) {
    super(props)
    this.store = props.store
    React.createContext(this.store)
    this.child = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        store: this.store
      })
    })

    this.state = {}

    const modules = Object.entries(this.store.modules)
    modules.forEach(([name, module]) => {
      this.state[name] = module.state[name]
    })
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log(prevProps, prevState)
  }

  render() {
    console.log(this.state)
    return <React.Fragment>{this.child}</React.Fragment>
  }
} */

export { Provider, connect }
