'use client'

import { Tag, TagGroup, TagList } from '@/components/ui'

const shoes = [
    { id: '1', name: 'Nike', available: true },
    { id: '2', name: 'Adidas', available: false },
    { id: '3', name: 'Puma', available: true },
    { id: '4', name: 'Reebok', available: true },
    { id: '5', name: 'Under Armour', available: false }
]

export default function TagGroupVariantDemo() {
    return (
        <div className='space-y-6 max-w-sm'>
            <TagGroup variant='primary' label='Primary' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
            <TagGroup variant='secondary' label='Secondary' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
            <TagGroup variant='danger' label='Danger' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
            <TagGroup variant='success' label='Success' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
            <TagGroup variant='info' label='Info' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
            <TagGroup variant='warning' label='Warning' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
            <TagGroup variant='dark' label='Dark' selectionMode='multiple'>
                <TagList items={shoes}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>
        </div>
    )
}
