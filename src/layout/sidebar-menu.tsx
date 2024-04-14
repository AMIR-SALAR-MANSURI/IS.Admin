import { Menu } from 'antd'
import { Home } from 'lucide-react';
import { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import { useRouter } from 'next/navigation'
import React from 'react'
import ms from '@/constants/error-ms';

const names = ms.names

export default function SidebarMenu() {

    const router = useRouter()

    const items: MenuItemType[] = [
        { label: "داشبورد", key: "/", icon: <Home className='w-5' /> },
        { label: names.identityResource, key: "/IdentityResources" },
        { label: names.apiResources, key: "/ApiResources" }
    ]

    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                {items.map(item => (<Menu.Item {...item} onClick={() => router.push(item.key as string)} key={item?.key}>{item.label}</Menu.Item>))}
            </Menu>
        </div>
    )
}
