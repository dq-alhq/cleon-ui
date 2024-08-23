import { ColorField } from '@/components/ui'
import { IconColorPalette } from 'justd-icons'

export default function ColorFieldWithSuffixDemo() {
    return (
        <ColorField label='Color' suffix={<IconColorPalette />} placeholder='#FAFAFA' />
    )
}
