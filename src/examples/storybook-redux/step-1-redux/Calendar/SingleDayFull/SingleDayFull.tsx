import React, { useRef, useState } from 'react'
import { Grid, IconButton, List, ListItem, TextField } from '@mui/material'
import { AddCircleOutlined, RemoveCircle } from '@mui/icons-material'

import { ColorSelectorPopover } from './ColorSelectorPopover/index'

const ITEMS = [
    { id: '001', name: 'Learn a new coding language' },
    { id: '002', name: 'Write a short story' },
    { id: '003', name: 'Redecorate your living room' },
    { id: '004', name: 'Start a blog about your passion' },
    { id: '005', name: 'Take a photography class' },
    { id: '006', name: 'Volunteer at a local charity' },
    { id: '007', name: 'Plan a weekend getaway' },
    { id: '008', name: 'Try a new cuisine' },
    { id: '009', name: 'Organize a game night with friends' },
    { id: '010', name: 'Start a garden or plant some herbs' },
    { id: '011', name: 'Learn a new instrument' },
    { id: '012', name: 'Attend a local art exhibition' },
    { id: '013', name: 'Explore a new hiking trail' },
    { id: '014', name: 'Try a new workout routine' },
    { id: '015', name: 'Declutter and organize your workspace' },
    { id: '016', name: 'Learn a new magic trick' },
]

export default function SingleDayFull() {
    const [items, setItems] = useState(ITEMS)
    const [input, setInput] = useState('')
    const lastListItemRef = useRef<HTMLLIElement | null>(null)

    const handleAddNew = () => {
        if (!input.trim()) return

        setItems((items) => [...items, { id: Math.random().toString(), name: input }])
        setInput('')
        setTimeout(() => {
            if (lastListItemRef.current) {
                lastListItemRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        }, 0)
    }

    const handleDelete = (id: string) => {
        setItems((items) => items.filter((item) => item.id !== id))
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const handleClickColor = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseColor = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

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
                                    {item.name}
                                    <IconButton
                                        size="small"
                                        sx={{ '&:not(:hover)': { opacity: 0.9 } }}
                                        onClick={(e) => handleClickColor(e)}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: '#fca18e',
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
