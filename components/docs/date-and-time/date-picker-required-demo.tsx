'use client'

import React from 'react'

import { Button, DatePicker, Form } from '@/components/ui'

export default function DatePickerRequiredDemo() {
    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <DatePicker
                label='Delivery date'
                name='deliveryDate'
                isRequired
                className='mb-2'
            />

            <Button type='submit'>Submit</Button>
        </Form>
    )
}
