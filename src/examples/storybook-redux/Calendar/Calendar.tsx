import React, { useState } from 'react'
import { Divider, Fade, Grid, IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

import { ParentWrapper, SlideView } from './elements'
import { DaysGrid } from './DaysGrid/DaysGrid'

function HeaderMain({ onClick, label }: { onClick: (isForward: boolean) => void; label: string }) {
    return (
        <Grid container justifyContent="space-between">
            <Grid item>
                <IconButton size="small" onClick={() => onClick(false)}>
                    <ArrowBackIos fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item alignContent="center">
                {label}
            </Grid>
            <Grid item>
                <IconButton size="small" onClick={() => onClick(true)}>
                    <ArrowForwardIos fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default function Calendar() {
    const [activeView, setActiveView] = useState<number>(0)

    const handleToggleView = (isForward: boolean) => {
        setActiveView(
            (prevActiveView) => (isForward ? prevActiveView + 1 : prevActiveView - 1) % 300
        )
    }

    return (
        <ParentWrapper>
            <Grid container height="54px" position="relative">
                <Fade in={activeView < 2} timeout={400}>
                    <Grid
                        container
                        direction="column"
                        sx={{ backgroundColor: '#9aafde' }}
                        position="absolute"
                    >
                        <HeaderMain onClick={handleToggleView} label="March 2024" />

                        <Divider sx={{ opacity: 0.6, margin: '0 4px' }} />

                        <Grid container item xs justifyContent="center">
                            <Grid>Tasks: 0</Grid>
                        </Grid>
                    </Grid>
                </Fade>
                <Fade in={activeView >= 2} timeout={400}>
                    <Grid
                        container
                        direction="column"
                        sx={{ backgroundColor: 'rgba(222,216,154,0.42)' }}
                        position="absolute"
                    >
                        <HeaderMain onClick={handleToggleView} label="March 28th 2024" />

                        <Divider sx={{ opacity: 0.6, margin: '0 4px' }} />

                        <Grid container item xs justifyContent="center">
                            <Grid>Details about a specific day</Grid>
                        </Grid>
                    </Grid>
                </Fade>
            </Grid>

            <Grid container item style={{ position: 'relative', flex: 1, flexGrow: 1 }}>
                <SlideView $isActive={activeView === 0} $slideInFrom="-100%" color="lightblue">
                    <Grid container height="100%">
                        <DaysGrid />
                    </Grid>
                </SlideView>
                <SlideView $isActive={activeView >= 1} $slideInFrom="100%" color="lightcoral">
                    <Grid container height="100%">
                        <DaysGrid />
                    </Grid>
                </SlideView>
                <SlideView $isActive={activeView === 2} $slideInFrom="100%" color="lightgreen">
                    <Grid container height="100%">
                        <DaysGrid />
                    </Grid>
                </SlideView>
            </Grid>
        </ParentWrapper>
    )
}
