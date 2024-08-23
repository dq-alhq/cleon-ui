'use client'

import React from 'react'

import {
    IconBook,
    IconBookOpen,
    IconBrandCopilot,
    IconBrandGithub,
    IconBuilding,
    IconChart,
    IconCodeBrackets,
    IconFilter,
    IconGear,
    IconGlobe,
    IconHeart,
    IconLogout,
    IconMessages,
    IconPeople,
    IconPerson,
    IconStar
} from 'justd-icons'

import {
    Avatar,
    Button,
    Checkbox,
    Description,
    Menu,
    Modal,
    Select,
    Sheet,
    TextField
} from '@/components/ui'
import { Group, Menu as PrimitiveMenu } from 'react-aria-components'

export default function SheetMenuDemo() {
    const [isOpen, setIsOpen] = React.useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Trigger className='sr-only'>Open Modal</Modal.Trigger>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Edit status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='space-y-4'>
                            <TextField
                                prefix={<IconBrandGithub className='size-4' />}
                                label='Status'
                                placeholder="What's your status?"
                            />
                            <Group>
                                <Checkbox>Busy</Checkbox>
                                <Description>
                                    When others mention you, assign you, or request your
                                    review, GitHub will let them know that you have
                                    limited availability.
                                </Description>
                            </Group>
                            <Select label='Clear Status'>
                                <Select.Item>Never</Select.Item>
                                <Select.Item>in 30 Minutes</Select.Item>
                                <Select.Item>in 1 Hour</Select.Item>
                                <Select.Item>in 8 Hours</Select.Item>
                                <Select.Item>after Today</Select.Item>
                                <Select.Item>after a Week</Select.Item>
                                <Select.Item>after a Month</Select.Item>
                            </Select>
                            <Select label='Visible to'>
                                <Select.Item>Everyone</Select.Item>
                                <Select.Item>Organization</Select.Item>
                                <Select.Item>Public</Select.Item>
                            </Select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Close>Clear Status</Modal.Close>
                        <Button onPress={closeModal}>Set Status</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Sheet>
                <Sheet.Trigger aria-labelledby='open' aria-label='Open menu'>
                    <Avatar initials='DQ' alt='DQ' src='https://github.com/dq-alhq.png' />
                </Sheet.Trigger>
                <Sheet.Content closeButton={false}>
                    <Sheet.Header className='mb-2 flex flex-row items-center gap-x-3'>
                        <Avatar
                            initials='DQ'
                            alt='DQ'
                            src='https://github.com/dq-alhq.png'
                        />
                        <div>
                            <Sheet.Title>Diqi Al-Haqqi</Sheet.Title>
                            <Sheet.Description>@dq-alhq</Sheet.Description>
                        </div>
                    </Sheet.Header>
                    <PrimitiveMenu aria-labelledby='Sheet'>
                        <Menu.Item onAction={openModal}>
                            <IconBrandGithub className='size-4' />
                            Edit Status
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Section>
                            <Menu.Item>
                                <IconPerson />
                                Your profile
                            </Menu.Item>
                            <Menu.Item>
                                <IconBook /> Your repositories
                            </Menu.Item>
                            <Menu.Item>
                                <IconBrandCopilot /> Your Copilot
                            </Menu.Item>
                            <Menu.Item>
                                <IconChart /> Your projects
                            </Menu.Item>
                            <Menu.Item>
                                <IconStar /> Your stars
                            </Menu.Item>
                            <Menu.Item>
                                <IconCodeBrackets /> Your gists
                            </Menu.Item>
                            <Menu.Item>
                                <IconBuilding /> Your organizations
                            </Menu.Item>
                            <Menu.Item>
                                <IconGlobe /> Your enterprises
                            </Menu.Item>
                            <Menu.Item>
                                <IconHeart />
                                Your sponsors
                            </Menu.Item>
                        </Menu.Section>
                        <Menu.Section>
                            <Menu.Item>
                                <IconFilter /> Feature preview
                            </Menu.Item>
                            <Menu.Item>
                                <IconGear />
                                Settings
                            </Menu.Item>
                        </Menu.Section>
                        <Menu.Section>
                            <Menu.Item>
                                <IconBookOpen /> GitHub Docs
                            </Menu.Item>
                            <Menu.Item>
                                <IconPeople /> GitHub Support
                            </Menu.Item>
                            <Menu.Item>
                                <IconMessages /> GitHub Community
                            </Menu.Item>
                        </Menu.Section>
                        <Menu.Section>
                            <Menu.Item>
                                <IconLogout /> Sign out
                            </Menu.Item>
                        </Menu.Section>
                    </PrimitiveMenu>
                </Sheet.Content>
            </Sheet>
        </>
    )
}
