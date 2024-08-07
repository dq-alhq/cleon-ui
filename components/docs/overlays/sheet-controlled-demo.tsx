'use client'

import React from 'react'

import { Button, Sheet } from '@/components/ui'

export default function SheetControlledDemo() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
            <Button onPress={() => setIsOpen(true)}>Profile</Button>
            <Sheet.Content isOpen={isOpen} onOpenChange={setIsOpen}>
                <Sheet.Header>
                    <Sheet.Title>User Profile</Sheet.Title>
                    <Sheet.Description>
                        Manage your profile settings and preferences.
                    </Sheet.Description>
                </Sheet.Header>
                <div className='overflow-y-auto min-h-[calc(var(--visual-viewport-height)-11.5rem)]'>
                    This is where you can update your username, email, and other personal
                    details.
                </div>
                <Sheet.Footer>
                    <Button variant='outline' onPress={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button>Save Changes</Button>
                </Sheet.Footer>
            </Sheet.Content>
        </>
    )
}
