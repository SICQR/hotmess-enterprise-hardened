import { useState, useEffect } from "react";
import { CloudSun, MapPin } from "@phosphor-icons/react";

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
}

export function WeatherStrip() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeather();
  }, []);

  async function loadWeather() {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&temperature_unit=fahrenheit`,
      );
      const data = await response.json();

      const weatherCodes: Record<number, string> = {
        0: "Clear",
        1: "Mostly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Foggy",
        51: "Light Drizzle",
        61: "Rain",
        71: "Snow",
        95: "Thunderstorm",
      };

      const condition = weatherCodes[data.current.weathercode] || "Unknown";

      const cityResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const cityData = await cityResponse.json();
      const city =
        cityData.address.city ||
        cityData.address.town ||
        cityData.address.village ||
        "Unknown";

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        condition,
        city,
      });
    } catch (error) {
      setWeather({
        temperature: 72,
        condition: "Clear",
        city: "Your Location",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return null;

  if (!weather) return null;

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4 text-sm">
        <MapPin size={16} weight="fill" className="text-accent" />
        <span className="font-medium">{weather.city}</span>
        <span className="text-muted-foreground">•</span>
        <CloudSun size={16} weight="duotone" className="text-accent" />
        <span>{weather.temperature}°F</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{weather.condition}</span>
      </div>
    </div>
  );
}
