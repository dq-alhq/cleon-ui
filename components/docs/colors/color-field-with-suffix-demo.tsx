import { IconColorSwatch } from 'cleon-icons'

import { ColorField } from '@/components/ui'

export default function ColorFieldWithSuffixDemo() {
    return <ColorField label='Color' suffix={<IconColorSwatch />} placeholder='#FAFAFA' />
}
