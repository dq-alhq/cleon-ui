'use client'

import { CameraIcon, FolderIcon, PaperclipIcon } from 'lucide-react'
import {
    FileTrigger as FileTriggerPrimitive,
    type FileTriggerProps as FileTriggerPrimitiveProps
} from 'react-aria-components'

import { Button } from './button'

interface FileTriggerProps extends FileTriggerPrimitiveProps {
    withIcon?: boolean
    isDisabled?: boolean
    variant?:
        | 'primary'
        | 'secondary'
        | 'danger'
        | 'warning'
        | 'info'
        | 'success'
        | 'outline'
        | 'ghost'
        | 'dark'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
    shape?: 'square' | 'circle'
}

const FileTrigger = ({
    variant = 'primary',
    size = 'md',
    shape = 'square',
    withIcon = true,
    ...props
}: FileTriggerProps) => {
    return (
        <FileTriggerPrimitive {...props}>
            <Button
                isDisabled={props.isDisabled}
                size={size}
                shape={shape}
                variant={variant}
            >
                {withIcon && (
                    <>
                        {props.defaultCamera ? (
                            <CameraIcon />
                        ) : props.acceptDirectory ? (
                            <FolderIcon />
                        ) : (
                            <PaperclipIcon />
                        )}
                    </>
                )}
                {size !== 'icon' && (
                    <>
                        {props.children ? (
                            props.children
                        ) : (
                            <>
                                {props.allowsMultiple
                                    ? 'Browse a files'
                                    : props.acceptDirectory
                                      ? 'Browse'
                                      : 'Browse a file'}
                                ...
                            </>
                        )}
                    </>
                )}
            </Button>
        </FileTriggerPrimitive>
    )
}

export { FileTrigger }
