import React from 'react'
import { Grid, IconButton } from '@mui/material'

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
                            <Grid
                                container
                                justifyContent="flex-end"
                                flex={1}
                                flexGrow={1}
                                position="relative"
                            >
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        width: 30,
                                        height: 30,
                                        // Normal state styles
                                        backgroundColor: 'transparent', // Or any color for the normal state background
                                        '&:hover': {
                                            // Hover state styles
                                            backgroundColor: 'rgba(70,140,211,0.66)', // Change the background color to blue on hover
                                            color: '#fff', // Change the text (icon) color to white on hover
                                        },
                                        transition:
                                            'background-color 200ms ease-in-out, color 100ms ease-in-out',
                                    }}
                                >
                                    {day}
                                </IconButton>
                            </Grid>
                        </DayCellWrapper>
                    ))}
                </WeekWrapper>
            ))}
        </Grid>
    )
}
