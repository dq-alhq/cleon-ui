'use client'

import { cn } from '@/lib/utils'
import { ChevronDownIcon, ChevronUpIcon, GripHorizontalIcon } from 'lucide-react'
import * as Primitive from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { Checkbox } from './checkbox'

const table = tv({
    slots: {
        root: 'table w-full caption-bottom border-spacing-0 text-sm outline-none',
        column: 'whitespace-nowrap allows-sorting:cursor-pointer px-3 py-3 text-left dragging:cursor-grabbing font-medium outline-none [&:has([slot=selection])]:pr-0',
        header: 'border-b x32',
        row: 'tr group relative cursor-default border-b text-foreground/70 outline-none ring-primary focus-visible:ring-1 selected:bg-primary/15',
        cell: 'whitespace-nowrap px-3 py-3 outline-none'
    }
})

const { root, header, column, row, cell } = table()

const TableBody = <T extends object>(props: Primitive.TableBodyProps<T>) => (
    <Primitive.TableBody {...props} className={cn('[&_.tr:last-child]:border-0')} />
)

interface TableProps extends Primitive.TableProps {
    className?: string
}

const Table = ({ children, className, ...props }: TableProps) => (
    <div className='relative w-full overflow-auto'>
        <Primitive.Table {...props} className={root({ className })}>
            {children}
        </Primitive.Table>
    </div>
)

interface TableCellProps extends Primitive.CellProps {
    className?: string
}

const TableCell = ({ children, className, ...props }: TableCellProps) => (
    <Primitive.Cell {...props} className={cell({ className })}>
        {children}
    </Primitive.Cell>
)

interface TableColumnProps extends Primitive.ColumnProps {
    className?: string
}

const TableColumn = ({ children, className, ...props }: TableColumnProps) => (
    <Primitive.Column {...props} className={column({ className })}>
        {({ allowsSorting, sortDirection }) => (
            <div className='flex [&>[data-slot=icon]]:shrink-0 items-center gap-2'>
                <>
                    {children}
                    {allowsSorting &&
                        (sortDirection === undefined ? (
                            <div className='w-6' />
                        ) : sortDirection === 'ascending' ? (
                            <ChevronUpIcon />
                        ) : (
                            <ChevronDownIcon />
                        ))}
                </>
            </div>
        )}
    </Primitive.Column>
)

const TableHeader = <T extends object>({
    children,
    className,
    columns,
    ...props
}: Primitive.TableHeaderProps<T> & { className?: string }) => {
    const { selectionBehavior, selectionMode, allowsDragging } =
        Primitive.useTableOptions()
    return (
        <Primitive.TableHeader {...props} className={header({ className })}>
            {allowsDragging && <Primitive.Column />}
            {selectionBehavior === 'toggle' && (
                <Primitive.Column className='pl-4'>
                    {selectionMode === 'multiple' && <Checkbox slot='selection' />}
                </Primitive.Column>
            )}
            <Primitive.Collection items={columns}>{children}</Primitive.Collection>
        </Primitive.TableHeader>
    )
}

const TableRow = <T extends object>({
    children,
    className,
    columns,
    id,
    ...props
}: Primitive.RowProps<T> & { className?: string }) => {
    const { selectionBehavior, allowsDragging } = Primitive.useTableOptions()
    return (
        <Primitive.Row
            id={id}
            {...props}
            className={row({
                className:
                    'href' in props
                        ? cn('cursor-pointer hover:bg-secondary/50', className)
                        : ''
            })}
        >
            {allowsDragging && (
                <Primitive.Cell className='ring-primary group cursor-grab dragging:cursor-grabbing'>
                    <Primitive.Button
                        className='bg-transparent pl-1.5 py-1.5 text-muted-foreground pressed:text-foreground'
                        slot='drag'
                    >
                        <GripHorizontalIcon />
                    </Primitive.Button>
                </Primitive.Cell>
            )}
            {selectionBehavior === 'toggle' && (
                <Primitive.Cell className='pl-4'>
                    <span
                        aria-hidden
                        className='absolute inset-y-0 left-0 hidden h-full w-0.5 bg-primary group-selected:block'
                    />
                    <Checkbox slot='selection' />
                </Primitive.Cell>
            )}
            <Primitive.Collection items={columns}>{children}</Primitive.Collection>
        </Primitive.Row>
    )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Cell = TableCell
Table.Column = TableColumn
Table.Row = TableRow

export { Table, type TableCellProps, type TableColumnProps, type TableProps }
