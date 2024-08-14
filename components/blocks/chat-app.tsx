'use client'
import {
    CheckCheckIcon,
    CheckIcon,
    ClockIcon,
    CornerDownLeft,
    DeleteIcon,
    FilmIcon,
    GroupIcon,
    LogOutIcon,
    MessageCircleMoreIcon,
    MessageSquarePlusIcon,
    Mic,
    MoreVerticalIcon,
    RadioTowerIcon,
    SettingsIcon,
    TrashIcon,
    User2Icon,
    Users2Icon,
    XCircleIcon
} from 'lucide-react'

import { Logo } from '@/components/logo'
import {
    Avatar,
    Button,
    buttonVariants,
    EmojiPicker,
    FileTrigger,
    Form,
    Menu,
    Popover,
    Tooltip
} from '@/components/ui'
import { cn, convertToHtml, formatTime } from '@/lib/utils'
import React from 'react'
import { TextArea } from 'react-aria-components'

export default function ChatApp() {
    const [chats, setChats] = React.useState<BubbleChatProps[]>([
        {
            message: "Assalamu'alaikum, Hello Bro!",
            time: '10:00',
            role: 'recieve'
        },
        {
            message: "Wa'alaikumsalam, Yes Bro... What's up?",
            time: '10:01',
            role: 'send',
            status: 'read'
        },
        {
            message: `I Have a good news, There is new Component at this site. I hope you will like it.
                Check it out. https://cleon-ui.vercel.app
                `,
            time: '10:03',
            role: 'recieve'
        }
    ])

    const ContactList = [
        {
            status: 'online',
            name: 'DQ Al-Haqqi',
            avatar: 'https://github.com/dq-alhq.png',
            active: true
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

    const [message, setMessage] = React.useState('')
    const messageRef = React.useRef<HTMLTextAreaElement>(null)
    const [emoji, setEmoji] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState<number>(0)
    function openEmoji() {
        messageRef.current?.focus()
        setEmoji(!emoji)
    }
    function pickEmoji(emoji: string) {
        messageRef.current?.focus()
        setEmoji(true)
        const start = message.substring(0, messageRef.current?.selectionStart)
        const end = message.substring(messageRef.current?.selectionStart || 0)
        setMessage(start + emoji + end)
        setCursorPosition(start.length + emoji.length)
        messageRef.current?.setSelectionRange(cursorPosition, cursorPosition)
    }

    React.useEffect(() => {
        if (cursorPosition > 0) {
            messageRef.current?.setSelectionRange(cursorPosition, cursorPosition)
        }
    }, [cursorPosition])

    const [file, setFile] = React.useState<string[] | null>(null)

    function sendMessage(e: any) {
        e.preventDefault()
        setChats([
            ...chats,
            {
                message,
                time: formatTime(new Date()),
                role: 'send'
            }
        ])
        setMessage('')
    }

    function deleteChat(index: number) {
        setChats([...chats.slice(0, index), ...chats.slice(index + 1)])
    }
    return (
        <>
            <div className='grid h-screen w-full md:pl-[56px]'>
                <aside className='inset-y hidden fixed left-0 z-20 md:flex h-full flex-col border-r'>
                    <div className='border-b p-2'>
                        <Button variant='outline' size='icon' aria-label='Home'>
                            <Logo className='!size-6 fill-foreground' />
                        </Button>
                    </div>
                    <nav className='grid gap-1 p-2'>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'outline', size: 'icon' })
                                )}
                            >
                                <MessageCircleMoreIcon className='!size-6' />
                            </Tooltip.Trigger>
                            <Tooltip.Content placement='right'>Chats</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <FilmIcon className='!size-6' />
                            </Tooltip.Trigger>
                            <Tooltip.Content placement='right'>Reels</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <RadioTowerIcon className='!size-6' />
                            </Tooltip.Trigger>
                            <Tooltip.Content placement='right'>Broadcast</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <Users2Icon className='!size-6' />
                            </Tooltip.Trigger>
                            <Tooltip.Content placement='right'>Groups</Tooltip.Content>
                        </Tooltip>
                    </nav>
                    <nav className='mt-auto flex flex-col gap-2 p-2 items-center'>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <SettingsIcon className='!size-6' />
                            </Tooltip.Trigger>
                            <Tooltip.Content placement='right'>Settings</Tooltip.Content>
                        </Tooltip>
                        <Avatar src='https://github.com/dq-alhq.png' initials='DQ' />
                    </nav>
                </aside>
                <main className='grid flex-1 gap-4 overflow-auto md:p-4 md:grid-cols-2 lg:grid-cols-3'>
                    <div className='relative hidden flex-col gap-4 items-start md:flex border rounded-lg overflow-scroll'>
                        <div className='flex w-full justify-between items-center sticky top-0 z-20 bg-background p-4'>
                            <h1 className='text-2xl font-bold'>Chats</h1>
                            <div className='flex justify-between items-center gap-2'>
                                <Button variant='ghost' size='icon'>
                                    <MessageSquarePlusIcon className='!size-6' />
                                </Button>
                                <Menu>
                                    <Menu.Trigger
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'icon'
                                        })}
                                    >
                                        <MoreVerticalIcon />
                                    </Menu.Trigger>
                                    <Menu.Content placement='bottom end'>
                                        <Menu.Item>
                                            <GroupIcon />
                                            New Group
                                        </Menu.Item>
                                        <Menu.Item isDanger>
                                            <LogOutIcon />
                                            Logout
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu>
                            </div>
                        </div>
                        <div className='grid w-full gap-2 px-4'>
                            {ContactList.map((contact: any, i: number) => (
                                <Contact key={i} {...contact} />
                            ))}
                        </div>
                    </div>
                    <div className='relative flex h-full min-h-[50vh] flex-col rounded-lg bg-background lg:col-span-2'>
                        <div className='p-2 md:px-4 rounded-lg flex flex-row gap-3 items-center border-b md:border'>
                            <Avatar
                                initials='DQ'
                                status='muted'
                                src='https://github.com/dq-alhq.png'
                            />
                            <div className='grid'>
                                <span className='text-sm'>DQ Al-Haqqi</span>
                                <small className='text-muted-foreground text-xs'>
                                    Last seen 1 hour ago
                                </small>
                            </div>
                            <Menu>
                                <Menu.Trigger
                                    className={cn(
                                        buttonVariants({
                                            variant: 'ghost',
                                            size: 'icon'
                                        }),
                                        'ml-auto'
                                    )}
                                >
                                    <MoreVerticalIcon />
                                </Menu.Trigger>
                                <Menu.Content placement='bottom end'>
                                    <Menu.Item>
                                        <User2Icon />
                                        Contact Info
                                    </Menu.Item>
                                    <Menu.Item>
                                        <DeleteIcon />
                                        Clear Chat
                                    </Menu.Item>
                                    <Menu.Item isDanger>
                                        <XCircleIcon />
                                        Block
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu>
                        </div>
                        <div className='flex-1 flex-col space-y-2 text-muted-foreground py-4 px-2 overflow-y-scroll overflow-x-hidden'>
                            {chats.length > 0 ? (
                                chats?.map((chat: BubbleChatProps, i: number) => (
                                    <BubbleChat
                                        key={i}
                                        {...chat}
                                        onDelete={() => deleteChat(i)}
                                    />
                                ))
                            ) : (
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <MessageCircleMoreIcon className='!size-6' />
                                    <p className='text-center font-bold text-xl'>
                                        Start a conversation
                                    </p>
                                </div>
                            )}
                        </div>
                        <Form
                            onSubmit={sendMessage}
                            className='relative overflow-hidden rounded-lg border-t md:border bg-background focus-within:ring-1 focus-within:ring-ring'
                        >
                            <TextArea
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        sendMessage(e)
                                    }
                                }}
                                value={message}
                                ref={messageRef}
                                onChange={(e) => setMessage(e.target.value)}
                                aria-label='Message'
                                id='message'
                                placeholder='Type your message here...'
                                className='min-h-12 w-full no-scrollbar resize-none border-0 outline-none p-3'
                            />
                            <div className='flex items-center p-3 pt-0'>
                                <EmojiPicker
                                    placement='left'
                                    open={emoji}
                                    setOpen={openEmoji}
                                    onPickEmoji={(e) => pickEmoji(e)}
                                />
                                <FileTrigger
                                    variant='ghost'
                                    size='icon'
                                    onSelect={(e) => {
                                        const files = Array.from(e ?? [])
                                        const filenames = files.map((file) => file.name)
                                        setFile(filenames)
                                    }}
                                />
                                <Tooltip>
                                    <Tooltip.Trigger
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'icon'
                                        })}
                                    >
                                        <Mic className='size-4' />
                                        <span className='sr-only'>Use Microphone</span>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content placement='top'>
                                        Use Microphone
                                    </Tooltip.Content>
                                </Tooltip>
                                <Button
                                    isDisabled={!message}
                                    type='submit'
                                    size='sm'
                                    className='ml-auto gap-1.5'
                                >
                                    Send Message
                                    <CornerDownLeft />
                                </Button>
                            </div>
                        </Form>
                    </div>
                </main>
            </div>
        </>
    )
}

