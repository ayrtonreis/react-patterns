import React from 'react'
import { Grid, IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../../../../store/slices/hooks'
import {
    goToPreviousMonthAction,
    goToNextMonthAction,
} from '../../../../../store/slices/calendar/slice'
import {
    selectTargetDay,
    selectTotalCounterForTargetMonth,
} from '../../../../../store/slices/calendar/selectors'
import { StyledDivider } from './elements'
import { getLocalizedMonthYear } from '../utils'

export default function HeaderMonth() {
    const targetDate = useAppSelector(selectTargetDay)
    const taskCount = useAppSelector(selectTotalCounterForTargetMonth)

    const dispatch = useAppDispatch()
    const goToPreviousMonth = () => dispatch(goToPreviousMonthAction())
    const goToNextMonth = () => dispatch(goToNextMonthAction())

    return (
        <Grid container justifyContent="space-between" alignContent="center" height="100%">
            <IconButton size="small" onClick={goToPreviousMonth}>
                <ArrowBackIos fontSize="small" />
            </IconButton>
            <Grid item container direction="column" justifyContent="center" flex={1}>
                <Grid container justifyContent="center">
                    {getLocalizedMonthYear(targetDate)}
                </Grid>

                <StyledDivider />

                <Grid container item xs justifyContent="center">
                    <Grid>Tasks: {taskCount}</Grid>
                </Grid>
            </Grid>
            <IconButton size="small" onClick={goToNextMonth}>
                <ArrowForwardIos fontSize="small" />
            </IconButton>
        </Grid>
    )
}
