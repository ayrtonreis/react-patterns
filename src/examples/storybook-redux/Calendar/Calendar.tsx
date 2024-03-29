import React, { useState } from 'react'
import { Fade, Grid, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

import { DaysGrid } from './DaysGrid/DaysGrid'
import { HeaderMonth } from './HeaderMonth/index'
import { ParentWrapper, SlideView } from './elements'

export default function Calendar() {
    const [isDayOpened, setIsDayOpened] = useState(false)

    const handleToggleView = () => {
        setIsDayOpened((prevIsDayOpened) => !prevIsDayOpened)
    }

    return (
        <ParentWrapper>
            <Grid container height="55px" position="relative" zIndex={10}>
                {/*<Fade in={activeView < 2} timeout={400}>*/}
                <Grid
                    container
                    direction="column"
                    sx={{ backgroundColor: '#9aafde' }}
                    position="absolute"
                    height="100%"
                >
                    <HeaderMonth />
                </Grid>
                {/*</Fade>*/}
                <Fade in={isDayOpened} timeout={400}>
                    <Grid
                        container
                        // direction="column"
                        sx={{ backgroundColor: 'rgb(243,200,154)' }}
                        position="absolute"
                        height="100%"
                        alignContent="center"
                    >
                        <Grid container item xs justifyContent="center" alignContent="center">
                            <Grid>Details about a specific day</Grid>
                        </Grid>

                        <Grid>
                            <IconButton onClick={handleToggleView}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Fade>
            </Grid>

            <Grid container item style={{ position: 'relative', flex: 1, flexGrow: 1, zIndex: 8 }}>
                <SlideView $isActive={!isDayOpened} $slideInFrom="-100%" color="lightblue">
                    <Grid container height="100%">
                        <DaysGrid onClick={handleToggleView} />
                    </Grid>
                </SlideView>
                <SlideView $isActive={isDayOpened} $slideInFrom="100%" color="lightcoral">
                    <Grid container height="100%">
                        <DaysGrid onClick={handleToggleView} />
                    </Grid>
                </SlideView>
            </Grid>
        </ParentWrapper>
    )
}
