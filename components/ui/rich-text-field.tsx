'use client'

import React from 'react'

import {
    IconAlignCenter,
    IconAlignJustified,
    IconAlignLeft,
    IconAlignRight,
    IconBlockquote,
    IconBold,
    IconCode,
    IconH1,
    IconH2,
    IconH3,
    IconItalic,
    IconLink,
    IconList,
    IconListDetails,
    IconListNumbers,
    IconPhoto,
    IconSlideshow,
    IconSourceCode,
    IconStrikethrough,
    IconSubscript,
    IconSuperscript,
    IconTypography,
    IconUnderline
} from 'cleon-icons'
import {
    TextField as TextFieldPrimitive,
    type TextFieldProps as TextFieldPrimitiveProps,
    type ValidationResult
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import {
    BubbleMenu,
    type Editor,
    EditorContent,
    Extension,
    FloatingMenu,
    useEditor
} from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

import { Button } from './button'
import { Description, FieldError, Label } from './field'
import { Keyboard } from './keyboard'
import { Popover } from './popover'
import { Separator } from './separator'
import { textareaStyles } from './textarea'
import { Toggle, type ToggleProps } from './toggle'
import { Tooltip } from './tooltip'

interface RichTextFieldProps extends TextFieldPrimitiveProps {
    autoSize?: boolean
    label?: string
    placeholder?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
    className?: string
    isDisabled?: boolean
    floatingMenu?: boolean
    toolbar?: boolean
}

const RichTextField = ({
    className,
    placeholder,
    label,
    description,
    errorMessage,
    isDisabled = false,
    floatingMenu = true,
    toolbar = true,
    ...props
}: RichTextFieldProps) => {
    const TabHandler = Extension.create({
        name: 'tabHandler',
        addKeyboardShortcuts() {
            return {
                Tab: ({ editor }) => {
                    editor
                        .chain()
                        .sinkListItem('listItem')
                        .command(({ tr }) => {
                            tr.insertText('\u0009')
                            return true
                        })
                        .run()
                    return true
                }
            }
        }
    })
    const extensions = [
        TabHandler,
        Image.configure({
            inline: true,
            allowBase64: true
        }),
        TextStyle.configure(),
        TextAlign.configure({
            types: ['heading', 'paragraph']
        }),
        Typography,
        Link,
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            heading: {
                levels: [1, 2, 3]
            }
        }),
        Underline,
        TaskList,
        TaskItem.configure({
            nested: true
        }),
        Superscript,
        Subscript
    ]
    const isDisabledClass = isDisabled ? ' bg-muted opacity-50 select-none' : ''
    const editor = useEditor({
        extensions: extensions,
        editable: !isDisabled,
        editorProps: {
            attributes: {
                class:
                    textareaStyles({ className }) +
                    isDisabledClass +
                    ' min-h-[90px] !prose !dark:prose-invert !prose-blue !max-w-none hypens-auto list-outside leading-none whitespace-pre-line break-all',
                placeholder: placeholder || 'Write something...'
            }
        },
        content: props.value || props.defaultValue || '',
        onUpdate: ({ editor }) => {
            props.onChange?.(editor.getHTML())
        },
        immediatelyRender: false,
        shouldRerenderOnTransaction: false
    })

    return (
        <TextFieldPrimitive
            {...props}
            id='parent'
            className={cn('group flex flex-col gap-1 relative', className)}
        >
            {label && <Label>{label}</Label>}
            <RichTextToolbar
                toolbar={toolbar}
                floatingMenu={floatingMenu}
                editor={editor}
            />
            <EditorContent editor={editor} />
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </TextFieldPrimitive>
    )
}

