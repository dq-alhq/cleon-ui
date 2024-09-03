import { IconColorSwatch } from 'cleon-icons'

import { ColorField } from '@/components/ui'

export default function ColorFieldWithPrefixDemo() {
    return <ColorField label='Color' prefix={<IconColorSwatch />} placeholder='#FAFAFA' />
}
