'use client'

import React from 'react'

import { toast } from 'sonner'

import { Button, Form, Modal, Textarea } from '@/components/ui'

export default function ModalNestedDemo() {
    const [firstModalOpen, setFirstModalOpen] = React.useState(false)
    const [secondModalOpen, setSecondModalOpen] = React.useState(false)
    const [isTyping, setIsTyping] = React.useState(false)

    return (
        <>
            <Button onPress={() => setFirstModalOpen(true)}>Register</Button>

            <Modal.Content
                isOpen={firstModalOpen}
                onOpenChange={() => setFirstModalOpen(false)}
                aria-label='Confirm Registration'
            >
                <Modal.Header>
                    <Modal.Title>Confirm Registration</Modal.Title>
                    <Modal.Description>
                        Please confirm your registration details.
                    </Modal.Description>
                </Modal.Header>
                <Modal.Footer>
                    <Modal.Close>Cancel</Modal.Close>
                    <Button
                        onPress={() => {
                            setSecondModalOpen(true)
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal.Content>

            <Modal.Content
                isOpen={secondModalOpen}
                onOpenChange={(isOpen) => {
                    if (!isOpen && isTyping) {
                        toast('Profile setup incomplete')
                    }
                    setSecondModalOpen(isOpen)
                }}
                aria-label='Profile Setup'
            >
                <Modal.Header>
                    <Modal.Title>Set Up Your Profile</Modal.Title>
                    <Modal.Description>
                        We need a bit more information before you can get started.
                    </Modal.Description>
                </Modal.Header>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        toast.success('Profile setup complete')
                        setSecondModalOpen(false)
                        setFirstModalOpen(false)
                    }}
                >
                    <Modal.Body className='space-y-4'>
                        <Textarea
                            isRequired
                            label='Bio'
                            placeholder='Tell us something about yourself'
                            onInput={() => setIsTyping(true)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Close>Skip for now</Modal.Close>
                        <Button type='submit'>Complete Setup</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Content>
        </>
    )
}
