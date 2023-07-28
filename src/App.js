import { useEffect, useState } from 'react';
import './App.css';
import './Main.css';
import weatherCodeIcon from "./weatherJson"
import { HiOutlineThumbUp } from "react-icons/hi";
import { WiAlien } from 'react-icons/wi';

function WeatherIcon(weatherJson) {
  if(!weatherJson.defined)
    return (<div></div>);

  try {
    return weatherCodeIcon[weatherJson.weather.code];
  } catch {
    return <WiAlien size={50} color="000"/>
  }
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
      <h2> {weatherJson.city_name} </h2>
      <span> {weatherJson.datetime} </span>
      <span> Coordinates: ({weatherJson.lat}, {weatherJson.lon}) </span>
      <span> Temperature: {weatherJson.app_temp} </span>
      <span> Wind's direction: {weatherJson.wind_cdir} </span>
      <span> Wind's speed: {weatherJson.wind_spd} m/s </span>
    </main>
  );
}

function App() {
  const [weatherJson, updateWeatherJson] = useState({
    defined: false,
  });

  // animate main after every weather search.
  useEffect( () => {
    function changeMainAnimation(animationName) {
      const main = document.getElementsByTagName("main")[0];

      if(main === undefined) return;

      main.className=animationName;
    }

    changeMainAnimation("animationX");

    setTimeout( () => {
      changeMainAnimation("");
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
    
      <WeatherIcon weatherJson={weatherJson}/>

    </div>
  );
}

function getInputValue() {
  const value = document.getElementById("input").value;

  document.getElementById("input").value="";

  return value;
}

async function getWeatherJson() {
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
