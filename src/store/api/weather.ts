import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Coordinates } from '../slices/calendar/types'

interface WeatherApiResponse {
    daily: {
        time: string[]
        weather_code: number[]
    }
}

// Enum for simplified weather conditions
enum WeatherCondition {
    Sunny = 'sunny',
    Cloudy = 'cloudy',
    Rainy = 'rainy',
    Snow = 'snow',
    Fog = 'fog',
    Dust = 'dust',
    Thunderstorm = 'thunderstorm',
    Unknown = 'unknown',
}

export const WeatherConditionToEmoji: Record<WeatherCondition, string> = {
    [WeatherCondition.Sunny]: '☀️',
    [WeatherCondition.Cloudy]: '☁️',
    [WeatherCondition.Rainy]: '🌧️',
    [WeatherCondition.Snow]: '❄️',
    [WeatherCondition.Fog]: '🌫️',
    [WeatherCondition.Dust]: '💨',
    [WeatherCondition.Thunderstorm]: '⛈️',
    [WeatherCondition.Unknown]: '🌈',
}

interface Weather {
    weatherCondition: WeatherCondition
}

export type WeatherByDate = Record<string, Weather>

// Converts numeric weather code to WeatherCondition enum
function codeToWeatherCondition(code: number): WeatherCondition {
    if (code === 3) return WeatherCondition.Cloudy
    if (code >= 0 && code <= 19) return WeatherCondition.Sunny
    if ((code >= 20 && code <= 29) || (code >= 60 && code <= 69) || code === 91 || code === 92)
        return WeatherCondition.Rainy
    if ((code >= 30 && code <= 39) || (code >= 40 && code <= 49)) return WeatherCondition.Dust
    if (code >= 50 && code <= 59) return WeatherCondition.Fog
    if ((code >= 70 && code <= 79) || (code >= 80 && code <= 89)) return WeatherCondition.Snow
    if (code >= 95 && code <= 99) return WeatherCondition.Thunderstorm
    return WeatherCondition.Unknown // Default case for unhandled codes
}

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getWeather: builder.query<WeatherByDate, Coordinates>({
            query: (coordinates) => ({
                url: 'forecast',
                params: {
                    ...coordinates,
                    daily: 'weather_code',
                    timezone: 'Europe/Berlin',
                    forecast_days: 16,
                },
            }),
            transformResponse: (response: WeatherApiResponse) => {
                const transformed = response.daily.time.map((timestamp, index) => [
                    timestamp,
                    {
                        weatherCondition: codeToWeatherCondition(
                            response.daily.weather_code[index]
                        ),
                    },
                ])
                return Object.fromEntries(transformed)
            },
        }),
    }),
})

export const { useGetWeatherQuery } = weatherApi
