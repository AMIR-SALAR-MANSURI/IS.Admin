import ms from '@/constants/error-ms'
import { TCreate } from '@/lib/IdentityResource'
import { Col, Form, Input, Row, Select } from 'antd'
import React from 'react'

export default function FormFields() {
    return (
        <Row gutter={[16, 22]}>
            <Col span={12}>
                <Form.Item<TCreate>
                    name="name"
                    label="عنوان"
                    required={false}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: ms.form.inputRequired,
                        },
                    ]}
                >
                    <Input size='large' placeholder={ms.form.inputPlaceHolder} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<TCreate>
                    name="displayName"
                    label="نام نمایشی"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: ms.form.inputRequired,
                        },
                        {
                            min: 2,
                            message: ms.form.inputMin.replace("value", "2")
                        }
                    ]}
                    hasFeedback
                >
                    <Input size='large' placeholder={ms.form.inputPlaceHolder} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<TCreate>
                    name="required"
                    label="اجباری"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: ms.form.inputRequired,
                        },
                    ]}
                    hasFeedback
                >
                    <Select size='large' options={ms.form.value.activeOptions} placeholder={ms.form.selectPlaceHolder} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<TCreate>
                    name="enabled"
                    label="وضعیت"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: ms.form.inputRequired,
                        },
                    ]}
                    hasFeedback
                >
                    <Select size='large' options={ms.form.value.activeOptions} placeholder={ms.form.selectPlaceHolder} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<TCreate>
                    name="emphasize"
                    label="emphasize"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: ms.form.inputRequired,
                        },
                    ]}
                    hasFeedback
                >
                    <Select size='large' options={ms.form.value.activeOptions} placeholder={ms.form.selectPlaceHolder} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item<TCreate>
                    name="showInDiscoveryDocument"
                    label="showInDiscoveryDocument"
                    required={false}
                    rules={[
                        {
                            required: true,
                            message: ms.form.inputRequired,
                        },
                    ]}
                    hasFeedback
                >
                    <Select size='large' options={ms.form.value.activeOptions} placeholder={ms.form.selectPlaceHolder} />
                </Form.Item>
            </Col>
        </Row>
    )
}
