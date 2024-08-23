import { ColorField } from '@/components/ui'
import { IconColorPalette } from 'justd-icons'

export default function ColorFieldWithPrefixDemo() {
    return (
        <ColorField label='Color' prefix={<IconColorPalette />} placeholder='#FAFAFA' />
    )
}
