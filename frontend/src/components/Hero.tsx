import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowDown } from 'lucide-react'
import { PortfolioProps } from '../types/portfolio'

const Hero: React.FC<PortfolioProps> = ({ portfolioData }) => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-gray-50 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Profile Image */}
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-1">
                            {/* REPLACE the placeholder div with actual image */}
                            {portfolioData?.profileImage ? (
                                <img
                                    src={`/images/${portfolioData.profileImage}`}
                                    alt="Debojit Chakraborty"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <img
                                    src="/images/profile.jpg"
                                    alt="Debojit Chakraborty"
                                    className="w-full h-full rounded-full object-cover"
                                    onError={(e) => {
                                        // Fallback to initials if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLElement;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                            )}
                            {/* Fallback initials (hidden by default, shown if image fails) */}
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-primary-600" style={{ display: 'none' }}>
                                DC
                            </div>
                        </div>
                    </motion.div>

                    {/* Name and Title */}
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Hi, I'm{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Debojit Chakraborty
            </span>
                    </motion.h1>

                    <motion.h2
                        className="text-xl sm:text-2xl text-gray-600 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Senior Software Engineer (Backend)
                    </motion.h2>

                    {/* Bio */}
                    <motion.p
                        className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        {portfolioData?.bio ||
                            "I am a computer programming enthusiast who loves designing and developing products. I would love investing my time solving complex problems. I have always been a hardworking individual who loves collaborating and working as a team to deliver high quality software products."
                        }
                    </motion.p>

                    {/* Stats */}
                    {portfolioData && (
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-600">{portfolioData.experienceCount}+</div>
                                <div className="text-sm text-gray-600">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-600">{portfolioData.projectCount}</div>
                                <div className="text-sm text-gray-600">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-600">{portfolioData.skillCount}+</div>
                                <div className="text-sm text-gray-600">Technologies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-600">{portfolioData.educationCount}</div>
                                <div className="text-sm text-gray-600">Degrees</div>
                            </div>
                        </motion.div>
                    )}

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <motion.button
                            onClick={scrollToAbout}
                            className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More About Me
                        </motion.button>

                        <motion.a
                            href="/Debojit_Chakraborty_Resume.pdf"  // This should now work!
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            Download Resume
                        </motion.a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.button
                        onClick={scrollToAbout}
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        aria-label="Scroll to about section"
                    >
                        <ArrowDown size={24} />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
