import React, { Component } from 'react'
import OrderButton from '../components/OrderButton'
import Footer from '../components/Footer'

export default class Home extends Component {
  render() {
    return (
      <div>
        <OrderButton/>
        <Footer/>
      </div>
    )
  }
}
