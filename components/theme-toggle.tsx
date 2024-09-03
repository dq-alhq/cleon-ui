'use client'

import { IconMoon, IconSun } from 'cleon-icons'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui'

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <Button
            variant='outline'
            size='icon'
            aria-label={
                'Switch to ' + resolvedTheme === 'light' ? 'dark' : 'light' + 'mode'
            }
            onPress={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
            <IconSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <IconMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
    )
}
