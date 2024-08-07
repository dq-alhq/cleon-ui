'use client'

import { ChevronRightIcon } from 'lucide-react'
import type { BreadcrumbProps, BreadcrumbsProps } from 'react-aria-components'
import {
    Breadcrumb as BreadcrumbPrimitive,
    Breadcrumbs as BreadcrumbsPrimitive,
    type LinkProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Link } from './link'

const Breadcrumbs = <T extends object>({ className, ...props }: BreadcrumbsProps<T>) => {
    return <BreadcrumbsPrimitive {...props} className={cn('flex gap-1', className)} />
}

const Breadcrumb = ({ className, ...props }: BreadcrumbProps & LinkProps) => {
    return (
        <BreadcrumbPrimitive
            {...props}
            className={cn('flex items-center gap-1', className)}
        >
            <Link href={props.href} {...props} />
            {'href' in props && (
                <ChevronRightIcon className='size-4 shrink-0 text-muted-foreground' />
            )}
        </BreadcrumbPrimitive>
    )
}

export { Breadcrumb, Breadcrumbs }
