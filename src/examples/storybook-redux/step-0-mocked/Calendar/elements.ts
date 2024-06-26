import styled from 'styled-components'
import { Grid } from '@mui/material'

export const ParentWrapper = styled(Grid)<{ $isSecondary: boolean }>`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    border: solid 2px ${(props) => (props.$isSecondary ? '#34a0a4' : '#1976d2')};
    display: flex;
    flex-direction: column;
    //border: 1px solid #555;
`
export const SlideView = styled.div<{ $isActive: boolean; $slideInFrom: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.color};
    transition: transform 800ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${(props) =>
        props.$isActive ? 'translateY(0)' : `translateY(${props.$slideInFrom})`};
`

export const GlobalCalendarWrapper = styled(Grid)`
    width: 50%;
    min-width: 500px;
    height: 50vh;
    max-height: 500px;
    margin: auto;
`
