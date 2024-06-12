/* eslint-disable react/require-default-props */

"use client"

import { motion, useReducedMotion } from "framer-motion"
import { RefObject, useEffect, useRef } from "react"

/**
 * Props for the Modal component
 */
interface ModalProps {
  verticalAlign?: "center" | "start"
  children: React.ReactNode
  showModal: boolean
  backgroundBlur?: boolean
  setShowModal?: (showModal: boolean) => void
  closeOnOutsideClick?: boolean
}

/**
 * Component to render given JSX children inside a Modal
 */
export default function Modal({
  children,
  showModal,
  setShowModal = () => {},
  backgroundBlur = false,
  verticalAlign,
  closeOnOutsideClick = false,
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /**
     *  handle click outside
     */
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        closeOnOutsideClick
      ) {
        setShowModal(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, closeOnOutsideClick])

  return (
    showModal && (
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -25 }}
        className={`${
          backgroundBlur && "backdrop-blur-sm backdrop-brightness-75"
        } fixed flex justify-center ${
          verticalAlign
            ? `items-${verticalAlign}`
            : "items-start xl:items-center"
        } top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 min-h-full max-h-full`}
      >
        <div ref={ref as RefObject<HTMLDivElement>}>{children}</div>
      </motion.div>
    )
  )
}
