import { useEffect, useState } from "react";
import axios from "axios";

const CountryDetails = ({ country, weather }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital?.[0]}</p>
    <p>Area: {country.area}</p>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages || {}).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      width="200"
    />
    {weather && (
      <div>
        <h3>Weather in {country.capital?.[0]}</h3>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Weather: {weather.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )}
  </div>
);

const CountryList = ({ countries, onShowCountry }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => onShowCountry(country)}>show</button>
      </div>
    ))}
  </div>
);

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
      setWeather(null);
      return;
    }

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);

    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
      fetchWeather(filtered[0].capital?.[0]);
    } else {
      setSelectedCountry(null);
      setWeather(null);
    }
  }, [query, countries]);

  const fetchWeather = async (capital) => {
    if (!capital || !API_KEY) return;
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital?.[0]);
  };

  const renderContent = () => {
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} weather={weather} />;
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredCountries.length > 1) {
      return (
        <CountryList
          countries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      );
    }

    return null;
  };

  return (
    <div>
      <form>
        <label htmlFor="country">find countries </label>
        <input
          id="country"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter country name"
        />
      </form>
      {renderContent()}
    </div>
  );
}

export default App;