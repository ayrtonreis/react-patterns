import React from 'react'
import { Grid, IconButton } from '@mui/material'

import { DayCellWrapper, TaskCountItem, WeekWrapper } from './elements'

const DAYS = [
    [
        { day: 26, month: 2, year: 2024 },
        { day: 27, month: 2, year: 2024 },
        { day: 28, month: 2, year: 2024 },
        { day: 29, month: 2, year: 2024 },
        { day: 1, month: 3, year: 2024 },
        { day: 2, month: 3, year: 2024 },
        { day: 3, month: 3, year: 2024 },
    ],
    [
        { day: 4, month: 3, year: 2024 },
        { day: 5, month: 3, year: 2024 },
        { day: 6, month: 3, year: 2024 },
        { day: 7, month: 3, year: 2024 },
        { day: 8, month: 3, year: 2024 },
        { day: 9, month: 3, year: 2024 },
        { day: 10, month: 3, year: 2024 },
    ],
    [
        { day: 11, month: 3, year: 2024 },
        { day: 12, month: 3, year: 2024 },
        { day: 13, month: 3, year: 2024 },
        { day: 14, month: 3, year: 2024 },
        { day: 15, month: 3, year: 2024 },
        { day: 16, month: 3, year: 2024 },
        { day: 17, month: 3, year: 2024 },
    ],
    [
        { day: 18, month: 3, year: 2024 },
        { day: 19, month: 3, year: 2024 },
        { day: 20, month: 3, year: 2024 },
        { day: 21, month: 3, year: 2024 },
        { day: 22, month: 3, year: 2024 },
        { day: 23, month: 3, year: 2024 },
        { day: 24, month: 3, year: 2024 },
    ],
    [
        { day: 25, month: 3, year: 2024 },
        { day: 26, month: 3, year: 2024 },
        { day: 27, month: 3, year: 2024 },
        { day: 28, month: 3, year: 2024 },
        { day: 29, month: 3, year: 2024 },
        { day: 30, month: 3, year: 2024 },
        { day: 31, month: 3, year: 2024 },
    ],
    [
        { day: 1, month: 4, year: 2024 },
        { day: 2, month: 4, year: 2024 },
        { day: 3, month: 4, year: 2024 },
        { day: 4, month: 4, year: 2024 },
        { day: 5, month: 4, year: 2024 },
        { day: 6, month: 4, year: 2024 },
        { day: 7, month: 4, year: 2024 },
    ],
]

export function DaysGrid({ onClick }: { onClick: () => void }) {
    return (
        <Grid container>
            {DAYS.map((week) => (
                <WeekWrapper container item key={JSON.stringify(week[0])}>
                    {week.map(({ day, month }) => (
                        <DayCellWrapper item container direction="column" xs key={day}>
                            <Grid
                                container
                                justifyContent="flex-end"
                                flex={1}
                                flexGrow={1}
                                position="relative"
                            >
                                <IconButton
                                    onClick={onClick}
                                    size="small"
                                    sx={{
                                        color: '#1976d2',
                                        opacity: month === 3 ? 1 : 0.5,
                                        position: 'absolute',
                                        width: 30,
                                        height: 30,
                                        // Normal state styles
                                        backgroundColor: 'transparent', // Or any color for the normal state background
                                        '&:hover': {
                                            // Hover state styles
                                            backgroundColor: '#2196f3', // Change the background color to blue on hover
                                            color: '#fff', // Change the text (icon) color to white on hover
                                        },
                                        transition:
                                            'background-color 200ms ease-in-out, color 100ms ease-in-out',
                                    }}
                                >
                                    {day}
                                </IconButton>
                            </Grid>

                            <Grid container justifyContent="end" padding="4px 0">
                                <TaskCountItem $colorCode={0}>1</TaskCountItem>
                                <TaskCountItem $colorCode={1}>4</TaskCountItem>
                                <TaskCountItem $colorCode={2}>12</TaskCountItem>
                            </Grid>
                        </DayCellWrapper>
                    ))}
                </WeekWrapper>
            ))}
        </Grid>
    )
}
