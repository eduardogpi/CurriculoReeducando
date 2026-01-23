/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Space, Layout, Typography, Card, Input, Modal, Form, message, Select, Row, Col } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { MOCK_REEDUCANDOS, Reeducando } from "@/data/mocks";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const ReeducandoList: React.FC = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<Reeducando[]>(MOCK_REEDUCANDOS);
    const [filteredData, setFilteredData] = useState<Reeducando[]>(MOCK_REEDUCANDOS);

    // Filtros
    const [searchText, setSearchText] = useState("");
    const [unitFilter, setUnitFilter] = useState<string | undefined>(undefined);
    const [skillFilter, setSkillFilter] = useState<string | undefined>(undefined);

    // Listas únicas para selects de filtro
    const units = Array.from(new Set(MOCK_REEDUCANDOS.map(r => r.prisonUnit))).filter(Boolean);
    const allSkills = Array.from(new Set(MOCK_REEDUCANDOS.flatMap(r => r.skills))).filter(Boolean);

    useEffect(() => {
        let result = data;

        if (searchText) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.registration.includes(searchText)
            );
        }

        if (unitFilter) {
            result = result.filter(item => item.prisonUnit === unitFilter);
        }

        if (skillFilter) {
            result = result.filter(item => item.skills.includes(skillFilter));
        }

        setFilteredData(result);
    }, [searchText, unitFilter, skillFilter, data]);


    const handleAdd = () => {
        form
            .validateFields()
            .then((values) => {
                const newItem: Reeducando = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: values.name,
                    registration: values.registration,
                    prisonUnit: values.prisonUnit || "Unidade Padrão",
                    status: "available",
                    skills: [], // Habilidades começam vazias ou poderiam ser adicionadas no form
                    educationHistory: [],
                };

                const newData = [...data, newItem];
                setData(newData);
                setIsModalOpen(false);
                form.resetFields();
                message.success("Reeducando cadastrado com sucesso! Redirecionando...");
                setTimeout(() => {
                    router.push(`/curriculo/${newItem.id}`);
                }, 1000);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const columns = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: "Matrícula",
            dataIndex: "registration",
            key: "registration",
        },
        {
            title: "Unidade Prisional",
            dataIndex: "prisonUnit",
            key: "prisonUnit",
        },
        {
            title: "Habilidades",
            dataIndex: "skills",
            key: "skills",
            render: (skills: string[]) => (
                <>
                    {skills && skills.map(skill => (
                        <Tag color="blue" key={skill}>{skill}</Tag>
                    ))}
                </>
            )
        },
        {
            title: "Status de Trabalho",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "available" ? "green" : "volcano"}>
                    {status === "available" ? "Disponível" : "Ocupado"}
                </Tag>
            ),
        },
        {
            title: "Ações",
            key: "action",
            render: (_: any, record: Reeducando) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        ghost
                        icon={<EyeOutlined />}
                        onClick={() => router.push(`/curriculo/${record.id}`)}
                    >
                        Ver Currículo
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
            <Header
                style={{
                    background: "#001529",
                    padding: "0 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Title level={3} style={{ color: "white", margin: 0 }}>
                    Sistema Penitenciário
                </Title>
            </Header>
            <Content style={{ padding: "24px 50px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Title level={2} style={{ margin: 0 }}>
                                Gestão de Reeducandos
                            </Title>
                            <Button
                                type="primary"
                                size="large"
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Adicionar Novo Currículo
                            </Button>
                        </div>

                        <Card>
                            <Row gutter={16} style={{ marginBottom: 16 }}>
                                <Col span={8}>
                                    <Input
                                        placeholder="Buscar por nome ou matrícula"
                                        prefix={<SearchOutlined />}
                                        value={searchText}
                                        onChange={e => setSearchText(e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Select
                                        allowClear
                                        placeholder="Filtrar por Unidade"
                                        style={{ width: '100%' }}
                                        onChange={value => setUnitFilter(value)}
                                    >
                                        {units.map(u => <Option key={u} value={u}>{u}</Option>)}
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        allowClear
                                        placeholder="Filtrar por Habilidade"
                                        style={{ width: '100%' }}
                                        onChange={value => setSkillFilter(value)}
                                    >
                                        {allSkills.map(s => <Option key={s} value={s}>{s}</Option>)}
                                    </Select>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                dataSource={filteredData} // Usar dados filtrados
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                                onRow={(record) => ({
                                    onClick: () => router.push(`/curriculo/${record.id}`),
                                    style: { cursor: 'pointer' }
                                })}
                            />
                        </Card>

                        <Modal
                            title="Adicionar Novo Reeducando"
                            open={isModalOpen}
                            onOk={handleAdd}
                            onCancel={() => setIsModalOpen(false)}
                            okText="Criar e Ir para Currículo"
                            cancelText="Cancelar"
                        >
                            <Form form={form} layout="vertical" name="form_add_reeducando">
                                <Form.Item
                                    name="name"
                                    label="Nome Completo"
                                    rules={[
                                        { required: true, message: "Por favor, insira o nome!" },
                                    ]}
                                >
                                    <Input placeholder="Ex: João da Silva" />
                                </Form.Item>
                                <Form.Item
                                    name="registration"
                                    label="Matrícula"
                                    rules={[
                                        { required: true, message: "Por favor, insira a matrícula!" },
                                    ]}
                                >
                                    <Input placeholder="Ex: 123456-78" />
                                </Form.Item>
                                <Form.Item
                                    name="prisonUnit"
                                    label="Unidade Prisional"
                                    rules={[
                                        { required: true, message: "Por favor, insira a unidade!" },
                                    ]}
                                >
                                    <Input placeholder="Ex: Casa de Prisão Provisória" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Space>
                </div>
            </Content>
        </Layout>
    );
};

export default ReeducandoList;
