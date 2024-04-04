import React from 'react'
import { Grid, IconButton } from '@mui/material'

import { DayCellWrapper, TaskCountItem, WeekWrapper } from './elements'
import { useAppDispatch, useAppSelector } from '../../../../../store/slices/hooks'
import {
    selectTargetMonthItems,
    selectTargetMonthValue,
} from '../../../../../store/slices/calendar/selectors'
import { setSelectedDayAction } from '../../../../../store/slices/calendar/slice'
import { DayObj, TASK_CATEGORY_VALUES } from '../../../../../store/slices/calendar/types'

export function DaysGrid() {
    const targetMonth = useAppSelector(selectTargetMonthValue)
    const days = useAppSelector(selectTargetMonthItems)

    const dispatch = useAppDispatch()
    const handleClickDay = ({ year, month, day }: DayObj) => {
        dispatch(setSelectedDayAction(new Date(year, month, day).toISOString()))
    }

    return (
        <Grid container>
            {days.map((week) => (
                <WeekWrapper container item key={JSON.stringify(week[0])}>
                    {week.map(({ day, month, year, taskCounterByCategory }) => (
                        <DayCellWrapper item container direction="column" xs key={day}>
                            <Grid
                                container
                                justifyContent="flex-end"
                                flex={1}
                                flexGrow={1}
                                position="relative"
                            >
                                <IconButton
                                    onClick={() => handleClickDay({ year, month, day })}
                                    size="small"
                                    sx={{
                                        color: '#1976d2',
                                        opacity: month === targetMonth ? 1 : 0.5,
                                        position: 'absolute',
                                        width: 30,
                                        height: 30,
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#2196f3',
                                            color: '#fff',
                                        },
                                        transition:
                                            'background-color 200ms ease-in-out, color 100ms ease-in-out',
                                    }}
                                >
                                    {day}
                                </IconButton>
                            </Grid>

                            <Grid container justifyContent="end" padding="4px 0">
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
