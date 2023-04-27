import axios from 'axios'
import React, { useState } from 'react'


const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = process.env.REACT_APP_API_KEY
const baseIconUrl = 'https://openweathermap.org/img/wn/'


const SingleDisplay = ({data}) => {
    
  const [weather, setWeather] = useState(null)
  
  const getWeatherData = () => {
    axios.get(`${baseUrl}q=${data[0].capital[0]}&appid=${apiKey}`).then(
      response => setWeather(response.data)
    )
  }
   

  if(!weather){
    return (
      <div>
      <h1>{data[0].name.common}</h1>
      <p>Capital : {data[0].capital} <br/> Area : {data[0].area}</p>
      <h3>Languages :</h3>
      <ul>
        {
          Object.values(data[0].languages).map(
            language => <li key={language}>{language}</li>
          )
        }
      </ul>
      <img src={data[0].flags.png} alt={data[0].name.common}></img>
      <button onClick={getWeatherData}>Get Weather Data</button>
    </div>
    )
  }

  

  else{
    console.log('render')
    return (
        <div>
        <h1>{data[0].name.common}</h1>
        <p> Capital : {data[0].capital} <br/> Area : {data[0].area}</p>
        <h3> Languages :</h3>
        <ul>
          {
            Object.values(data[0].languages).map(
              language => <li key={language}>{language}</li>
            )
          }
        </ul>
        <img src={data[0].flags.png} alt={data[0].name.common}></img>
        <h1>Weather in {data[0].capital}</h1>
        <p>temperature  {Math.round(weather.main.temp - 273.15)} Celsius</p>
        <img src={`${baseIconUrl}${weather.weather[0].icon}@2x.png`} alt='weather_icon'></img>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
   )
  }


}

export default SingleDisplay