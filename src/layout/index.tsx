"use client"

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Input, Layout, theme } from 'antd';
import Image from 'next/image';
import { ListMinus, Search, LayoutGrid, AppWindow, SunMoon } from 'lucide-react';
import SidebarMenu from './sidebar-menu';

const { Header, Sider } = Layout;


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header className='flex items-center justify-between'>
                <div className='flex items-center flex-grow'>
                    <ListMinus width={50} className='ml-5 m-2 w-7 h-7' />
                    <div className='flex items-center ml-14'>
                        <Image src="/logo.svg" width={40} height={40} alt='logo' />
                        <span className='text-lg font-extrabold mr-3'>
                            سامانه مدیریت کاربران
                        </span>
                    </div>
                    <div>
                        <Input placeholder='جستوجو ...' prefix={<Search className='text-gray-900' />} className='w-[300px]' />
                    </div>
                </div>
                <div className='flex items-center gap-6 text-gray-600'>
                    <SunMoon size={30} />
                    <AppWindow size={30} />
                    <LayoutGrid size={30} />
                    <Avatar size={40} icon={<UserOutlined />} />
                </div>
            </Header>
            <Layout>
                <Sider width={240} className='p-3 border-l' style={{ background: colorBgContainer }}>
                    <SidebarMenu />
                </Sider>
                <Layout className='m-0 p-0 bg-white'>
                    {children}
                </Layout>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;