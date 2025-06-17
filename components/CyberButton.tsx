"use client"

import type React from "react"

interface CyberButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  loading?: boolean
  type?: "button" | "submit" | "reset"
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "default",
  disabled = false,
  loading = false,
  type = "button",
}) => {
  const baseClasses = "font-bold tracking-wider transition-all duration-300"
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-purple-600 text-black hover:shadow-lg",
    secondary: "bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
    ghost: "bg-transparent text-cyan-400 hover:bg-cyan-400/10",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}
