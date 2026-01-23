"use client";

import React from "react";
import { Layout, Typography, Card, Result, Descriptions, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Mock database de certificados para o exemplo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MOCK_CERTIFICATES: Record<string, any> = {
    "CERT123": {
        valid: true,
        student: "João da Silva",
        course: "Eletricista Predial",
        institution: "SENAI (Sistema Prisional)",
        date: "2024-05-15",
        workload: "160h"
    },
    "CERT456": {
        valid: true,
        student: "Maria Oliveira",
        course: "Costura Industrial",
        institution: "Sistema Prisional",
        date: "2023-11-20",
        workload: "80h"
    }
};

export default function ValidationPage() {
    const params = useParams();
    const hash = (params.hash as string).toUpperCase();
    const cert = MOCK_CERTIFICATES[hash];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ background: "#001529", padding: "0 24px" }}>
                <Title level={4} style={{ color: "white", margin: "16px 0" }}>
                    Sistema Penitenciário - Validação Pública
                </Title>
            </Header>
            <Content style={{ padding: "50px" }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <Card>
                        {cert ? (
                            <Result
                                status="success"
                                icon={<CheckCircleOutlined />}
                                title="Certificado Válido"
                                subTitle={`O código ${hash} corresponde a um certificado autêntico emitido pelo sistema.`}
                                extra={[
                                    <Descriptions key="desc" title="Detalhes do Certificado" bordered column={1}>
                                        <Descriptions.Item label="Aluno">{cert.student}</Descriptions.Item>
                                        <Descriptions.Item label="Curso">{cert.course}</Descriptions.Item>
                                        <Descriptions.Item label="Instituição">{cert.institution}</Descriptions.Item>
                                        <Descriptions.Item label="Data de Conclusão">{dayjs(cert.date).format("DD/MM/YYYY")}</Descriptions.Item>
                                        <Descriptions.Item label="Carga Horária">{cert.workload}</Descriptions.Item>
                                        <Descriptions.Item label="Status">
                                            <Tag color="green">Concluído</Tag>
                                        </Descriptions.Item>
                                    </Descriptions>
                                ]}
                            />
                        ) : (
                            <Result
                                status="error"
                                icon={<CloseCircleOutlined />}
                                title="Certificado Inválido ou Não Encontrado"
                                subTitle={`O código ${hash} não foi encontrado em nossa base de dados.`}
                            />
                        )}
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Sistema Penitenciário ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
