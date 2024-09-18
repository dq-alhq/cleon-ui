'use client'

import React from 'react'

import { IconPhone } from 'cleon-icons'
import { Controller, useForm } from 'react-hook-form'
import { useListData } from 'react-stately'
import { toast } from 'sonner'
import { z } from 'zod'

import {
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    ComboBox,
    Form,
    MultiSelect,
    NumberField,
    Radio,
    RadioGroup,
    Select,
    type SelectedKey,
    Tag,
    Textarea,
    TextField
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'

const hobbies = [
    { textValue: 'Music', id: 'music' },
    { textValue: 'Sports', id: 'sports' },
    { textValue: 'Food', id: 'food' },
    { textValue: 'Travel', id: 'travel' },
    { textValue: 'Movies', id: 'movies' },
    { textValue: 'Books', id: 'books' },
    { textValue: 'Gaming', id: 'gaming' }
]

export default function FormWithZodDemo() {
    const formSchema = z.object({
        name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
        gender: z.enum(['male', 'female']),
        age: z.number().min(18, { message: 'You must be at least 18 years old' }),
        phone: z
            .string()
            .min(10, { message: 'Phone number must be at least 10 characters' }),
        job: z.array(z.string()).min(1, { message: 'Please select at least one job' }),
        role: z.string().min(1, { message: 'Please select a role' }),
        country: z.string().min(1, { message: 'Please select a country' }),
        bio: z.string().min(10, { message: 'Bio must be at least 10 characters' }),
        hobbies: z
            .array(z.string())
            .min(1, { message: 'Please select at least one hobby' })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            gender: 'male',
            age: 0,
            phone: '',
            job: [],
            role: '',
            country: '',
            bio: '',
            hobbies: []
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        toast(`Submitted: ${JSON.stringify(values)}`)
    }

    const [countries, setCountries] = React.useState([])
    const getCountryOptions = async () => {
        const res = await fetch(
            'https://gist.githubusercontent.com/manishtiwari25/0fa055ee14f29ee6a7654d50af20f095/raw/89c6e4b02742f340064506215e6b3c3efe344a59/country_state.json'
        )
        const data = await res.json()
        setCountries(data)
    }
    React.useEffect(() => {
        getCountryOptions().then((r) => r)
    }, [])

    const selectedList = useListData<SelectedKey>({
        initialItems: []
    })

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className='w-full'>
                <Card.Header>
                    <Card.Title>Sample Form</Card.Title>
                    <Card.Description>Using all possible field</Card.Description>
                </Card.Header>
                <Card.Content className='space-y-4'>
                    <Controller
                        control={form.control}
                        name='name'
                        render={({ field, fieldState }) => (
                            <TextField
                                type='text'
                                label='Name'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='email'
                        render={({ field, fieldState }) => (
                            <TextField
                                type='email'
                                label='Email'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='password'
                        render={({ field, fieldState }) => (
                            <TextField
                                type='password'
                                label='Password'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='gender'
                        render={({ field, fieldState }) => (
                            <RadioGroup
                                orientation='horizontal'
                                label='Gender'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            >
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </RadioGroup>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='age'
                        render={({ field, fieldState }) => (
                            <NumberField
                                label='Age'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='phone'
                        render={({ field, fieldState }) => (
                            <TextField
                                type='tel'
                                prefix={<IconPhone />}
                                label='Phone Number'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='job'
                        render={({ field, fieldState }) => (
                            <CheckboxGroup
                                label='Jobs'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            >
                                <Checkbox value='student'>Student</Checkbox>
                                <Checkbox value='teacher'>Teacher</Checkbox>
                                <Checkbox value='developer'>Developer</Checkbox>
                                <Checkbox value='designer'>Designer</Checkbox>
                                <Checkbox value='other'>Freelancer</Checkbox>
                            </CheckboxGroup>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='role'
                        render={({ field, fieldState }) => (
                            <Select
                                label='Role'
                                name={field.name}
                                selectedKey={field.value}
                                onSelectionChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            >
                                <Select.Item id='web-dev' textValue='Web Developer'>
                                    Web Developer
                                </Select.Item>
                                <Select.Item id='game-dev' textValue='Game Developer'>
                                    Game Developer
                                </Select.Item>
                                <Select.Item id='mobile-dev' textValue='Mobile Developer'>
                                    Mobile Developer
                                </Select.Item>
                                <Select.Item
                                    id='software-engineer'
                                    textValue='Software Engineer'
                                >
                                    Software Engineer
                                </Select.Item>
                                <Select.Item
                                    id='devops-engineer'
                                    textValue='DevOps Engineer'
                                >
                                    DevOps Engineer
                                </Select.Item>
                                <Select.Item id='ui-ux' textValue='UI/UX'>
                                    UI/UX
                                </Select.Item>
                                <Select.Item id='other' textValue='Other'>
                                    Other
                                </Select.Item>
                            </Select>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='country'
                        render={({ field, fieldState }) => (
                            <ComboBox
                                placeholder='Select a Country'
                                label='Country'
                                name={field.name}
                                selectedKey={field.value}
                                onSelectionChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                items={countries}
                                errorMessage={fieldState.error?.message}
                            >
                                {(country: any) => (
                                    <ComboBox.Item
                                        id={country?.countryCode}
                                        textValue={country?.name}
                                    >
                                        {country?.name}
                                    </ComboBox.Item>
                                )}
                            </ComboBox>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='bio'
                        render={({ field, fieldState }) => (
                            <Textarea
                                label='Bio'
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='hobbies'
                        render={({ field, fieldState }) => (
                            <MultiSelect
                                onItemAdd={(key) => field.onChange([...field.value, key])}
                                onItemRemove={(key) =>
                                    field.onChange(
                                        field.value.filter((k: any) => k !== key)
                                    )
                                }
                                label='Hobbies'
                                selectedList={selectedList}
                                items={hobbies}
                                tag={(item) => (
                                    <Tag textValue={item.textValue}>{item.textValue}</Tag>
                                )}
                                isInvalid={fieldState.invalid}
                                errorMessage={fieldState.error?.message}
                            >
                                {(item) => {
                                    return (
                                        <MultiSelect.Item
                                            id={item.id}
                                            textValue={item.textValue}
                                        >
                                            {item.textValue}
                                        </MultiSelect.Item>
                                    )
                                }}
                            </MultiSelect>
                        )}
                    />
                </Card.Content>
                <Card.Footer>
                    <Button type='submit'>Submit</Button>
                </Card.Footer>
            </Card>
        </Form>
    )
}
