import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigation = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' },
    ]

    const socialLinks = [
        { name: 'GitHub', icon: Github, href: 'https://github.com/debojit1996' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/debojit-chakraborty-5b309a132' },
        { name: 'Email', icon: Mail, href: 'mailto:devchakraborty9914@gmail.com' },
    ]

    return (
        <motion.header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <motion.div
                        className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#home">Debojit's Portfolio</a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={link.name}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                                            aria-label={link.name}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>
        </motion.header>
    )
}

export default Header
