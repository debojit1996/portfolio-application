import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { portfolioService } from '../services/portfolioService'
import { ContactFormData } from '../types/portfolio'

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'devchakraborty9914@gmail.com',
            href: 'mailto:devchakraborty9914@gmail.com',
            description: 'Send me an email'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91-9706712621',
            href: 'tel:+919706712621',
            description: 'Call me directly'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Dibrugarh, Assam, India',
            href: '#',
            description: 'Where I\'m based'
        }
    ]

    const socialLinks = [
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/debojit1996',
            username: '@debojit1996'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/debojit-chakraborty-5b309a132',
            username: 'debojit-chakraborty'
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('error')
            setErrorMessage('Please fill in all required fields')
            return
        }

        if (!isValidEmail(formData.email)) {
            setStatus('error')
            setErrorMessage('Please enter a valid email address')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try {
            await portfolioService.submitContactMessage({
                name: formData.name.trim(),
                email: formData.email.trim(),
                subject: formData.subject.trim() || 'Contact from Portfolio',
                message: formData.message.trim()
            })

            setStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })

            // Reset success state after 5 seconds
            setTimeout(() => {
                setStatus('idle')
            }, 5000)

        } catch (error) {
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
        }
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

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
                        Get In Touch
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        I'm always interested in hearing about new opportunities and exciting projects.
                        Let's connect and discuss how we can work together!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Let's Talk</h3>
                            <p className="text-gray-600 mb-8">
                                I'm currently open to new opportunities and interesting projects.
                                Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            className="flex items-start gap-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                                                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                                {item.href !== '#' ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-700 font-medium">{item.value}</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">Connect with me</h4>
                                <div className="flex gap-4">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon
                                        return (
                                            <motion.a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <div className="text-sm">
                                                    <div className="font-medium">{social.label}</div>
                                                    <div className="text-gray-500 group-hover:text-primary-500">
                                                        {social.username}
                                                    </div>
                                                </div>
                                            </motion.a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Message</h3>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <motion.div
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <p className="text-green-700">Message sent successfully! I'll get back to you soon.</p>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <p className="text-red-700">{errorMessage}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={status === 'loading'}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={status === 'loading'}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        disabled={status === 'loading'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
                                        placeholder="What's this about? (Optional)"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        disabled={status === 'loading'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical disabled:bg-gray-50"
                                        placeholder="Tell me about your project or just say hello..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="mt-16 text-center bg-primary-600 rounded-xl p-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-semibold mb-4">Ready to start a project?</h3>
                    <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                        I'm available for freelance work and full-time opportunities.
                        Let's discuss your next project and create something amazing together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:devchakraborty9914@gmail.com"
                            className="px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Email Me
                        </a>
                        <a
                            href="/Debojit_Chakraborty_Resume.pdf"  // Update this path
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                        >
                            View Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
