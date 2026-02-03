/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
    Typography,
    Button,
    App,
    Modal,
    Input,
    Form,
    DatePicker,
    Space,
    Tag,
    Switch
} from "antd";
import {
    EnvironmentOutlined,
    PhoneOutlined,
    LinkOutlined,
    PlusOutlined,
    FilePdfOutlined,
    CheckCircleOutlined,
    EditOutlined
} from "@ant-design/icons";
import EducationModal from "./EducationModal";
import dayjs from "dayjs";
import { MOCK_REEDUCANDOS, Reeducando, EducationItem, SkillItem } from "@/data/mocks";
import { useRouter, useSearchParams } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Text } = Typography;

interface CurriculumContainerProps {
    prisonerId?: string;
}

const CurriculumContainer: React.FC<CurriculumContainerProps> = ({ prisonerId }) => {
    const { message, modal } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isReadOnly = searchParams.get("readonly") === "true";

    // Modals
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [skillForm] = Form.useForm();

    const [currentPrisoner, setCurrentPrisoner] = useState<Reeducando | null>(null);
    const [isAvailableForWork, setIsAvailableForWork] = useState(true);
    const [educationList, setEducationList] = useState<EducationItem[]>([]);

    // Skills com metadados (usado como Histórico Profissional neste layout)
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
        message.success("Experiência adicionada com sucesso!");
    };

    const handleChangePhoto = () => {
        const newUrl = window.prompt("Insira a nova URL da foto:", currentPrisoner?.photoUrl || "");
        if (newUrl !== null) {
            setCurrentPrisoner(prev => prev ? { ...prev, photoUrl: newUrl } : null);
            message.success("Foto atualizada!");
        }
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

    return (
        <div style={{ paddingBottom: 100 }}>
            <div className="resume-container">
                {/* Header Institucional (Mistura do design anterior) */}
                <div className="institutional-header">
                    <img src="/logo.jpg" alt="Brasão Polícia Penal" className="institutional-logo" />
                    <div className="institutional-text">
                        <h1>Polícia Penal de Goiás</h1>
                        <h2>Diretoria Geral de Administração Penitenciária</h2>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                         <Tag color="green" style={{ margin: 0, fontSize: 12 }}>DOCUMENTO OFICIAL</Tag>
                    </div>
                </div>

                {/* Header do Currículo Moderno */}
                <div className="resume-header">
                    <div className="resume-photo-container">
                        <img 
                            src={currentPrisoner?.photoUrl} 
                            alt={currentPrisoner?.name} 
                            className="resume-photo"
                            onClick={() => !isReadOnly && handleChangePhoto()}
                            style={{ cursor: isReadOnly ? 'default' : 'pointer' }}
                        />
                        {!isReadOnly && <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'white', padding: 2, cursor: 'pointer' }} onClick={handleChangePhoto}><EditOutlined /></div>}
                    </div>
                    <div className="resume-header-content">
                        <h1 className="resume-name">{currentPrisoner?.name}</h1>
                        <div className="resume-header-line"></div>
                        <p className="resume-summary">
                            Reeducando da unidade {currentPrisoner?.prisonUnit}, atualmente 
                            {isAvailableForWork ? " disponível para oportunidades de trabalho e reintegração social. " : " engajado em atividades laborais na unidade. "}
                            Comprometido com o desenvolvimento pessoal e profissional através de cursos de capacitação e atividades laborais supervisionadas.
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="resume-body">
                    {/* Sidebar */}
                    <div className="resume-sidebar">
                        
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Contato Institucional</h3>
                            <div className="contact-item">
                                <EnvironmentOutlined />
                                <span>{currentPrisoner?.prisonUnit}</span>
                            </div>
                            <div className="contact-item">
                                <PhoneOutlined />
                                <span>(62) 3201-XXXX (Coord. Trabalho)</span>
                            </div>
                            <div className="contact-item">
                                <LinkOutlined />
                                <span>Matrícula: {currentPrisoner?.registration}</span>
                            </div>
                        </div>

                        <div className="sidebar-section" style={{ marginTop: 30 }}>
                            <h3 className="sidebar-title">Habilidades</h3>
                            <ul className="skill-list">
                                <li>Disciplina e organização</li>
                                <li>Trabalho em equipe supervisionado</li>
                                <li>Cumprimento de normas de segurança</li>
                                <li>Limpeza e conservação</li>
                                <li>Manutenção básica</li>
                            </ul>
                        </div>
                        
                         <div className="sidebar-section" style={{ marginTop: 30 }}>
                            <h3 className="sidebar-title">Situação Carcerária</h3>
                             <Tag color={isAvailableForWork ? "#2e7d32" : "#faad14"} style={{ width: '100%', textAlign: 'center', padding: '5px 0', fontSize: 14, fontWeight: 'bold' }}>
                                {isAvailableForWork ? "DISPONÍVEL P/ TRABALHO" : "EM ATIVIDADE LABORAL"}
                            </Tag>
                             {!isReadOnly && (
                                <div style={{ marginTop: 10, textAlign: 'center' }} className="no-print">
                                    <Switch
                                        checkedChildren="Disponível"
                                        unCheckedChildren="Ocupado"
                                        checked={isAvailableForWork}
                                        onChange={setIsAvailableForWork}
                                        style={{ background: isAvailableForWork ? '#2e7d32' : '#faad14' }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Main Content */}
                    <div className="resume-main">
                        
                        <div className="main-section">
                            <h2 className="main-title">Histórico Laboral e Profissional</h2>
                            
                            {skills.length > 0 ? skills.map((skill, index) => (
                                <div key={index} className="experience-item">
                                    <div className="job-title">{skill.name}</div>
                                    <div className="job-company">{skill.source}</div>
                                    <div className="job-date">
                                        {dayjs(skill.startDate).format("MM/YYYY")} - 
                                        {skill.endDate ? dayjs(skill.endDate).format("MM/YYYY") : " Atual"}
                                    </div>
                                    <div className="job-description">
                                        <ul>
                                            <li>Atividade realizada conforme atribuições designadas pela coordenação.</li>
                                            <li>Avaliação positiva de desempenho e conduta.</li>
                                        </ul>
                                    </div>
                                </div>
                            )) : (
                                <p style={{ color: '#999' }}>Nenhuma experiência laboral registrada no sistema.</p>
                            )}
                        </div>

                        <div className="main-section">
                            <h2 className="main-title">Educação e Capacitação</h2>
                            
                            {educationList.length > 0 ? educationList.map((edu, index) => (
                                <div key={index} className="experience-item">
                                    <div className="job-title">{edu.courseName} <span style={{ fontWeight: 'normal', fontSize: 14, color: '#666' }}>({edu.level})</span></div>
                                    <div className="job-company">{edu.institution}</div>
                                    <div className="job-date">Conclusão: {dayjs(edu.date).format("YYYY")}</div>
                                    <div className="job-description">
                                        {edu.location === 'internal' ? 'Curso de capacitação realizado no âmbito do sistema prisional.' : 'Formação acadêmica/escolar anterior ao ingresso.'}
                                        {edu.hasCertificate && (
                                            <div className="no-print" style={{ marginTop: 5 }}>
                                                 <Space>
                                                    <Tag color="#2e7d32" icon={<CheckCircleOutlined />}>Certificado Validado</Tag>
                                                    <Button type="link" size="small" style={{ color: '#1b4d3e' }} onClick={() => handleValidation(edu)}>Verificar Autenticidade</Button>
                                                 </Space>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <p style={{ color: '#999' }}>Nenhuma formação acadêmica registrada.</p>
                            )}
                        </div>
                        
                        <div className="main-section">
                            <h2 className="main-title">Observações do Serviço Social</h2>
                            <ul className="skill-list" style={{ color: '#333' }}>
                                <li>Reeducando demonstra boa conduta carcerária.</li>
                                <li>Participação assídua em projetos de ressocialização.</li>
                                <li>Apto para atividades laborais que exijam responsabilidade e comprometimento.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="action-bar no-print">
                <Button onClick={() => router.push("/")}>Voltar</Button>
                {!isReadOnly && (
                    <>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsEducationModalOpen(true)}>
                            Add Curso
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsSkillModalOpen(true)}>
                            Add Experiência
                        </Button>
                    </>
                )}
                <Button icon={<FilePdfOutlined />} onClick={() => window.print()}>
                    Imprimir
                </Button>
            </div>

            {/* Modals */}
            <EducationModal
                open={isEducationModalOpen}
                onCreate={handleCreateEducation}
                onCancel={() => setIsEducationModalOpen(false)}
            />

            <Modal
                title="Adicionar Experiência Profissional"
                open={isSkillModalOpen}
                onOk={() => skillForm.submit()}
                onCancel={() => setIsSkillModalOpen(false)}
                okText="Adicionar"
                cancelText="Cancelar"
            >
                <Form form={skillForm} layout="vertical" onFinish={handleAddSkill}>
                    <Form.Item name="name" label="Cargo / Função" rules={[{ required: true, message: 'Obrigatório' }]}>
                        <Input placeholder="Ex: Eletricista, Pintor" />
                    </Form.Item>
                    <Form.Item name="source" label="Empresa / Local / Instituição" rules={[{ required: true, message: 'Obrigatório' }]}>
                        <Input placeholder="Ex: Manutenção Predial, Cozinha" />
                    </Form.Item>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item name="startDate" label="Início" rules={[{ required: true, message: 'Obrigatório' }]} style={{ flex: 1 }}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Selecione" />
                        </Form.Item>
                        <Form.Item name="endDate" label="Término" extra="Deixe em branco se for atual" style={{ flex: 1 }}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Selecione" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CurriculumContainer;
