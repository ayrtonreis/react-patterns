import React from 'react'
import { Fade, Grid, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { isNil } from 'lodash'

import { DaysGrid } from './DaysGrid/DaysGrid'
import { HeaderMonth } from './HeaderMonth/index'
import { ParentWrapper, SlideView } from './elements'
import { SingleDayFull } from './SingleDayFull/index'
import { useAppDispatch, useAppSelector } from '../../../../store/slices/hooks'
import { setSelectedDayAction } from '../../../../store/slices/calendar/slice'
import { getLocalizedMonthDay, getYear } from './utils'
import { selectSelectedDay } from '../../../../store/slices/calendar/selectors'
import { useDeferredValue } from '../../../../hooks/useDeferredValue'

export default function Calendar() {
    const rawSelectedDay = useAppSelector(selectSelectedDay)
    const deferredSelectedDay = useDeferredValue(rawSelectedDay)
    const isDayOpened = !isNil(rawSelectedDay)

    const dispatch = useAppDispatch()
    const handleCloseFullDay = () => {
        dispatch(setSelectedDayAction(null))
    }

    return (
        <ParentWrapper $isSecondary={isDayOpened}>
            <Grid container height="55px" position="relative" zIndex={10}>
                {/*<Fade in={activeView < 2} timeout={400}>*/}
                <Grid
                    container
                    direction="column"
                    sx={{ backgroundColor: '#1976d2', color: 'rgba(255,255,255,0.92)' }}
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
                        sx={{ backgroundColor: '#3fc1c0' }}
                        position="absolute"
                        height="100%"
                        alignContent="center"
                    >
                        <Grid container item xs alignContent="center" marginLeft="26px">
                            <Typography variant="h4" fontWeight="bold">
                                {deferredSelectedDay
                                    ? getLocalizedMonthDay(deferredSelectedDay)
                                    : null}
                            </Typography>
                            <Typography variant="h4">{`, ${deferredSelectedDay ? getYear(deferredSelectedDay) : null}`}</Typography>
                        </Grid>

                        <Grid>
                            <IconButton onClick={handleCloseFullDay}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Fade>
            </Grid>

            <Grid container item style={{ position: 'relative', flex: 1, flexGrow: 1, zIndex: 8 }}>
                <SlideView $isActive={!isDayOpened} $slideInFrom="-100%" color="#f7fafc">
                    <Grid container height="100%">
                        <DaysGrid />
                    </Grid>
                </SlideView>
                <SlideView $isActive={isDayOpened} $slideInFrom="100%" color="#fafdfc">
                    <Grid container height="100%">
                        <SingleDayFull />
                    </Grid>
                </SlideView>
            </Grid>
        </ParentWrapper>
    )
}
