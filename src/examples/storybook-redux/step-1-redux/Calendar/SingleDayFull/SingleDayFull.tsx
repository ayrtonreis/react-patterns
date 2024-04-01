import React, { useRef, useState } from 'react'
import { Grid, IconButton, List, ListItem, TextField } from '@mui/material'
import { AddCircleOutlined, RemoveCircle } from '@mui/icons-material'
import { nanoid } from '@reduxjs/toolkit'

import { ColorSelectorPopover } from './ColorSelectorPopover/index'
import { useAppDispatch, useAppSelector } from '../../../../../store/slices/hooks'
import { selectSelectedDayTasks } from '../../../../../store/slices/calendar/selectors'
import {
    addTaskEntryAction,
    removeTaskEntryAction,
} from '../../../../../store/slices/calendar/slice'
import { TASK_COLORS } from '../constants'

export default function SingleDayFull() {
    const [input, setInput] = useState('')
    const lastListItemRef = useRef<HTMLLIElement | null>(null)

    const items = useAppSelector(selectSelectedDayTasks)

    const dispatch = useAppDispatch()
    const handleAddNew = () => {
        if (!input.trim()) return

        dispatch(addTaskEntryAction({ id: nanoid(), title: input }))
        setInput('')
        setTimeout(() => {
            if (lastListItemRef.current) {
                lastListItemRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        }, 0)
    }

    const handleDelete = (id: string) => {
        dispatch(removeTaskEntryAction({ id }))
    }

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [clickedTaskId, setClickedTaskId] = useState<string | null>(null)
    const handleClickColor = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setClickedTaskId(id)
        setAnchorEl(e.currentTarget)
    }

    const handleCloseColor = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open && clickedTaskId ? clickedTaskId : undefined

    return (
        <Grid container height="100%" direction="column" marginX="20px" paddingBottom="20px">
            <Grid container sx={{ flex: 1, width: '100%', overflowY: 'auto' }}>
                <List>
                    {items.map((item, index) => (
                        <ListItem
                            key={item.id}
                            sx={{ paddingLeft: 0 }}
                            ref={index === items.length - 1 ? lastListItemRef : null}
                        >
                            <Grid container>
                                <div
                                    style={{
                                        borderRadius: 20,
                                        border: 'solid 1px #0003',
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        sx={{ '&:not(:hover)': { opacity: 0.5 } }}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <RemoveCircle />
                                    </IconButton>
                                    {item.title}
                                    <IconButton
                                        size="small"
                                        sx={{ '&:not(:hover)': { opacity: 0.9 } }}
                                        onClick={(e) => handleClickColor(e, item.id)}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: TASK_COLORS[item.category],
                                                width: 20,
                                                height: 20,
                                                borderRadius: 10,
                                                margin: '2px',
                                            }}
                                        />
                                    </IconButton>
                                </div>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid container>
                <Grid flex={1}>
                    <TextField
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
                        placeholder="What's your next plan?"
                        size="small"
                        fullWidth
                        margin="dense"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset, &.Mui-focused fieldset': {
                                    borderColor: '#34a0a4',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid marginRight="10px">
                    <IconButton onClick={handleAddNew} disabled={!input.trim()}>
                        <AddCircleOutlined fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>

            <ColorSelectorPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseColor}
            />
        </Grid>
    )
}
