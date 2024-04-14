"use client"
import React from 'react';
import fa_IR from "antd/locale/fa_IR";
import StyledComponentsRegistry from './ant-registery';
import { AppProgressBar } from 'next-nprogress-bar';
import theme from '@/theme/themeConfig';
import { ConfigProvider } from 'antd';

function ThemeProvider(props: { children: React.ReactNode }) {
    return (
        <>
            <StyledComponentsRegistry>
                <ConfigProvider theme={theme} direction="rtl" locale={fa_IR}>
                    <AppProgressBar
                        height="3px"
                        color="#18948a"
                        options={{ showSpinner: false }}
                    />
                    {props.children}
                </ConfigProvider>
            </StyledComponentsRegistry>
        </>
    );
}

export default ThemeProvider;