'use client'

import React from 'react'

import { isFileDropItem } from 'react-aria-components'
import { Description, DropZone, FileTrigger } from 'ui'

import type { DropEvent } from '@react-types/shared'

export default function DropZoneAndFileTriggerDemo() {
    const [droppedImage, setDroppedImage] = React.useState<string | undefined>(undefined)

    const onDropHandler = async (e: DropEvent) => {
        const item = e.items
            .filter(isFileDropItem)
            .find((item) => item.type === 'image/jpeg' || item.type === 'image/png')
        if (item) {
            const file = await item.getFile()
            setDroppedImage(URL.createObjectURL(file))
        }
    }

    const onSelectHandler = async (e: any) => {
        if (e) {
            const files = Array.from([...e])
            const item = files[0]

            if (item) {
                setDroppedImage(URL.createObjectURL(item))
            }
        }
    }
    return (
        <DropZone
            getDropOperation={(types) =>
                types.has('image/jpeg') || types.has('image/png') ? 'copy' : 'cancel'
            }
            onDrop={onDropHandler}
        >
            {droppedImage ? (
                <img
                    alt=''
                    src={droppedImage}
                    className='aspect-square size-full object-contain'
                />
            ) : (
                <div className='grid space-y-3'>
                    <div className='justify-center flex'>
                        <FileTrigger
                            acceptedFileTypes={['image/png', 'image/jpeg']}
                            allowsMultiple={false}
                            onSelect={onSelectHandler}
                        >
                            Upload a file
                        </FileTrigger>
                    </div>
                    <Description>Or drag and drop PNG, JPG, GIF up to 10MB</Description>
                </div>
            )}
            <input type='hidden' name='image' value={droppedImage} />
        </DropZone>
    )
}
