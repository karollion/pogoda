import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city =>{
    setLoad(true);
    setError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73e2171fccec3e16b8863876d6c26766&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
              };
              setWeatherData(weatherData)
              setLoad(false);
            })
      } else {
        setError(true);
      }
    });

  }, []);
 
  console.log(weatherData)

  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weatherData && !load && !error) && <WeatherSummary weatherData={weatherData}/>}
      {(load && !error) && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;