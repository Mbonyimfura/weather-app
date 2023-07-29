const weatherInfo = document.querySelector(".weatherInfo");
const locationInput = document.querySelector("input");
const getWeatherInformation = async (location) => {
  const apiKey = "860fab4173ab4e6cb5e175534232807";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      console.log("Weather API Error:", data.error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.log("Unable to fetch weather data:", error);
    return null;
  }
};
const processWeatherData = (weatherData) => {
  if (weatherData && weatherData.location) {
    return {
      condition: weatherData.current.condition.text,
      feelsLike: {
        f: Math.round(weatherData.current.feelslike_f),
        c: Math.round(weatherData.current.feelslike_c),
      },
      currentTemp: {
        f: Math.round(weatherData.current.temp_f),
        c: Math.round(weatherData.current.temp_c),
      },
      location: weatherData.location.name,
      country: weatherData.location.country,
      wind: Math.round(weatherData.current.wind_mph),
      humidity: weatherData.current.humidity,
      condition: weatherData.current.condition.text,
      icon: weatherData.current.condition.icon,
    };
  }
  return {};
};

const displayWeatherInfo = (weatherData) => {
  weatherInfo.innerHTML = `
    <h2>${weatherData.location}, ${weatherData.country}</h2>
    <img src="${weatherData.icon}" alt="Weather Icon"> 
    <p>Condition: ${weatherData.condition}</p>
    <p>Current Temperature: ${weatherData.currentTemp.c} °C / ${weatherData.currentTemp.f} °F</p>
    <p>Feels Like: ${weatherData.feelsLike.c} °C / ${weatherData.feelsLike.f} °F</p>
    <p>Wind Speed: ${weatherData.wind} mph</p>
    <p>Humidity: ${weatherData.humidity}%</p>
   
  `;
};

//handle form data
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const location = locationInput.value;
  locationInput.value = "";
  weatherInfo.innerHTML = "Loading...";

  // Fetch weather data
  const weatherData = await getWeatherInformation(location);

  if (weatherData) {
    const processedWeatherData = processWeatherData(weatherData);
    displayWeatherInfo(processedWeatherData);
  } else {
    // Display error
    weatherInfo.innerHTML =
      "Failed to fetch weather data. Please try again later!";
  }
};
//fetch default weather data
const fetchDefaultWeatherData = async () => {
  const defaultLocation = "Kigali";
  const weatherData = await getWeatherInformation(defaultLocation);

  if (weatherData) {
    const processedWeatherData = processWeatherData(weatherData);
    displayWeatherInfo(processedWeatherData);
  } else {
    weatherInfo.innerHTML =
      "Failed to fetch weather data. Please try again later!";
  }
};
window.onload = fetchDefaultWeatherData;
//attach the data
const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", handleFormSubmit);
