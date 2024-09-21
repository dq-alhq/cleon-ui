export const primary = {
    light: {
        indigo: '#4F46E5',
        blue: '#2563EB',
        sky: '#0284C7',
        violet: '#7C3AED',
        bay: '#000073',
        persian: '#0000AA'
    },
    dark: {
        indigo: '#4338CA',
        blue: '#1D4ED8',
        sky: '#0369A1',
        violet: '#7C3AED',
        bay: '#000073',
        persian: '#0000AA'
    }
}

export const danger = {
    light: {
        red: '#DC2626',
        rose: '#E11D48',
        cherise: '#B71032',
        chestnut: '#892323',
        mexican: '#730000',
        pink: '#DB2777'
    },
    dark: {
        red: '#DC2626',
        rose: '#E11D48',
        cherise: '#B71032',
        chestnut: '#892323',
        mexican: '#730000',
        pink: '#DB2777'
    }
}

export const success = {
    light: {
        green: '#16A34A',
        emerald: '#059669',
        teal: '#0D9488',
        lime: '#65A30D',
        salad: '#1C731C',
        forest: '#005300'
    },
    dark: {
        green: '#16A34A',
        emerald: '#059669',
        teal: '#0D9488',
        lime: '#65A30D',
        salad: '#1C731C',
        forest: '#005300'
    }
}

export const warning = {
    light: {
        orange: '#EA580C',
        amber: '#D97706',
        sunshade: '#D47400',
        yellow: '#CA8A04',
        sunglow: '#D4B300',
        salmon: '#D4523B'
    },
    dark: {
        orange: '#EA580C',
        amber: '#D97706',
        sunshade: '#D47400',
        yellow: '#CA8A04',
        sunglow: '#D4B300',
        salmon: '#D4523B'
    }
}

export const info = {
    light: {
        purple: '#9333EA',
        amethyst: '#7F29AA',
        lavender: '#9B46AF',
        fuchsia: '#C026D3',
        magenta: '#D400D4',
        orchid: '#B55DB2'
    },
    dark: {
        purple: '#9333EA',
        amethyst: '#7F29AA',
        lavender: '#9B46AF',
        fuchsia: '#C026D3',
        magenta: '#D400D4',
        orchid: '#B55DB2'
    }
}

export const secondary = {
    light: {
        slate: '#475569',
        gray: '#6B7280',
        zinc: '#52525B',
        neutral: '#525252',
        stone: '#57534E',
        manatee: '#646972'
    },
    dark: {
        slate: '#475569',
        gray: '#6B7280',
        zinc: '#52525B',
        neutral: '#525252',
        stone: '#57534E',
        manatee: '#646972'
    }
}

export const background = {
    light: {
        slate: '#F8FAFC',
        gray: '#F9FAFB',
        zinc: '#FAFAFA',
        neutral: '#FCFDFF',
        stone: '#FAFAF9',
        manatee: '#EFEFF1'
    },
    dark: {
        slate: '#020617',
        gray: '#030712',
        zinc: '#09090B',
        neutral: '#0A0A0A',
        stone: '#0C0A09',
        manatee: '#161719'
    }
}

export const foreground = {
    light: {
        slate: '#020617',
        gray: '#030712',
        zinc: '#09090B',
        neutral: '#0A0A0A',
        stone: '#0C0A09',
        manatee: '#161719'
    },
    dark: {
        slate: '#F8FAFC',
        gray: '#F9FAFB',
        zinc: '#FAFAFA',
        neutral: '#FCFDFF',
        stone: '#FAFAF9',
        manatee: '#EFEFF1'
    }
}

export interface VariablesPresetProps {
    variable:
        | '--background'
        | '--foreground'
        | '--primary'
        | '--primary-foreground'
        | '--secondary'
        | '--secondary-foreground'
        | '--muted'
        | '--muted-foreground'
        | '--danger'
        | '--danger-foreground'
        | '--warning'
        | '--warning-foreground'
        | '--info'
        | '--info-foreground'
        | '--success'
        | '--success-foreground'
        | '--dark'
        | '--dark-foreground'
    theme: 'light' | 'dark'
}

export const VariablesPreset = ({ variable, theme }: VariablesPresetProps) => {
    let colorPreset
    switch (variable) {
        case '--danger':
            colorPreset = Object.values(danger[theme])
            break
        case '--warning':
            colorPreset = Object.values(warning[theme])
            break
        case '--info':
            colorPreset = Object.values(info[theme])
            break
        case '--success':
            colorPreset = Object.values(success[theme])
            break
        case '--primary':
            colorPreset = Object.values(primary[theme])
            break
        case '--secondary':
        case '--muted':
            colorPreset = Object.values(secondary[theme])
            break
        case '--foreground':
        case '--dark':
            colorPreset = Object.values(foreground[theme])
            break
        default:
        case '--background':
            colorPreset = Object.values(background[theme])
    }
    return colorPreset
}