const RichTextToolbar = ({
    editor,
    floatingMenu = true,
    toolbar = true,
    className
}: {
    editor: Editor | null
    floatingMenu?: boolean
    toolbar?: boolean
    className?: string
}) => {
    if (!editor) {
        return null
    }
    return (
        <>
            {toolbar && (
                <div className='sticky top-10 flex no-scrollbar overflow-x-scroll items-center gap-1 border rounded-lg p-1 bg-background/60 backdrop-blur-sm'>
                    <Tools editor={editor} tools='typography' />
                    <Separator orientation='vertical' className='h-7 mx-1' />
                    <Tools editor={editor} tools='formatting' />
                    <Separator orientation='vertical' className='h-7 mx-1' />
                    <Tools editor={editor} tools='alignment' />
                    <Separator orientation='vertical' className='h-7 mx-1' />
                    <Tools editor={editor} tools='list' />
                    <Separator orientation='vertical' className='h-7 mx-1' />
                    <Tools editor={editor} tools='style' />
                    <Separator orientation='vertical' className='h-7 mx-1' />
                    <Tools editor={editor} tools='insert' />
                </div>
            )}
            {floatingMenu && (
                <>
                    <BubbleMenu
                        className={cn(
                            'flex items-center gap-1 border bg-background/60 backdrop-blur-sm rounded-lg p-1',
                            className
                        )}
                        tippyOptions={{
                            duration: 100,
                            maxWidth: 'none',
                            placement: 'bottom',
                            appendTo: 'parent'
                        }}
                        editor={editor}
                    >
                        <Popover>
                            <Button
                                className='size-7 sm:size-7 rounded-sm'
                                variant='ghost'
                            >
                                {editor.isActive('heading', { level: 1 }) ? (
                                    <IconH1 />
                                ) : editor.isActive('heading', { level: 2 }) ? (
                                    <IconH2 />
                                ) : editor.isActive('heading', { level: 3 }) ? (
                                    <IconH3 />
                                ) : (
                                    <IconTypography />
                                )}
                            </Button>
                            <Popover.Content
                                respectScreen={false}
                                className='p-1 space-x-1 min-w-0'
                            >
                                <Tools editor={editor} tools='typography' />
                            </Popover.Content>
                        </Popover>
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Popover>
                            <Button
                                className='size-7 sm:size-7 rounded-sm'
                                variant='ghost'
                            >
                                {editor.isActive('code') ? (
                                    <IconCode />
                                ) : editor.isActive('blockCode') ? (
                                    <IconSourceCode />
                                ) : (
                                    <IconBlockquote />
                                )}
                            </Button>
                            <Popover.Content
                                respectScreen={false}
                                className='p-1 space-x-1 min-w-0'
                            >
                                <Tools editor={editor} tools='style' />
                            </Popover.Content>
                        </Popover>
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Tools editor={editor} tools='formatting' />
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Popover>
                            <Button
                                className='size-7 sm:size-7 rounded-sm'
                                variant='ghost'
                            >
                                {editor.isActive('numberedList') ? (
                                    <IconListNumbers />
                                ) : editor.isActive('bulletList') ? (
                                    <IconList />
                                ) : (
                                    <IconListDetails />
                                )}
                            </Button>
                            <Popover.Content
                                respectScreen={false}
                                className='p-1 space-x-1 min-w-0'
                            >
                                <Tools editor={editor} tools='style' />
                            </Popover.Content>
                        </Popover>
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Popover>
                            <Button
                                className='size-7 sm:size-7 rounded-sm'
                                variant='ghost'
                            >
                                {editor.isActive({ textAlign: 'justify' }) ? (
                                    <IconAlignJustified />
                                ) : editor.isActive({ textAlign: 'center' }) ? (
                                    <IconAlignCenter />
                                ) : editor.isActive({ textAlign: 'right' }) ? (
                                    <IconAlignRight />
                                ) : (
                                    <IconAlignLeft />
                                )}
                            </Button>
                            <Popover.Content
                                respectScreen={false}
                                className='p-1 space-x-1 min-w-0'
                            >
                                <Tools editor={editor} tools='alignment' />
                            </Popover.Content>
                        </Popover>
                    </BubbleMenu>
                    <FloatingMenu
                        className={cn(
                            'border bg-background/60 backdrop-blur-sm flex flex-row rounded-lg space-x-1 p-1',
                            className
                        )}
                        tippyOptions={{
                            duration: 100,
                            maxWidth: 'none',
                            appendTo: 'parent'
                        }}
                        editor={editor}
                    >
                        <Tools editor={editor} tools='typography' />
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Popover>
                            <Button
                                className='size-7 sm:size-7 rounded-sm'
                                variant='ghost'
                            >
                                {editor.isActive('orderedList') ? (
                                    <IconListNumbers />
                                ) : editor.isActive('bulletList') ? (
                                    <IconList />
                                ) : (
                                    <IconListDetails />
                                )}
                            </Button>
                            <Popover.Content
                                respectScreen={false}
                                className='p-1 space-x-1 min-w-0'
                            >
                                <Tools editor={editor} tools='list' />
                            </Popover.Content>
                        </Popover>
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Popover>
                            <Button
                                className='size-7 sm:size-7 rounded-sm'
                                variant='ghost'
                            >
                                {editor.isActive('code') ? (
                                    <IconCode />
                                ) : editor.isActive('blockCode') ? (
                                    <IconSourceCode />
                                ) : (
                                    <IconBlockquote />
                                )}
                            </Button>
                            <Popover.Content
                                respectScreen={false}
                                className='p-1 space-x-1 min-w-0'
                            >
                                <Tools editor={editor} tools='style' />
                            </Popover.Content>
                        </Popover>
                        <Separator orientation='vertical' className='h-7 mx-1' />
                        <Tools editor={editor} tools='insert' />
                    </FloatingMenu>
                </>
            )}
        </>
    )
}

