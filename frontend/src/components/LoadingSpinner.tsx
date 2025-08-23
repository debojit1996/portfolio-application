import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <motion.div
                    className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.p
                    className="mt-4 text-gray-600 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Loading portfolio...
                </motion.p>
            </div>
        </div>
    )
}

export default LoadingSpinner
