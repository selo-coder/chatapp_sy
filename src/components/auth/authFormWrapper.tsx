interface AuthFormWrapperProps {
  children: JSX.Element
}

export default function AuthFormWrapper({ children }: AuthFormWrapperProps) {
  return (
    <div className="w-full max-w-[18rem] xs:max-w-sm sm:max-w-md md:max-w-xs xl:max-w-md 3xl:max-w-lg">
      {children}
    </div>
  )
}
