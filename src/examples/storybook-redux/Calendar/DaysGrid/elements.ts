// noinspection CssUnresolvedCustomProperty

import styled, { css } from 'styled-components'
import { Grid } from '@mui/material'

const variables = css`
    --border-style: 1px solid rgba(0, 0, 0, 0.16);
`

export const WeekWrapper = styled(Grid)`
    ${variables};

    &:not(:first-child) {
        border-top: var(--border-style);
    }
`

export const DayCellWrapper = styled(Grid)`
    ${variables};

    border-right: var(--border-style);
    &:last-child {
        border-right: none;
    }
`
