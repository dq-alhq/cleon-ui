'use client'

import * as React from 'react'

import {
    IconBrandCleon,
    IconCalendarTime,
    IconHome,
    IconMessage,
    IconMessages,
    IconRecycle,
    IconRefresh,
    IconRocket,
    IconSearch,
    IconSend,
    IconThumbUp,
    IconTrendingUp,
    IconUser,
    IconUserPlus,
    IconUsers
} from 'cleon-icons'
import { motion } from 'framer-motion'
import { TextArea } from 'react-aria-components'

import { ThemeToggle } from '@/components/theme-toggle'
import {
    Avatar,
    Button,
    Card,
    EmojiPicker,
    FileTrigger,
    Form,
    Link,
    SearchField
} from '@/components/ui'
import { cn, convertToHtml, formatTime, getInitials } from '@/lib/utils'

type FeedProps = {
    author: {
        name: string
        avatar: string
    }
    body: string
    time: string
    likes: number
    comments: number
    share: number
}

const FriendList = [
    {
        status: 'online',
        name: 'DQ Al-Haqqi',
        avatar: 'https://github.com/dq-alhq.png'
    },
    {
        status: 'online',
        name: 'Barbara Kirlin Sr.',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        status: 'offline',
        last_seen: '10 mins ago',
        name: 'Rosemarie Koch',
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        status: 'offline',
        last_seen: '13 mins ago',
        name: 'Mrs. Reva Heaney Jr.',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        status: 'online',
        name: 'Ms. Ettie Abshire DVM',
        avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
        status: 'online',
        name: 'Bria Ziemann',
        avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
        status: 'online',
        name: 'Heloise Borer Sr.',
        avatar: 'https://i.pravatar.cc/150?img=6'
    },
    {
        status: 'offline',
        last_seen: '3 days ago',
        name: 'Miss Jacinthe Gerlach DVM',
        avatar: 'https://i.pravatar.cc/150?img=7'
    },
    {
        status: 'offline',
        last_seen: 'a week ago',
        name: 'Miss Stephania Schaefer Sr.',
        avatar: 'https://i.pravatar.cc/150?img=8'
    }
]
export default function SocialMediaTimeline() {
    const [post, setPost] = React.useState('')
    const postRef = React.useRef<HTMLTextAreaElement>(null)
    const [emoji, setEmoji] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState<number>(0)

    const [feeds, setFeeds] = React.useState<FeedProps[]>([
        {
            author: {
                name: 'DQ Al-Haqqi',
                avatar: 'https://github.com/dqnahdliyan.png'
            },
            body: 'I Create a New Component today, check it out. https://cleon-ui.vercel.app',
            time: '10:00',
            likes: 10,
            comments: 0,
            share: 8
        },
        {
            author: {
                name: 'Yuni Ambar',
                avatar: 'https://github.com/dq-alhq.png'
            },
            body: "This UI Component library is awesome. Don't forget to give it a *star*. https://github.com/dq-alhq/cleon-ui",
            time: '12:00',
            likes: 2,
            comments: 0,
            share: 4
        }
    ])

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
        setFeeds([
            ...feeds,
            {
                author: {
                    name: 'DQ Al-Haqqi',
                    avatar: 'https://github.com/dq-alhq.png'
                },
                body: post,
                time: formatTime(new Date()),
                likes: 0,
                comments: 0,
                share: 0
            }
        ])
        setPost('')
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
                                    <IconBrandCleon className='size-6' />
                                    <span className='sr-only'>Cleon UI</span>
                                </Link>
                                <NavLink isActive href='/'>
                                    <IconHome className='size-5' />
                                    <span className='hidden md:flex'>Home</span>
                                </NavLink>
                                <NavLink href='#'>
                                    <IconUsers className='size-5' />
                                    <span className='hidden md:flex'>Friends</span>
                                </NavLink>
                                <NavLink href='#'>
                                    <IconMessages className='size-5' />
                                    <span className='hidden md:flex'>Messages</span>
                                </NavLink>
                                <NavLink href='#'>
                                    <IconUser className='size-5' />
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
                                <IconCalendarTime className='size-5' />
                                <span className='hidden sm:flex'>Timeline</span>
                            </SideNav>
                            <SideNav href='#'>
                                <IconSearch className='size-5' />
                                <span className='hidden sm:flex'>Explore</span>
                            </SideNav>
                            <SideNav href='#'>
                                <IconTrendingUp className='size-5' />
                                <span className='hidden sm:flex'>Trending</span>
                            </SideNav>
                            <SideNav href='#'>
                                <IconRocket className='size-5' />
                                <span className='hidden sm:flex'>News</span>
                            </SideNav>
                        </div>
                    </div>
                    <div className='col-span-3 p-6 grid gap-4'>
                        <h1 className='text-3xl font-bold'>Your Timeline</h1>
                        <Form
                            onSubmit={sendPost}
                            className='relative overflow-hidden rounded-lg border-t md:border bg-background focus-within:ring-1 focus-within:ring-primary/20'
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
                                    <IconSend />
                                </Button>
                            </div>
                        </Form>
                        <div className='w-full justify-between flex items-center'>
                            <h4 className='text-muted-foreground text-lg my-2'>Feeds</h4>
                            <Button variant='secondary' size='sm' className='group'>
                                <IconRefresh className='transition group-pressed:-rotate-180' />
                                Refresh
                            </Button>
                        </div>
                        <div className='grid space-y-4'>
                            {feeds.map((feed, i) => (
                                <Feed feed={feed} key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='col-span-1 hidden sm:flex'>
                        <div className='flex flex-col gap-2 p-2 mt-2'>
                            <h5 className='text-foreground text-lg'>Friends</h5>
                            <p className='text-muted-foreground text-sm'>
                                Add friends to see their posts here.
                            </p>
                            <div className='grid gap-2 mt-4'>
                                {FriendList.map((friend: any, i: number) => (
                                    <Friends key={i} {...friend} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface FriendsProps {
    name: string
    avatar: string
    status?: 'online' | 'offline'
    last_seen?: string
    active?: boolean
}

const Friends = ({ name, avatar, status, last_seen, active }: FriendsProps) => {
    return (
        <div
            className={cn(
                'rounded-lg p-2 flex w-full flex-row gap-3 items-center border-b cursor-pointer md:border'
            )}
        >
            {status === 'online' ? (
                <Avatar src={avatar} status='success' />
            ) : (
                <Avatar src={avatar} />
            )}
            <div className='grid'>
                <span className='text-sm line-clamp-1'>{name}</span>
                {status === 'online' ? (
                    <small className='text-success text-xs'>Online</small>
                ) : (
                    <small className='text-muted-foreground text-xs'>
                        Last seen {last_seen}
                    </small>
                )}
            </div>
            <Button size='icon' variant='ghost' className='ml-auto'>
                <IconUserPlus />
            </Button>
        </div>
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

const Feed = ({ feed }: { feed: FeedProps }) => {
    return (
        <Card>
            <Card.Header className='flex-row gap-3'>
                <Avatar
                    initials={getInitials(feed.author.name)}
                    src={feed.author.avatar}
                />
                <div className='flex items-center flex-row gap-2'>
                    <Link href='#' className='font-semibold text-foreground'>
                        {feed.author.name}
                    </Link>
                    <Link
                        href='#'
                        className='text-sm text-muted-foreground hover:underline'
                    >
                        {feed.time}
                    </Link>
                </div>
            </Card.Header>
            <Card.Content
                className='text-left prose prose-blue dark:prose-invert text-sm'
                dangerouslySetInnerHTML={{ __html: convertToHtml(feed.body) }}
            />
            <Card.Footer className='-m-6 mt-0'>
                <div className='w-full flex flex-row items-center border-t rounded-t-lg'>
                    <Button className='w-full' variant='ghost'>
                        <IconThumbUp className='size-5' />
                        <span className='ml-1'>{feed.likes}</span>
                    </Button>
                    <Button className='w-full' variant='ghost'>
                        <IconMessage className='size-5' />
                        <span className='ml-1'>{feed.comments}</span>
                    </Button>
                    <Button className='w-full' variant='ghost'>
                        <IconRecycle className='size-5' />
                        <span className='ml-1'>{feed.share}</span>
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}
