'use client'

import { Pagination } from '@/components/ui'

export default function PaginationSimpleDemo() {
    return (
        <Pagination>
            <Pagination.List>
                <Pagination.Item role='first' href='#' />
                <Pagination.Item role='previous' href='#' />
                <Pagination.Section
                    aria-label='Pagination. Segment'
                    className='rounded-lg border'
                >
                    <Pagination.Item role='label'>1</Pagination.Item>
                    <Pagination.Item role='separator' />
                    <Pagination.Item className='text-muted-foreground' role='label'>
                        10
                    </Pagination.Item>
                </Pagination.Section>
                <Pagination.Item role='next' href='#' />
                <Pagination.Item role='last' href='#' />
            </Pagination.List>
        </Pagination>
    )
}
