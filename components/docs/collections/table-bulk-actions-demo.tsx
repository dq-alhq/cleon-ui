'use client'

import React from 'react'
import type { Selection } from 'react-aria-components'

import { Card, Description, Table } from '@/components/ui'

export default function TableBulkActionsDemo() {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set())
    return (
        <>
            <Card>
                <Table
                    aria-label='Books'
                    selectionMode='multiple'
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column isRowHeader>Title</Table.Column>
                        <Table.Column>Author</Table.Column>
                        <Table.Column>Genre</Table.Column>
                        <Table.Column>Published</Table.Column>
                    </Table.Header>
                    <Table.Body items={books}>
                        {(item) => (
                            <Table.Row>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell>{item.author}</Table.Cell>
                                <Table.Cell>{item.genre}</Table.Cell>
                                <Table.Cell>{item.publishedYear}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card>
            <Description className='block mt-2 [&>strong]:text-foreground text-muted-foreground'>
                {Array.from(selectedKeys).length > 0 ? (
                    <>
                        You have selected:{' '}
                        <strong>{Array.from(selectedKeys).join(', ')}</strong>
                    </>
                ) : (
                    'You have not selected anything.'
                )}
            </Description>
        </>
    )
}

export const books = [
    {
        id: '1',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        publishedYear: 1960
    },
    {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        publishedYear: 1949
    },
    {
        id: '3',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        publishedYear: 1925
    },
    {
        id: '4',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        genre: 'Fiction',
        publishedYear: 1951
    },
    {
        id: '5',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        publishedYear: 1813
    },
    {
        id: '6',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        publishedYear: 1954
    },
    {
        id: '7',
        title: "Harry Potter and the Sorcerer's Stone",
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        publishedYear: 1997
    }
]
