import dayjs from "dayjs";

export interface EducationItem {
    id: string;
    level: string;
    courseName: string;
    institution: string;
    location: "internal" | "external";
    date: any; // dayjs object or string
    hasCertificate: boolean;
    validationHash?: string; // Para internos
    externalValidationLink?: string; // Para externos
}

export interface Reeducando {
    id: string;
    name: string;
    registration: string;
    prisonUnit: string;
    status: "available" | "occupied";
    skills: string[];
    photoUrl?: string; // Futuro
    educationHistory: EducationItem[];
}

export const MOCK_REEDUCANDOS: Reeducando[] = [
    {
        id: "1",
        name: "João da Silva",
        registration: "123456-78",
        prisonUnit: "Casa de Prisão Provisória",
        status: "available",
        skills: ["Eletricista", "Pintura"],
        educationHistory: [
            {
                id: "101",
                level: "Médio Completo",
                courseName: "Ensino Médio",
                institution: "Escola Estadual Santos Dumont",
                location: "external",
                date: dayjs("2010", "YYYY"),
                hasCertificate: true,
                externalValidationLink: "https://educacao.gov.br/validar/12345"
            },
            {
                id: "102",
                level: "Técnico",
                courseName: "Eletricista Predial",
                institution: "SENAI",
                location: "internal",
                date: dayjs("2024", "YYYY"),
                hasCertificate: true,
                validationHash: "CERT123"
            },
        ],
    },
    {
        id: "2",
        name: "Maria Oliveira",
        registration: "876543-21",
        prisonUnit: "Unidade Prisional Feminina da 1º Regional",
        status: "occupied",
        skills: ["Costura", "Artesanato"],
        educationHistory: [
            {
                id: "201",
                level: "Superior Completo",
                courseName: "Administração",
                institution: "Universidade Federal",
                location: "external",
                date: dayjs("2015", "YYYY"),
                hasCertificate: true,
                externalValidationLink: "https://uf.edu.br/diplomas/verify"
            },
            {
                id: "202",
                level: "Profissionalizante",
                courseName: "Costura Industrial",
                institution: "Sistema Prisional",
                location: "internal",
                date: dayjs("2023", "YYYY"),
                hasCertificate: false,
            },
            {
                id: "203",
                level: "Técnico",
                courseName: "Logística",
                institution: "IFPB",
                location: "external",
                date: dayjs("2018", "YYYY"),
                hasCertificate: true,
            },
        ],
    },
    {
        id: "3",
        name: "Carlos Souza",
        registration: "112233-44",
        prisonUnit: "Penitenciária Odenir Guimarães",
        status: "available",
        skills: ["Cozinha"],
        educationHistory: [], // Sem cursos
    },
    {
        id: "4",
        name: "Ana Santos",
        registration: "556677-88",
        prisonUnit: "Unidade Prisional Feminina da 1º Regional",
        status: "occupied",
        skills: ["Limpeza", "Jardinagem"],
        educationHistory: [
            {
                id: "401",
                level: "Fundamental Completo",
                courseName: "Ensino Fundamental",
                institution: "EJA",
                location: "internal",
                date: dayjs("2022", "YYYY"),
                hasCertificate: true,
                validationHash: "CERT456"
            },
        ],
    },
    {
        id: "5",
        name: "Pedro Rocha",
        registration: "998877-66",
        prisonUnit: "Casa de Prisão Provisória",
        status: "available",
        skills: [],
        educationHistory: [
            {
                id: "501",
                level: "Superior Incompleto",
                courseName: "Direito",
                institution: "Unicap",
                location: "external",
                date: dayjs("2019", "YYYY"),
                hasCertificate: false,
            },
        ],
    },
];
