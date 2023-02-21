import React from 'react';
import '../cssfiles/weatherapp.css';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import clearsky from '../cssfiles/images/clearsky.png';
import clouds from '../cssfiles/images/clouds.png';
import rain from '../cssfiles/images/rain.png';
import snow from '../cssfiles/images/snow.png';

const WeatherApp = () => {

  const [city,setCity] = useState();
  const [search,setSearch] = useState(false);
  const [lat,setLat] = useState();
  const [lon,setLon] = useState();
  const [weatherData,setWeatherData] = useState();
  const [rain,setRain] = useState();
 
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '44de25f460msh6d806500757ae43p19d875jsnbdf24f9894db',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
     
    }
  };



  const handleSubmit =  (e) =>
  {
    setSearch(!search);
    console.log(search);
  }

 


  useEffect(()=>{
    const fetchapi = async () =>{
      const url = `https://trueway-geocoding.p.rapidapi.com/Geocode?address=${city}&language=en`;
      const response = await fetch(url,options);
      const resJson = await response.json();
      setLat(resJson.results[0].location.lat);
      setLon(resJson.results[0].location.lng);
   }
    fetchapi();
  
  },[search]);

  useEffect(()=>
  {
    const fetchweather = async ()=>
    {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=122c85d6a42e0059e1418692425a07ff`;
      const response = await fetch(url);
      const resJson = await response.json();
      setWeatherData(resJson.main);
      setRain(resJson.weather[0]);

      
    }
    fetchweather();

  },[search]);

  
  return (
    <>
   <section className="vh-100" style={{backgroundColor: "#4B515D"}}>
  <div className="container py-5 h-100">

    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-8 col-lg-6 col-xl-4">

        <div className="card" style={{color: "#4B515D",borderRadius: "35px"}}>
          <div className="card-body p-4">

            <div className='textfield'>
            <TextField id="outlined-basic" label="Enter City Name" variant="outlined"  onChange={(event)=>{setCity(event.target.value)}}/>
           
            </div>
            <div className='searchbutton'>
            <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Search</button>
            </div>
            <div className="d-flex flex-column text-center mt-5 mb-4">
              <h6 className="display-4 mb-0 font-weight-bold" style={{color: "#1C2331"}}>  </h6>
              <span style={{color: "black",fontSize:"2rem",marginTop:"-1.5rem",fontFamily:"poppins",fontWeight:"600"}}>{city}</span>
            </div>

        {!weatherData?
          <div className='main'>
          <div>
          <img src={clearsky} alt="Icon"
              width="100px"/>
              </div>
              <div><i className="fas fa-wind fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"> 
              Overcast:
                </span></div>
                <div><i className="fas fa-tint fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"> Temperature:</span>
            </div>
            <div><i className="fas fa-sun fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"> Humidity: </span>
            </div>
          </div>
          :
          <div className='main'>
          <div>
            {rain.main=="Clear"?
            
            <img src={clearsky} alt="Icon"
              width="100px"/>
              :
              rain.main=="Clouds"?
              <img src={clouds} alt="Icon"
              width="100px"/>
              :
              rain.main=="Rain"?
              <img src={rain} alt="Icon"
              width="100px"/>
              :
              <img src={snow} alt="Icon"
              width="100px"/>

        }
          </div>
          <div><i className="fas fa-wind fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"> 
              Overcast: {rain.main}
                </span></div>
                <div><i className="fas fa-tint fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"> Temperature: {weatherData.temp}</span>
            </div>
            <div><i className="fas fa-sun fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"> Humidity: {weatherData.humidity}</span>
            </div>

        </div>
        }
            
            
            
        
           
            
          </div>
        </div>

      </div>
    </div>

  </div>
</section>

   
    </>
  )
}

export default WeatherApp;