"use client";

import React, { useState } from "react";
import { Layout, Typography, Card, Input, Button, Space, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { MOCK_REEDUCANDOS } from "@/data/mocks";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function StudentAccessPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleLogin = (values: { registration: string }) => {
        setLoading(true);
        // Simulating API verification
        setTimeout(() => {
            const found = MOCK_REEDUCANDOS.find(r => r.registration === values.registration);

            if (found) {
                message.success(`Bem-vindo, ${found.name.split(" ")[0]}`);
                router.push(`/curriculo/${found.id}`);
            } else {
                message.error("Matrícula não encontrada.");
                setLoading(false);
            }
        }, 800);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ background: "#000000", padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <img src="/logo.jpg" alt="Logo" style={{ height: 40, borderRadius: 4 }} />
                <Title level={4} style={{ color: "white", margin: 0 }}>
                    Polícia Penal Goiás - Acesso Individual
                </Title>
            </Header>
            <Content style={{ padding: "50px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ maxWidth: 400, width: '100%' }}>
                    <Card
                        title={<div style={{ textAlign: "center" }}><UserOutlined style={{ fontSize: 32, marginBottom: 10 }} /><br />Acesso ao Currículo</div>}
                        className="shadow-md"
                    >
                        <Paragraph style={{ textAlign: "center", marginBottom: 24 }}>
                            Insira sua matrícula para acessar seu histórico educacional e emitir certificados.
                        </Paragraph>

                        <Form form={form} onFinish={handleLogin} layout="vertical">
                            <Form.Item
                                name="registration"
                                rules={[{ required: true, message: 'Por favor, insira sua matrícula!' }]}
                            >
                                <Input
                                    size="large"
                                    prefix={<LockOutlined />}
                                    placeholder="Matrícula (Ex: 123456-78)"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                                    Acessar
                                </Button>
                            </Form.Item>
                        </Form>

                        <div style={{ textAlign: "center", marginTop: 16 }}>
                            <a onClick={() => message.info("Procure o setor de assistência social.")}>Problemas no acesso?</a>
                        </div>
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Sistema Penitenciário ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
