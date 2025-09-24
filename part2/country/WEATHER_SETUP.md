# Country Weather App - Environment Variables

## Setting up the OpenWeatherMap API Key

1. **Get your API key** from https://openweathermap.org/ (sign up and generate a key).
2. **Create a `.env` file** in the `country` project folder (if not already present).
3. **Add the following line to your `.env` file:**

```
VITE_SOME_KEY=your_actual_api_key_here
```

4. **Restart the development server** after adding or changing the `.env` file:

For Windows (cmd):

```
set "VITE_SOME_KEY=your_actual_api_key_here" && npm run dev
```

For PowerShell:

```
($env:VITE_SOME_KEY="your_actual_api_key_here") -and (npm run dev)
```

For Linux/macOS:

```
export VITE_SOME_KEY=your_actual_api_key_here && npm run dev
```

**Never commit your API key or `.env` file to source control!**

## Usage

- The app will automatically use the API key from the environment variable to fetch weather data for the capital city of the selected country.
- If you change the API key, restart the dev server.
