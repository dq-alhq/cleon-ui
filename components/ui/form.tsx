'use client'

import {
    Form as FormPrimitive,
    type FormProps as FormPrimitiveProps
} from 'react-aria-components'

interface FormProps extends FormPrimitiveProps {}

const Form = (props: FormProps) => {
    return <FormPrimitive {...props} />
}

export { Form, type FormProps }
