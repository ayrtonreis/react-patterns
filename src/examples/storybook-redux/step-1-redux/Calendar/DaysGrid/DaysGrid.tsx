import React from 'react'
import { Grid } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../../store/slices/hooks'
import {
    selectLocation,
    selectTargetMonthItems,
    selectTargetMonthValue,
    selectToday,
} from '../../../../../store/slices/calendar/selectors'
import { setSelectedDayAction } from '../../../../../store/slices/calendar/slice'
import { DayObj, TASK_CATEGORY_VALUES } from '../../../../../store/slices/calendar/types'
import { useGetWeatherQuery } from '../../../../../store/api/weather'
import { WeatherEmoji } from './WeatherEmoji/index'
import { DayCellWrapper, StyledIconButton, TaskCountItem, WeekWrapper } from './elements'
import { getStoreTimestamp, isSameDay } from '../utils'

export function DaysGrid() {
    const location = useAppSelector(selectLocation)
    const targetMonth = useAppSelector(selectTargetMonthValue)
    const today = useAppSelector(selectToday)
    const days = useAppSelector(selectTargetMonthItems)

    const dispatch = useAppDispatch()
    const handleClickDay = ({ year, month, day }: DayObj) => {
        dispatch(setSelectedDayAction(getStoreTimestamp({ year, month, day })))
    }

    const { data: weatherByDate } = useGetWeatherQuery(location, { pollingInterval: 0 })

    return (
        <Grid container>
            {days.map((week) => (
                <WeekWrapper container item key={JSON.stringify(week[0])}>
                    {week.map(({ day, month, year, taskCounterByCategory }) => (
                        <DayCellWrapper item container direction="column" xs key={day}>
                            <WeatherEmoji
                                mapping={weatherByDate}
                                year={year}
                                month={month}
                                day={day}
                            />

                            <Grid
                                container
                                justifyContent="flex-end"
                                flex={1}
                                flexGrow={1}
                                position="relative"
                            >
                                <StyledIconButton
                                    onClick={() => handleClickDay({ year, month, day })}
                                    size="small"
                                    $fade={month !== targetMonth}
                                    $hasBorder={isSameDay(today, { year, month, day })}
                                >
                                    {day}
                                </StyledIconButton>
                            </Grid>

                            <Grid container justifyContent="end" position="absolute" bottom="4px">
                                {TASK_CATEGORY_VALUES.map(
                                    (category) =>
                                        taskCounterByCategory.get(category) && (
                                            <TaskCountItem key={category} $colorCode={category}>
                                                {taskCounterByCategory.get(category)}
                                            </TaskCountItem>
                                        )
                                ).filter((v) => v)}
                            </Grid>
                        </DayCellWrapper>
                    ))}
                </WeekWrapper>
            ))}
        </Grid>
    )
}
