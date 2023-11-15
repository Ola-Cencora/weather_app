import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState(null);
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5364a26d1edc59f0148c0165e7b26ca2&units=metric`)
    .then(res => res.json())
    .then(data => {
      const newWeatherData = {
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      };
        console.log(newWeatherData);
        setWeatherData(newWeatherData);
        setPending(false);
    });
  }, []);


  return (
    <section>
      <PickCity action={handleCityChange} />
      { (!pending && weatherData) && <WeatherSummary {...weatherData} /> }
      { (pending && !weatherData) && <Loader /> }
    </section>
  )
};

export default WeatherBox;