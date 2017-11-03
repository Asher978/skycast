class Weather {
  
  static saveWeather(search) {
    let searchArray = [];
    searchArray.push(search)
    localStorage.setItem('myWeather', JSON.stringify(searchArray))
  }

  static getWeather () {
    return localStorage.getItem('myWeather');
  }

  static removeWeather (weather) {
    localStorage.removeItem(weather);
  }
}

export default Weather;