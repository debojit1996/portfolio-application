import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import { portfolioService } from './services/portfolioService'
import { PortfolioSummary } from './types/portfolio'

const App: React.FC = () => {
    const [portfolioData, setPortfolioData] = useState<PortfolioSummary | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadPortfolioData = async () => {
            try {
                setLoading(true)
                const data = await portfolioService.getPortfolioSummary()
                setPortfolioData(data)
            } catch (err) {
                console.error('Failed to load portfolio data:', err)
                setError('Failed to load portfolio data. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        loadPortfolioData()
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Portfolio</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-white">
                <Header />

                <main>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Hero Section */}
                        <section id="home">
                            <Hero portfolioData={portfolioData} />
                        </section>

                        {/* About Section */}
                        <section id="about">
                            <About portfolioData={portfolioData} />
                        </section>

                        {/* Experience Section */}
                        <section id="experience">
                            <Experience />
                        </section>

                        {/* Projects Section */}
                        <section id="projects">
                            <Projects />
                        </section>

                        {/* Skills Section */}
                        <section id="skills">
                            <Skills />
                        </section>

                        {/* Education Section */}
                        <section id="education">
                            <Education />
                        </section>

                        {/* Contact Section */}
                        <section id="contact">
                            <Contact />
                        </section>
                    </motion.div>
                </main>

                <Footer />
            </div>
        </ErrorBoundary>
    )
}

export default App
