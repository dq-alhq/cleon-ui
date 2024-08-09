'use client'

import React from 'react'

import { tv, type VariantProps } from 'tailwind-variants'
import { VisuallyHidden } from './visually-hidden'

const avatarGroupStyles = tv({
    base: 'flex items-center justify-center -space-x-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background'
})

interface AvatarGroupProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof avatarGroupStyles> {
    children: React.ReactNode
}

const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => {
    return <div className={avatarGroupStyles({ className })} {...props} />
}

const avatarStyles = tv({
    base: [
        'inline-grid relative shrink-0 bg-secondary align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1',
        'outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity]'
    ],
    variants: {
        size: {
            sm: 'size-6',
            md: 'size-8',
            lg: 'size-10',
            xl: 'size-12',
            '2xl': 'size-16'
        },
        shape: {
            square: 'rounded-[--avatar-radius] *:rounded-[--avatar-radius] [&_[data-slot=badge]]:rounded-full',
            circle: 'rounded-full *:rounded-full'
        }
    },

    defaultVariants: {
        shape: 'circle',
        size: 'md'
    }
})

type Status = 'danger' | 'success' | 'muted' | 'warning' | 'primary'

interface AvatarProps
    extends React.ComponentPropsWithoutRef<'span'>,
        VariantProps<typeof avatarStyles> {
    src?: string | null
    initials?: string
    alt?: string
    status?: Status
    className?: string
    role?: string
}

const Avatar = ({
    status,
    src = null,
    initials,
    alt = '',
    children,
    className,
    shape,
    size,
    role = 'avatar',
    ...props
}: AvatarProps) => {
    const badgeId = React.useId()
    const ariaLabelledby = [badgeId, children ? badgeId : ''].join(' ')
    return (
        <span
            aria-labelledby={ariaLabelledby}
            role={role}
            data-slot='avatar'
            {...props}
            className={avatarStyles({ shape, size, className })}
        >
            {initials && (
                <svg
                    className='select-none fill-current text-[48px] font-medium uppercase'
                    viewBox='0 0 100 100'
                    aria-hidden={alt ? undefined : 'true'}
                >
                    {alt && <title>{alt}</title>}
                    <text
                        x='50%'
                        y='50%'
                        alignmentBaseline='middle'
                        dominantBaseline='middle'
                        textAnchor='middle'
                        dy='.125em'
                    >
                        {initials}
                    </text>
                </svg>
            )}
            {src && <img src={src} alt={alt} />}
            {status && <AvatarBadge size={size} status={status} aria-label='Available' />}
        </span>
    )
}

type AvatarBadgeProps = {
    className?: string
    status?: Status
    fillBackground?: boolean
    'aria-label': string
    size?: AvatarProps['size']
}

const avatarBadgeStyles = tv({
    base: [
        'size-3 z-1 absolute bottom-0 right-0 z-10 rounded-full ring-[1.5px] ring-background bg-background'
    ],
    variants: {
        size: {
            sm: 'size-1.5 translate-x-[0%] translate-y-[0%]',
            md: 'size-2 translate-x-[5%] translate-y-[5%]',
            lg: 'size-2.5 translate-x-[5%] translate-y-[5%]',
            xl: 'size-3 translate-x-[5%] translate-y-[5%]',
            '2xl': 'size-4 translate-x-[5%] translate-y-[5%]'
        },
        status: {
            danger: 'bg-danger',
            success: 'bg-success',
            muted: 'bg-secondary',
            warning: 'bg-warning',
            primary: 'bg-primary'
        }
    },
    defaultVariants: {
        size: 'md',
        status: 'primary'
    }
})

const AvatarBadge = ({ size, className, status, ...props }: AvatarBadgeProps) => {
    return (
        <span
            data-slot='badge'
            {...props}
            aria-hidden
            className={avatarBadgeStyles({ size, status, className })}
        >
            <VisuallyHidden key={status}>{status}</VisuallyHidden>
        </span>
    )
}

export { Avatar, AvatarGroup }
