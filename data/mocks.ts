import dayjs from "dayjs";

export interface EducationItem {
    id: string;
    level: string;
    courseName: string;
    institution: string;
    location: "internal" | "external";
    date: dayjs.Dayjs | string;
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
        name: "Carlos Eduardo Mendes",
        registration: "2018.05432-1",
        prisonUnit: "Complexo Prisional de Aparecida de Goiânia",
        status: "available",
        photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        skills: [
            { name: "Eletricista Predial", source: "Programa de Capacitação Interna", startDate: "2023-02-15", endDate: "2023-08-20" },
            { name: "Auxiliar de Manutenção", source: "Manutenção Geral do Bloco C", startDate: "2023-09-01" }, // Atual
            { name: "Pedreiro de Acabamento", source: "Obra de Reforma da Enfermaria", startDate: "2022-01-10", endDate: "2022-11-30" }
        ],
        educationHistory: [
            {
                id: "101",
                level: "Ensino Médio",
                courseName: "Educação de Jovens e Adultos (EJA)",
                institution: "Escola Estadual no Sistema Prisional",
                location: "internal",
                date: dayjs("2022-12-01"),
                hasCertificate: true,
                validationHash: "EJA-2022-8874"
            },
            {
                id: "102",
                level: "Qualificação Profissional",
                courseName: "Instalações Elétricas Residenciais",
                institution: "SENAI / Parceira DGAP",
                location: "internal",
                date: dayjs("2023-08-20"),
                hasCertificate: true,
                validationHash: "SENAI-ELE-9901"
            },
            {
                id: "103",
                level: "Fundamental Completo",
                courseName: "Ensino Fundamental",
                institution: "Escola Municipal Cora Coralina",
                location: "external",
                date: dayjs("2010-12-15"),
                hasCertificate: true,
            }
        ],
    },
    {
        id: "2",
        name: "Fernanda da Silva Costa",
        registration: "2019.11200-5",
        prisonUnit: "Unidade Prisional Feminina de Goiânia",
        status: "occupied",
        photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        skills: [
            { name: "Costureira Industrial", source: "Confecção de Uniformes (Projeto Ressocializar)", startDate: "2021-05-10" },
            { name: "Bordado e Artesanato", source: "Ateliê de Artes", startDate: "2020-03-01", endDate: "2021-04-01" }
        ],
        educationHistory: [
            {
                id: "201",
                level: "Ensino Médio Completo",
                courseName: "Formação Geral",
                institution: "Colégio Estadual Pedro Ludovico",
                location: "external",
                date: dayjs("2015-12-10"),
                hasCertificate: true,
            },
            {
                id: "202",
                level: "Qualificação Profissional",
                courseName: "Corte e Costura Industrial",
                institution: "COTEG / Sistema Prisional",
                location: "internal",
                date: dayjs("2021-04-30"),
                hasCertificate: true,
                validationHash: "COST-21-554"
            }
        ],
    },
    {
        id: "3",
        name: "Roberto Almeida Santos",
        registration: "2021.00988-7",
        prisonUnit: "Presídio Estadual de Anápolis",
        status: "available",
        photoUrl: "https://randomuser.me/api/portraits/men/85.jpg",
        skills: [
            { name: "Jardinagem e Paisagismo", source: "Horta Comunitária da Unidade", startDate: "2022-06-01" },
            { name: "Cozinheiro Industrial", source: "Cozinha Geral", startDate: "2021-08-15", endDate: "2022-05-20" }
        ],
        educationHistory: [
            {
                id: "301",
                level: "Ensino Fundamental Incompleto",
                courseName: "4ª Série",
                institution: "Escola Municipal",
                location: "external",
                date: dayjs("2005-12-01"),
                hasCertificate: false,
            }
        ], 
    },
    {
        id: "4",
        name: "Juliana Martins Rocha",
        registration: "2020.33441-9",
        prisonUnit: "CPP de Rio Verde",
        status: "occupied",
        photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        skills: [
            { name: "Auxiliar Administrativo", source: "Secretaria da Unidade (Trabalho Interno)", startDate: "2023-01-15" }
        ],
        educationHistory: [
            {
                id: "401",
                level: "Superior Incompleto",
                courseName: "Gestão de Recursos Humanos",
                institution: "Universidade Estácio de Sá",
                location: "external",
                date: dayjs("2019-12-01"),
                hasCertificate: false,
            },
            {
                id: "402",
                level: "Curso Livre",
                courseName: "Informática Básica",
                institution: "Laboratório de Informática Prisional",
                location: "internal",
                date: dayjs("2022-11-20"),
                hasCertificate: true,
                validationHash: "INFO-22-909"
            }
        ],
    }
];
