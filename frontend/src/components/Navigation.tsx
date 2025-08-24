import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, GraduationCap, Mail } from 'lucide-react';

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navigationItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'projects', label: 'Projects', icon: Code },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navigationItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navigationItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        // First, try to find the exact ID
        let element = document.getElementById(sectionId);

        // If not found, try to find by className or other selectors
        if (!element) {
            const selectors = [
                `section[data-section="${sectionId}"]`,
                `section.${sectionId}`,
                `[data-testid="${sectionId}"]`,
                `.section-${sectionId}`
            ];

            for (const selector of selectors) {
                element = document.querySelector(selector);
                if (element) break;
            }
        }

        // If still not found, scroll to component by approximate position
        if (!element) {
            const components = document.querySelectorAll('section, div[class*="section"], main > div');
            const componentMap: { [key: string]: number } = {
                'hero': 0,
                'about': 1,
                'experience': 2,
                'projects': 3,
                'skills': 4,
                'education': 5,
                'contact': 6
            };

            const index = componentMap[sectionId];
            if (index !== undefined && components[index]) {
                element = components[index] as HTMLElement;
            }
        }

        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
            console.warn(`Section with ID "${sectionId}" not found`);
        }

        setIsOpen(false); // Close mobile menu after clicking
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <motion.div
                            className="text-2xl font-bold text-primary-600 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => scrollToSection('hero')}
                        >
                            Debojit's Portfolio
                        </motion.div>

                        {/* Desktop Navigation Items */}
                        <div className="hidden md:flex space-x-8">
                            {navigationItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === item.id
                                            ? 'text-primary-600'
                                            : 'text-gray-600 hover:text-primary-600'
                                    }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                                            layoutId="activeSection"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-600 hover:text-primary-600 focus:outline-none focus:text-primary-600 p-2"
                                whileTap={{ scale: 0.95 }}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigationItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                                                activeSection === item.id
                                                    ? 'text-primary-600 bg-primary-50'
                                                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                                            }`}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <IconComponent size={20} className="mr-3" />
                                            {item.label}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Spacer to prevent content from hiding behind fixed nav */}
            <div className="h-16"></div>
        </>
    );
};

export default Navigation;
