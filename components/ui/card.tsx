import * as React from 'react'

import { cn } from '@/lib/utils'

interface CardSubComponents {
    Header: typeof CardHeader
    Title: typeof CardTitle
    Description: typeof CardDescription
    Content: typeof CardContent
    Footer: typeof CardFooter
}

type CardComponent = React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement>
> &
    React.RefAttributes<HTMLDivElement> &
    CardSubComponents

const Card: CardComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'card rounded-lg border bg-background text-foreground shadow-sm [&_table]:overflow-hidden',
            className
        )}
        {...props}
    />
)) as CardComponent
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5 px-6 py-5', className)}
            {...props}
        />
    )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-lg klda font-semibold leading-none tracking-tight',
            className
        )}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('sm:text-sm text-base text-muted-foreground', className)}
        {...props}
    />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'px-6 pb-6 has-[table]:p-0 [&:has(table)]:border-t [&_.td]:px-6 [&_.th]:px-6',
            className
        )}
        {...props}
    />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        />
    )
)
CardFooter.displayName = 'CardFooter'

Card.Header = CardHeader
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent

export { Card }
