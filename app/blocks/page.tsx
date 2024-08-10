'use client'
import {
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle
} from 'lucide-react'

import {
    Badge,
    Button,
    buttonVariants,
    Drawer,
    NumberField,
    Select,
    Textarea,
    Tooltip
} from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'

export default function ChatApp() {
    const [openDrawer, setOpenDrawer] = React.useState(false)
    return (
        <>
            <div className='grid h-screen w-full pl-[56px]'>
                <aside className='inset-y fixed left-0 z-20 flex h-full flex-col border-r'>
                    <div className='border-b p-2'>
                        <Button variant='outline' size='icon' aria-label='Home'>
                            <Triangle className='size-5 fill-foreground' />
                        </Button>
                    </div>
                    <nav className='grid gap-1 p-2'>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <SquareTerminal className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Playground</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <Bot className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Models</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <Code2 className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>API</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <Book className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Documentation</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <Settings2 className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Settings</Tooltip.Content>
                        </Tooltip>
                    </nav>
                    <nav className='mt-auto grid gap-1 p-2'>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <LifeBuoy className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Help</Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' })
                                )}
                            >
                                <SquareUser className='size-5' />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Account</Tooltip.Content>
                        </Tooltip>
                    </nav>
                </aside>
                <div className='flex flex-col'>
                    <div className='sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4'>
                        <h1 className='text-xl font-semibold mr-3'>Playground</h1>
                        <Button
                            variant='outline'
                            size='icon'
                            onPress={() => setOpenDrawer(!openDrawer)}
                        >
                            <Settings2 />
                        </Button>
                        <Button
                            variant='outline'
                            size='sm'
                            className='ml-auto gap-1.5 text-sm'
                        >
                            <Share />
                            Share
                        </Button>
                    </div>
                    <main className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
                        <div
                            className='relative hidden flex-col items-start gap-8 md:flex'
                            x-chunk='dashboard-03-chunk-0'
                        >
                            <form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0'>
                                <fieldset className='grid gap-6 rounded-lg border p-4'>
                                    <legend className='-ml-1 px-1 text-sm font-medium'>
                                        Settings
                                    </legend>
                                    <Select label='Model' placeholder='Select a model'>
                                        <Select.Item id='gpt-3.5-turbo'>
                                            gpt-3.5-turbo
                                        </Select.Item>
                                        <Select.Item id='gpt-4'>gpt-4</Select.Item>
                                        <Select.Item id='gpt-4-0314'>
                                            gpt-4-0314
                                        </Select.Item>
                                        <Select.Item id='gpt-4-32k'>
                                            gpt-4-32k
                                        </Select.Item>
                                        <Select.Item id='gpt-4-32k-0314'>
                                            gpt-4-32k-0314
                                        </Select.Item>
                                    </Select>
                                    <NumberField label='Temperature' placeholder='0.4' />
                                </fieldset>
                                <fieldset className='grid gap-6 rounded-lg border p-4'>
                                    <legend className='-ml-1 px-1 text-sm font-medium'>
                                        Messages
                                    </legend>
                                    <Select label='Role' placeholder='Select a Role'>
                                        <Select.Item id='user'>User</Select.Item>
                                        <Select.Item id='assistant'>
                                            Assistant
                                        </Select.Item>
                                        <Select.Item id='system'>System</Select.Item>
                                    </Select>
                                    <Textarea
                                        label='Content'
                                        placeholder='You are a ...'
                                    />
                                </fieldset>
                            </form>
                        </div>
                        <div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
                            <Badge variant='dark' className='absolute right-3 top-3'>
                                Output
                            </Badge>
                            <div className='flex-1' />
                            <form
                                className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
                                x-chunk='dashboard-03-chunk-1'
                            >
                                <Textarea
                                    aria-label='Message'
                                    id='message'
                                    placeholder='Type your message here...'
                                    className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
                                />
                                <div className='flex items-center p-3 pt-0'>
                                    <Tooltip>
                                        <Tooltip.Trigger
                                            className={buttonVariants({
                                                variant: 'ghost',
                                                size: 'icon'
                                            })}
                                        >
                                            <Paperclip className='size-4' />
                                            <span className='sr-only'>Attach file</span>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>Attach File</Tooltip.Content>
                                    </Tooltip>
                                    <Tooltip>
                                        <Tooltip.Trigger
                                            className={buttonVariants({
                                                variant: 'ghost',
                                                size: 'icon'
                                            })}
                                        >
                                            <Mic className='size-4' />
                                            <span className='sr-only'>
                                                Use Microphone
                                            </span>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>Use Microphone</Tooltip.Content>
                                    </Tooltip>
                                    <Button
                                        type='submit'
                                        size='sm'
                                        className='ml-auto gap-1.5'
                                    >
                                        Send Message
                                        <CornerDownLeft />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
            <Drawer isOpen={openDrawer} onOpenChange={setOpenDrawer}>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Configuration</Drawer.Title>
                        <Drawer.Description>
                            Configure the settings for the model and messages.
                        </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                        <form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0'>
                            <fieldset className='grid gap-6 rounded-lg border p-4'>
                                <legend className='-ml-1 px-1 text-sm font-medium'>
                                    Settings
                                </legend>
                                <Select label='Model' placeholder='Select a model'>
                                    <Select.Item id='gpt-3.5-turbo'>
                                        gpt-3.5-turbo
                                    </Select.Item>
                                    <Select.Item id='gpt-4'>gpt-4</Select.Item>
                                    <Select.Item id='gpt-4-0314'>gpt-4-0314</Select.Item>
                                    <Select.Item id='gpt-4-32k'>gpt-4-32k</Select.Item>
                                    <Select.Item id='gpt-4-32k-0314'>
                                        gpt-4-32k-0314
                                    </Select.Item>
                                </Select>
                                <NumberField label='Temperature' placeholder='0.4' />
                                <div className='flex gap-4'>
                                    <NumberField label='Top K' placeholder='0.4' />
                                    <NumberField label='Top P' placeholder='0.4' />
                                </div>
                            </fieldset>
                            <fieldset className='grid gap-6 rounded-lg border p-4'>
                                <legend className='-ml-1 px-1 text-sm font-medium'>
                                    Messages
                                </legend>
                                <Select label='Role' placeholder='Select a Role'>
                                    <Select.Item id='user'>User</Select.Item>
                                    <Select.Item id='assistant'>Assistant</Select.Item>
                                    <Select.Item id='system'>System</Select.Item>
                                </Select>
                                <Textarea label='Content' placeholder='You are a ...' />
                            </fieldset>
                        </form>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer>
        </>
    )
}
