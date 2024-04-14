"use client"

import { useState, useEffect } from "react"
import { useDelete, useGetAll } from '@/hooks/IdentityResources';
import { TGetAll, TGetAllResponse } from '@/lib/IdentityResource';
import { Badge, Breadcrumb, Button, Col, Collapse, Divider, Form, FormProps, Input, Popconfirm, Row, Table, TableColumnsType, TableProps, Tag, Typography } from 'antd'
import GetAllFilter from './GetAllFilter';
import GetAllCreate from './GetAllCreate';
import { Edit, Trash } from 'lucide-react';
import { QuestionCircleOutlined } from "@ant-design/icons";
import ms from "@/constants/error-ms";
import GetAllUpdate from "./GetAllUpdate";
import { JsonView } from "react-json-view-lite";


export default function Page() {

    const [deleteId, setDeleteId] = useState<number>()

    const [updateId, setUpdateId] = useState<string | number | undefined>()

    const getAll = useGetAll()

    const deleteRecord = useDelete()

    useEffect(() => {
        console.log(getAll.data);

    }, [getAll.isFetching])


    const columns: TableProps<TGetAllResponse>['columns'] = [
        {
            title: 'عنوان',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'نام نمایشی',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'وضعیت',
            dataIndex: 'enabled',
            key: 'enabled',
            render(value, record, index) {

                return <Tag color={value ? "green" : "red"}>
                    {value ? "فعال" : "غیر فعال"}
                </Tag>
            },
        },
        {
            title: 'emphasize',
            dataIndex: 'emphasize',
            key: 'emphasize',
            render(value, record, index) {

                return <Tag color={value ? "blue-inverse" : "red-inverse"}>
                    {value ? "فعال" : "غیر فعال"}
                </Tag>
            },
        },
        {
            title: 'showInDiscoveryDocument',
            dataIndex: 'showInDiscoveryDocument',
            key: 'showInDiscoveryDocument',
            render(value, record, index) {

                return <Tag color={value ? "geekblue-inverse" : "magenta-inverse"}>
                    {value ? "فعال" : "غیر فعال"}
                </Tag>
            },
        },
        {
            title: 'اجباری',
            dataIndex: 'required',
            key: 'required',
            render(value, record, index) {

                return <Tag color={value ? "geekblue" : "magenta"}>
                    {value ? "فعال" : "غیر فعال"}
                </Tag>
            },
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            key: 'action',
            title: "عملیات",
            ellipsis: false,
            width: "9%",
            render(value, record, index) {
                return <div className='flex justify-center gap-2 items-center'>
                    <Popconfirm
                        title={ms.deleteConfirm.replace("value", record.displayName)}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        open={deleteId == record.id}
                        onConfirm={() => deleteRecord.mutateAsync({ id: record.id }).then(res => res.data.isSuccess && setDeleteId(undefined))}
                        okButtonProps={{ loading: deleteRecord.isPending }}
                        onCancel={() => setDeleteId(undefined)}
                    >
                        <Button type="text" onClick={() => setDeleteId(record.id)}>
                            <Trash className='text-red-500' strokeWidth={2} />
                        </Button>
                    </Popconfirm>
                    <Button type='text' onClick={() => setUpdateId(record.id)}>
                        <Edit />
                    </Button>
                </div>
            },
        },
    ];


    return (
        <>
            <div className='flex items-center justify-between p-4'>
                <Breadcrumb
                    items={[
                        {
                            path: "/",
                            title: "خانه"
                        },
                        {
                            path: "/IdentityResources",
                            title: ms.names.identityResource
                        },
                    ]}
                />
                <Button size='large'>بازگشت</Button>
            </div>
            <Divider className='m-0' />
            <div className='flex justify-between px-5 pt-5 max-sm:px-3 max-sm:pt-3'>
                <Typography.Title className='text-3xl max-sm:text-lg' >
                    {ms.names.identityResource}
                </Typography.Title>
                <GetAllCreate />
            </div>
            <Table
                virtual
                bordered
                title={() => <GetAllFilter onChange={(data) => getAll.setFilter(data)} />}
                columns={columns}
                pagination={getAll.pagination}
                dataSource={getAll.data?.data.value?.identityResources || []}
                loading={getAll.isFetching || getAll.isLoading}
                scroll={{ x: 1500 }}
                sticky={{ offsetHeader: 64 }}
            />
            <GetAllUpdate open={updateId} setOpen={setUpdateId} />
        </>
    )
}
