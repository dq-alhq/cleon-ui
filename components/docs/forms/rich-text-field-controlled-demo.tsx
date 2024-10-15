'use client'
import React from 'react'

import { RichTextField } from '@/components/ui'

export default function RichTextFieldWithoutFloatingDemo() {
    const [value, setValue] = React.useState('')
    return (
        <>
            <RichTextField
                value={value}
                onChange={setValue}
                label='Content'
                floatingMenu={false}
                className='mb-2'
            />
            <p className='mt-2'>You have typed: {value ?? '-'}</p>
        </>
    )
}
