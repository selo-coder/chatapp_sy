import { DetailedHTMLProps, HTMLAttributes } from "react"
import { motion } from "framer-motion"

type MotionTitleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & { label: string }

// The letters in the title component fade in one by one
export default function MotionTitle({ label, ...spanProps }: MotionTitleProps) {
  return (
    <span {...spanProps}>
      {label.split("").map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: i / 20,
          }}
          key={i}
        >
          {el}
        </motion.span>
      ))}
    </span>
  )
}
