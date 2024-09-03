import * as icons from 'cleon-icons'

import { cn } from '@/lib/utils'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    icon: keyof typeof icons
    className?: string
}

export const Icon = ({ icon, className, ...props }: IconProps) => {
    const CleonIcon = icons[icon] as React.FC<React.SVGProps<SVGSVGElement>>
    if (!CleonIcon) return null
    return <CleonIcon className={cn('size-5', className)} {...props} />
}
