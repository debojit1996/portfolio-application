import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react'
import { portfolioService } from '../services/portfolioService'
import { Education as EducationType } from '../types/portfolio'

const Education: React.FC = () => {
    const [educations, setEducations] = useState<EducationType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEducation = async () => {
            try {
                setLoading(true)
                const data = await portfolioService.getUserEducation(1)
                setEducations(data)
            } catch (err) {
                console.error('Failed to load education:', err)
                setError('Failed to load education data')
            } finally {
                setLoading(false)
            }
        }

        loadEducation()
    }, [])

    // Fallback education data based on your resume
    const fallbackEducations: EducationType[] = [
        {
            educationId: 1,
            institution: 'NIT SILCHAR',
            degree: 'Bachelor of Technology',
            fieldOfStudy: 'Computer Science & Engineering',
            startDate: '2014-01-01',
            endDate: '2018-12-31',
            gpa: 8.99,
            description: 'Computer Science & Engineering with focus on software development, algorithms, and system design. Comprehensive curriculum covering data structures, algorithms, database systems, software engineering, and computer networks.'
        },
        {
            educationId: 2,
            institution: 'VKV DIBRUGARH, ASSAM',
            degree: 'Higher Secondary',
            fieldOfStudy: 'Science Stream',
            startDate: '2012-01-01',
            endDate: '2014-12-31',
            gpa: 9.46,
            description: 'Higher Secondary education in Science stream with subjects including Physics, Chemistry, Mathematics, and Computer Science. Achieved 94.6% marks with strong foundation in analytical and problem-solving skills.'
        },
        {
            educationId: 3,
            institution: 'VKV DIBRUGARH, ASSAM',
            degree: 'H.S.L.C',
            fieldOfStudy: 'General',
            startDate: '2010-01-01',
            endDate: '2012-12-31',
            gpa: 10.00,
            description: 'High School Leaving Certificate with perfect GPA. Strong academic foundation with excellent performance across all subjects including Mathematics, Science, and Languages.'
        }
    ]

    const displayEducations = error ? fallbackEducations : educations

    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        })
    }

    const formatGPA = (gpa?: number) => {
        if (!gpa) return ''
        if (gpa <= 4.0) {
            return `${gpa.toFixed(2)}/4.0`
        } else if (gpa <= 10.0) {
            return `${gpa.toFixed(2)}/10.0`
        } else {
            return `${gpa.toFixed(1)}%`
        }
    }

    const getGradeColor = (gpa?: number) => {
        if (!gpa) return 'text-gray-600'
        if (gpa >= 9.0 || gpa >= 3.8) return 'text-green-600'
        if (gpa >= 8.0 || gpa >= 3.5) return 'text-blue-600'
        if (gpa >= 7.0 || gpa >= 3.0) return 'text-yellow-600'
        return 'text-gray-600'
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
                        Education
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Academic background and qualifications that built the foundation for my technical career
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">
                        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading education data...</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-8">
                            {displayEducations.map((edu, index) => (
                                <motion.div
                                    key={edu.educationId}
                                    className="relative"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`flex flex-col lg:flex-row gap-8 items-center ${
                                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    }`}>
                                        {/* Education Icon */}
                                        <motion.div
                                            className="flex-shrink-0"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                                                <GraduationCap className="w-12 h-12 text-white" />
                                            </div>
                                        </motion.div>

                                        {/* Education Content */}
                                        <motion.div
                                            className="flex-1 bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {edu.degree}
                                                        {edu.fieldOfStudy && (
                                                            <span className="text-primary-600 font-normal"> in {edu.fieldOfStudy}</span>
                                                        )}
                                                    </h3>
                                                    <div className="flex items-center text-gray-600 mb-2">
                                                        <MapPin size={16} className="mr-2" />
                                                        <span className="font-medium">{edu.institution}</span>
                                                    </div>
                                                </div>

                                                {edu.gpa && (
                                                    <div className={`text-right ${getGradeColor(edu.gpa)}`}>
                                                        <div className="text-2xl font-bold">{formatGPA(edu.gpa)}</div>
                                                        <div className="text-sm">GPA</div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Duration */}
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <Calendar size={16} className="mr-2" />
                                                <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                                            </div>

                                            {/* Description */}
                                            {edu.description && (
                                                <p className="text-gray-700 leading-relaxed">
                                                    {edu.description}
                                                </p>
                                            )}

                                            {/* Achievement Badge */}
                                            {edu.gpa && edu.gpa >= 9.0 && (
                                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                                    <Award size={16} />
                                                    <span>Excellent Performance</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Connecting Line */}
                                    {index < displayEducations.length - 1 && (
                                        <div className="hidden lg:block absolute left-12 top-24 w-0.5 h-16 bg-primary-200"></div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Education Summary */}
                        <motion.div
                            className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                                Educational Highlights
                            </h3>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <GraduationCap className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">B.Tech in Computer Science</h4>
                                    <p className="text-gray-600 text-sm">NIT Silchar • 8.99/10 GPA</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Award className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Consistent Excellence</h4>
                                    <p className="text-gray-600 text-sm">Outstanding academic performance across all levels</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Strong Foundation</h4>
                                    <p className="text-gray-600 text-sm">Comprehensive education from 2010-2018</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Academic Skills */}
                        <motion.div
                            className="mt-12 bg-white rounded-xl p-8 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                                Core Academic Subjects
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    'Data Structures & Algorithms',
                                    'Database Management Systems',
                                    'Software Engineering',
                                    'Computer Networks',
                                    'Operating Systems',
                                    'Object-Oriented Programming',
                                    'System Design',
                                    'Web Technologies'
                                ].map((subject, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-50 px-4 py-2 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        {subject}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Education
