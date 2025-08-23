import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar, Code } from 'lucide-react'
import { portfolioService } from '../services/portfolioService'
import { Project as ProjectType } from '../types/portfolio'

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true)
                const data = await portfolioService.getUserProjects(1)
                setProjects(data)
            } catch (err) {
                console.error('Failed to load projects:', err)
                setError('Failed to load project data')
            } finally {
                setLoading(false)
            }
        }

        loadProjects()
    }, [])

    // Fallback projects based on your experience
    const fallbackProjects: ProjectType[] = [
        {
            projectId: 1,
            projectName: 'Akamai Test Center',
            description: 'A comprehensive testing platform for CDN configurations across different edge sites. Designed and delivered complex features like dynamic variables and variable group arrays which replicate compiler-like functionality for programming languages.',
            technologies: 'Java 11/17, Spring Boot, Spring Cloud, Microservices, AWS, Docker, Kubernetes',
            githubUrl: undefined,
            liveUrl: undefined,
            imageUrl: undefined,
            startDate: '2020-10-01',
            endDate: undefined,
            createdAt: new Date().toISOString()
        },
        {
            projectId: 2,
            projectName: 'Healthcare Data Parser',
            description: 'Complex parsers to extract patient details from different healthcare file formats (HL7, CCDA, Delimited files). Developed BDD based unit testing framework for stakeholder review and automated testing.',
            technologies: 'Java 8, Spring Boot, FHIR APIs, JUnit, Mockito, BDD, Oracle',
            githubUrl: undefined,
            liveUrl: undefined,
            imageUrl: undefined,
            startDate: '2018-09-01',
            endDate: '2020-09-30',
            createdAt: new Date().toISOString()
        },
        {
            projectId: 3,
            projectName: 'Portfolio Management System',
            description: 'Full-stack portfolio management application with backend REST APIs and modern frontend. Features include user management, project showcase, contact management, and comprehensive API documentation.',
            technologies: 'Java 21, Spring Boot 3.4, MySQL, Docker, React, TypeScript, Tailwind CSS',
            githubUrl: 'https://github.com/debojit1996/portfolio-application',
            liveUrl: 'https://portfolio.debojit.dev',
            imageUrl: undefined,
            startDate: '2024-08-01',
            endDate: undefined,
            createdAt: new Date().toISOString()
        },
        {
            projectId: 4,
            projectName: 'Microservice Migration Tool',
            description: 'Led the migration of critical ATC microservices from AWS to Linode cloud infrastructure. Implemented architectural changes, logging, monitoring, and secret storage setup resulting in 20% cost reduction.',
            technologies: 'Java 21, Spring Cloud, AWS, Linode, Docker, Kubernetes, Terraform',
            githubUrl: undefined,
            liveUrl: undefined,
            imageUrl: undefined,
            startDate: '2024-04-01',
            endDate: undefined,
            createdAt: new Date().toISOString()
        }
    ]

    const displayProjects = error ? fallbackProjects : projects

    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        A showcase of projects that demonstrate technical expertise and problem-solving skills
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">
                        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading projects...</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8">
                        {displayProjects.map((project, index) => (
                            <motion.div
                                key={project.projectId}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Project Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                    {project.imageUrl ? (
                                        <img
                                            src={project.imageUrl}
                                            alt={project.projectName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Code className="w-16 h-16 text-primary-600" />
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Project Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {project.projectName}
                                        </h3>
                                        <div className="flex gap-2">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                                                    aria-label="View source code"
                                                >
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                                                    aria-label="View live project"
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Timeline */}
                                    {project.startDate && (
                                        <div className="flex items-center text-sm text-gray-600 mb-4">
                                            <Calendar size={16} className="mr-2" />
                                            <span>
                        {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                      </span>
                                        </div>
                                    )}

                                    {/* Project Description */}
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    {project.technologies && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3">Technologies Used:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.split(', ').map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors"
                                                    >
                            {tech}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Project Links */}
                                    <div className="mt-6 flex gap-3">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <Github size={16} />
                                                Source Code
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                            >
                                                <ExternalLink size={16} />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Project Stats */}
                <motion.div
                    className="mt-16 bg-gray-50 rounded-xl p-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">{displayProjects.length}</div>
                            <div className="text-gray-600">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">7+</div>
                            <div className="text-gray-600">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">20%</div>
                            <div className="text-gray-600">Cost Reduction Achieved</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
                            <div className="text-gray-600">Awards Won</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Projects
