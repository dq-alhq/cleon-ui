'use client'

import { buttonVariants, Modal } from '@/components/ui'

export default function AlertDialogDemo() {
    return (
        <Modal>
            <Modal.Trigger className={buttonVariants({ variant: 'danger' })}>
                Delete
            </Modal.Trigger>
            <Modal.Content role='alertdialog'>
                <Modal.Header>
                    <Modal.Title>Delete file</Modal.Title>
                    <Modal.Description>
                        This will permanently delete the selected file. Continue?
                    </Modal.Description>
                </Modal.Header>
                <Modal.Footer>
                    <Modal.Close variant='outline'>Cancel</Modal.Close>
                    <Modal.Close variant='danger'>Continue</Modal.Close>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
