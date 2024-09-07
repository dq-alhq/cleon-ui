import React from 'react'

import { Description, Radio, RadioGroup } from '@/components/ui'

export default function RadioControlledDemo() {
    const [selected, setSelected] = React.useState('')
    return (
        <>
            <RadioGroup label='Features' value={selected} onChange={setSelected}>
                <Radio value='theme'>Theme</Radio>
                <Radio value='language'>Language</Radio>
                <Radio value='timezone'>Timezone</Radio>
                <Radio value='notifications'>Notifications</Radio>
                <Radio value='privacy'>Privacy</Radio>
            </RadioGroup>
            <Description className='mt-2 block [&>strong]:text-foreground'>
                You have selected: <strong>{selected ?? '-'}</strong>
            </Description>
        </>
    )
}
