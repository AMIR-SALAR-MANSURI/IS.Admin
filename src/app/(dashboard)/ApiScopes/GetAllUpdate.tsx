import ms from '@/constants/error-ms'
import { useGet, useUpdate } from '@/hooks/ApiScopes'
import { TApiScopesUpdateType } from '@/types/ApiScopes'
import { Button, Form, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { SaveIcon } from 'lucide-react'
import { useEffect } from 'react'
import FormFields from './FormFields'

interface TProps {
    open: string | number | undefined,
    setOpen: (arg: number | string | undefined) => void
}

export default function GetAllUpdate(props: TProps) {

    const [form] = useForm()

    const update = useUpdate()

    const get = useGet({ id: props.open as number })

    const handleOnSubmit = async (data: TApiScopesUpdateType) => {

        const res = await update.mutateAsync({ ...data, id: props.open as number })

        if (res.isSuccess) {
            form.resetFields()
            props.setOpen(undefined)
        }

    }

    useEffect(() => {
        console.log(get.data);

        if (get.data) {
            console.log(get.data);
            form.setFieldsValue(get?.data)
        }


    }, [get.data, props.open])

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
            onCancel={() => !update.isPending && props.setOpen(undefined)}
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
