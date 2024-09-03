'use client'

import { IconBrandNextjs } from 'cleon-icons'

import { Button } from '@/components/ui'

export default function ButtonIconDemo() {
    return (
        <Button>
            <IconBrandNextjs className='size-4' />
            Next.Js
        </Button>
    )
}
