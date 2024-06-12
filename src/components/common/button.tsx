import { twMerge } from "tailwind-merge"

type ButtonProps = {
  className?: string
  label: string
  isLoading?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export default function Button({
  className,
  label,
  isLoading,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={twMerge(
        "bg-green rounded-lg h-10 hover:bg-green/75 active:bg-green/50 text-gray-300 flex justify-center items-center font-medium w-full",
        className
      )}
      type="submit"
    >
      {!isLoading ? (
        label
      ) : (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </button>
  )
}
