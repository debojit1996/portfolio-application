import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Cloud, Wrench, TestTube, Users } from 'lucide-react'
import { portfolioService } from '../services/portfolioService'
import { Skill as SkillType, SkillsByCategory } from '../types/portfolio'

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<SkillType[]>([])
    const [skillsByCategory, setSkillsByCategory] = useState<SkillsByCategory>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState<string>('all')

    useEffect(() => {
        const loadSkills = async () => {
            try {
                setLoading(true)
                const data = await portfolioService.getUserSkills(1)
                setSkills(data)

                // Group skills by category
                const grouped = data.reduce((acc: SkillsByCategory, skill) => {
                    const category = skill.skillCategory || 'Other'
                    if (!acc[category]) {
                        acc[category] = []
                    }
                    acc[category].push(skill)
                    return acc
                }, {})

                setSkillsByCategory(grouped)
            } catch (err) {
                console.error('Failed to load skills:', err)
                setError('Failed to load skills data')
            } finally {
                setLoading(false)
            }
        }

        loadSkills()
    }, [])

    // Fallback skills based on your resume
    const fallbackSkills: SkillType[] = [
        // Programming Languages
        { skillId: 1, skillName: 'Java', skillCategory: 'Programming Language', proficiencyLevel: 'Expert', yearsExperience: 7, isFeatured: true },
        { skillId: 2, skillName: 'TypeScript', skillCategory: 'Programming Language', proficiencyLevel: 'Advanced', yearsExperience: 3, isFeatured: false },
        { skillId: 3, skillName: 'JavaScript', skillCategory: 'Programming Language', proficiencyLevel: 'Advanced', yearsExperience: 4, isFeatured: false },

        // Frameworks
        { skillId: 4, skillName: 'Spring Boot', skillCategory: 'Framework', proficiencyLevel: 'Expert', yearsExperience: 6, isFeatured: true },
        { skillId: 5, skillName: 'Spring Cloud', skillCategory: 'Framework', proficiencyLevel: 'Advanced', yearsExperience: 4, isFeatured: true },
        { skillId: 6, skillName: 'React', skillCategory: 'Framework', proficiencyLevel: 'Advanced', yearsExperience: 3, isFeatured: false },

        // Architecture
        { skillId: 7, skillName: 'Microservices', skillCategory: 'Architecture', proficiencyLevel: 'Expert', yearsExperience: 5, isFeatured: true },
        { skillId: 8, skillName: 'REST API', skillCategory: 'Architecture', proficiencyLevel: 'Expert', yearsExperience: 6, isFeatured: true },
        { skillId: 9, skillName: 'System Design', skillCategory: 'Architecture', proficiencyLevel: 'Advanced', yearsExperience: 5, isFeatured: false },

        // Database
        { skillId: 10, skillName: 'MySQL', skillCategory: 'Database', proficiencyLevel: 'Advanced', yearsExperience: 5, isFeatured: false },
        { skillId: 11, skillName: 'Oracle', skillCategory: 'Database', proficiencyLevel: 'Intermediate', yearsExperience: 3, isFeatured: false },
        { skillId: 12, skillName: 'JPA/Hibernate', skillCategory: 'Database', proficiencyLevel: 'Advanced', yearsExperience: 5, isFeatured: false },

        // Cloud & DevOps
        { skillId: 13, skillName: 'AWS', skillCategory: 'Cloud', proficiencyLevel: 'Intermediate', yearsExperience: 4, isFeatured: false },
        { skillId: 14, skillName: 'Linode', skillCategory: 'Cloud', proficiencyLevel: 'Intermediate', yearsExperience: 2, isFeatured: false },
        { skillId: 15, skillName: 'Docker', skillCategory: 'DevOps', proficiencyLevel: 'Intermediate', yearsExperience: 3, isFeatured: false },
        { skillId: 16, skillName: 'Kubernetes', skillCategory: 'DevOps', proficiencyLevel: 'Beginner', yearsExperience: 2, isFeatured: false },

        // Testing
        { skillId: 17, skillName: 'JUnit', skillCategory: 'Testing', proficiencyLevel: 'Advanced', yearsExperience: 5, isFeatured: false },
        { skillId: 18, skillName: 'Mockito', skillCategory: 'Testing', proficiencyLevel: 'Advanced', yearsExperience: 5, isFeatured: false },
        { skillId: 19, skillName: 'BDD Testing', skillCategory: 'Testing', proficiencyLevel: 'Advanced', yearsExperience: 4, isFeatured: false },

        // Tools
        { skillId: 20, skillName: 'Maven', skillCategory: 'Build Tool', proficiencyLevel: 'Advanced', yearsExperience: 5, isFeatured: false },
        { skillId: 21, skillName: 'Gradle', skillCategory: 'Build Tool', proficiencyLevel: 'Beginner', yearsExperience: 2, isFeatured: false },
        { skillId: 22, skillName: 'Git', skillCategory: 'Version Control', proficiencyLevel: 'Advanced', yearsExperience: 7, isFeatured: false },

        // Monitoring
        { skillId: 23, skillName: 'Splunk', skillCategory: 'Monitoring', proficiencyLevel: 'Intermediate', yearsExperience: 3, isFeatured: false },
        { skillId: 24, skillName: 'Kibana', skillCategory: 'Monitoring', proficiencyLevel: 'Intermediate', yearsExperience: 2, isFeatured: false },
        { skillId: 25, skillName: 'Grafana', skillCategory: 'Monitoring', proficiencyLevel: 'Beginner', yearsExperience: 2, isFeatured: false },
    ]

    const fallbackSkillsByCategory: SkillsByCategory = fallbackSkills.reduce((acc: SkillsByCategory, skill) => {
        const category = skill.skillCategory || 'Other'
        if (!acc[category]) {
            acc[category] = []
        }
        acc[category].push(skill)
        return acc
    }, {})

    const displaySkills = error ? fallbackSkills : skills
    const displaySkillsByCategory = error ? fallbackSkillsByCategory : skillsByCategory

    const categoryIcons: { [key: string]: any } = {
        'Programming Language': Code2,
        'Framework': Code2,
        'Architecture': Wrench,
        'Database': Database,
        'Cloud': Cloud,
        'DevOps': Cloud,
        'Testing': TestTube,
        'Build Tool': Wrench,
        'Version Control': Code2,
        'Monitoring': TestTube,
        'Other': Users
    }

    const getProficiencyColor = (level?: string) => {
        switch (level?.toLowerCase()) {
            case 'expert':
                return 'bg-green-500'
            case 'advanced':
                return 'bg-blue-500'
            case 'intermediate':
                return 'bg-yellow-500'
            case 'beginner':
                return 'bg-gray-500'
            default:
                return 'bg-primary-500'
        }
    }

    // REMOVED: const filteredSkills = activeCategory === 'all' ? displaySkills : displaySkills.filter(skill => skill.skillCategory === activeCategory)

    const featuredSkills = displaySkills.filter(skill => skill.isFeatured)

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
                        Technical Skills
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Comprehensive expertise across the full technology stack with deep specialization in backend development
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">
                        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading skills...</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Skills */}
                        <motion.div
                            className="mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Core Expertise</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {featuredSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill.skillId}
                                        className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Code2 className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">{skill.skillName}</h4>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${getProficiencyColor(skill.proficiencyLevel)}`}></div>
                                            <span className="text-sm text-gray-600">{skill.proficiencyLevel}</span>
                                        </div>
                                        {skill.yearsExperience && (
                                            <p className="text-xs text-gray-500 mt-1">{skill.yearsExperience}+ years</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Category Filter */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        activeCategory === 'all'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-white text-gray-600 hover:bg-primary-50'
                                    }`}
                                >
                                    All Skills
                                </button>
                                {Object.keys(displaySkillsByCategory).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            activeCategory === category
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-white text-gray-600 hover:bg-primary-50'
                                        }`}
                                    >
                                        {category} ({displaySkillsByCategory[category].length})
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Skills Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {Object.entries(displaySkillsByCategory).map(([category, categorySkills], categoryIndex) => {
                                const Icon = categoryIcons[category] || Users

                                if (activeCategory !== 'all' && activeCategory !== category) return null

                                return (
                                    <motion.div
                                        key={category}
                                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                                        </div>

                                        <div className="space-y-3">
                                            {categorySkills.map((skill) => (
                                                <div key={skill.skillId} className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-900 font-medium">{skill.skillName}</span>
                                                            {skill.isFeatured && (
                                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  Featured
                                </span>
                                                            )}
                                                        </div>
                                                        {skill.yearsExperience && (
                                                            <p className="text-sm text-gray-600">{skill.yearsExperience}+ years</p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${getProficiencyColor(skill.proficiencyLevel)}`}></div>
                                                        <span className="text-sm text-gray-600">{skill.proficiencyLevel}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>

                        {/* Skills Summary */}
                        <motion.div
                            className="mt-16 bg-white rounded-xl p-8 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-primary-600 mb-2">{displaySkills.length}</div>
                                    <div className="text-gray-600">Total Skills</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary-600 mb-2">{Object.keys(displaySkillsByCategory).length}</div>
                                    <div className="text-gray-600">Categories</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary-600 mb-2">{featuredSkills.length}</div>
                                    <div className="text-gray-600">Core Skills</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary-600 mb-2">7+</div>
                                    <div className="text-gray-600">Years Experience</div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Skills
