import { Avatar } from '@/components/ui'

export default function AvatarShapeDemo() {
    return (
        <div className='flex gap-2'>
            <Avatar
                shape='square'
                initials='DQ'
                alt='dq-alhq'
                src='https://github.com/dq-alhq.png'
            />
            <Avatar
                shape='circle'
                initials='DQ'
                alt='dq-alhq'
                src='https://github.com/dq-alhq.png'
            />
        </div>
    )
}
