/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
    Layout,
    Card,
    Avatar,
    Typography,
    Switch,
    Button,
    List,
    Tag,
    Row,
    Col,
    Space,
    App,
    Modal,
    Input,
    Form,
    DatePicker
} from "antd";
import {
    UserOutlined,
    BookOutlined,
    DownloadOutlined,
    CheckCircleOutlined,
    PlusOutlined,
    FilePdfOutlined,
    ToolOutlined,
    HistoryOutlined
} from "@ant-design/icons";
import EducationModal from "./EducationModal";
import dayjs from "dayjs";
import { MOCK_REEDUCANDOS, Reeducando, EducationItem, SkillItem } from "@/data/mocks";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

interface CurriculumContainerProps {
    prisonerId?: string;
}

const CurriculumContainer: React.FC<CurriculumContainerProps> = ({ prisonerId }) => {
    const { message, modal } = App.useApp();
    const router = useRouter();

    // Modals
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [skillForm] = Form.useForm();

    const [currentPrisoner, setCurrentPrisoner] = useState<Reeducando | null>(null);
    const [isAvailableForWork, setIsAvailableForWork] = useState(true);
    const [educationList, setEducationList] = useState<EducationItem[]>([]);

    // Skills com metadados
    const [skills, setSkills] = useState<SkillItem[]>([]);

    React.useEffect(() => {
        if (prisonerId) {
            const found = MOCK_REEDUCANDOS.find(p => p.id === prisonerId);
            if (found) {
                setCurrentPrisoner(found);
                setIsAvailableForWork(found.status === "available");
                setEducationList(found.educationHistory);
                setSkills(found.skills || []);
            } else {
                message.error("Reeducando não encontrado.");
            }
        }
    }, [prisonerId, message]);

    if (!currentPrisoner && prisonerId) {
        return <div style={{ padding: 50, textAlign: "center" }}>Carregando dados do reeducando ou não encontrado...</div>;
    }

    const handleCreateEducation = (values: Omit<EducationItem, "id" | "hasCertificate"> & { certificate?: any[] }) => {
        const newItem: EducationItem = {
            id: Math.random().toString(36).substr(2, 9),
            ...values,
            hasCertificate: !!(values.certificate && values.certificate.length > 0),
        };
        setEducationList([...educationList, newItem]);
        setIsEducationModalOpen(false);
        message.success("Histórico educacional adicionado com sucesso!");
    };

    const handleAddSkill = (values: any) => {
        const newSkill: SkillItem = {
            name: values.name,
            source: values.source,
            startDate: values.startDate.format("YYYY-MM-DD"),
            endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : undefined
        };
        setSkills([...skills, newSkill]);
        setIsSkillModalOpen(false);
        skillForm.resetFields();
        message.success("Habilidade adicionada com sucesso!");
    };

    const handleValidation = (item: EducationItem) => {
        if (item.location === "internal") {
            if (item.validationHash) {
                window.open(`/validacao/${item.validationHash}`, '_blank');
            } else {
                message.warning("Hash de validação não disponível para este certificado.");
            }
        } else {
            if (item.externalValidationLink) {
                modal.confirm({
                    title: "Validação Externa",
                    content: `Este certificado foi emitido fora do sistema. Deseja acessar o link de validação da instituição?`,
                    onOk: () => window.open(item.externalValidationLink, '_blank'),
                    okText: "Acessar Validação",
                    cancelText: "Fechar"
                });
            } else {
                modal.info({
                    title: "Certificação Externa",
                    content: (
                        <div>
                            <p>Para certificados externos sem link automático, é necessário validação manual.</p>
                            <p>O assistente social ou familiar pode anexar o documento validado aqui.</p>
                            <Button icon={<PlusOutlined />} type="dashed" block style={{ marginTop: 10 }}>Anexar Comprovante</Button>
                        </div>
                    )
                });
            }
        }
    };

    const renderEducationList = (data: EducationItem[], title: string, emptyText: string, borderColor: string, icon: React.ReactNode, showActions: boolean = true) => (
        <Card
            title={<Space>{icon} <span>{title}</span></Space>}
            className="shadow-md"
            style={{ borderTop: `4px solid ${borderColor}`, height: '100%' }}
        >
            <List
                itemLayout="vertical"
                dataSource={data}
                locale={{ emptyText }}
                renderItem={(item) => (
                    <List.Item
                        actions={showActions ? [
                            <Button
                                key="download"
                                type="link"
                                icon={<DownloadOutlined />}
                                disabled={!item.hasCertificate}
                                onClick={() => message.info(`Baixando certificado: ${item.courseName}.pdf`)}
                            >
                                Baixar
                            </Button>,
                            <Button
                                key="validate"
                                type="link"
                                icon={<CheckCircleOutlined />}
                                disabled={!item.hasCertificate}
                                onClick={() => handleValidation(item)}
                            >
                                Validar
                            </Button>,
                        ] : []}
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<FilePdfOutlined />} style={{ backgroundColor: item.hasCertificate ? '#1890ff' : '#ccc' }} />}
                            title={<Text strong>{item.courseName}</Text>}
                            description={
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary">{item.institution} - {item.level}</Text>
                                    <Text type="secondary">Conclusão: {dayjs(item.date).format("YYYY")}</Text>
                                </Space>
                            }
                        />
                        {item.hasCertificate ? (
                            <Tag color="green">Certificado Disponível</Tag>
                        ) : (
                            <Tag color="orange">Pendente</Tag>
                        )}
                    </List.Item>
                )}
            />
        </Card>
    );

    const coursesBefore = educationList.filter((item) => item.location === "external");
    const coursesAfter = educationList.filter((item) => item.location === "internal");

    return (
        <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
            <Header style={{ background: "#000000", padding: "0 24px", display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src="/logo.jpg" alt="Logo" style={{ height: 40, borderRadius: 4 }} />
                <Title level={3} style={{ color: "white", margin: 0 }}>
                    Polícia Penal de Goiás - Currículo de {currentPrisoner?.name || "Reeducando"}
                </Title>
                <div style={{ marginLeft: "auto" }}>
                    <Button type="text" style={{ color: "white" }} onClick={() => router.push("/")}>
                        Voltar para Lista
                    </Button>
                </div>
            </Header>
            <Content style={{ padding: "24px 50px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                    {/* Cabeçalho de Impressão (Visível apenas na impressão via CSS) */}
                    <div className="print-header" style={{ display: 'none', textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15, marginBottom: 10 }}>
                            <img src="/logo.jpg" alt="Brasão" style={{ height: 80 }} />
                            <div style={{ textAlign: 'left' }}>
                                <h1 style={{ margin: 0, fontSize: 24, textTransform: 'uppercase' }}>Polícia Penal de Goiás</h1>
                                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 'normal' }}>Sistema de Gestão Prisional</h2>
                            </div>
                        </div>
                        <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 5, marginTop: 20 }}>CURRÍCULO DO REEDUCANDO</h3>
                    </div>

                    {/* Header do Preso */}
                    <Card className="mb-6 shadow-md bg-white" >
                        <Row gutter={[24, 24]} align="middle">
                            <Col xs={24} sm={4} style={{ textAlign: "center" }}>
                                <Avatar size={100} icon={<UserOutlined />} />
                            </Col>
                            <Col xs={24} sm={14}>
                                <Title level={2} style={{ margin: 0 }}>{currentPrisoner?.name}</Title>
                                <Text type="secondary" style={{ fontSize: 16, display: 'block' }}>Matrícula: {currentPrisoner?.registration}</Text>
                                <Text type="secondary" style={{ fontSize: 14 }}>Unidade: {currentPrisoner?.prisonUnit}</Text>
                                <div style={{ marginTop: 16 }}>
                                    <Text strong style={{ marginRight: 8 }}>Situação de Trabalho:</Text>
                                    <Switch
                                        checkedChildren="Disponível para Trabalho Externo"
                                        unCheckedChildren="Ocupado / Trabalhando"
                                        checked={isAvailableForWork}
                                        onChange={setIsAvailableForWork}
                                        style={{ background: isAvailableForWork ? '#52c41a' : '#faad14' }}
                                    />
                                    <div style={{ marginTop: 8 }}>
                                        <Tag color={isAvailableForWork ? "success" : "warning"}>
                                            {isAvailableForWork ? "Disponível para Serviço Externo" : "Ocupado: Trabalho Interno"}
                                        </Tag>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={6} style={{ textAlign: "right", display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <Card size="small" title={<Space><ToolOutlined />Experiência de Trabalho</Space>} style={{ textAlign: 'left' }} className="shadow-md">
                                    <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={skills}
                                            renderItem={(item) => (
                                                <List.Item style={{ padding: '8px 0' }}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar size="small" icon={<HistoryOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                                                        title={<Text strong>{item.name}</Text>}
                                                        description={
                                                            <div style={{ fontSize: 12 }}>
                                                                <div>{item.source}</div>
                                                                <Text type="secondary">
                                                                    {dayjs(item.startDate).format("MMM/YYYY")} -
                                                                    {item.endDate ? dayjs(item.endDate).format("MMM/YYYY") : " Atual"}
                                                                </Text>
                                                            </div>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                        {skills.length === 0 && <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 10 }}>Nenhuma experiência registrada.</Text>}
                                    </div>
                                    <Button type="dashed" icon={<PlusOutlined />} block onClick={() => setIsSkillModalOpen(true)}>
                                        Adicionar Experiência
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                        <Row justify="end" style={{ marginTop: 16 }}>
                            <Col>
                                <Space>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsEducationModalOpen(true)}>
                                        Adicionar Curso
                                    </Button>
                                    <Button icon={<FilePdfOutlined />} onClick={() => window.print()}>
                                        Imprimir Currículo
                                    </Button>
                                    <Button icon={<CheckCircleOutlined />} onClick={() => message.success("Todos os certificados validados com sucesso!")}>
                                        Validar Certificados
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Card>

                    {/* Listas de Educação */}
                    <Row gutter={[32, 32]} style={{ marginBottom: 24 }}>
                        <Col xs={24} lg={12}>
                            {renderEducationList(
                                coursesBefore,
                                "Histórico Pregresso",
                                "Nenhum registro anterior encontrado.",
                                "#1890ff", // Azul para externo
                                <BookOutlined style={{ color: "#1890ff" }} />,
                                false // showActions = false
                            )}
                        </Col>
                        <Col xs={24} lg={12}>
                            {renderEducationList(
                                coursesAfter,
                                "Educação no Sistema Prisional",
                                "Nenhum curso realizado no sistema.",
                                "#52c41a", // Verde para interno
                                <CheckCircleOutlined style={{ color: "#52c41a" }} />
                            )}
                        </Col>
                    </Row>

                    {/* Modais */}
                    <EducationModal
                        open={isEducationModalOpen}
                        onCreate={handleCreateEducation}
                        onCancel={() => setIsEducationModalOpen(false)}
                    />

                    <Modal
                        title="Adicionar Experiência de Trabalho / Habilidade"
                        open={isSkillModalOpen}
                        onOk={() => skillForm.submit()}
                        onCancel={() => setIsSkillModalOpen(false)}
                        okText="Adicionar"
                        cancelText="Cancelar"
                    >
                        <Form form={skillForm} layout="vertical" onFinish={handleAddSkill}>
                            <Form.Item name="name" label="Função / Habilidade" rules={[{ required: true, message: 'Obrigatório' }]}>
                                <Input placeholder="Ex: Eletricista, Pintor" />
                            </Form.Item>
                            <Form.Item name="source" label="Local / Instituição" rules={[{ required: true, message: 'Obrigatório' }]}>
                                <Input placeholder="Ex: Manutenção Predial, Curso SENAI" />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="startDate" label="Data de Início" rules={[{ required: true, message: 'Obrigatório' }]}>
                                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Selecione" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="endDate" label="Data de Término" extra="Deixe em branco se for atual">
                                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Selecione" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>

                </div>
            </Content>
        </Layout>
    );
};

export default CurriculumContainer;
