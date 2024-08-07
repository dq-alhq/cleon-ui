'use client'

import { Button, Sheet } from '@/components/ui'

export default function SheetStackDemo() {
    return (
        <Sheet>
            <Button variant='outline'>Stack</Button>
            <Sheet.Content isStack={false}></Sheet.Content>
        </Sheet>
    )
}
