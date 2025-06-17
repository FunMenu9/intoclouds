import type React from "react"

interface CyberCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "purple" | "pink"
  interactive?: boolean
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = "",
  glowColor = "cyan",
  interactive = true,
}) => {
  const glowClasses = {
    cyan: "border-cyan-400/30 hover:border-cyan-400/50",
    purple: "border-purple-400/30 hover:border-purple-400/50",
    pink: "border-pink-400/30 hover:border-pink-400/50",
  }

  return (
    <div
      className={`bg-black/80 backdrop-blur-sm border transition-all duration-300 p-6 ${glowClasses[glowColor]} ${interactive ? "hover:shadow-lg cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
