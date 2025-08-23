import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, ExternalLink } from 'lucide-react'
import { portfolioService } from '../services/portfolioService'
import { Experience as ExperienceType } from '../types/portfolio'

const Experience: React.FC = () => {
    const [experiences, setExperiences] = useState<ExperienceType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                setLoading(true)
                // For demo purposes, we'll use userId 1. In a real app, this would come from auth context
                const data = await portfolioService.getUserExperience(1)
                setExperiences(data)
            } catch (err) {
                console.error('Failed to load experiences:', err)
                setError('Failed to load experience data')
            } finally {
                setLoading(false)
            }
        }

        loadExperiences()
    }, [])

    // Fallback data based on your resume
    const fallbackExperiences: ExperienceType[] = [
        {
            experienceId: 1,
            company: 'Akamai Technologies',
            position: 'Senior Software Engineer',
            startDate: '2024-04-01',
            endDate: undefined,
            description: 'Senior backend engineer of Akamai Test Center project. This application is used to test different CDN configurations that users will be applying for their products in different edge sites. Pivoting the migration of a critical micro-service currently running in AWS infra to Akamai\'s Linode cloud infra.',
            technologies: 'Java 21, Spring Boot, Spring Cloud, Microservices, AWS, Linode, Docker, Kubernetes',
            isCurrent: true,
            createdAt: new Date().toISOString()
        },
        {
            experienceId: 2,
            company: 'Akamai Technologies',
            position: 'Software Engineer II',
            startDate: '2020-10-01',
            endDate: '2021-11-30',
            description: 'Worked as a backend developer for the project Akamai Test Center. Responsible for HLD, LLD and development of multiple complex features for the project, mentored and guided juniors to deliver critical project features.',
            technologies: 'Java 8/11, Spring Boot, Microservices, JPA, Hibernate, MySQL',
            isCurrent: false,
            createdAt: new Date().toISOString()
        },
        {
            experienceId: 3,
            company: 'Philips India Ltd',
            position: 'Software Engineer II',
            startDate: '2018-09-01',
            endDate: '2020-09-30',
            description: 'Worked as a backend engineer in a team named Population Connector to support data ingestion from EMR vendors which are in FHIR data format. Designed LLD for the parsers, wrote them using Java 8 leveraging the FHIR APIs.',
            technologies: 'Java 8, Spring Boot, FHIR APIs, REST APIs, JPA, Hibernate, Oracle, Maven',
            isCurrent: false,
            createdAt: new Date().toISOString()
        },
        {
            experienceId: 4,
            company: 'Philips India Ltd',
            position: 'Software Engineer I',
            startDate: '2021-12-01',
            endDate: '2024-03-31',
            description: 'The project is named Wellcentive used for analyzing patient healthcare records. Worked on creating stateless, secure RESTful web services using Spring Boot for the applicable to ingest and transform healthcare records of patients.',
            technologies: 'Java 8, Spring Boot, REST APIs, JPA, Hibernate, MySQL, JUnit, Mockito',
            isCurrent: false,
            createdAt: new Date().toISOString()
        }
    ]

    const displayExperiences = error ? fallbackExperiences : experiences

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        })
    }

    const calculateDuration = (start: string, end?: string) => {
        const startDate = new Date(start)
        const endDate = end ? new Date(end) : new Date()
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
        const years = Math.floor(months / 12)
        const remainingMonths = months % 12

        if (years === 0) return `${remainingMonths} months`
        if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
        return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Professional Experience
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        7+ years of experience building scalable backend systems and leading development teams
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">
                        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading experience data...</p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform -translate-x-px"></div>

                        <div className="space-y-12">
                            {displayExperiences.map((exp, index) => (
                                <motion.div
                                    key={exp.experienceId}
                                    className={`relative flex items-center ${
                                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Timeline Dot */}
                                    <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 z-10 border-4 border-white"></div>

                                    {/* Content Card */}
                                    <div className={`md:w-5/12 ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                                        <motion.div
                                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                                            whileHover={{ y: -5 }}
                                        >
                                            {/* Company and Position */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {exp.position}
                                                    </h3>
                                                    <div className="flex items-center text-primary-600 font-medium mb-2">
                                                        <span>{exp.company}</span>
                                                        {exp.isCurrent && (
                                                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Current
                              </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <ExternalLink className="text-gray-400 hover:text-primary-600 transition-colors" size={20} />
                                            </div>

                                            {/* Duration and Location */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} />
                                                    <span>
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                          </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Award size={16} />
                                                    <span>{calculateDuration(exp.startDate, exp.endDate)}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                {exp.description}
                                            </p>

                                            {/* Technologies */}
                                            {exp.technologies && (
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-2">Key Technologies:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.technologies.split(', ').map((tech, techIndex) => (
                                                            <span
                                                                key={techIndex}
                                                                className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full border border-primary-200"
                                                            >
                                {tech}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards Section */}
                <motion.div
                    className="mt-16 bg-white rounded-xl p-8 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        Awards & Recognition
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                            <h4 className="font-semibold text-gray-900 mb-2">Akamai Award</h4>
                            <p className="text-gray-600 text-sm">Received twice in 2022 and 2023 for designing Variable groups and f-line tests</p>
                        </div>
                        <div className="text-center p-4">
                            <Award className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                            <h4 className="font-semibold text-gray-900 mb-2">Take Ownership Award</h4>
                            <p className="text-gray-600 text-sm">For developing BDD based unit testing framework at Philips</p>
                        </div>
                        <div className="text-center p-4">
                            <Award className="w-12 h-12 text-green-500 mx-auto mb-3" />
                            <h4 className="font-semibold text-gray-900 mb-2">Customer First Award</h4>
                            <p className="text-gray-600 text-sm">For delivering priority production issues within due time</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Experience