const Tools = ({
    editor,
    tools
}: {
    editor: Editor
    tools: 'style' | 'alignment' | 'typography' | 'list' | 'formatting' | 'insert'
}) => {
    let items = []
    switch (tools) {
        case 'style':
            items = ['Code', 'Code Block', 'Block Quote']
            break
        case 'alignment':
            items = ['Align Left', 'Align Center', 'Align Right', 'Align Justify']
            break
        case 'typography':
            items = ['Paragraph', 'H1', 'H2', 'H3']
            break
        case 'list':
            items = ['Ordered List', 'Bullet List', 'Task List']
            break
        case 'insert':
            items = ['Image', 'Link']
            break
        default:
        case 'formatting':
            items = [
                'Bold',
                'Italic',
                'Underline',
                'Strikethrough',
                'Subscript',
                'Superscript'
            ]
            break
    }
    return items.map((item, i) => <ToggleButton key={i} editor={editor} utility={item} />)
}

const ToggleButton = ({
    className,
    variant = 'ghost',
    shape = 'square',
    size = 'icon',
    utility,
    editor,
    ...props
}: ToggleProps & { utility: string; editor: Editor }) => {
    const overrideSize = size === 'icon' ? 'size-7 sm:size-7 rounded-sm' : ''
    let utils
    let tooltipText
    switch (utility) {
        case 'Bold':
            utils = {
                children: <IconBold />,
                onChange: () => editor.chain().focus().toggleBold().run(),
                isSelected: editor.isActive('bold'),
                isDisabled: !editor.isEditable || !editor.can().toggleBold()
            }
            tooltipText = (
                <span>
                    Bold
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[3ch]' keys='⌘B' />
                </span>
            )
            break
        case 'Italic':
            utils = {
                children: <IconItalic />,
                onChange: () => editor.chain().focus().toggleItalic().run(),
                isSelected: editor.isActive('italic'),
                isDisabled: !editor.isEditable || !editor.can().toggleItalic()
            }
            tooltipText = (
                <span>
                    Italic
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[3ch]' keys='⌘I' />
                </span>
            )
            break
        case 'Underline':
            utils = {
                children: <IconUnderline />,
                onChange: () => editor.chain().focus().toggleUnderline().run(),
                isSelected: editor.isActive('underline'),
                isDisabled: !editor.isEditable || !editor.can().toggleUnderline()
            }
            tooltipText = (
                <span>
                    Underline
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[3ch]' keys='⌘U' />
                </span>
            )
            break
        case 'Strikethrough':
            utils = {
                children: <IconStrikethrough />,
                onChange: () => editor.chain().focus().toggleStrike().run(),
                isSelected: editor.isActive('strike'),
                isDisabled: !editor.isEditable || !editor.can().toggleStrike()
            }
            tooltipText = (
                <span>
                    Strikethrough
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[3ch]' keys='⌘S' />
                </span>
            )
            break
        case 'Code':
            utils = {
                children: <IconCode />,
                onChange: () => editor.chain().focus().toggleCode().run(),
                isSelected: editor.isActive('code'),
                isDisabled: !editor.isEditable || !editor.can().toggleCode()
            }
            tooltipText = (
                <span>
                    Code
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[3ch]' keys='⌘E' />
                </span>
            )
            break
        case 'Code Block':
            utils = {
                children: <IconSourceCode />,
                onChange: () => editor.chain().focus().toggleCodeBlock().run(),
                isSelected: editor.isActive('codeBlock'),
                isDisabled: !editor.isEditable || !editor.can().toggleCodeBlock()
            }
            tooltipText = (
                <span>
                    Code Block
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', 'alt', 'C']}
                    />
                </span>
            )
            break
        case 'Block Quote':
            utils = {
                children: <IconBlockquote />,
                onChange: () => editor.chain().focus().toggleBlockquote().run(),
                isSelected: editor.isActive('blockquote'),
                isDisabled: !editor.isEditable || !editor.can().toggleBlockquote()
            }
            tooltipText = (
                <span>
                    Block Quote
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', 'B']}
                    />
                </span>
            )
            break
        case 'Align Left':
            utils = {
                children: <IconAlignLeft />,
                onChange: () => editor.chain().focus().setTextAlign('left').run(),
                isSelected: editor.isActive({ textAlign: 'left' }),
                isDisabled: !editor.isEditable || !editor.can().setTextAlign('left')
            }
            tooltipText = (
                <span>
                    Align Left
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', 'L']}
                    />
                </span>
            )
            break
        case 'Align Right':
            utils = {
                children: <IconAlignRight />,
                onChange: () => editor.chain().focus().setTextAlign('right').run(),
                isSelected: editor.isActive({ textAlign: 'right' }),
                isDisabled: !editor.isEditable || !editor.can().setTextAlign('right')
            }
            tooltipText = (
                <span>
                    Align Right
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', 'R']}
                    />
                </span>
            )
            break
        case 'Align Center':
            utils = {
                children: <IconAlignCenter />,
                onChange: () => editor.chain().focus().setTextAlign('center').run(),
                isSelected: editor.isActive({ textAlign: 'center' }),
                isDisabled: !editor.isEditable || !editor.can().setTextAlign('center')
            }
            tooltipText = (
                <span>
                    Align Center
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', 'E']}
                    />
                </span>
            )
            break
        case 'Align Justify':
            utils = {
                children: <IconAlignJustified />,
                onChange: () => editor.chain().focus().setTextAlign('justify').run(),
                isSelected: editor.isActive({ textAlign: 'justify' }),
                isDisabled: !editor.isEditable || !editor.can().setTextAlign('justify')
            }
            tooltipText = (
                <span>
                    Align Justify
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', 'J']}
                    />
                </span>
            )
            break
        case 'H1':
            utils = {
                children: <IconH1 />,
                onChange: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                isSelected: editor.isActive('heading', { level: 1 }),
                isDisabled:
                    !editor.isEditable || !editor.can().toggleHeading({ level: 1 })
            }
            tooltipText = (
                <span>
                    Heading 1
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', 'alt', '1']}
                    />
                </span>
            )
            break
        case 'H2':
            utils = {
                children: <IconH2 />,
                onChange: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                isSelected: editor.isActive('heading', { level: 2 }),
                isDisabled:
                    !editor.isEditable || !editor.can().toggleHeading({ level: 2 })
            }
            tooltipText = (
                <span>
                    Heading 2
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', 'alt', '2']}
                    />
                </span>
            )
            break
        case 'H3':
            utils = {
                children: <IconH3 />,
                onChange: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                isSelected: editor.isActive('heading', { level: 3 }),
                isDisabled:
                    !editor.isEditable || !editor.can().toggleHeading({ level: 3 })
            }
            tooltipText = (
                <span>
                    Heading 3
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', 'alt', '3']}
                    />
                </span>
            )
            break
        case 'Ordered List':
            utils = {
                children: <IconListNumbers />,
                onChange: () => editor.chain().focus().toggleOrderedList().run(),
                isSelected: editor.isActive('orderedList'),
                isDisabled: !editor.isEditable || !editor.can().toggleOrderedList()
            }
            tooltipText = (
                <span>
                    Ordered List
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', '7']}
                    />
                </span>
            )
            break
        case 'Bullet List':
            utils = {
                children: <IconList />,
                onChange: () => editor.chain().focus().toggleBulletList().run(),
                isSelected: editor.isActive('bulletList'),
                isDisabled: !editor.isEditable || !editor.can().toggleBulletList()
            }
            tooltipText = (
                <span>
                    Bullet List
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', '8']}
                    />
                </span>
            )
            break
        case 'Task List':
            utils = {
                children: <IconListDetails />,
                onChange: () => editor.chain().focus().toggleTaskList().run(),
                isSelected: editor.isActive('taskList'),
                isDisabled: !editor.isEditable || !editor.can().toggleTaskList()
            }
            tooltipText = (
                <span>
                    Task List
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', '9']}
                    />
                </span>
            )
            break
        case 'Paragraph':
            utils = {
                children: <IconTypography />,
                onChange: () => editor.chain().focus().setParagraph().run(),
                isSelected: editor.isActive('paragraph'),
                isDisabled: !editor.isEditable || !editor.can().setParagraph()
            }
            tooltipText = (
                <span>
                    Normal (Paragraph)
                    <Keyboard
                        className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]'
                        keys={['⌘', '⇧', '0']}
                    />
                </span>
            )
            break
        case 'Subscript':
            utils = {
                children: <IconSubscript />,
                onChange: () => editor.chain().focus().toggleSubscript().run(),
                isSelected: editor.isActive('subscript'),
                isDisabled: !editor.isEditable || !editor.can().toggleSubscript()
            }
            tooltipText = (
                <span>
                    Subscript
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]' keys='⌘,' />
                </span>
            )
            break
        case 'Superscript':
            utils = {
                children: <IconSuperscript />,
                onChange: () => editor.chain().focus().toggleSuperscript().run(),
                isSelected: editor.isActive('superscript'),
                isDisabled: !editor.isEditable || !editor.can().toggleSuperscript()
            }
            tooltipText = (
                <span>
                    Superscript
                    <Keyboard className='-mr-2 ml-2 [&_kbd]:min-w-[4ch]' keys='⌘.' />
                </span>
            )
            break
        case 'Image':
            return <ImageHandler editor={editor} />
        case 'Link':
            return <LinkHandler editor={editor} />
        default:
            utils = {
                children: '',
                onChange: () => {},
                isSelected: false,
                isDisabled: true
            }
    }
    return (
        <Tooltip delay={300} closeDelay={0}>
            <Toggle
                variant={variant}
                shape={shape}
                size={size}
                className={cn(overrideSize, className)}
                {...props}
                {...utils}
            />
            <Tooltip.Content placement='bottom start'>{tooltipText}</Tooltip.Content>
        </Tooltip>
    )
}

