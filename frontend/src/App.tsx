import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
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
                <div className="text-center max-w-md mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Error Loading Portfolio</h1>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Retry
                        </button>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <ErrorBoundary>
            <div className="App">
                {/* Navigation */}
                <Navigation />

                {/* Main Content */}
                <main>
                    {/* Hero Section */}
                    <Hero portfolioData={portfolioData} />

                    {/* About Section */}
                    <About portfolioData={portfolioData} />

                    {/* Experience Section */}
                    <Experience />

                    {/* Projects Section */}
                    <Projects />

                    {/* Skills Section */}
                    <Skills />

                    {/* Education Section */}
                    <Education />

                    {/* Contact Section */}
                    <Contact />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </ErrorBoundary>
    )
}

export default App
