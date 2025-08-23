// API Response wrapper
export interface ApiResponse<T> {
    data: T
    message: string
    error: string | null
    success: boolean
}

// User types
export interface User {
    userId: number
    fullName: string
    email: string
    phone?: string
    bio?: string
    profileImage?: string
    resumeUrl?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    experiences?: Experience[]
    projects?: Project[]
    skills?: Skill[]
    educations?: Education[]
}

// Experience types
export interface Experience {
    experienceId: number
    company: string
    position: string
    startDate: string
    endDate?: string
    description?: string
    technologies?: string
    isCurrent: boolean
    createdAt: string
}

// Project types
export interface Project {
    projectId: number
    projectName: string
    description?: string
    technologies?: string
    githubUrl?: string
    liveUrl?: string
    imageUrl?: string
    startDate?: string
    endDate?: string
    createdAt: string
}

// Skill types
export interface Skill {
    skillId: number
    skillName: string
    skillCategory?: string
    proficiencyLevel?: string
    yearsExperience?: number
    isFeatured: boolean
}

// Education types
export interface Education {
    educationId: number
    institution: string
    degree: string
    fieldOfStudy?: string
    startDate?: string
    endDate?: string
    gpa?: number
    description?: string
}

// Contact message types
export interface ContactMessage {
    messageId?: number
    name: string
    email: string
    subject?: string
    message: string
    sentDate?: string
    isRead?: boolean
    response?: string
}

// Portfolio summary type (Fixed and complete)
export interface PortfolioSummary {
    name: string
    email: string
    bio?: string
    profileImage?: string
    experienceCount: number
    projectCount: number
    skillCount: number
    educationCount: number
}

// Component prop types
export interface PortfolioProps {
    portfolioData: PortfolioSummary | null
}

// Form types
export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

// Skills grouped by category
export interface SkillsByCategory {
    [category: string]: Skill[]
}
