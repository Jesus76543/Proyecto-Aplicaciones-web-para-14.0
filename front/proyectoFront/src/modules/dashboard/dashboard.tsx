import React from 'react';
import { Layout } from 'antd'; // Import Layout directly from 'antd'
import { Outlet } from 'react-router-dom'; // Assuming Outlet comes from react-router-dom

// Destructure Header, Content, and Footer from Ant Design's Layout component
const { Header, Content, Footer, Sider } = Layout; // Sider is also destructured from Layout directly

function Dashboard() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={220} theme="light"> {/* Added theme="light" for better visibility, default is 'dark' */}
                {/* Content for your Sider (e.g., a menu) */}
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                {/* You might add Ant Design Menu component here */}
            </Sider>

            <Layout> {/* This Layout will contain Header, Content, and Footer */}
                <Header style={{ padding: 0, background: '#fff' }}> {/* Header for the main content area */}
                    {/* Content for your Header */}
                    {/* The margin and padding styles are better applied to inner elements if needed,
                        or use Ant Design's grid system */}
                    Dashboard Header
                </Header>

                <Content style={{ margin: '24px 16px 0' }}> {/* Content area */}
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: '#fff', // White background for the content area
                        }}
                    >
                        {/* The Outlet from react-router-dom will render the matched child route component here */}
                        <Outlet />
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
