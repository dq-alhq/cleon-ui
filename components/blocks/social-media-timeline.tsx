'use client'
import {
    Avatar,
    Button,
    EmojiPicker,
    FileTrigger,
    Form,
    Link,
    SearchField
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
    HomeIcon,
    LayoutDashboardIcon,
    MessageCircleMoreIcon,
    NewspaperIcon,
    SearchIcon,
    SendIcon,
    TrendingUpIcon,
    UserIcon,
    Users2
} from 'lucide-react'
import React from 'react'
import { TextArea } from 'react-aria-components'
import { Logo } from '../logo'
import { ThemeToggle } from '../theme-toggle'

export default function SocialMediaTimeline() {
    const [post, setPost] = React.useState('')
    const postRef = React.useRef<HTMLTextAreaElement>(null)
    const [emoji, setEmoji] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState<number>(0)
    function openEmoji() {
        postRef.current?.focus()
        setEmoji(!emoji)
    }
    function pickEmoji(emoji: string) {
        postRef.current?.focus()
        setEmoji(true)
        const start = post.substring(0, postRef.current?.selectionStart)
        const end = post.substring(postRef.current?.selectionStart || 0)
        setPost(start + emoji + end)
        setCursorPosition(start.length + emoji.length)
        postRef.current?.setSelectionRange(cursorPosition, cursorPosition)
    }

    React.useEffect(() => {
        if (cursorPosition > 0) {
            postRef.current?.setSelectionRange(cursorPosition, cursorPosition)
        }
    }, [cursorPosition])

    const [file, setFile] = React.useState<string[] | null>(null)

    function sendPost(e: any) {
        e.preventDefault()
        console.log(e)
        // setChats([
        //     ...chats,
        //     {
        //         message,
        //         time: formatTime(new Date()),
        //         role: 'send'
        //     }
        // ])
        // setMessage('')
    }
    return (
        <>
            <div className='sticky top-0 z-30 hidden overflow-hidden pb-1 sm:block'>
                <nav className='border-b bg-background/60 py-2 backdrop-blur-xl'>
                    <div className='container'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-x-6'>
                                <Link
                                    href='#'
                                    className='flex items-center gap-2 mr-2 text-lg font-semibold md:text-base'
                                >
                                    <Logo className='size-6' />
                                    <span className='sr-only'>Cleon UI</span>
                                </Link>
                                <NavLink isActive href='/'>
                                    <HomeIcon className='size-5' />
                                    <span className='hidden md:flex'>Home</span>
                                </NavLink>
                                <NavLink href='#'>
                                    <Users2 className='size-5' />
                                    <span className='hidden md:flex'>Friends</span>
                                </NavLink>
                                <NavLink href='#'>
                                    <MessageCircleMoreIcon className='size-5' />
                                    <span className='hidden md:flex'>Messages</span>
                                </NavLink>
                                <NavLink href='#'>
                                    <UserIcon className='size-5' />
                                    <span className='hidden md:flex'>Profile</span>
                                </NavLink>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <SearchField aria-label='Search' />
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5'>
                    <div className='col-span-1 hidden lg:flex p-6'>
                        <div className='flex flex-col gap-2 w-full'>
                            <SideNav href='#' isActive>
                                <LayoutDashboardIcon className='size-5' />
                                <span className='hidden sm:flex'>Timeline</span>
                            </SideNav>
                            <SideNav href='#'>
                                <SearchIcon className='size-5' />
                                <span className='hidden sm:flex'>Explore</span>
                            </SideNav>
                            <SideNav href='#'>
                                <TrendingUpIcon className='size-5' />
                                <span className='hidden sm:flex'>Trending</span>
                            </SideNav>
                            <SideNav href='#'>
                                <NewspaperIcon className='size-5' />
                                <span className='hidden sm:flex'>News</span>
                            </SideNav>
                        </div>
                    </div>
                    <div className='col-span-3 p-6 grid gap-4'>
                        <h1 className='text-3xl font-bold'>Your Timeline</h1>
                        <Form
                            onSubmit={sendPost}
                            className='relative overflow-hidden rounded-lg border-t md:border bg-background focus-within:ring-1 focus-within:ring-ring'
                        >
                            <Avatar
                                initials='DQ'
                                size='xl'
                                className='absolute left-4 top-4'
                            />
                            <TextArea
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        sendPost(e)
                                    }
                                }}
                                value={post}
                                ref={postRef}
                                onChange={(e) => setPost(e.target.value)}
                                aria-label='Post'
                                id='post'
                                placeholder='What’s on your mind?'
                                className='min-h-10 w-full no-scrollbar resize-none border-0 outline-none p-4 pl-20'
                            />
                            <div className='flex items-center p-3 pt-0'>
                                <EmojiPicker
                                    placement='left'
                                    open={emoji}
                                    setOpen={openEmoji}
                                    onPickEmoji={(e) => pickEmoji(e)}
                                />
                                <FileTrigger
                                    defaultCamera='environment'
                                    variant='ghost'
                                    size='icon'
                                    onSelect={(e) => {
                                        const files = Array.from(e ?? [])
                                        const filenames = files.map((file) => file.name)
                                        setFile(filenames)
                                    }}
                                />

                                <Button
                                    isDisabled={!post}
                                    type='submit'
                                    size='sm'
                                    className='ml-auto gap-1.5'
                                >
                                    Post
                                    <SendIcon />
                                </Button>
                            </div>
                        </Form>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
                            similique fuga consequuntur ipsa temporibus blanditiis
                            architecto perspiciatis repellendus animi ea?
                        </div>
                    </div>
                    <div className='col-span-1 bg-warning hidden sm:flex'>Right</div>
                </div>
            </div>
        </>
    )
}

const SideNav = ({
    href,
    isActive,
    children,
    ...props
}: {
    href: string
    isActive?: boolean
    children: React.ReactNode
}) => {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary',
                {
                    'bg-primary text-primary-foreground hover:text-primary-foreground':
                        isActive
                }
            )}
        >
            {children}
        </Link>
    )
}

const NavLink = ({
    href,
    isActive,
    children,
    ...props
}: {
    href: string
    isActive?: boolean
    children: React.ReactNode
}) => {
    return (
        <Link
            href={href}
            className={cn(
                'relative whitespace-nowrap flex items-center gap-x-3 py-2 transition-colors focus:outline-none sm:py-3',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
            )}
            {...props}
        >
            <>
                {children}
                {isActive && (
                    <motion.span
                        layoutId='current-indicator-navlink'
                        className='absolute inset-x-0 bottom-[-0.550rem] h-0.5 w-full rounded bg-primary'
                    />
                )}
            </>
        </Link>
    )
}
