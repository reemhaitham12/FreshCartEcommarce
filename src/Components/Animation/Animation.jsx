import { motion } from 'framer-motion'
import React from 'react'

export default function Animation({ children }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} >
                {children}
            </motion.div>
        </>
    )
}
