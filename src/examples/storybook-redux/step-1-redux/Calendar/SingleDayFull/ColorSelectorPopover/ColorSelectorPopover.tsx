import React from 'react'
import { IconButton, Popover, PopoverProps } from '@mui/material'

import { PopoverContent } from './elements'
import { TASK_COLORS } from '../../constants'
import { useAppDispatch } from '../../../../../../store/slices/hooks'
import { setTaskCategoryAction } from '../../../../../../store/slices/calendar/slice'
import { TaskCategory } from '../../../../../../store/slices/calendar/types'

function ColorSelectorPopover({
    id,
    open,
    anchorEl,
    onClose,
}: Pick<PopoverProps, 'id' | 'open' | 'anchorEl' | 'onClose'>) {
    const dispatch = useAppDispatch()
    const handleClick = (category: number) => {
        if (id) {
            dispatch(setTaskCategoryAction({ id, category: category as TaskCategory }))
        }
        if (onClose) {
            onClose({}, 'backdropClick')
        }
    }

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
                {TASK_COLORS.map((color, index) => (
                    <IconButton
                        key={color}
                        style={{ padding: 4 }}
                        onClick={() => handleClick(index)}
                    >
                        <div
                            style={{
                                backgroundColor: color,
                                cursor: 'pointer',
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                                border: 'solid 2px #ddd',
                            }}
                        />
                    </IconButton>
                ))}
            </PopoverContent>
        </Popover>
    )
}

export default ColorSelectorPopover
