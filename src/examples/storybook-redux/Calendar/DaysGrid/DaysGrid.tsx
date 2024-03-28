import React from 'react'
import { Grid } from '@mui/material'

import { DayCellWrapper, WeekWrapper } from './elements'

const DAYS = [
    [26, 27, 28, 29, 30, 1, 2],
    [3, 4, 5, 6, 7, 8, 9], // Missing part
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, 1, 2, 3, 4, 5, 6],
]

export function DaysGrid() {
    return (
        <Grid container>
            {DAYS.map((week) => (
                <WeekWrapper container item key={week[0]}>
                    {week.map((day) => (
                        <DayCellWrapper item container direction="column" xs key={day}>
                            <Grid container justifyContent="flex-end" padding="0 8px 0 0">
                                {day}
                            </Grid>
                        </DayCellWrapper>
                    ))}
                </WeekWrapper>
            ))}
        </Grid>
    )
}
