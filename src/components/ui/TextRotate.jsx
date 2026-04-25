import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function TextRotate({ words, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`inline-block ${className}`}
      >
        {words[index].split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, type: 'spring', stiffness: 300, damping: 20 }}
            className="inline-block"
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
}
