import { HTMLMotionProps, motion } from "framer-motion"
import React from "react"

type FadeInDivProps = HTMLMotionProps<"div"> & { children: React.ReactNode }

export function FadeInDiv({ children, ...divProps }: FadeInDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      {...divProps}
    >
      {children}
    </motion.div>
  )
}

type FadeInFormProps = HTMLMotionProps<"form"> & { children: React.ReactNode }

export function FadeInForm({ children, ...formProps }: FadeInFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      {...formProps}
    >
      {children}
    </motion.form>
  )
}
