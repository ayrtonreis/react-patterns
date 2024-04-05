import React from 'react'
import { Tooltip } from '@mui/material'

import { DayObj } from '../../../../../../store/slices/calendar/types'
import { getWeatherEmoji } from '../../utils'
import { WeatherByDate } from '../../../../../../store/api/weather'
import { WeatherIconWrapper } from '../elements'

function WeatherEmoji({ mapping, year, month, day }: DayObj & { mapping?: WeatherByDate }) {
    const weather = getWeatherEmoji(mapping, { year, month, day })

    return weather ? (
        <Tooltip
            title={weather.condition}
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -14],
                            },
                        },
                    ],
                },
            }}
        >
            <WeatherIconWrapper>{weather.emoji}</WeatherIconWrapper>
        </Tooltip>
    ) : null
}

export default WeatherEmoji
