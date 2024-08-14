'use client'
import {
    CheckCircle2Icon,
    LifeBuoyIcon,
    Loader2Icon,
    LogOutIcon,
    MenuIcon,
    PackagePlus,
    SearchIcon,
    SettingsIcon,
    Trash2Icon
} from 'lucide-react'
import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import {
    Avatar,
    Button,
    buttonVariants,
    Card,
    ComboBox,
    Form,
    Menu,
    Modal,
    NumberField,
    Pagination,
    Popover,
    SearchField,
    Select,
    Sheet,
    TextField
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Logo } from '../logo'

export default function ProductManagement() {
    return (
        <div className='flex min-h-screen w-full flex-col'>
            <header className='sticky z-50 top-0 flex py-2 justify-between items-center gap-4 border-b bg-background px-4 md:px-6'>
                <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                    <Link
                        href='#'
                        className='flex items-center gap-2 text-lg font-semibold md:text-base'
                    >
                        <Logo className='size-6' />
                        <span className='sr-only'>Cleon UI</span>
                    </Link>
                    <Nav />
                </nav>
                <Sheet>
                    <Sheet.Trigger
                        className={cn(
                            buttonVariants({ size: 'icon', variant: 'outline' }),
                            'md:hidden'
                        )}
                    >
                        <MenuIcon className='h-5 w-5' />
                    </Sheet.Trigger>
                    <Sheet.Content side='left' aria-labelledby='Menu'>
                        <Sheet.Header>
                            <Sheet.Title id='Menu'>Menu</Sheet.Title>
                            <Sheet.Description>Open the menu.</Sheet.Description>
                        </Sheet.Header>
                        <Sheet.Body className='px-6'>
                            <Nav />
                        </Sheet.Body>
                    </Sheet.Content>
                </Sheet>
                <div className='flex items-center gap-2'>
                    <Popover>
                        <Popover.Trigger
                            className={buttonVariants({
                                size: 'icon',
                                variant: 'outline'
                            })}
                        >
                            <SearchIcon className='h-5 w-5' />
                        </Popover.Trigger>
                        <Popover.Content>
                            <SearchField aria-label='Search' />
                        </Popover.Content>
                    </Popover>
                    <ThemeToggle />
                    <Menu>
                        <Menu.Trigger>
                            <Avatar
                                className='size-9 sm:size-10'
                                initials='DQ'
                                src='https://github.com/dq-alhq.png'
                            />
                        </Menu.Trigger>
                        <Menu.Content>
                            <Menu.Section>
                                <Menu.Header separator>
                                    <span className='block'>DQ Al-Haqqi</span>
                                    <span className='font-normal text-muted-foreground'>
                                        @dq-alhq
                                    </span>
                                </Menu.Header>
                                <Menu.Item>
                                    <SettingsIcon />
                                    Settings
                                </Menu.Item>
                                <Menu.Item>
                                    <LifeBuoyIcon />
                                    Support
                                </Menu.Item>
                                <Menu.Item isDanger>
                                    <LogOutIcon />
                                    Logout
                                </Menu.Item>
                            </Menu.Section>
                        </Menu.Content>
                    </Menu>
                </div>
            </header>
            <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
                <ProductTable />
            </main>
        </div>
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
                'relative whitespace-nowrap flex items-center gap-x-3 py-2 text-sm transition-colors focus:outline-none sm:py-3',
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

const Nav = () => {
    return (
        <>
            <NavLink href='#'>Dashboard</NavLink>
            <NavLink href='#'>Orders</NavLink>
            <NavLink href='#' isActive>
                Products
            </NavLink>
            <NavLink href='#'>Customers</NavLink>
            <NavLink href='#'>Analytics</NavLink>
        </>
    )
}

import { Table } from '@/components/ui'
import React from 'react'
import { type Key, type Selection, type SortDescriptor } from 'react-aria-components'

interface Product {
    id: number
    title: string
    price: number
    category: string
}

const ProductTable = () => {
    const [search, setSearch] = React.useState('')
    const [list, setList] = React.useState<Product[]>([])
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set())
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: 'id',
        direction: 'ascending'
    })
    const [limit, setLimit] = React.useState<Key>(10)
    const [page, setPage] = React.useState(1)

    const [totalPage, setTotalPage] = React.useState(
        Math.ceil(list.length / Number(limit)) || 1
    )

    React.useEffect(() => {
        setTotalPage(Math.ceil(list.length / Number(limit)))
    }, [list, limit])

    React.useEffect(() => {
        const getList = async () => {
            await fetch(`https://fakestoreapi.com/products?limit=10`)
                .then((res) => res.json())
                .then((data) => setList(data))
        }
        getList()
    }, [])

    const products = React.useMemo(() => {
        return list
            .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                const first = a[sortDescriptor.column as keyof Key]
                const second = b[sortDescriptor.column as keyof Key]
                let sorted =
                    (Number(first) || first) < (Number(second) || second) ? -1 : 1
                sortDescriptor.direction === 'descending' ? (sorted *= -1) : sorted
                return sorted
            })
            .slice((page - 1) * Number(limit), page * Number(limit))
    }, [list, search, sortDescriptor, limit, page])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const { name, price, category } = e.target
        if (name.value && price.value && category.value) {
            const newProduct: Product = {
                id: Math.max(...list.map((product) => product.id)) + 1,
                title: name.value,
                price: parseInt(price.value),
                category: category.value
            }
            setList([...list, newProduct])
            setTotalPage(Math.ceil(list.length / Number(limit)))
            name.value = price.value = category.value = ''
        }
    }

    const [isDeleting, setIsDeleting] = React.useState(false)
    const [loading, setLoading] = React.useState<'idle' | 'loading' | 'success'>('idle')
    const triggerRef = React.useRef(null)

    const deleteProducts = () => {
        setLoading('loading')

        if (selectedKeys === 'all') {
            setList([])
        } else {
            setList(list.filter((product) => !selectedKeys.has(product.id)))
        }
        setLoading('success')
        setIsDeleting(false)
        setLoading('idle')
        setSelectedKeys(new Set())
        setTotalPage(Math.ceil(list.length / Number(limit)))
    }

    return (
        <Card>
            <div className='p-6'>
                <div className='flex gap-2 flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <Card.Header className='p-0'>
                        <Card.Title>Products</Card.Title>
                        <Card.Description>
                            The list of the products in the store
                        </Card.Description>
                    </Card.Header>
                    <div className='flex flex-col lg:flex-row lg:items-center gap-2 lg:justify-end'>
                        {Array.from(selectedKeys).length > 0 && (
                            <>
                                <Button
                                    ref={triggerRef}
                                    onPress={() => setIsDeleting(true)}
                                    variant='danger'
                                >
                                    Delete Product
                                </Button>
                                <Popover.Content
                                    triggerRef={triggerRef}
                                    isOpen={isDeleting}
                                    onOpenChange={setIsDeleting}
                                    className='sm:max-w-sm'
                                >
                                    <Popover.Header>
                                        <Popover.Title>Confirm Deletion</Popover.Title>
                                        <Popover.Description>
                                            Are you sure you want to delete your account?
                                            This action cannot be undone.
                                        </Popover.Description>
                                    </Popover.Header>
                                    <Popover.Footer className='flex justify-end'>
                                        <Button
                                            variant='outline'
                                            onPress={() => setIsDeleting(false)}
                                            className='mr-2'
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            isDisabled={loading === 'loading'}
                                            onPress={deleteProducts}
                                            variant={
                                                ['loading', 'idle'].includes(loading)
                                                    ? 'danger'
                                                    : 'success'
                                            }
                                        >
                                            {loading === 'loading' ? (
                                                <>
                                                    <Loader2Icon className='animate-spin' />
                                                    Deleting...
                                                </>
                                            ) : loading === 'success' ? (
                                                <>
                                                    <CheckCircle2Icon />
                                                    Deleted
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2Icon />
                                                    Delete
                                                </>
                                            )}
                                        </Button>
                                    </Popover.Footer>
                                </Popover.Content>
                            </>
                        )}
                        <SearchField
                            aria-label='Search'
                            value={search}
                            onChange={(e) => {
                                setSearch(e)
                                setPage(1)
                            }}
                            className='min-w-[18rem]'
                        />
                        <Modal>
                            <Button>
                                <PackagePlus />
                                New Product
                            </Button>
                            <Modal.Content>
                                <Modal.Header>
                                    <Modal.Title>Create New Product</Modal.Title>
                                    <Modal.Description>
                                        Fill in the form below to create a new product
                                    </Modal.Description>
                                </Modal.Header>
                                <Form
                                    onSubmit={(e) => handleSubmit(e)}
                                    className='space-y-2'
                                >
                                    <TextField
                                        id='name'
                                        isRequired
                                        label='Name'
                                        placeholder='Product Name'
                                    />
                                    <NumberField
                                        id='price'
                                        isRequired
                                        label='Price'
                                        placeholder='00.00'
                                    />
                                    <ComboBox
                                        id='category'
                                        label='Category'
                                        placeholder='Category'
                                        isRequired
                                    >
                                        <ComboBox.Item id={'electronics'}>
                                            electronics
                                        </ComboBox.Item>
                                        <ComboBox.Item id={'jewelery'}>
                                            jewelery
                                        </ComboBox.Item>
                                        <ComboBox.Item id={"men's clothing"}>
                                            men's clothing
                                        </ComboBox.Item>
                                        <ComboBox.Item id={"women's clothing"}>
                                            women's clothing
                                        </ComboBox.Item>
                                    </ComboBox>
                                    <Modal.Footer className='pt-4'>
                                        <Modal.Close>Cancel</Modal.Close>
                                        <Modal.Close variant='primary' type='submit'>
                                            Save
                                        </Modal.Close>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </div>
                </div>
            </div>
            <Card.Content>
                <Table
                    aria-label='Products'
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    selectionMode='multiple'
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    <Table.Header>
                        <Table.Column id='id'>#</Table.Column>
                        <Table.Column id='title' isRowHeader allowsSorting>
                            Name
                        </Table.Column>
                        <Table.Column id='price' allowsSorting>
                            Price
                        </Table.Column>
                        <Table.Column id='category' allowsSorting>
                            Category
                        </Table.Column>
                    </Table.Header>
                    <Table.Body
                        items={products}
                        renderEmptyState={() => (
                            <div className='grid place-content-center p-10'>
                                <h3 className='text-lg'>No products found</h3>
                            </div>
                        )}
                    >
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell>${item.price}</Table.Cell>
                                <Table.Cell>{item.category}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card.Content>
            <Card.Footer className='justify-between border-t gap-2 pt-6'>
                <div className='flex whitespace-nowrap items-center gap-1 text-sm text-muted-foreground'>
                    Show
                    <Select
                        placement='top'
                        aria-label='Products per page'
                        selectedKey={limit}
                        onSelectionChange={setLimit}
                        placeholder='10'
                        className='max-w-[4rem]'
                    >
                        <Select.Item id={5}>5</Select.Item>
                        <Select.Item id={10}>10</Select.Item>
                        <Select.Item id={20}>20</Select.Item>
                        <Select.Item id={50}>50</Select.Item>
                    </Select>
                    from {list?.length}
                </div>
                <Pagination className='sm:justify-end'>
                    <Pagination.List>
                        <Pagination.Item
                            role='first'
                            isDisabled={page <= 1}
                            onAction={() => setPage(1)}
                        />
                        <Pagination.Item
                            isDisabled={page <= 1}
                            role='previous'
                            onAction={() => setPage(page - 1)}
                        />
                        <Pagination.Section
                            aria-label='Pagination Segment'
                            className='hidden lg:flex'
                        >
                            {page - 1 > 1 && (
                                <>
                                    <Pagination.Item onAction={() => setPage(1)}>
                                        1
                                    </Pagination.Item>
                                    {page - 1 !== 2 && (
                                        <Pagination.Item role='ellipsis' />
                                    )}
                                </>
                            )}
                            {page > 1 && (
                                <Pagination.Item onAction={() => setPage(page - 1)}>
                                    {page - 1}
                                </Pagination.Item>
                            )}
                            <Pagination.Item isCurrent>{page}</Pagination.Item>
                            {page < totalPage && (
                                <Pagination.Item onAction={() => setPage(page + 1)}>
                                    {page + 1}
                                </Pagination.Item>
                            )}
                            {page + 1 < totalPage && (
                                <>
                                    {totalPage - 2 !== page && (
                                        <Pagination.Item role='ellipsis' />
                                    )}
                                    <Pagination.Item onAction={() => setPage(page + 1)}>
                                        {totalPage}
                                    </Pagination.Item>
                                </>
                            )}
                        </Pagination.Section>
                        <Pagination.Item
                            role='next'
                            onAction={() => setPage(page + 1)}
                            isDisabled={page >= totalPage}
                        />
                        <Pagination.Item
                            role='last'
                            onAction={() => setPage(totalPage)}
                            isDisabled={page >= totalPage}
                        />
                    </Pagination.List>
                </Pagination>
            </Card.Footer>
        </Card>
    )
}
