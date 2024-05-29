import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  increment = () => {
    this.setState({ value: this.state.value + 1 });
  }

  decrement = () => {
    if (this.state.value > 0) {
      this.setState({ value: this.state.value - 1 });
    }
  }

  handleChange = (event) => {
    this.setState({ value: parseInt(event.target.value) || 0 });
  }

  render() {
    return (
      <div className='OrderMain'>
        <hr />
        <div className='OrderButton'>
          <div className='OrderDiv1'>
            <button className='border-solid border-2 w-[47px] h-[56px] border-[#FAF7F2] bg-[#FAF7F2] ' onClick={this.decrement}>-</button>
            <input className='border-solid border-2 w-[47px] h-[56px] border-[#FAF7F2] bg-[#FAF7F2] '
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button className='border-solid border-2 w-[47px] h-[56px] border-[#FAF7F2] bg-[#FAF7F2] ' onClick={this.increment}>+</button>
          </div>
          <div className='OrderDiv2'>
            <div>
              <p className='font-semibold text-lg text-[#CE2829]'>110.50₺</p>
              <p className='font-semibold text-lg text-[#CE2829]'>Toplam</p>
              <p className='font-semibold text-lg text-[#5F5F5F]'>25.00₺</p>
              <p className='font-semibold text-lg text-[#5F5F5F]'>Seçimler</p>
              <p className='font-semibold text-xl text-[#292929]'>Sipariş Toplamı</p>
            </div>
            <button>Sipariş Ver</button>
          </div>
        </div>
      </div>
    )
  }
}
