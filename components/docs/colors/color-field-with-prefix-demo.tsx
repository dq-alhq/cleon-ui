import { ColorField } from '@/components/ui'
import { PaletteIcon } from 'lucide-react'

export default function ColorFieldWithPrefixDemo() {
    return <ColorField label='Color' prefix={<PaletteIcon />} placeholder='#FAFAFA' />
}
