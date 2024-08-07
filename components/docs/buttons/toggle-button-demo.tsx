'use client'

import { Toggle } from '@/components/ui'

export default function ToggleButtonDemo() {
    return <Toggle>{({ isSelected }) => <>{isSelected ? "I'm On" : "I'm Off"}</>}</Toggle>
}
