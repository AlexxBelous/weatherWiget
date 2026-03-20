import {useState, useEffect} from "react";
import "./index.css";

const KEY = "52c4d4f68f1447cdbe0160538261503";

function App() {
    const [city, setCity] = useState('Berlin')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`);
                const data = await res.json();

                if(data.error) {
                    setError(data.error.message)
                    setWeatherData(null);
                    return;
                }
                setWeatherData(data);
                setError(null);
            } catch (err) {
                setError(err.message)
                setWeatherData(null);
            }
        }
        getData();
    }, [city]);

    console.log(weatherData);


    return (
        <div className="app">
            <div className="widget-container">
                <div className="weather-card-container">
                    <h1 className="app-title">Weather Widget</h1>
                    <p className="app-text">{error}</p>
                    <div className="search-container">
                        <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter city name" className="search-input"/>
                    </div>
                </div>
                <div className="weather-card">
                    <h2>{`${weatherData?.location?.name}, ${weatherData?.location?.country}`}</h2>
                    <img src={`${weatherData?.current?.condition?.icon}`} alt="icon" className="weather-icon"/>
                    <p className="temperature">{`${Math.round(weatherData?.current?.temp_c)}`}°C</p>
                    <p className="condition">{`${weatherData?.current?.condition?.text}`}</p>
                    <div className="weather-details">
                        <p>Humidity: {`${weatherData?.current?.humidity}`}%</p>
                        <p>Wind: {`${weatherData?.current?.wind_kph}`} km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
