import React, { useState } from 'react'
import { Divider, Grid, IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

import { ParentWrapper, SlideView } from './elements'
import { DaysGrid } from './DaysGrid/DaysGrid'

export default function Calendar() {
    const [activeView, setActiveView] = useState<number>(0)

    const handleToggleView = () => {
        setActiveView((prevActiveView) => (prevActiveView === 0 ? 1 : 0))
    }

    return (
        <ParentWrapper>
            <Grid container direction="column" sx={{ backgroundColor: '#9aafde' }}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <IconButton size="small" onClick={handleToggleView}>
                            <ArrowBackIos fontSize="small" />
                        </IconButton>
                    </Grid>
                    <Grid item>March 2024</Grid>
                    <Grid item>
                        <IconButton size="small" onClick={handleToggleView}>
                            <ArrowForwardIos fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>

                <Divider sx={{ opacity: 0.6, margin: '0 4px' }} />

                <Grid container item xs justifyContent="center">
                    <Grid>Tasks: 0</Grid>
                </Grid>
            </Grid>
            <Grid container item style={{ position: 'relative', flex: 1, flexGrow: 1 }}>
                <SlideView $isActive={activeView === 0} $slideInFrom="-100%" color="lightblue">
                    <Grid container height="100%">
                        <DaysGrid />
                    </Grid>
                </SlideView>
                <SlideView $isActive={activeView === 1} $slideInFrom="100%" color="lightcoral">
                    <Grid container height="100%">
                        <DaysGrid />
                    </Grid>
                </SlideView>
            </Grid>
        </ParentWrapper>
    )
}
