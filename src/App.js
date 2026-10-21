import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RotatingGlobe from "./components/RotatingGlobe";
import RecentSearches from "./components/RecentSearches";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("weatherSearches");

    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    fetchWeather("Kozhikode");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "weatherSearches",
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  const fetchWeather = async (searchCity) => {
    const trimmedCity = searchCity.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Find the city coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          trimmedCity
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Geocoding request failed");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setWeather(null);
        setError("City not found");
        setLoading(false);
        return;
      }

      const location = geoData.results[0];

      // Step 2: Get weather using latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      );

      if (!weatherResponse.ok) {
        throw new Error("Weather request failed");
      }

      const weatherData = await weatherResponse.json();

      setWeather({
        location: {
          name: location.name,
          country: location.country,
          admin1: location.admin1,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        current: weatherData.current,
        daily: weatherData.daily,
      });

      // Remove duplicates before adding a new search
      setRecentSearches((previous) => {
        const filtered = previous.filter(
          (item) =>
            item.toLowerCase() !== location.name.toLowerCase()
        );

        return [location.name, ...filtered].slice(0, 6);
      });

      setCity("");
    } catch (err) {
      setWeather(null);
      setError("Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  const handleRecentSearch = (selectedCity) => {
    setCity(selectedCity);
    fetchWeather(selectedCity);
  };

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <Navbar />

      <main className="container">
        <header className="hero">
  <div className="hero-content">
    <span className="hero-label">WEATHER AT A GLANCE</span>

    <h1>
      Know your weather.
      <br />
      <span>Plan your day.</span>
    </h1>

    <p>
      Search any city to get live weather conditions,
      coordinates and a 5-day forecast.
    </p>
  </div>

  <RotatingGlobe />
</header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />

        {loading && (
          <div className="message-card loading-card">
            <div className="spinner"></div>
            <div>
              <strong>Loading weather...</strong>
              <p>Fetching the latest conditions for you.</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="message-card error-card">
            <div className="error-icon">!</div>

            <div>
              <strong>{error}</strong>
              <p>
                Try checking the spelling or search for another city.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} />

            <Forecast weather={weather} />
          </>
        )}

        <RecentSearches
          searches={recentSearches}
          onSelect={handleRecentSearch}
        />

        <footer>
          <span>കാലാവസ്ഥ</span>
          <span>Powered by Open-Meteo</span>
        </footer>
      </main>
    </div>
  );
}

export default App;