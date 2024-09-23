import chroma from 'chroma-js'
import ntc from 'ntcjs'

import { slugify } from '@/lib/utils'

import _colors from './colors.json'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
type ColorData = Record<number, string>

export const generateColorScale = (color: string): { shade: number; color: string }[] => {
    const inputColor = color.toLowerCase()
    const colorEntry = (_colors as Array<[string, ColorData]>).find(([_, colors]) => {
        return colors['500'].toLowerCase() === inputColor
    })

    if (colorEntry) {
        const [, colorData] = colorEntry

        return shades.map((shade) => ({
            shade,
            color: colorData[shade] || ''
        }))
    }

    const baseColors = [
        chroma(color).brighten(2.5).hex(),
        chroma(color).brighten(2).hex(),
        chroma(color).brighten(1.5).hex(),
        chroma(color).brighten(1).hex(),
        chroma(color).brighten(0.5).hex(),
        color,
        chroma(color).darken(0.5).hex(),
        chroma(color).darken(1.1).hex(),
        chroma(color).darken(1.5).hex(),
        chroma(color).darken(2).hex(),
        chroma(color).darken(2.5).hex()
    ]

    return shades.map((shade, index) => ({
        shade,
        color: baseColors[index]
    }))
}

export const getForegroundColor = (color: string): string => {
    const luminance = chroma(color).luminance()
    return luminance > 0.5
        ? chroma(color).luminance(0.05).hex()
        : chroma(color).luminance(0.95).hex()
}
export const getBackgroundColor = (color: string): string => {
    const luminance = chroma(color).luminance()
    return luminance < 0.5
        ? chroma(color).luminance(0.1).hex()
        : chroma(color).luminance(0.9).hex()
}

export const getDangerColor = (color: string): string => {
    return chroma(color).set('hsl.h', '-250').hex()
}

export const textForeground = (backgroundColor: string): string => {
    const luminance = chroma(backgroundColor).luminance()
    return luminance > 0.3 ? '#000000' : '#FFFFFF'
}

export const tailwindColorNames = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
]

export const formatColorForTailwind = (colorString: string): string => {
    return colorString
        .replace(/(rgb|rgba|hsl|hsla|hsb|hsba|oklch)[(a]?/g, '')
        .replace(/[()]/g, '')
        .replace(/,\s*/g, ' ')
        .trim()
}

export const formatColorFromTailwind = (colorString: string, format = 'hsl'): string => {
    return format + '(' + colorString.replace(/ /g, ', ') + ')'
}

export const hslToHex = (hsl: string): string => {
    const h = Number(hsl.split(' ')[0])
    const s = Number(hsl.split(' ')[1].replace('%', ''))
    const l = Number(hsl.split(' ')[2].replace('%', ''))
    const hDecimal = l / 100
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100
    const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
}

export const getColorName = ({
    color,
    slug = true,
    type = 'hex'
}: {
    color: string
    slug?: boolean
    type?: 'hex' | 'hsl'
}) => {
    if (type === 'hex') {
        const n_match = ntc.name(color)
        return slug ? slugify(n_match[1]) : n_match[1]
    } else if (type === 'hsl') {
        const n_match = ntc.name(hslToHex(color))
        return slug ? slugify(n_match[1]) : n_match[1]
    }
}
