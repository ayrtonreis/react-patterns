import React from 'react'
import { Grid } from '@mui/material'

import { DayCellWrapper, StyledIconButton, TaskCountItem, WeekWrapper } from './elements'
import { useAppDispatch, useAppSelector } from '../../../../../store/slices/hooks'
import {
    selectTargetMonthItems,
    selectTargetMonthValue,
    selectToday,
} from '../../../../../store/slices/calendar/selectors'
import { setSelectedDayAction } from '../../../../../store/slices/calendar/slice'
import { DayObj, TASK_CATEGORY_VALUES } from '../../../../../store/slices/calendar/types'
import { getStoreTimestamp, isSameDay } from '../utils'

export function DaysGrid() {
    const targetMonth = useAppSelector(selectTargetMonthValue)
    const today = useAppSelector(selectToday)
    const days = useAppSelector(selectTargetMonthItems)

    const dispatch = useAppDispatch()
    const handleClickDay = ({ year, month, day }: DayObj) => {
        dispatch(setSelectedDayAction(getStoreTimestamp({ year, month, day })))
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
                                <StyledIconButton
                                    onClick={() => handleClickDay({ year, month, day })}
                                    size="small"
                                    $fade={month !== targetMonth}
                                    $hasBorder={isSameDay(today, { year, month, day })}
                                >
                                    {day}
                                </StyledIconButton>
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
