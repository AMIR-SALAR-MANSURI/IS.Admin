import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { Plus, Save, X } from 'lucide-react';
import { useForm } from 'antd/lib/form/Form';
import { useCreate } from '@/hooks/ApiScopes';
import { TApiScopesCreateType } from '@/types/ApiScopes';
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

        console.log('cancel');

        if (!create.isPending) {
            form.resetFields()
            setIsModalOpen(false);
        }
    };

    const handleSubmit = async (data: TApiScopesCreateType) => {

        const res = await create.mutateAsync(data)

        console.log(res);

        if (res.isSuccess) {
            form.resetFields()
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
                        onClick={handleCancel}
                        disabled={create.isPending}
                        loading={create.isPending}
                        size='large' type='default' icon={<X />}>
                        انصراف
                    </Button>
                    <Button
                        size='large'
                        disabled={create.isPending}
                        loading={create.isPending}
                        onClick={() => form.submit()}
                        type='primary' icon={<Save />}
                    >
                        ذخیره
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
