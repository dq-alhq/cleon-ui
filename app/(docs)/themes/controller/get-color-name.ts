import colorNames from '@/lib/color-names.json'

type ColorList = { [key: string]: string }

const colorList: ColorList = colorNames

export function HSLToHex(hsl: string): string {
    const h = Number(hsl.split(' ')[0])
    const s = Number(hsl.split(' ')[1].replace('%', ''))
    const l = Number(hsl.split(' ')[2].replace('%', ''))

    const hDecimal = l / 100
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100
    const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)

        // Convert to Hex and prefix with "0" if required
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
}

function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
}

export function getColorName(hex: string): string {
    const [inputR, inputG, inputB] = hexToRgb(hex)
    let closestColor = { name: 'Unknown color', distance: Infinity }

    for (const [colorHex, colorName] of Object.entries(colorList)) {
        const [r, g, b] = hexToRgb(`#${colorHex}`)
        const distance = Math.sqrt(
            Math.pow(inputR - r, 2) + Math.pow(inputG - g, 2) + Math.pow(inputB - b, 2)
        )

        if (distance < closestColor.distance) {
            closestColor = { name: colorName, distance }
        }
    }

    return closestColor.name
}
