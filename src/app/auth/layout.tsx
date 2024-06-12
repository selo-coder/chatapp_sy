"use client"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-dark-blue min-h-screen h-full max-w-screen w-full overflow-hidden flex flex-col md:flex-row place-content-stretch">
      <div className="bg-dark-green w-full md:w-1/2 h-24 md:h-auto flex pl-8 md:pl-0 md:justify-center items-center">
        <span className="text-[clamp(1.5rem,4cqw,4rem)]">Chatapp by Selo</span>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:items-center grow mt-16 md:mt-0">
        {children}
      </div>
    </div>
  )
}
