const getWeatherInfo = (code) => {
  if (code === 0) {
    return { icon: "☀️", condition: "Clear sky" };
  }

  if ([1, 2, 3].includes(code)) {
    return { icon: "⛅", condition: "Partly cloudy" };
  }

  if ([45, 48].includes(code)) {
    return { icon: "🌫️", condition: "Foggy" };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { icon: "🌦️", condition: "Drizzle" };
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return { icon: "🌧️", condition: "Rainy" };
  }

  if ([71, 73, 75, 77].includes(code)) {
    return { icon: "❄️", condition: "Snowy" };
  }

  if ([80, 81, 82].includes(code)) {
    return { icon: "🌧️", condition: "Rain showers" };
  }

  if ([85, 86].includes(code)) {
    return { icon: "🌨️", condition: "Snow showers" };
  }

  if ([95, 96, 99].includes(code)) {
    return { icon: "⛈️", condition: "Thunderstorm" };
  }

  return { icon: "🌤️", condition: "Unknown" };
};

function WeatherCard({ weather }) {
  if (!weather) return null;

  const weatherInfo = getWeatherInfo(weather.current.weather_code);

  return (
    <section className="weather-card">
      <div className="weather-main">
        <div>
          <div className="location-label">
            <span>📍</span> CURRENT LOCATION
          </div>

          <h1>{weather.location.name}</h1>

          <p className="country">
            {weather.location.country}
            {weather.location.admin1
              ? ` · ${weather.location.admin1}`
              : ""}
          </p>
        </div>

        <div className="weather-icon-large">
          {weatherInfo.icon}
        </div>
      </div>

      <div className="temperature-area">
        <div className="temperature">
          {Math.round(weather.current.temperature_2m)}
          <span>°C</span>
        </div>

        <div className="condition">
          {weatherInfo.condition}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div>
            <span>Wind Speed</span>
            <strong>
              {weather.current.wind_speed_10m} km/h
            </strong>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">☁️</div>
          <div>
            <span>Weather Code</span>
            <strong>{weather.current.weather_code}</strong>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌐</div>
          <div>
            <span>Coordinates</span>
            <strong>
              {Number(weather.location.latitude).toFixed(2)},{" "}
              {Number(weather.location.longitude).toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;