"use client"

import { twMerge } from "tailwind-merge"

type CheckboxProps = { className?: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export default function Checkbox({
  className,
  checked,
  ...checkboxProps
}: CheckboxProps) {
  return (
    <div className="flex flex-row gap-6">
      <div className="relative">
        <input
          {...checkboxProps}
          className={twMerge(
            "w-4 h-4 absolute top-1 z-10 bg-transparent cursor-pointer rounded-sm border hover:border-gray-300 border-gray-500 appearance-none",
            className
          )}
          type="checkbox"
          checked={checked}
        />
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 absolute top-1 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        )}
      </div>
      <span className="text-xs mt-1 font-medium">Passwort merken?</span>
    </div>
  )
}
