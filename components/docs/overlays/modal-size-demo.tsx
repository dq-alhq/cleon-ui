'use client'

import * as React from 'react'

import { Button, Grid, Modal, type ModalContentProps } from '@/components/ui'

type Size = Pick<ModalContentProps, 'size'>['size']
const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']

export default function ModalSizeDemo() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [modalSize, setModalSize] = React.useState<Size>('md')

    const handlePress = (size: Size, open: boolean) => {
        setModalSize(size)
        setIsOpen(open)
    }
    return (
        <>
            <Grid columns={{ initial: 2, sm: 3, lg: 4 }} gap={2}>
                {sizes.map((size, idx) => (
                    <Grid.Item key={idx}>
                        <Button variant='outline' onPress={() => handlePress(size, true)}>
                            {size}
                        </Button>
                    </Grid.Item>
                ))}
            </Grid>

            <Modal.Content isOpen={isOpen} onOpenChange={setIsOpen} size={modalSize}>
                <Modal.Header>
                    <Modal.Title>Project Update</Modal.Title>
                    <Modal.Description>
                        Dive deep into our project’s latest updates where we've
                        streamlined workflow and improved user interfaces.
                    </Modal.Description>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant='outline' onPress={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button onPress={() => setIsOpen(false)}>Confirm</Button>
                </Modal.Footer>
            </Modal.Content>
        </>
    )
}
