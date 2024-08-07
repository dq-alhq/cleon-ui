'use client'

import { ShowMore } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export default function ShowMoreDemo() {
    return (
        <div className='py-6'>
            <ShowMore>
                {({ isSelected }) => (
                    <>
                        Show {isSelected ? 'less' : 'more'}
                        <ChevronDown
                            className={cn(
                                isSelected ? 'rotate-180' : '',
                                'size-4 transition-transform duration-200'
                            )}
                        />
                    </>
                )}
            </ShowMore>
        </div>
    )
}
