'use client'

import * as React from 'react'

import { Tabs } from '@/components/ui'

import { DocCli } from './doc-cli'
import { DocInstallDeps } from './doc-install-deps'
import { SourceCode } from './docs/rehype/source-code'

interface InstallProps extends React.HTMLAttributes<HTMLDivElement> {
    deps: string[]
    cli: string
    components: string | string[]
}

export function DocInstall({ deps, cli, components }: InstallProps) {
    return (
        <Tabs aria-label='Packages' className='my-6'>
            <Tabs.List className='overflow-x-scroll'>
                <Tabs.Label id='cli'>CLI</Tabs.Label>
                <Tabs.Label id='manual'>Manual</Tabs.Label>
            </Tabs.List>
            <Tabs.Content className='w-full' id='cli'>
                <DocCli add={cli} />
            </Tabs.Content>
            <Tabs.Content id='manual' className={'w-full'}>
                <DocInstallDeps items={deps} />
                <SourceCode toShow={components} />
            </Tabs.Content>
        </Tabs>
    )
}
