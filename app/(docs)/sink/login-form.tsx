'use client'

import { IconBrandGithub, IconBrandGoogle } from 'justd-icons'
import Link from 'next/link'
import { toast } from 'sonner'

import { Button, Card, Checkbox, Form, Separator, TextField } from '@/components/ui'

export default function LoginFormSink() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Register</Card.Title>
                <Card.Description>Create your account</Card.Description>
            </Card.Header>
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    toast.success('Dummy Login Successfully')
                }}
            >
                <Card.Content className='grid gap-4'>
                    <div className='flex gap-4'>
                        <Button variant='outline' className='w-full'>
                            <IconBrandGithub className='size-4' />
                            Github
                        </Button>
                        <Button variant='outline' className='w-full'>
                            <IconBrandGoogle className='size-4' />
                            Google
                        </Button>
                    </div>
                    <Separator />
                    <TextField isRequired label='Name' placeholder='Enter your Name' />
                    <TextField
                        isRequired
                        label='Email'
                        type='email'
                        placeholder='Enter your email'
                    />
                    <TextField
                        isRequired
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                    />
                    <Checkbox>I agree to the terms and conditions</Checkbox>
                </Card.Content>
                <Card.Footer className='justify-end gap-4'>
                    <Link href='#'>Register</Link>
                    <Button type='submit'>Login</Button>
                </Card.Footer>
            </Form>
        </Card>
    )
}
