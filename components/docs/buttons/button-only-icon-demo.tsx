'use client'

import { IconBrandNextjs } from 'cleon-icons'

import { Button } from '@/components/ui'

export default function ButtonOnlyIconDemo() {
    return (
        <Button size='icon'>
            <IconBrandNextjs className='size-4' />
        </Button>
    )
}
