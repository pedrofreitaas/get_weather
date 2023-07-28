import { useEffect, useState } from 'react';
import './App.css';
import './Main.css';
import weatherCodeIcon from "./weatherJson"
import { HiOutlineThumbUp } from "react-icons/hi";
import { WiAlien } from 'react-icons/wi';
import { BsCompass, BsSpeedometer2 } from "react-icons/bs";
import { TbTemperature } from "react-icons/tb";
import { CiGps } from "react-icons/ci";

function WeatherIcon(weatherJson) {
  if(!weatherJson.defined)
    return (<div></div>);

  let icon = 0;

  try {
    icon = weatherCodeIcon[weatherJson.weather.code];
  } catch {
    icon = <WiAlien size={50} color="000"/>;
  }
  
  return (
    <div className="weatherIcon"> 
      {icon} 
    </div>
  );
}

function MainAPIError() {
  return (
    <main>
      <h2> Not able to retrieve API's data. </h2>
    </main>
  );
}

function Main(weatherJson) {
  return (
    <main>
      <div className='main_header'> 
        <h2> {weatherJson.city_name} </h2> 
        {WeatherIcon(weatherJson)} 
      </div>
      <span className="date_span"> {weatherJson.datetime} </span>
      <span> <CiGps size={35}/> ({weatherJson.lat}, {weatherJson.lon}) </span>
      <span> <TbTemperature size={35}/> {weatherJson.app_temp}°C </span>
      <span className='wind_info'> <h3>Wind</h3>
        <div className='wind_dir'> <BsCompass size={30}/> {weatherJson.wind_cdir} </div>
        <div className='wind_speed'> <BsSpeedometer2 size={30}/> {weatherJson.wind_spd} m/s </div>
      </span>
    </main>
  );
}

function App() {
  const [weatherJson, updateWeatherJson] = useState({
    defined: false,
  });

  // animate main/weatherIcon after every weather search.
  useEffect( () => {
    function changeMainAnimation(animationName) {
      const main = document.getElementsByTagName("main")[0];
      if(main !== undefined) main.className=animationName;
    }

    function changeWeatherIconAnimation(animationName) {
      const weatherIcon = document.getElementsByClassName("weatherIcon")[0];
      if(weatherIcon !== undefined) weatherIcon.className=`weatherIcon ${animationName}`;
    }

    changeMainAnimation("animationX");
    changeWeatherIconAnimation("animationY");

    setTimeout( () => {
      changeMainAnimation("");
      changeWeatherIconAnimation("");
    }, 1000);

  }, [weatherJson]);

  return (
    <div 
    className="App">
      <div className="searchBox">
        <h2> Get Weather </h2> 
        <div className="inputs">
          <input id="input" type="text" placeholder="Digit city name."></input>
          <button id="button" onClick={async () => {updateWeatherJson(await getWeatherJson())}}> <HiOutlineThumbUp size={30} color="#000"/> </button>
        </div>
      </div>

      {weatherJson.defined && weatherJson.api_ok && Main(weatherJson)}

      {weatherJson.defined && !weatherJson.api_ok && <MainAPIError/>}

    </div>
  );
}

function getInputValue() {
  const value = document.getElementById("input").value;

  document.getElementById("input").value="";

  return value;
}

let count = 0;
async function getWeatherJson() {
  // just to avoid depleting API.
  count++;
  return {
    defined: true, api_ok: true,
    city_name: "Guadalajara" + String(count),
    datetime: "2023-07-28 10:52",
    lat: -10, lon: -200,
    app_temp: 32.8,
    wind_cdir: "O",
    wind_spd: 14.2,
  
    weather: {
      code: 201,
    }
  }

  const cityName = getInputValue();
  const apiKey = process.env.REACT_APP_API_KEY;

  try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?lang=pt&units=M&city=${cityName}&key=${apiKey}`);

    if(response.statusText === "Too Many Requests")
      throw RangeError();

    let respJson = await response.json();
    
    respJson = respJson.data[0]; 
    respJson["defined"] = true;
    respJson["api_ok"] = true;

    return respJson;
  
  } catch (Error) {
    if (Error instanceof RangeError)
      alert("API daily requests ended.");

    else
      alert("Error while contacting API. " + Error);
    
    return {
      defined: true,
      api_ok: false,
    }
  }
}

export default App;
