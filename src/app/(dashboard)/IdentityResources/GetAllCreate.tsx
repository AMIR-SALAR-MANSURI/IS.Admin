import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { Plus, Save, X } from 'lucide-react';
import { useForm } from 'antd/lib/form/Form';
import { useCreate } from '@/hooks/IdentityResources';
import { TCreate } from '@/lib/IdentityResource';
import ms from '@/constants/error-ms';
import FormFields from './FormFields';

export default function GetAllCreate() {

    const create = useCreate()

    const [form] = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        if (!create.isPending) {
            setIsModalOpen(false);
        }
    };

    const handleSubmit = async (data: TCreate) => {

        const res = await create.mutateAsync(data)

        console.log(res);

        if (res.data.isSuccess) {
            setIsModalOpen(false)
        }

    }


    return (
        <>
            <Button type="primary" size='large' onClick={showModal} icon={<Plus />}>
                افزودن
            </Button>
            <Modal
                title={`افزودن ${ms.names.identityResource}`}
                width={1000}
                footer={() => <>
                    <Button
                        size='large'
                        disabled={create.isPending}
                        loading={create.isPending}
                        onClick={() => form.submit()}
                        type='primary' icon={<Save />}
                    >
                        ذخیره
                    </Button>
                    <Button
                        disabled={create.isPending}
                        loading={create.isPending}
                        size='large' type='default' icon={<X />}>
                        انصراف
                    </Button>
                </>}
                onCancel={handleCancel}
                open={isModalOpen}
            >
                <Form form={form} onFinish={handleSubmit} layout='vertical'>
                    <FormFields />
                </Form>
            </Modal>
        </>
    )
}
