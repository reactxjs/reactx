/* eslint-disable no-unused-vars */
import React from 'react'

const connect = (mapStateToProps: object = {}) => {
  console.log(mapStateToProps)
  return (Child: React.Component) => {
    console.log(Child)
    return Child
  }
}

export default connect
