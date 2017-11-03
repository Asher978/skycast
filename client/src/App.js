import React, { Component } from 'react';
import weather from './weather.png';
import axios from 'axios';
import './App.css';
import Weather from './modules/Weather';

class App extends Component {
  constructor () {
    super ();
    this.state = {
      zip: null,
      weather: [],
      weatherLoaded: false,
    }
  }
  
  handleChange = (e) => {
    this.setState({ zip: e.target.value })
  }
  
  handleclick = (e) => {
    e.preventDefault();
    axios.post('/weather', {
      zip: this.state.zip,
    }).then(res => {
      var weatherData = this.state.weather.concat(res.data);
      this.setState({
        weather: weatherData,
        weatherLoaded: true,
      })
    }).catch(err => console.log(err));
  }


  renderTile () {
    if(this.state.weatherLoaded) {
      console.log(this.state.weather)
      // let myWeather = JSON.parse(Weather.getWeather());
      // console.log(myWeather);
      return this.state.weather.map((weather, index) => {
        return (
          <div className='subtile' key={index}>
            <h1>{weather.location}</h1>
            <h3>Current Conditions: <small>{weather.data.currently.summary}</small></h3>
            <h3>Current Temperature: <small>{weather.data.currently.temperature} F</small></h3>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className='tile'>
          {this.renderTile()}
        </div>
        <img className='logo' src={weather}/>
        <p>Wanna know if you'll melt outside?</p>
        <p>Start getting some weather.</p>
        <input type='text' maxLength='5' placeholder='ZIP CODE' onChange={this.handleChange} />
        <input type='button' value='search' onClick={this.handleclick} />
      </div>
    );
  }
}

export default App;
