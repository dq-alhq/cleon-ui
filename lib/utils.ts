import React from 'react'

import type { Docs } from '#site/content'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export function useMediaQuery(query: string) {
    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches)
        }

        const result = matchMedia(query)
        result.addEventListener('change', onChange)
        setValue(result.matches)

        return () => result.removeEventListener('change', onChange)
    }, [query])

    return value
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

export function sortDocs(docs: Array<Docs>) {
    return docs.sort((a, b) => a.order - b.order)
}

export function getAllRefs(docs: Array<Docs>) {
    const references: Record<string, number> = {}
    docs.forEach((doc) => {
        if (doc.published) {
            doc.references?.forEach((tag: string) => {
                references[tag] = (references[tag] ?? 0) + 1
            })
        }
    })

    return references
}

export function sortReferencesByCount(references: Record<string, number>) {
    return Object.keys(references).sort((a, b) => references[b] - references[a])
}

export const getInitials = (name: string): string =>
    name
        .split(' ')
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')

export function slugify(string: string) {
    return string
        .normalize('NFKD')
        .replace(/[^a-z0-9 ]/gi, '')
        .trim()
        .replace(/\s+/g, '-')
}

export function getDocsByTagReferences(docs: Array<Docs>, tag: string) {
    return docs.filter((doc) => {
        if (!doc.references) return false
        const slugifiedTags = doc.references.map((tag: string) => slugify(tag))
        return slugifiedTags.includes(tag)
    })
}

export function titleCase(input: string): string {
    return input
        .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', ' ').replace('_', ' ')
        )
        .replace(/^[a-z]/, (group) => group.toUpperCase())
}

export function wait(number: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, number))
}

export const pascalCaseToTitleCase = (input: string): string =>
    input
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase())

export const convertToHtml = (text: string) => {
    let html = text
    html = html.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    html = html.replace(/`([^`]+)`/g, '<code class="font-mono">$1</code>')
    html = html.replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    html = html.replace(/_(.*?)_/g, '<em>$1</em>')

    return html
}

export function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export const kebabToPascal = (str: string) =>
    str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')

export const kebabToTitle = (str: string) =>
    str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

export function convertSvgToJsx(svgString: string): string {
    const parser = new DOMParser()
    const svgDocument = parser.parseFromString(svgString, 'image/svg+xml')
    const svgElement = svgDocument.documentElement

    function convertAttributes(node: Element): void {
        Array.from(node.attributes).forEach((attr) => {
            const camelCaseName = attr.name.replace(/-([a-z])/g, (g) =>
                g[1].toUpperCase()
            )
            if (attr.name !== camelCaseName) {
                node.setAttribute(camelCaseName, attr.value)
                node.removeAttribute(attr.name)
            }
        })
    }

    function transformNode(node: Node): string {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            convertAttributes(element)
            const tagName = element.tagName.toLowerCase()
            const attributes = Array.from(element.attributes)
                .map((attr) => `${attr.name}="${attr.value}"`)
                .join(' ')
            const children = Array.from(element.childNodes).map(transformNode).join('')

            return `<${tagName}${attributes ? ' ' + attributes : ''}>${children}</${tagName}>`
        } else if (node.nodeType === Node.TEXT_NODE) {
            return (node as Text).textContent || ''
        }
        return ''
    }

    return transformNode(svgElement)
}

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
