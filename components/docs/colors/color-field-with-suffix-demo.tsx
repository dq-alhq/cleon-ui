import { ColorField } from '@/components/ui'
import { PaletteIcon } from 'lucide-react'

export default function ColorFieldWithSuffixDemo() {
    return <ColorField label='Color' suffix={<PaletteIcon />} placeholder='#FAFAFA' />
}
