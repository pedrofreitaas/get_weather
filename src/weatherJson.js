import {WiNightAltStormShowers, WiDayThunderstorm, WiNightAltSprinkle, WiDaySunny, WiRaindrops, WiRainWind, WiRain, WiSnow, WiSleet, WiSnowflakeCold, WiDayFog, WiSmoke, WiDayHaze, WiSandstorm, WiFog, WiNightCloudy, WiCloud, WiNightRain} from "react-icons/wi";

const iconSize = 80; const iconColor = "000";
const weatherCodeIcon = {
  200: <WiNightAltStormShowers size={iconSize} color={iconColor}/>,
  201: <WiNightAltStormShowers size={iconSize} color={iconColor}/>,
  202: <WiNightAltStormShowers size={iconSize} color={iconColor}/>,

  230: <WiDayThunderstorm size={iconSize} color={iconColor}/>,
  231: <WiDayThunderstorm size={iconSize} color={iconColor}/>,
  232: <WiDayThunderstorm size={iconSize} color={iconColor}/>,
  233: <WiDayThunderstorm size={iconSize} color={iconColor}/>,

  300: <WiNightAltSprinkle size={iconSize} color={iconColor}/>,
  301: <WiNightAltSprinkle size={iconSize} color={iconColor}/>,
  302: <WiNightAltSprinkle size={iconSize} color={iconColor}/>,

  500: <WiRaindrops size={iconSize} color={iconColor}/>,
  501: <WiRaindrops size={iconSize} color={iconColor}/>,
  502: <WiRaindrops size={iconSize} color={iconColor}/>,

  511: <WiRainWind size={iconSize} color={iconColor}/>,

  520: <WiRain size={iconSize} color={iconColor}/>,
  521: <WiRain size={iconSize} color={iconColor}/>,
  522: <WiRain size={iconSize} color={iconColor}/>,

  600: <WiSnow size={iconSize} color={iconColor}/>,
  601: <WiSnow size={iconSize} color={iconColor}/>,
  602: <WiSnow size={iconSize} color={iconColor}/>,

  610: <WiSleet size={iconSize} color={iconColor}/>,
  611: <WiSleet size={iconSize} color={iconColor}/>,
  612: <WiSleet size={iconSize} color={iconColor}/>,

  621: <WiSnowflakeCold size={iconSize} color={iconColor}/>,
  622: <WiSnowflakeCold size={iconSize} color={iconColor}/>,
  623: <WiSnowflakeCold size={iconSize} color={iconColor}/>,

  700: <WiDayFog size={iconSize} color={iconColor}/>,

  711: <WiSmoke size={iconSize} color={iconColor}/>,

  721: <WiDayHaze size={iconSize} color={iconColor}/>,

  731: <WiSandstorm size={iconSize} color={iconColor}/>,

  741: <WiFog size={iconSize} color={iconColor}/>,

  751: <WiFog size={iconSize} color={iconColor}/>,

  800: <WiDaySunny size={iconSize} color={iconColor}/>,
  801: <WiNightCloudy size={iconSize} color={iconColor}/>,
  802: <WiNightCloudy size={iconSize} color={iconColor}/>,
  803: <WiNightCloudy size={iconSize} color={iconColor}/>,
  804: <WiCloud size={iconSize} color={iconColor}/>,

  900: <WiNightRain size={iconSize} color={iconColor}/>,
}

export default weatherCodeIcon;