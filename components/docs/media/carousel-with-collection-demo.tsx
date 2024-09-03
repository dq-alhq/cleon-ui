'use client'

import Image from 'next/image'

import { Card, Carousel } from '@/components/ui'

export default function CarouselWithCollectionDemo() {
    return (
        <Carousel className='w-full [&_.card]:overflow-hidden [&_.card]:flex [&_.card]:flex-col max-w-xs'>
            <Carousel.Content items={items}>
                {(item) => (
                    <Carousel.Item id={item.id}>
                        <Card className='p-2'>
                            <Image
                                className='rounded-md h-40 object-center object-cover'
                                src={`https://picsum.photos/id/${item.id}/512/512`}
                                alt='image 5'
                                width={400}
                                height={300}
                            />
                            <Card.Header>
                                <Card.Title className='line-clamp-1 sm:text-lg'>
                                    {item.title}
                                </Card.Title>
                                <Card.Description className='line-clamp-2'>
                                    {item.description}
                                </Card.Description>
                            </Card.Header>
                        </Card>
                    </Carousel.Item>
                )}
            </Carousel.Content>

            <Carousel.Handler>
                <Carousel.Button slot='previous' />
                <Carousel.Button slot='next' />
            </Carousel.Handler>
        </Carousel>
    )
}

const items = [
    {
        id: 1,
        title: 'Vintage Leather Jacket',
        description: 'Classic brown leather jacket, perfect for a stylish retro look.'
    },
    {
        id: 2,
        title: 'Wireless Bluetooth Headphones',
        description:
            'Experience high-quality sound with these comfortable, noise-canceling headphones.'
    },
    {
        id: 3,
        title: 'Organic Cotton T-Shirt',
        description: 'Soft and eco-friendly t-shirt made from 100% organic cotton.'
    },
    {
        id: 4,
        title: 'Stainless Steel Water Bottle',
        description:
            'Keep your drinks cold or hot with this durable, insulated water bottle.'
    },
    {
        id: 5,
        title: 'Running Shoes',
        description: 'Lightweight and comfortable shoes designed for optimal performance.'
    },
    {
        id: 6,
        title: 'Smartwatch',
        description: 'Stay connected and track your fitness with this sleek smartwatch.'
    },
    {
        id: 7,
        title: 'Portable Charger',
        description: 'Never run out of battery with this high-capacity portable charger.'
    }
]
