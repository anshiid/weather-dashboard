const getForecastIcon = (code) => {
  if (code === 0) return "☀️";

  if ([1, 2, 3].includes(code)) return "⛅";

  if ([45, 48].includes(code)) return "🌫️";

  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "🌧️";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "❄️";
  }

  if ([95, 96, 99].includes(code)) return "⛈️";

  return "🌤️";
};

function Forecast({ weather }) {
  if (!weather || !weather.daily) return null;

  const formatDay = (date, index) => {
    if (index === 0) return "Today";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <section className="forecast-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">NEXT FEW DAYS</span>
          <h2>5-Day Forecast</h2>
        </div>

        <span className="forecast-location">
          {weather.location.name}
        </span>
      </div>

      <div className="forecast-grid">
        {weather.daily.time.map((date, index) => (
          <div className={`forecast-card ${index === 0 ? "today" : ""}`} key={date}>
            <span className="forecast-day">
              {formatDay(date, index)}
            </span>

            <div className="forecast-icon">
              {getForecastIcon(weather.daily.weather_code[index])}
            </div>

            <div className="forecast-temperatures">
              <strong>
                {Math.round(weather.daily.temperature_2m_max[index])}°
              </strong>

              <span>
                {Math.round(weather.daily.temperature_2m_min[index])}°
              </span>
            </div>

            <small>
              Code {weather.daily.weather_code[index]}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;