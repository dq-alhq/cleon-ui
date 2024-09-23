'use client'

import React from 'react'

import { IconNoSmoking, IconSmoking } from 'cleon-icons'
import { Toggle } from 'ui'

export default function ToggleButtonControlledDemo() {
    const [isSelected, setSelected] = React.useState(false)
    return (
        <Toggle size='icon' isSelected={isSelected} onChange={setSelected}>
            {({ isSelected }) => <>{isSelected ? <IconSmoking /> : <IconNoSmoking />}</>}
        </Toggle>
    )
}
