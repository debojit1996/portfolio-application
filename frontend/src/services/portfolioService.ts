import { api, apiCall } from './api'
import {
    ApiResponse,
    User,
    Experience,
    Project,
    Skill,
    Education,
    ContactMessage,
    PortfolioSummary
} from '../types/portfolio'

export const portfolioService = {
    // Get portfolio summary
    getPortfolioSummary: async (): Promise<PortfolioSummary> => {
        return apiCall(() => api.get<ApiResponse<PortfolioSummary>>('/portfolio/summary'))
    },

    // Get active user
    getActiveUser: async (): Promise<User> => {
        return apiCall(() => api.get<ApiResponse<User>>('/portfolio/user/active'))
    },

    // Get user experiences
    getUserExperience: async (userId: number): Promise<Experience[]> => {
        return apiCall(() => api.get<ApiResponse<Experience[]>>(`/portfolio/experience/${userId}`))
    },

    // Get current experiences
    getCurrentExperiences: async (userId: number): Promise<Experience[]> => {
        return apiCall(() => api.get<ApiResponse<Experience[]>>(`/portfolio/experience/${userId}/current`))
    },

    // Get user projects
    getUserProjects: async (userId: number): Promise<Project[]> => {
        return apiCall(() => api.get<ApiResponse<Project[]>>(`/portfolio/projects/${userId}`))
    },

    // Get user skills
    getUserSkills: async (userId: number): Promise<Skill[]> => {
        return apiCall(() => api.get<ApiResponse<Skill[]>>(`/portfolio/skills/${userId}`))
    },

    // Get featured skills
    getFeaturedSkills: async (userId: number): Promise<Skill[]> => {
        return apiCall(() => api.get<ApiResponse<Skill[]>>(`/portfolio/skills/${userId}/featured`))
    },

    // Get skill categories
    getSkillCategories: async (userId: number): Promise<string[]> => {
        return apiCall(() => api.get<ApiResponse<string[]>>(`/portfolio/skills/${userId}/categories`))
    },

    // Get user education
    getUserEducation: async (userId: number): Promise<Education[]> => {
        return apiCall(() => api.get<ApiResponse<Education[]>>(`/portfolio/education/${userId}`))
    },

    // Submit contact message
    submitContactMessage: async (message: ContactMessage): Promise<ContactMessage> => {
        return apiCall(() => api.post<ApiResponse<ContactMessage>>('/portfolio/contact', message))
    },

    // Get unread messages count
    getUnreadMessagesCount: async (): Promise<number> => {
        return apiCall(() => api.get<ApiResponse<number>>('/portfolio/contact/unread-count'))
    }
}
