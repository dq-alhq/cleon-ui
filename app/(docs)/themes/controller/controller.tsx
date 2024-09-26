'use client'

import { Presets } from './theme-presets'

export const applyTheme = (
    themeContainer: HTMLHtmlElement,
    theme: string,
    resolvedTheme: 'dark' | 'light'
) => {
    const themeVariables =
        resolvedTheme === 'dark' ? Presets[theme].dark : Presets[theme].light
    Object.keys(themeVariables).forEach((key) => {
        themeContainer.style.setProperty(
            key,
            themeVariables[key as keyof typeof themeVariables]
        )
    })
    themeContainer.style.setProperty(
        '--radius',
        `${Presets[theme].radius ?? Presets.cleon.radius}rem`
    )
}
