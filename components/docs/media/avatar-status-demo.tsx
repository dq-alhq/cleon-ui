import { Avatar } from '@/components/ui'

export default function AvatarStatusDemo() {
    return (
        <div className='flex justify-center gap-2'>
            <Avatar
                status='primary'
                initials='DQ'
                src='https://i.pravatar.cc/150?img=59'
            />
            <Avatar
                status='success'
                initials='DQ'
                src='https://i.pravatar.cc/150?img=62'
            />
            <Avatar
                status='danger'
                initials='DQ'
                src='https://i.pravatar.cc/150?img=63'
            />
            <Avatar status='muted' initials='DQ' src='https://i.pravatar.cc/150?img=64' />
            <Avatar
                status='warning'
                initials='DQ'
                src='https://i.pravatar.cc/150?img=60'
            />
        </div>
    )
}
