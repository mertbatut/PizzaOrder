import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className='OrderMain'>
        <hr />
        <div className='OrderButton'>
          <div className='OrderDiv1'>
            <button>-</button>
            <input type="number" />
            <button>+</button>
          </div>
          <div className='OrderDiv2'></div>
        </div>
      </div>
    )
  }
}