const ImageHandler = ({
    className,
    editor,
    ...props
}: {
    className?: string
    editor: Editor
}) => {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                editor
                    .chain()
                    .insertContentAt(editor.state.selection.anchor, {
                        type: 'image',
                        attrs: {
                            src: reader.result as string
                        }
                    })
                    .focus()
                    .run()
            }
        }
    }
    const addImage = React.useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <>
            <Tooltip delay={300} closeDelay={0}>
                <Button
                    isDisabled={!editor.isEditable}
                    onPress={addImage}
                    variant='ghost'
                    size='icon'
                    className={cn('size-7 sm:size-7 rounded-sm', className)}
                    {...props}
                >
                    <IconSlideshow />
                </Button>
                <Tooltip.Content placement='bottom start'>
                    <span>URL Image</span>
                </Tooltip.Content>
            </Tooltip>
            <Tooltip delay={300} closeDelay={0}>
                <Button
                    isDisabled={!editor.isEditable}
                    onPress={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (event) => handleUpload(event as any)
                        input.click()
                    }}
                    variant='ghost'
                    size='icon'
                    className={cn('size-7 sm:size-7 rounded-sm', className)}
                    {...props}
                >
                    <IconPhoto />
                </Button>
                <Tooltip.Content placement='bottom start'>
                    <span>Upload Image</span>
                </Tooltip.Content>
            </Tooltip>
        </>
    )
}

const LinkHandler = ({
    className,
    editor,
    ...props
}: {
    className?: string
    editor: Editor
}) => {
    const setLink = React.useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])
    if (!editor) {
        return null
    }

    const unsetLink = () => editor.chain().focus().unsetLink().run()
    return (
        <Tooltip delay={300} closeDelay={0}>
            <Toggle
                isDisabled={!editor.isEditable}
                onChange={editor.isActive('link') ? unsetLink : setLink}
                isSelected={editor.isActive('link')}
                variant='ghost'
                size='icon'
                className={cn('size-7 sm:size-7 rounded-sm', className)}
                {...props}
            >
                <IconLink />
            </Toggle>
            <Tooltip.Content placement='bottom start'>
                <span>Link</span>
            </Tooltip.Content>
        </Tooltip>
    )
}

export { RichTextField }
