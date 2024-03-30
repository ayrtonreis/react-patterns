import React from 'react'
import { IconButton, Popover, PopoverProps } from '@mui/material'

import { PopoverContent } from './elements'
import { TASK_COLORS } from '../../constants'

function ColorSelectorPopover({
    id,
    open,
    anchorEl,
    onClose,
}: Pick<PopoverProps, 'id' | 'open' | 'anchorEl' | 'onClose'>) {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
        >
            <PopoverContent>
                {TASK_COLORS.map((color) => (
                    <IconButton key={color} style={{ padding: 4 }}>
                        <div
                            style={{
                                backgroundColor: color,
                                cursor: 'pointer',
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                                border: 'solid 2px #888',
                            }}
                        />
                    </IconButton>
                ))}
            </PopoverContent>
        </Popover>
    )
}

export default ColorSelectorPopover
