import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormFields from './FormFields'
import ms from '@/constants/error-ms'
import { useGet, useUpdate } from '@/hooks/IdentityResources'
import { TUpdate } from '@/lib/IdentityResource'
import { SaveIcon } from 'lucide-react'
import { useForm } from 'antd/lib/form/Form'

interface TProps {
    open: string | number | undefined,
    setOpen: (arg: number | string | undefined) => void
}

export default function GetAllUpdate(props: TProps) {

    const [form] = useForm()

    const update = useUpdate()

    const get = useGet({ id: props.open as number })

    const handleOnSubmit = async (data: TUpdate) => {

        const res = await update.mutateAsync({ ...data, id: props.open as number })

        if (res.isSuccess) {
            props.setOpen(undefined)
        }

    }

    useEffect(() => {

        console.log(get.data);

        form.setFieldsValue(get.data)

    }, [get.data])

    return (
        <Modal
            footer={<Button
                type='primary'
                icon={<SaveIcon />}
                size='large'
                onClick={form.submit}
                loading={update.isPending}
                disabled={update.isPending}
            >
                ذخیره
            </Button>}
            title={`بروزرسانی ${ms.names.identityResource}`}
            width={800}
            open={props.open !== undefined}
            onCancel={() => !!update.isPending && props.setOpen(undefined)}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={handleOnSubmit}
            >
                <FormFields />
            </Form>
        </Modal>
    )
}
