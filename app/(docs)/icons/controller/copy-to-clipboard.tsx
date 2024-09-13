'use client'

import type * as icons from 'cleon-icons'
import { renderToStaticMarkup } from 'react-dom/server'
import { toast } from 'sonner'

import { Icon } from '@/components/ui'
import { convertSvgToJsx } from '@/lib/utils'

type IconProps = {
    name: string
    size?: '4' | '5' | '6' | '7'
    stroke?: '1' | '2'
}

export const copySvgToClipboard = ({ name, size, stroke }: IconProps) => {
    const svgString = renderToStaticMarkup(<Icon icon={name as keyof typeof icons} />)
    navigator.clipboard
        .writeText(
            svgString
                .replace('size-5', `size-${size}`)
                .replace('stroke-width="2"', `stroke-width="${stroke}"`)
        )
        .then(() => {
            toast('SVG copied to clipboard')
        })
}

export const copyJsxSvgToClipboard = ({ name, size, stroke }: IconProps) => {
    const svgString = renderToStaticMarkup(<Icon icon={name as keyof typeof icons} />)
    navigator.clipboard
        .writeText(
            convertSvgToJsx(
                svgString
                    .replace('size-4', `size-${size}`)
                    .replace('stroke-width="2"', `stroke-width="${stroke}"`)
            )
        )
        .then(() => {
            toast('JSX copied to clipboard')
        })
}

export const copyJsxToClipboard = (name: string) => {
    navigator.clipboard.writeText(`<Icon${name} />`).then(() => {
        toast(`<Icon${name} /> copied to clipboard`)
    })
}
