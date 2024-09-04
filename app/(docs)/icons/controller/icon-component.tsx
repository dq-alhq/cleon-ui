'use client'

import * as icons from 'cleon-icons'
import { renderToString } from 'react-dom/server'

import { Menu, Tooltip } from '@/components/ui'
import { pascalCaseToTitleCase } from '@/lib/utils'

import {
    copyJsxSvgToClipboard,
    copyJsxToClipboard,
    copySvgToClipboard
} from './copy-to-clipboard'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: keyof typeof icons
    size: '4' | '5' | '6' | '7'
    stroke: '1' | '2'
    color?: string
}

export const IconComponent = ({ name, color, size, stroke }: IconProps) => {
    const CleonIcon = icons[name] as React.FC<React.SVGProps<SVGSVGElement>>
    if (!CleonIcon) return null
    return (
        <Tooltip delay={0}>
            <Menu>
                <Tooltip.Trigger className='bg-transparent focus:outline-none flex items-center justify-center cursor-pointer hover:bg-muted pressed:bg-primary pressed:text-primary-foreground size-10 rounded-lg'>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: renderToString(
                                <CleonIcon name={name} className={`size-${size}`} />
                            )
                                .replace('stroke-width="2"', `stroke-width="${stroke}"`)
                                .replaceAll('currentColor', `${color || 'currentColor'}`)
                        }}
                    />
                </Tooltip.Trigger>
                <Menu.Content showArrow>
                    <Menu.Item
                        onAction={() =>
                            copySvgToClipboard({
                                name: name,
                                size: size,
                                stroke: stroke
                            })
                        }
                    >
                        Copy SVG
                    </Menu.Item>
                    <Menu.Item
                        onAction={() =>
                            copyJsxSvgToClipboard({
                                name: name,
                                size: size,
                                stroke: stroke
                            })
                        }
                    >
                        Copy JSX
                    </Menu.Item>
                    <Menu.Item onAction={() => copyJsxToClipboard(name)}>
                        Copy Name
                    </Menu.Item>
                </Menu.Content>
            </Menu>
            <Tooltip.Content aria-label={name}>
                {pascalCaseToTitleCase(name).replace('Icon ', '')}
            </Tooltip.Content>
        </Tooltip>
    )
}