interface BubbleChatProps {
    message: string
    time: string
    role: 'send' | 'recieve'
    status?: 'pending' | 'sent' | 'delivered' | 'read'
    onDelete?: () => void
}

const BubbleChat = ({ message, time, role, status, onDelete }: BubbleChatProps) => {
    const statusIcon: Record<string, JSX.Element> = {
        pending: <ClockIcon className='size-5 text-foreground' />,
        sent: <CheckIcon className='size-5 text-foreground' />,
        delivered: <CheckCheckIcon className='size-5 text-foreground' />,
        read: <CheckCheckIcon className='size-5 text-success' />
    }
    return (
        <div
            className={cn(
                'flex items-start group',
                role === 'send' ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            <div>
                <div
                    className={cn(
                        'rounded-lg border-0 outline-none text-right [&_strong]:font-medium px-2 py-1.5 text-sm',
                        role === 'send'
                            ? 'bg-dark text-dark-foreground rounded-br-none'
                            : 'bg-primary text-primary-foreground rounded-bl-none'
                    )}
                >
                    <div
                        className='text-left prose dark:prose-blue prose-invert text-sm'
                        dangerouslySetInnerHTML={{ __html: convertToHtml(message) }}
                    ></div>
                </div>
                <small
                    className={cn(
                        'flex gap-1 mt-0.5 text-muted-foreground items-center',
                        role === 'send' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {time}
                    {role === 'send' && status && statusIcon[status]}
                </small>
            </div>
            <Popover>
                <Button
                    variant='danger'
                    size='icon'
                    className='size-8 mx-2 opacity-0 pressed:opacity-100 group-hover:opacity-100 transition p-1 sm:size-8'
                >
                    <TrashIcon className='size-3' />
                </Button>
                <Popover.Content>
                    <Popover.Header>
                        <Popover.Title>Delete Chat</Popover.Title>
                        <Popover.Description>
                            This action will permanently delete this chat. Continue?
                        </Popover.Description>
                    </Popover.Header>
                    <Popover.Footer>
                        <Button onPress={onDelete} variant='danger'>
                            Delete
                        </Button>
                    </Popover.Footer>
                </Popover.Content>
            </Popover>
        </div>
    )
}

interface ContactProps {
    name: string
    avatar: string
    status?: 'online' | 'offline'
    last_seen?: string
    active?: boolean
}
const Contact = ({ name, avatar, status, last_seen, active }: ContactProps) => {
    return (
        <div
            className={cn(
                'p-2 md:px-4 rounded-lg flex flex-row gap-3 items-center border-b cursor-pointer md:border',
                active ? 'bg-primary/20' : ''
            )}
        >
            {status === 'online' ? (
                <Avatar src={avatar} status='success' />
            ) : (
                <Avatar src={avatar} />
            )}
            <div className='grid'>
                <span className='text-sm'>{name}</span>
                {status === 'online' ? (
                    <small className='text-success text-xs'>Online</small>
                ) : (
                    <small className='text-muted-foreground text-xs'>
                        Last seen {last_seen}
                    </small>
                )}
            </div>
        </div>
    )
}
