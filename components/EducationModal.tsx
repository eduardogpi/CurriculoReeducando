/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Modal, Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

interface EducationValues {
    level: string;
    courseName: string;
    institution: string;
    location: "internal" | "external";
    date: any; // Using any for DatePicker value compatibility, or import Dayjs
    certificate?: UploadFile[];
}

interface EducationModalProps {
    open: boolean;
    onCreate: (values: EducationValues) => void;
    onCancel: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            open={open}
            title="Adicionar Histórico Educacional"
            okText="Salvar"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ location: "external" }}
            >
                <Form.Item
                    name="level"
                    label="Nível de Escolaridade"
                    rules={[
                        {
                            required: true,
                            message: "Por favor, selecione o nível de escolaridade!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Selecione o nível"
                        options={[
                            { value: "Fundamental Incompleto", label: "Fundamental Incompleto" },
                            { value: "Fundamental Completo", label: "Fundamental Completo" },
                            { value: "Médio Incompleto", label: "Médio Incompleto" },
                            { value: "Médio Completo", label: "Médio Completo" },
                            { value: "Técnico", label: "Técnico" },
                            { value: "Superior Incompleto", label: "Superior Incompleto" },
                            { value: "Superior Completo", label: "Superior Completo" },
                            { value: "Pós-graduação", label: "Pós-graduação" },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="courseName"
                    label="Nome do Curso"
                    rules={[
                        {
                            required: true,
                            message: "Por favor, insira o nome do curso!",
                        },
                    ]}
                >
                    <Input placeholder="Ex: Informática Básica, Direito, Eletricista" />
                </Form.Item>

                <Form.Item
                    name="institution"
                    label="Instituição de Ensino"
                    rules={[
                        {
                            required: true,
                            message: "Por favor, insira o nome da instituição!",
                        },
                    ]}
                >
                    <Input placeholder="Ex: Escola Estadual X, Faculdade Y" />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Local de Realização"
                    rules={[{ required: true, message: "Selecione o local!" }]}
                >
                    <Select
                        options={[
                            { value: "external", label: "Externo (Antes ou Fora do Sistema)" },
                            { value: "internal", label: "Interno (Dentro do Sistema)" },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Data de Conclusão / Ano"
                    rules={[{ required: true, message: "Insira a data!" }]}
                >
                    <DatePicker picker="year" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="certificate"
                    label="Certificado"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e?.fileList;
                    }}
                >
                    <Upload name="logo" action="/upload.do" listType="text">
                        <Button icon={<UploadOutlined />}>Clique para Enviar Certificado</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EducationModal;
