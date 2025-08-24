import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowDown } from 'lucide-react'
import { PortfolioProps } from '../types/portfolio'

const Hero: React.FC<PortfolioProps> = ({ portfolioData }) => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="hero" className="min-h-screen bg-gradient-to-br from-primary-50 to-white relative overflow-hidden pt-20 md:pt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-100 opacity-50 animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-200 opacity-30 animate-pulse-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-center min-h-screen relative z-10">
                    <div className="text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            {/* Profile Image */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mx-auto w-32 h-32 sm:w-40 sm:h-40 relative mb-8"
                            >
                                {portfolioData?.profileImage ? (
                                    <img
                                        src={`/images/${portfolioData.profileImage}`}
                                        alt="Debojit Chakraborty"
                                        className="w-full h-full rounded-full object-cover object-top border-4 border-primary-600 shadow-lg"
                                        onError={(e) => {
                                            // Fallback to initials if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const fallback = target.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />

                                ) : (
                                    <div className="w-full h-full rounded-full bg-primary-600 flex items-center justify-center border-4 border-primary-600 shadow-lg">
                                        <span className="text-white text-2xl sm:text-3xl font-bold">DC</span>
                                    </div>
                                )}

                                {/* Fallback initials (hidden by default, shown if image fails) */}
                                <div className="w-full h-full rounded-full bg-primary-600 flex items-center justify-center absolute top-0 left-0 border-4 border-primary-600 shadow-lg" style={{ display: 'none' }}>
                                    <span className="text-white text-2xl sm:text-3xl font-bold">DC</span>
                                </div>
                            </motion.div>

                            {/* Name and Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="space-y-4"
                            >
                                <p className="text-lg sm:text-xl text-primary-600 font-medium">
                                    Hi, I'm{' '}
                                    <span className="gradient-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    Debojit Chakraborty
                  </span>
                                </p>
                                <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light">
                                    Senior Software Engineer (Backend)
                                </h1>
                            </motion.div>

                            {/* Bio */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4"
                            >
                                {portfolioData?.bio ||
                                    "I am a computer programming enthusiast who loves designing and developing products. I would love investing my time solving complex problems. I have always been a hardworking individual who loves collaborating and working as a team to deliver high quality software products."}
                            </motion.p>

                            {/* Stats */}
                            {portfolioData && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mt-8 mb-8"
                                >
                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/30">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                                            {portfolioData.experienceCount}+
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Years Experience</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/30">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                                            {portfolioData.projectCount}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Projects</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/30">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                                            {portfolioData.skillCount}+
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Technologies</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/30">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                                            {portfolioData.educationCount}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Degrees</div>
                                    </div>
                                </motion.div>
                            )}

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                            >
                                <motion.button
                                    onClick={scrollToAbout}
                                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ArrowDown className="mr-2 h-5 w-5" />
                                    Learn More About Me
                                </motion.button>

                                <motion.a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-200 w-full sm:w-auto"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Resume
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                onClick={scrollToAbout}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-sm text-gray-500 mb-2 hidden sm:block">Scroll to explore</span>
                    <ArrowDown className="h-6 w-6 text-primary-600" />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
