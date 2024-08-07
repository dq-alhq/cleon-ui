'use client'

import { Button, Sheet } from '@/components/ui'

export default function SheetControlledDemo() {
    return (
        <Sheet>
            <Button variant='outline'>Notifications</Button>
            <Sheet.Content>
                <Sheet.Footer>
                    <Sheet.Close>Dismiss</Sheet.Close>
                    <Button>Save Preferences</Button>
                </Sheet.Footer>
            </Sheet.Content>
        </Sheet>
    )
}
