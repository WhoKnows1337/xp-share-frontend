"use client"

import { useEffect } from "react"

interface SignupPageProps {
  onSignup: (name: string, username: string, email: string, password: string) => void
  onNavigateToLogin: () => void
}

export default function SignupPage({ onSignup, onNavigateToLogin }: SignupPageProps) {
  useEffect(() => {
    // Redirect to main app since we handle auth in app/page.tsx now
    window.location.href = "/"
  }, [])

  return null
}
