/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */

"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"
import Button, { ButtonProps } from "./button"

const ExoticButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <Button {...props} ref={ref} />
)

ExoticButton.displayName = "ExoticImage"

const MotionButton = motion(ExoticButton)

export default MotionButton
