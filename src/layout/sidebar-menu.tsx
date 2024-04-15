import ms from '@/constants/error-ms';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BookText, Database, Dot, Home, KeyRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const names = ms.names

const items = [
    { label: "داشبورد", key: "/", icon: <Home className='w-5' /> },
    { label: names.apiScopes, key: "/ApiScopes", icon: <KeyRoundIcon className='w-5' /> },
    {
        label: "منابع",
        key: "/Resources",
        icon: <BookText className='w-5' />,
        children: [
            { label: names.identityResource, key: "/IdentityResources", icon: <BookText /> },
            { label: names.apiResources, key: "/ApiResources", icon: <Database /> }
        ]
    },
    // { label: names.identityResource, key: "/IdentityResources" ,},
    // { label: names.apiResources, key: "/ApiResources" }
]

export default function SidebarMenu() {

    const pathname = usePathname()

    const router = useRouter()

    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleMenuOpenChange = (keys: string[]) => {
        if (keys.length <= 1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys([keys[1]]);
        }
    };

    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key)
    };
    console.log(openKeys);

    return (
        <div>
            <Menu
                mode="inline"
                onClick={onClick}
                openKeys={openKeys}
                onOpenChange={handleMenuOpenChange}
                defaultSelectedKeys={[pathname]}
                selectedKeys={[pathname]}
                style={{ height: '100%', borderRight: 0 }}
            //  items={items}
            >
                {items?.map((item) => (
                    <>
                        {item.children ?
                            <Menu.ItemGroup key={item.key} title={item.label}>
                                {item.children.map(children => <Menu.Item icon={children.icon} key={children.key}>
                                    <Link href={children.key}>{children.label}</Link>
                                </Menu.Item>)}
                            </Menu.ItemGroup>
                            :
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link href={item.key}>{item.label}</Link>
                            </Menu.Item>}
                        <Menu.Divider key={item.key} className='my-3' />
                    </>
                ))}
            </Menu>
        </div>
    )
}
