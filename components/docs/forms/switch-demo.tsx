'use client'

import { useTheme } from 'next-themes'

import { Switch } from '@/components/ui'

export default function SwitchDemo() {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <Switch onChange={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
            Turn on the light
        </Switch>
    )
}
