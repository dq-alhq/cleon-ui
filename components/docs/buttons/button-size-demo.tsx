'use client'

import { NextLogo } from '@/components/logo'
import { Button } from '@/components/ui'

export default function ButtonSizeDemo() {
    return (
        <div className='flex flex-col gap-2 md:flex-row md:flex-wrap justify-center items-center'>
            <Button size='xs'>Extra Small</Button>
            <Button size='sm'>Small</Button>
            <Button>Medium (Default)</Button>
            <Button size='lg'>Large</Button>
            <Button size='icon'>
                <NextLogo />
            </Button>
        </div>
    )
}
