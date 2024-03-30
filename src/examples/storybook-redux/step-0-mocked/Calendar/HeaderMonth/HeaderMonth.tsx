import React from 'react'
import { Divider, Grid, IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

export default function HeaderMonth() {
    return (
        <Grid container justifyContent="space-between" alignContent="center" height="100%">
            <IconButton size="small" onClick={() => {}}>
                <ArrowBackIos fontSize="small" />
            </IconButton>
            <Grid item container direction="column" justifyContent="center" flex={1}>
                <Grid container justifyContent="center">
                    April 2024
                </Grid>

                <Divider sx={{ opacity: 0.6, margin: '0 20px' }} />

                <Grid container item xs justifyContent="center">
                    <Grid>Tasks: 0</Grid>
                </Grid>
            </Grid>
            <IconButton size="small" onClick={() => {}}>
                <ArrowForwardIos fontSize="small" />
            </IconButton>
        </Grid>
    )
}
