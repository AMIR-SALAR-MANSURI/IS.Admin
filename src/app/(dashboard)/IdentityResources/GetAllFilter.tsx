import { TGetAll } from '@/lib/IdentityResource'
import { Button, Col, Collapse, Divider, Form, Input, Row, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React from 'react'

interface TProps {
    onChange: (data: TGetAll) => void
}

export default function GetAllFilter(props: TProps) {

    const [form] = useForm()

    const updateFilter = () => {
        props.onChange(form.getFieldsValue())
    }

    return <Collapse
        defaultActiveKey={["1"]}
        size='large'
        className='w-full p-0 m-0'
        bordered={false}
        expandIconPosition='left'
        items={[{
            key: '1',
            label: <div className='flex gap-4 items-center'>
                <Divider className='m-0 bg-gray-500' orientationMargin="0" type='vertical' orientation="left" />
                <Typography className='text-lg font-medium text-gray-600'>
                    جستجو
                </Typography>
            </div>,
            children: <Form
                form={form}
                onChange={updateFilter}
                layout='vertical'
            >
                <Divider className='m-0 mb-3' />
                <Row>
                    <Col span={6}>
                        <Form.Item<TGetAll>
                            required={false}
                            label="عنوان"
                            name="name"
                            rules={[{ required: true, message: 'لطفا مقدار را وارد نمایید' }]}
                        >
                            <Input size='large' placeholder='وارد کنید' />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='flex gap-4 items-center justify-end mb-4'>
                    <Button
                        danger
                        onClick={() => {
                            form.resetFields()
                            updateFilter()
                        }}
                        htmlType='reset'
                        size='large'
                        type='dashed'
                    >
                        پاک کردن
                    </Button>
                </div>
            </Form>
        }]}
    />
}
