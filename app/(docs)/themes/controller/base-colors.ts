type BaseColorsProps = 'gray' | 'zinc' | 'slate' | 'stone' | 'neutral' | 'ivory' | 'sand'
type ThemeVariables = {
    [key: string]: string
}
const baseColors: Record<
    BaseColorsProps,
    { root: ThemeVariables; dark: ThemeVariables }
> = {
    gray: {
        root: { '--background': '210 20% 98.04%', '--foreground': '224 71.43% 4.12%' },
        dark: { '--background': '224 71.43% 4.12%', '--foreground': '210 20% 98.04%' }
    },
    zinc: {
        root: { '--background': '0 0% 98.04%', '--foreground': '240 10% 3.92%' },
        dark: { '--background': '240 10% 3.92%', '--foreground': '0 0% 98.04%' }
    },
    slate: {
        root: { '--background': '210 40% 98.04%', '--foreground': '228.57 84% 4.9%' },
        dark: { '--background': '228.57 84% 4.9%', '--foreground': '210 40% 98.04%' }
    },
    stone: {
        root: { '--background': '60 9.09% 97.84%', '--foreground': '20 14.29% 4.12%' },
        dark: { '--background': '20 14.29% 4.12%', '--foreground': '60 9.09% 97.84%' }
    },
    neutral: {
        root: { '--background': '0 0% 98.04%', '--foreground': '0 0% 3.92%' },
        dark: { '--background': '0 0% 3.92%', '--foreground': '0 0% 98.04%' }
    },
    ivory: {
        root: { '--background': '60 100% 99.41%', '--foreground': '60 2.44% 16.08%' },
        dark: { '--background': '60 2.44% 16.08%', '--foreground': '60 100% 99.41%' }
    },
    sand: {
        root: { '--background': '0 0% 99.22%', '--foreground': '0 0% 15.69%' },
        dark: { '--background': '0 0% 15.69%', '--foreground': '0 0% 99.22%' }
    }
}

export { baseColors, type BaseColorsProps }
