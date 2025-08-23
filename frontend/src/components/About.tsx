import React from 'react'
import { motion } from 'framer-motion'
import { Code, Coffee, Users, Award } from 'lucide-react'
import { PortfolioProps } from '../types/portfolio'

const About: React.FC<PortfolioProps> = ({ portfolioData }) => {
    const highlights = [
        {
            icon: Code,
            title: 'Full-Stack Development',
            description: 'Specialized in Java backend development with modern frameworks'
        },
        {
            icon: Coffee,
            title: 'Problem Solver',
            description: 'Passionate about solving complex technical challenges'
        },
        {
            icon: Users,
            title: 'Team Player',
            description: 'Experienced in leading teams and mentoring junior developers'
        },
        {
            icon: Award,
            title: 'Award Winner',
            description: 'Multiple recognition awards for technical excellence'
        }
    ]

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
                        About Me
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        A passionate software engineer with expertise in backend development and system architecture
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                            Senior Software Engineer with 7+ Years Experience
                        </h3>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                {portfolioData?.bio ||
                                    "I am a computer programming enthusiast who loves designing and developing products. With over 7 years of experience in backend development, I specialize in building scalable, maintainable systems using Java and modern frameworks."
                                }
                            </p>

                            <p>
                                Currently working as a Senior Software Engineer at <strong>Akamai Technologies</strong>,
                                where I've successfully led the migration of critical microservices from AWS to Linode
                                cloud infrastructure, resulting in 20% cost reduction.
                            </p>

                            <p>
                                I have always been a hardworking individual who loves collaborating and working as a
                                team to deliver high quality software products. My experience spans across healthcare,
                                CDN technologies, and enterprise software development.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                                <p className="text-gray-600">Dibrugarh, Assam, India</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                                <p className="text-gray-600">
                                    {portfolioData?.email || 'devchakraborty9914@gmail.com'}
                                </p>
                            </div>
                        </div>

                        {/* Portfolio Stats */}
                        {portfolioData && (
                            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-primary-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-primary-600">{portfolioData.experienceCount}</div>
                                    <div className="text-sm text-gray-600">Experience</div>
                                </div>
                                <div className="bg-primary-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-primary-600">{portfolioData.projectCount}</div>
                                    <div className="text-sm text-gray-600">Projects</div>
                                </div>
                                <div className="bg-primary-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-primary-600">{portfolioData.skillCount}</div>
                                    <div className="text-sm text-gray-600">Skills</div>
                                </div>
                                <div className="bg-primary-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-primary-600">{portfolioData.educationCount}</div>
                                    <div className="text-sm text-gray-600">Education</div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right Column - Highlights */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {highlights.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={index}
                                    className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="text-primary-600" size={24} />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
