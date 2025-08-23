import React from 'react'
import { Heart, Github, Linkedin, Mail } from 'lucide-react'

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { name: 'GitHub', icon: Github, href: 'https://github.com/debojit1996' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/debojit-chakraborty-5b309a132' },
        { name: 'Email', icon: Mail, href: 'mailto:devchakraborty9914@gmail.com' },
    ]

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="text-2xl font-bold mb-4">Debojit.dev</div>

                    <div className="flex justify-center space-x-6 mb-8">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors p-2"
                                    aria-label={link.name}
                                >
                                    <Icon size={20} />
                                </a>
                            )
                        })}
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        <p className="text-gray-400 flex items-center justify-center gap-1">
                            © {currentYear} Debojit Chakraborty. Made with <Heart size={16} className="text-red-500" /> using React & Spring Boot
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
