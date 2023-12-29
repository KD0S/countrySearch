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
      <div className='countryDisplay'>
        <h1>{data[0].name.common}</h1>
          <div className='details'>
            <div className='data'>
              <p> <b>Capital</b> : {data[0].capital} <br/> <b>Area</b> : {data[0].area}</p>
              <b>Languages :</b>
              <ul>
                {
                  Object.values(data[0].languages).map(
                    language => <li key={language}>{language}</li>
                  )
                }
              </ul>
            </div>
            <img src={data[0].flags.png} alt={data[0].name.common}></img>
          </div>
        <button onClick={getWeatherData}>Get Weather Data</button>
      </div>
    )
  }

  

  else{
    return (
        <div className='countryDisplay'>
        <h1>{data[0].name.common}</h1>
        <div className='details'>
          <div className='data'>
            <p> <b>Capital</b> : {data[0].capital} <br/> <b>Area</b> : {data[0].area}</p>
            <b>Languages :</b>
            <ul>
              {
                Object.values(data[0].languages).map(
                  language => <li key={language}>{language}</li>
                )
              }
            </ul>
          </div>
          <img src={data[0].flags.png} alt={data[0].name.common}></img>
        </div>
        <h2>Weather in {data[0].capital}</h2>
        <p>temperature  {Math.round(weather.main.temp - 273.15)} Celsius</p>
        <img src={`${baseIconUrl}${weather.weather[0].icon}@2x.png`} alt='weather_icon'></img>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
   )
  }


}

export default SingleDisplay