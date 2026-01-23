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

export interface SkillItem {
    name: string;
    source: string; // Onde foi adquirida
    startDate: string;
    endDate?: string; // Se undefined, é "Atualmente"
}

export interface Reeducando {
    id: string;
    name: string;
    registration: string;
    prisonUnit: string;
    status: "available" | "occupied";
    skills: SkillItem[];
    photoUrl?: string;
    educationHistory: EducationItem[];
}

export const MOCK_REEDUCANDOS: Reeducando[] = [
    {
        id: "1",
        name: "João da Silva",
        registration: "123456-78",
        prisonUnit: "Casa de Prisão Provisória",
        status: "available",
        photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        skills: [
            { name: "Eletricista", source: "Curso Profissionalizante SENAI", startDate: "2023-01-10", endDate: "2023-06-15" },
            { name: "Pintura", source: "Manutenção Predial Interna", startDate: "2023-07-01" } // Em aberto
        ],
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
        photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        skills: [
            { name: "Costura", source: "Oficina de Costura Prisional", startDate: "2022-03-01" },
            { name: "Artesanato", source: "Atividade Ocupacional", startDate: "2022-08-15", endDate: "2023-01-20" }
        ],
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
        skills: [
            { name: "Cozinha", source: "Cozinha Geral da Unidade", startDate: "2023-05-10" }
        ],
        educationHistory: [], // Sem cursos
    },
    {
        id: "4",
        name: "Ana Santos",
        registration: "556677-88",
        prisonUnit: "Unidade Prisional Feminina da 1º Regional",
        status: "occupied",
        skills: [
            { name: "Limpeza", source: "Faxina Geral", startDate: "2022-01-10", endDate: "2022-12-20" },
            { name: "Jardinagem", source: "Horta Comunitária", startDate: "2023-01-05" }
        ],
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
