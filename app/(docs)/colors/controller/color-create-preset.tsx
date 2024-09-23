import React from 'react'

import chroma from 'chroma-js'
import { type ColorFormat, ListBox, parseColor } from 'react-aria-components'

import ThemeSnippet from '@/components/theme-snippet'
import { ColorField, defaultColor } from '@/components/ui'
import {
    formatColorForTailwind,
    generateColorScale,
    getColorName,
    getForegroundColor
} from '@/lib/colors'

import { ColorItem } from './color-item'
import { ColorShades } from './color-shades'

export interface CustomColorProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    selectedFormat?: ColorFormat
    tailwindVariable: boolean
}

export function CustomColor({ selectedFormat, tailwindVariable }: CustomColorProps) {
    const [customColors, setCustomColors] = React.useState({
        primary: defaultColor.toString('hex'),
        'primary-foreground': getForegroundColor(defaultColor.toString('hex')),
        secondary: chroma(defaultColor.toString('hex')).luminance(0.4).hex(),
        'secondary-foreground': chroma(defaultColor.toString('hex')).darken(2.5).hex(),
        danger: chroma(defaultColor.toString('hex')).set('lch.h', '+90').hex(),
        'danger-foreground': getForegroundColor(defaultColor.toString('hex')),
        success: chroma(defaultColor.toString('hex')).set('lch.h', '-135').hex(),
        'success-foreground': getForegroundColor(defaultColor.toString('hex')),
        info: chroma(defaultColor.toString('hex')).set('lch.h', '+45').hex(),
        'info-foreground': getForegroundColor(defaultColor.toString('hex')),
        warning: chroma(defaultColor.toString('hex')).set('lch.h', '-225').hex(),
        'warning-foreground': getForegroundColor(defaultColor.toString('hex'))
    })
    const [darkCustomColors, setDarkCustomColors] = React.useState({
        primary: chroma(defaultColor.toString('hex')).brighten(0.5).hex(),
        'primary-foreground': getForegroundColor(defaultColor.toString('hex')),
        secondary: chroma(defaultColor.toString('hex'))
            .luminance(0.4)
            .brighten(0.5)
            .hex(),
        'secondary-foreground': chroma(defaultColor.toString('hex')).darken(2.5).hex(),
        danger: chroma(defaultColor.toString('hex'))
            .set('lch.h', '+90')
            .brighten(0.5)
            .hex(),
        'danger-foreground': getForegroundColor(defaultColor.toString('hex')),
        success: chroma(defaultColor.toString('hex'))
            .set('lch.h', '-135')
            .brighten(0.5)
            .hex(),
        'success-foreground': getForegroundColor(defaultColor.toString('hex')),
        info: chroma(defaultColor.toString('hex'))
            .set('lch.h', '+45')
            .brighten(0.5)
            .hex(),
        'info-foreground': getForegroundColor(defaultColor.toString('hex')),
        warning: chroma(defaultColor.toString('hex'))
            .set('lch.h', '-225')
            .brighten(0.5)
            .hex(),
        'warning-foreground': getForegroundColor(defaultColor.toString('hex'))
    })
    const handleChange = (c: any) => {
        setCustomColors({
            primary: c.toString('hex'),
            'primary-foreground': getForegroundColor(c.toString('hex')),
            secondary: chroma(c.toString('hex')).luminance(0.4).hex(),
            'secondary-foreground': chroma(c.toString('hex')).darken(2.5).hex(),
            danger: chroma(c.toString('hex')).set('lch.h', '+90').hex(),
            'danger-foreground': getForegroundColor(c.toString('hex')),
            success: chroma(c.toString('hex')).set('lch.h', '-135').hex(),
            'success-foreground': getForegroundColor(c.toString('hex')),
            info: chroma(c.toString('hex')).set('lch.h', '+45').hex(),
            'info-foreground': getForegroundColor(c.toString('hex')),
            warning: chroma(c.toString('hex')).set('lch.h', '-225').hex(),
            'warning-foreground': getForegroundColor(c.toString('hex'))
        })
        setDarkCustomColors({
            primary: chroma(c.toString('hex')).brighten(0.5).hex(),
            'primary-foreground': getForegroundColor(c.toString('hex')),
            secondary: chroma(c.toString('hex')).luminance(0.4).brighten(0.5).hex(),
            'secondary-foreground': chroma(c.toString('hex')).darken(2.5).hex(),
            danger: chroma(c.toString('hex')).set('lch.h', '+90').brighten(0.5).hex(),
            'danger-foreground': getForegroundColor(c.toString('hex')),
            success: chroma(c.toString('hex')).set('lch.h', '-135').brighten(0.5).hex(),
            'success-foreground': getForegroundColor(c.toString('hex')),
            info: chroma(c.toString('hex')).set('lch.h', '+45').brighten(0.5).hex(),
            'info-foreground': getForegroundColor(c.toString('hex')),
            warning: chroma(c.toString('hex')).set('lch.h', '-225').brighten(0.5).hex(),
            'warning-foreground': getForegroundColor(c.toString('hex'))
        })
    }

    function getStyleCss() {
        return `@layer base {
    :root {
        /* Your Background and Foreground */
        ${Object.keys(customColors)
            .map(
                (key) =>
                    `--${key}: ${formatColorForTailwind(parseColor(customColors[key as keyof typeof customColors]).toString('hsl'))}; /* ${getColorName({ color: customColors[key as keyof typeof customColors], type: 'hex' })} */`
            )
            .join('\n\t\t')}
        /* Rest of your root colors */
    }
    .dark {
        /* Your Background and Foreground */
        ${Object.keys(darkCustomColors)
            .map(
                (key) =>
                    `--${key}: ${formatColorForTailwind(parseColor(darkCustomColors[key as keyof typeof darkCustomColors]).toString('hsl'))}; /* ${getColorName({ color: darkCustomColors[key as keyof typeof darkCustomColors], type: 'hex' })} */`
            )
            .join('\n\t\t')}
        /* Rest of your root colors */
    }
}
`
    }

    return (
        <>
            <div className='p-2 bg-background border rounded-lg overflow-hidden'>
                <div className='flex mb-2 items-center justify-between'>
                    <ColorField
                        className='max-w-56'
                        enableColorFormatSelection
                        enableColorField
                        value={parseColor(customColors.primary)}
                        onChange={handleChange}
                    />
                    <ThemeSnippet code={getStyleCss()} />
                </div>

                <ListBox
                    layout='grid'
                    orientation='horizontal'
                    className='grid grid-cols-6 gap-1 p-4 rounded-lg bg-background dark:bg-foreground border'
                    aria-label='Custom Colors'
                >
                    {Object.entries(customColors).map(([key, value]) =>
                        key.includes('foreground') ? null : (
                            <ColorItem
                                key={key}
                                tailwindVariable={tailwindVariable}
                                {...{
                                    textColor:
                                        customColors[
                                            `${key}-foreground` as keyof typeof customColors
                                        ],
                                    selectedFormat: selectedFormat ?? 'hsl',
                                    item: {
                                        shade: key,
                                        color: value
                                    },
                                    name: key
                                }}
                            />
                        )
                    )}
                </ListBox>
                <ListBox
                    layout='grid'
                    orientation='horizontal'
                    className='grid grid-cols-6 gap-1 p-4 rounded-lg dark border bg-background'
                    aria-label='Custom Colors Dark'
                >
                    {Object.entries(darkCustomColors).map(([key, value]) =>
                        key.includes('foreground') ? null : (
                            <ColorItem
                                key={key}
                                tailwindVariable={tailwindVariable}
                                {...{
                                    textColor:
                                        darkCustomColors[
                                            `${key}-foreground` as keyof typeof darkCustomColors
                                        ],
                                    selectedFormat: selectedFormat ?? 'hsl',
                                    item: {
                                        shade: key,
                                        color: value
                                    },
                                    name: key
                                }}
                            />
                        )
                    )}
                </ListBox>
            </div>
            <ColorShades
                item={{
                    name: getColorName({ color: customColors.primary }) as string,
                    children: generateColorScale(customColors.primary) as any
                }}
                selectedFormat={selectedFormat}
                tailwindVariable={tailwindVariable}
            />
        </>
    )
}
