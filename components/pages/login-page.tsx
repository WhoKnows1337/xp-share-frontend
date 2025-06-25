"use client"

import { useEffect } from "react"

interface LoginPageProps {
  onLogin: (username: string, password: string) => void
  onNavigateToSignup: () => void
}

export default function LoginPage({ onLogin, onNavigateToSignup }: LoginPageProps) {
  useEffect(() => {
    // Redirect to main app since we handle auth in app/page.tsx now
    window.location.href = "/"
  }, [])

  return null
}
