'use client'

import {
    IconAlertCircle,
    IconAlertTriangle,
    IconCircleCheck,
    IconLoader
} from 'cleon-icons'
import { Toaster as ToasterPrimitive, type ToasterProps } from 'sonner'

import { useTheme } from '@/components/providers'
import { cn } from '@/lib/utils'

import { buttonVariants } from './button'

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()
    return (
        <ToasterPrimitive
            theme={theme as ToasterProps['theme']}
            className='toaster group'
            icons={{
                info: <IconAlertCircle className='size-4' />,
                success: <IconCircleCheck className='size-4' />,
                warning: <IconAlertTriangle className='size-4' />,
                error: <IconAlertTriangle className='size-4' />,
                loading: <IconLoader className='animate-spin size-4' />
            }}
            toastOptions={{
                unstyled: true,
                closeButton: true,
                classNames: {
                    toast: cn(
                        'bg-background ring-1 ring-muted-foreground dark:ring-inset sm:min-w-[22rem] rounded-xl text-foreground overflow-hidden text-[0.925rem] backdrop-blur-xl px-4 py-3 font-normal sm:px-5 sm:py-5',
                        '[&:has([data-icon])_[data-content]]:ml-6',
                        '[&:has([data-button])_[data-close-button="true"]]:hidden',
                        '[&:not([data-description])_[data-title]]:font-normal',
                        '[&:has([data-description])_[data-title]]:!font-medium [&:has([data-description])_[data-title]]:!text-lg',
                        '[&>[data-button]]:absolute [&>[data-button=true]]:bottom-4',
                        '[&>[data-action=true]]:right-4',
                        '[&>[data-cancel=true]]:left-4'
                    ),
                    icon: 'absolute top-1/2 -translate-y-1/2',
                    content:
                        '[&:not(:has(+button))]:pr-10 [&:has(+button)]:pb-11 md:[&:has(+button)]:pb-9',
                    error: 'bg-danger text-white ring-white/10 text-danger-foreground dark:ring-inset [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]:hover]:bg-white/20',
                    info: 'bg-info ring-white/10 text-info-foreground dark:ring-inset [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]:hover]:bg-white/20',
                    warning:
                        'bg-warning text-warning-foreground ring-white/10 dark:ring-inset [&>[data-close-button=true]>svg]:text-amber-950 [&>[data-close-button=true]:hover]:bg-white/20',
                    success:
                        'bg-success text-white ring-white/10 text-success-foreground dark:ring-inset [&>[data-close-button=true]>svg]:text-white [&>[data-close-button=true]:hover]:bg-white/20',
                    cancelButton: buttonVariants({
                        className: '',
                        size: 'xs',
                        variant: 'outline'
                    }),
                    actionButton: buttonVariants({
                        className: 'self-end justify-self-end',
                        size: 'xs'
                    }),
                    closeButton:
                        '[&_svg]:size-5 size-8 absolute top-1/2 transform -translate-y-1/2 right-2 lg:right-3 left-auto grid place-content-center rounded-md hover:bg-black/20 dark:hover:bg-white/20 border-0 [&_svg]:text-foreground'
                }
            }}
            {...props}
        />
    )
}

export { Toaster }
