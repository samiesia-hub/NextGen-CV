import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CVItem {
    id: number | string;
    title: string;
    period?: string;
    subtitle?: string;
    description?: string;
    bullets?: string[];
}

export interface SidebarItem {
    icon?: string;
    text?: string;
    href?: string;
    name?: string;
    dots?: number;
}

export interface SidebarSection {
    title: string;
    type: 'link' | 'language' | 'quality';
    items: (string | SidebarItem)[];
}

export interface MainSection {
    id: number | string;
    title: string;
    items: CVItem[];
}

interface CVState {
    personalInfo: {
        name: string;
        profile: string;
        email: string;
        phone: string;
        location: string;
    };
    sidebarSections: SidebarSection[];
    mainSections: MainSection[];
    styleConfig: {
        primaryColor: string;
        headerColor: string;
        sidebarColor: string;
        fontSize: number;
        lineHeight: number;
        cvPadding: number;
        cvGap: number;
        arcSize: number;
        fontFamily: string;
    };
    // Actions
    updatePersonalInfo: (data: Partial<CVState['personalInfo']>) => void;
    setPersonalInfo: (data: CVState['personalInfo']) => void;
    updateStyle: (field: string, value: string | number) => void;
    setSidebarSections: (sections: SidebarSection[]) => void;
    setMainSections: (sections: MainSection[]) => void;
    resetAll: () => void;
}

const DEFAULT_STATE = {
    personalInfo: {
        name: 'ES-SADKIA Sami',
        profile: "Ingénieur Full-Stack Senior avec plus de 5 ans d'expérience dans le développement d'applications web scalables. Expert en React, Node.js et architectures Cloud (AWS/Azure). Passionné par l'optimisation des performances et l'expérience utilisateur.",
        email: 'samies2sadkia@gmail.com',
        phone: '+0000000000',
        location: 'Oujda, Maroc',
    },
    sidebarSections: [
        {
            title: "Contact",
            type: "link" as const,
            items: [
                { icon: "fab fa-github", text: "github.com/samiesia-hub", href: "https://github.com/samiesia-hub" },
                { icon: "fab fa-linkedin", text: "linkedin.com/in/sami-es-sadkia", href: "https://www.linkedin.com/in/sami-es-sadkia" },
                { icon: "fas fa-envelope", text: "samies2sadkia@gmail.com", href: "mailto:samies2sadkia@gmail.com" }
            ]
        },
        {
            title: "Langues",
            type: "language" as const,
            items: [
                { name: "Français", dots: 5 },
                { name: "Anglais", dots: 4 },
                { name: "Espagnol", dots: 2 }
            ]
        },
        {
            title: "Compétences Tech",
            type: "quality" as const,
            items: ["React / Next.js", "TypeScript", "Node.js / NestJS", "PostgreSQL / MongoDB", "Docker / Kubernetes"]
        }
    ],
    mainSections: [
        {
            id: 1,
            title: "Expérience Professionnelle",
            items: [
                {
                    id: 201,
                    title: "Senior Full-Stack Developer",
                    period: "2021 - Présent",
                    subtitle: "Tech Solutions, Paris",
                    description: "Lead technique sur la refonte de la plateforme e-commerce.",
                    bullets: [
                        "Migration d'une architecture monolithique vers des microservices en Node.js",
                        "Amélioration des performances du frontend de 40% (Lighthouse score)",
                        "Mentorat d'une équipe de 4 développeurs juniors",
                        "Mise en place de tests E2E avec Playwright et CI/CD via GitHub Actions"
                    ]
                },
                {
                    id: 202,
                    title: "Développeur Web Full-Stack",
                    period: "2018 - 2021",
                    subtitle: "Startup Dynamics, Lyon",
                    description: "Développement de nouvelles fonctionnalités pour une application SaaS.",
                    bullets: [
                        "Conception d'interfaces réutilisables avec React et Tailwind CSS",
                        "Optimisation des requêtes SQL réduisant le temps de réponse de 50%",
                        "Intégration de systèmes de paiement (Stripe, PayPal)"
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Formation",
            items: [
                { id: 101, title: "Master en Ingénierie Informatique", period: "2016 - 2018", subtitle: "Université de Technologie de Compiègne", description: "Spécialisation Génie Logiciel", bullets: [] },
                { id: 102, title: "Licence Mathématiques-Informatique", period: "2013 - 2016", subtitle: "Université Paris-Saclay", description: "Mention Très Bien", bullets: [] }
            ]
        }
    ],
    styleConfig: {
        primaryColor: '#1A6B8A',
        headerColor: '#1B3A50',
        sidebarColor: '#F0F4F5',
        fontSize: 0.95,
        lineHeight: 1.6,
        cvPadding: 2,
        cvGap: 1.2,
        arcSize: 40,
        fontFamily: "'Inter', sans-serif",
    }
}

export const useCVStore = create<CVState>()(
    persist(
        (set) => ({
            ...DEFAULT_STATE,
            updatePersonalInfo: (data) => set((state) => ({
                personalInfo: { ...state.personalInfo, ...data }
            })),
            setPersonalInfo: (data) => set({ personalInfo: data }),
            updateStyle: (field, value) => set((state) => ({
                styleConfig: { ...state.styleConfig, [field]: value }
            })),
            setSidebarSections: (sections) => set({ sidebarSections: sections }),
            setMainSections: (sections) => set({ mainSections: sections }),
            resetAll: () => set(DEFAULT_STATE)
        }),
        {
            name: 'cv-storage',
        }
    )
)
