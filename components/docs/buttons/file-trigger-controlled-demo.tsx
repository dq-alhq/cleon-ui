'use client'

import React from 'react'

import { Description, FileTrigger } from '@/components/ui'

export default function FileTriggerControlledDemo() {
    const [file, setFile] = React.useState<string[] | null>(null)
    return (
        <>
            <FileTrigger
                onSelect={(e) => {
                    const files = Array.from(e ?? [])
                    const filenames = files.map((file) => file.name)
                    setFile(filenames)
                }}
            />
            {file && (
                <Description className='truncate max-w-60 [&>strong]:font-medium block [&>strong]:text-foreground mt-2'>
                    Your file: <strong>{file}</strong>
                </Description>
            )}
        </>
    )
}
