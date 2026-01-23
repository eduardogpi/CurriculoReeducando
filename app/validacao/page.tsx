"use client";

import React, { useState } from "react";
import { Layout, Typography, Card, Input, Button, Space, Form } from "antd";
import { SearchOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function ValidationHome() {
    const router = useRouter();
    const [hash, setHash] = useState("");

    const handleSearch = () => {
        if (hash.trim()) {
            router.push(`/validacao/${hash.trim()}`);
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ background: "#001529", padding: "0 24px" }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <SafetyCertificateOutlined style={{ color: 'white', fontSize: 24, marginRight: 16 }} />
                    <Title level={4} style={{ color: "white", margin: 0 }}>
                        Sistema Penitenciário - Validação Pública
                    </Title>
                </div>
            </Header>
            <Content style={{ padding: "50px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ maxWidth: 600, width: '100%' }}>
                    <Card style={{ textAlign: 'center', padding: 24 }}>
                        <SafetyCertificateOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 24 }} />
                        <Title level={2}>Validar Certificado</Title>
                        <Paragraph type="secondary" style={{ marginBottom: 32 }}>
                            Insira o código de autenticidade (Hash) presente no certificado para verificar sua validade.
                        </Paragraph>

                        <Space.Compact style={{ width: '100%', maxWidth: 400 }}>
                            <Input
                                size="large"
                                placeholder="Ex: CERT123"
                                prefix={<SearchOutlined />}
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                onPressEnter={handleSearch}
                            />
                            <Button type="primary" size="large" onClick={handleSearch}>
                                Validar
                            </Button>
                        </Space.Compact>
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Sistema Penitenciário ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
