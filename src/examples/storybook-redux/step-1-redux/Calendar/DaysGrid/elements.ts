// noinspection CssUnresolvedCustomProperty

import styled, { css } from 'styled-components'
import { Grid } from '@mui/material'

import { TASK_COLORS } from '../constants'

const variables = css`
    --border-style-blue: 1px solid #1976d2;
`

export const WeekWrapper = styled(Grid)`
    ${variables};

    &:not(:first-child) {
        border-top: var(--border-style-blue);
    }
`

export const DayCellWrapper = styled(Grid)`
    ${variables};

    border-right: var(--border-style-blue);
    &:last-child {
        border-right: none;
    }
`

export const TaskCountItem = styled.div<{ $colorCode: number }>`
    background-color: ${(props) => TASK_COLORS[props.$colorCode]};
    min-width: 18px;
    text-align: center;
    margin-right: 4px;
    border-radius: 16px;
    font-size: 12px;
`
