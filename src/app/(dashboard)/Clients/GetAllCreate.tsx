import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { Plus, Save, X } from 'lucide-react';
import { useForm } from 'antd/lib/form/Form';
import { useCreate } from '@/hooks/ApiResources';
import { TCreate } from '@/lib/ApiResources';
import FormFields from './FormFields';
import ms from '@/constants/error-ms';

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
                title={`افزودن ${ms.names.apiResources}`}
                width={1000}
                footer={() => <>
                    <Button
                        disabled={create.isPending}
                        loading={create.isPending}
                        onClick={() => handleCancel()}
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
