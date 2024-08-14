'use client'
import { Logo } from '@/components/logo'
import { useAsyncList } from '@react-stately/data'

import { ThemeToggle } from '@/components/theme-toggle'
import {
    Avatar,
    Badge,
    Button,
    buttonVariants,
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    Menu,
    Sheet,
    Table
} from '@/components/ui'
import { cn, formatDate } from '@/lib/utils'
import {
    ActivityIcon,
    BellIcon,
    CreditCardIcon,
    DollarSignIcon,
    Home,
    LifeBuoyIcon,
    Loader2Icon,
    LogOutIcon,
    MenuIcon,
    Package,
    SettingsIcon,
    ShoppingCart,
    Users
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Rectangle,
    XAxis,
    YAxis
} from 'recharts'

const roles = [
    {
        id: 0,
        name: 'Welcome To Dashboard',
        description:
            'We are happy to have you on board. We are looking forward to working with you.'
    },
    {
        id: 1,
        name: 'New Component',
        description: 'We have added a new component. Check it out.'
    },
    { id: 2, name: 'New Feature', description: 'You can now add new features' }
]
interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}
export default function Dashboard() {
    const list = useAsyncList<Product>({
        async load({ signal }) {
            const res = await fetch(`https://fakestoreapi.com/products?limit=5`, {
                signal
            })
            const json = await res.json()
            return {
                items: json
            }
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    // @ts-ignore
                    const first = a[sortDescriptor.column]
                    // @ts-ignore
                    const second = b[sortDescriptor.column]
                    let cmp =
                        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1
                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1
                    }
                    return cmp
                })
            }
        }
    })
    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-muted/40 md:block'>
                <div className='flex h-full max-h-screen flex-col gap-2'>
                    <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
                        <Link href='/' className='flex items-center gap-2 font-semibold'>
                            <Logo className='h-6 w-6' />
                            <span className=''>Cleon UI</span>
                        </Link>
                        <Menu>
                            <Button variant='outline' size='icon' className='ml-auto'>
                                <BellIcon />
                            </Button>
                            <Menu.Content items={roles}>
                                {(item) => (
                                    <Menu.Item id={item.id} textValue={item.name}>
                                        <Menu.ItemDetails
                                            label={item.name}
                                            description={item.description}
                                        />
                                    </Menu.Item>
                                )}
                            </Menu.Content>
                        </Menu>
                    </div>
                    <div className='flex-1'>
                        <Sidebar />
                    </div>
                    <div className='mt-auto p-4'>
                        <Card>
                            <Card.Header className='p-2 pt-0 md:p-4'>
                                <Card.Title>Upgrade to Pro</Card.Title>
                                <Card.Description>
                                    Unlock all features and get unlimited access to our
                                    support team.
                                </Card.Description>
                            </Card.Header>
                            <Card.Content className='p-2 pt-0 md:p-4 md:pt-0'>
                                <Button size='sm' className='w-full'>
                                    Upgrade
                                </Button>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <header className='flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6'>
                    <Sheet>
                        <Sheet.Trigger
                            className={cn(buttonVariants({ size: 'icon' }), 'md:hidden')}
                        >
                            <MenuIcon className='h-5 w-5' />
                        </Sheet.Trigger>
                        <Sheet.Content side='left' aria-labelledby='Menu'>
                            <Sheet.Header>
                                <Sheet.Title id='Menu'>Menu</Sheet.Title>
                                <Sheet.Description>Open the menu.</Sheet.Description>
                            </Sheet.Header>
                            <Sheet.Body className='px-1'>
                                <Sidebar />
                            </Sheet.Body>
                        </Sheet.Content>
                    </Sheet>
                    <div className='font-semibold sm:text-lg md:text-xl'>Dashboard</div>
                    <div className='flex items-center gap-2'>
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
                <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                        <Card>
                            <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <Card.Title className='text-sm font-medium'>
                                    Total Revenue
                                </Card.Title>
                                <DollarSignIcon className='h-4 w-4 text-muted-foreground' />
                            </Card.Header>
                            <Card.Content>
                                <div className='text-2xl font-bold'>$45,231.89</div>
                                <p className='text-xs text-muted-foreground'>
                                    +20.1% from last month
                                </p>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <Card.Title className='text-sm font-medium'>
                                    Subscriptions
                                </Card.Title>
                                <Users className='h-4 w-4 text-muted-foreground' />
                            </Card.Header>
                            <Card.Content>
                                <div className='text-2xl font-bold'>+2350</div>
                                <p className='text-xs text-muted-foreground'>
                                    +180.1% from last month
                                </p>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <Card.Title className='text-sm font-medium'>
                                    Sales
                                </Card.Title>
                                <CreditCardIcon className='h-4 w-4 text-muted-foreground' />
                            </Card.Header>
                            <Card.Content>
                                <div className='text-2xl font-bold'>+1,234</div>
                                <p className='text-xs text-muted-foreground'>
                                    +79% from last month
                                </p>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <Card.Title className='text-sm font-medium'>
                                    Active Now
                                </Card.Title>
                                <ActivityIcon className='h-4 w-4 text-muted-foreground' />
                            </Card.Header>
                            <Card.Content>
                                <div className='text-2xl font-bold'>+573</div>
                                <p className='text-xs text-muted-foreground'>
                                    +201 since last hour
                                </p>
                            </Card.Content>
                        </Card>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full'>
                        <Card>
                            <Card.Header className='p-4 pb-0'>
                                <Card.Title>Sales</Card.Title>
                                <Card.Description>
                                    You have sold over 2.043 products this month, keep up
                                    the good work!
                                </Card.Description>
                            </Card.Header>
                            <Card.Content className='flex flex-row items-baseline gap-4 p-4 pt-0'>
                                <div className='flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none'>
                                    68
                                    <span className='text-sm font-normal text-muted-foreground'>
                                        products/day
                                    </span>
                                </div>
                                <ChartContainer
                                    config={{
                                        steps: {
                                            label: 'Steps',
                                            color: 'hsl(var(--chart-1))'
                                        }
                                    }}
                                    className='ml-auto w-[72px]'
                                >
                                    <BarChart
                                        margin={{
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0
                                        }}
                                        data={[
                                            {
                                                date: '2024-01-01',
                                                steps: 2000
                                            },
                                            {
                                                date: '2024-01-02',
                                                steps: 2100
                                            },
                                            {
                                                date: '2024-01-03',
                                                steps: 2200
                                            },
                                            {
                                                date: '2024-01-04',
                                                steps: 1300
                                            },
                                            {
                                                date: '2024-01-05',
                                                steps: 1400
                                            },
                                            {
                                                date: '2024-01-06',
                                                steps: 2500
                                            },
                                            {
                                                date: '2024-01-07',
                                                steps: 1600
                                            }
                                        ]}
                                    >
                                        <Bar
                                            dataKey='steps'
                                            fill='var(--color-steps)'
                                            radius={2}
                                            fillOpacity={0.2}
                                            activeIndex={6}
                                            activeBar={<Rectangle fillOpacity={0.8} />}
                                        />
                                        <XAxis
                                            dataKey='date'
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={4}
                                            hide
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header className='p-4 pb-0'>
                                <Card.Title>Traffic</Card.Title>
                                <Card.Description>
                                    You have received over 12.124 visitors last month
                                </Card.Description>
                            </Card.Header>
                            <Card.Content>
                                <ChartContainer
                                    config={{
                                        resting: {
                                            label: 'Resting',
                                            color: 'hsl(var(--chart-1))'
                                        }
                                    }}
                                    className='w-full max-h-10'
                                >
                                    <LineChart
                                        margin={{
                                            left: 14,
                                            right: 14,
                                            top: 10
                                        }}
                                        data={[
                                            {
                                                date: '2024-01-01',
                                                resting: 62
                                            },
                                            {
                                                date: '2024-01-02',
                                                resting: 72
                                            },
                                            {
                                                date: '2024-01-03',
                                                resting: 35
                                            },
                                            {
                                                date: '2024-01-04',
                                                resting: 62
                                            },
                                            {
                                                date: '2024-01-05',
                                                resting: 52
                                            },
                                            {
                                                date: '2024-01-06',
                                                resting: 62
                                            },
                                            {
                                                date: '2024-01-07',
                                                resting: 70
                                            }
                                        ]}
                                    >
                                        <CartesianGrid
                                            strokeDasharray='4 4'
                                            vertical={false}
                                            stroke='hsl(var(--muted-foreground))'
                                            strokeOpacity={0.5}
                                        />
                                        <YAxis
                                            hide
                                            domain={['dataMin - 10', 'dataMax + 10']}
                                        />
                                        <XAxis
                                            dataKey='date'
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            hide
                                        />
                                        <Line
                                            dataKey='resting'
                                            type='natural'
                                            fill='var(--color-resting)'
                                            stroke='var(--color-resting)'
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{
                                                fill: 'var(--color-resting)',
                                                stroke: 'var(--color-resting)',
                                                r: 4
                                            }}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    indicator='line'
                                                    labelFormatter={(value) =>
                                                        formatDate(value)
                                                    }
                                                />
                                            }
                                            cursor={false}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </Card.Content>
                        </Card>
                    </div>
                    <Card>
                        <Table
                            aria-label='Products'
                            selectionMode='multiple'
                            sortDescriptor={list.sortDescriptor}
                            onSortChange={list.sort}
                        >
                            <Table.Header>
                                <Table.Column id='id'>#</Table.Column>
                                <Table.Column id='title' isRowHeader allowsSorting>
                                    Name
                                </Table.Column>
                                <Table.Column id='director' allowsSorting>
                                    Price
                                </Table.Column>
                                <Table.Column id='producer' allowsSorting>
                                    Category
                                </Table.Column>
                                <Table.Column id='sold' allowsSorting>
                                    Sold
                                </Table.Column>
                            </Table.Header>
                            <Table.Body
                                items={list.items}
                                renderEmptyState={() => (
                                    <div className='grid place-content-center p-10'>
                                        <Loader2Icon className='animate-spin' />
                                    </div>
                                )}
                            >
                                {(item) => (
                                    <Table.Row id={item.id}>
                                        <Table.Cell>{item.id}</Table.Cell>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>${item.price}</Table.Cell>
                                        <Table.Cell>{item.category}</Table.Cell>
                                        <Table.Cell>{item.rating.count}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Card>
                </main>
            </div>
        </div>
    )
}

const NavLink = ({
    href,
    active,
    children
}: {
    href: string
    active?: boolean
    children: React.ReactNode
}) => {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary',
                {
                    'bg-primary text-primary-foreground hover:text-primary-foreground':
                        active
                }
            )}
        >
            {children}
        </Link>
    )
}

const Sidebar = () => {
    return (
        <nav className='grid items-start px-2 gap-1 text-sm font-medium lg:px-4'>
            <NavLink active href='#'>
                <Home className='h-4 w-4' />
                Dashboard
            </NavLink>
            <NavLink href='#'>
                <ShoppingCart className='h-4 w-4' />
                Orders
                <Badge variant='info' shape='circle' className='ml-auto size-6 shrink-0'>
                    6
                </Badge>
            </NavLink>
            <NavLink href='#'>
                <Package className='h-4 w-4' />
                Products
            </NavLink>
            <NavLink href='#'>
                <Users className='h-4 w-4' />
                Customers
            </NavLink>
            <NavLink href='#'>
                <LineChart className='h-4 w-4' />
                Analytics
            </NavLink>
        </nav>
    )
}
