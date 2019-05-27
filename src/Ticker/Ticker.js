import React from 'react';

import './Ticker.css';

export default class Ticker extends React.Component {
  state = {
    value: 0,
  };

  updateExchangeRate = () => {
    // https://api.cryptonator.com/api/ticker/btc-usd
    return fetch(`https://api.cryptonator.com/api/ticker/${this.props.pair}`)
      .then(r => r.json())
      .then(res => {
       // console.log(res);
        this.setState({
          value: res.ticker.price,
        });
      });
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.isActive && !this.props.isActive) {
      this.updateExchangeRate();
      this.interval = setInterval(this.updateExchangeRate, 300000);
    } else if (!nextProp.isActive && this.props.isActive) {
      clearInterval(this.interval);
      this.setState({
        value: 0,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { pair } = this.props;
    return (
      <div className="ticker">
        <p>{pair.toUpperCase().replace('-', ' to ')}</p>
        {/* <p>{this.state.value}</p> */}
        <p>{Number(this.state.value).toFixed(2)}</p>
      </div>
    );
  }
}
