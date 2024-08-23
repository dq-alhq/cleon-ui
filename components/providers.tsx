'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'

import { Toaster } from '@/components/ui'

declare module 'react-aria-components' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
    }
}

function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <RouterProvider navigate={router.push}>
            <ThemeProvider attribute='class'>
                <Toaster />
                {children}
            </ThemeProvider>
        </RouterProvider>
    )
}

export { Providers, useTheme }
