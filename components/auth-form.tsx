"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Loader2, Sparkles, ArrowRight } from "lucide-react"

interface AuthFormProps {
  mode: "login" | "signup"
  onSubmit: (data: AuthFormData) => Promise<void>
  onModeSwitch: () => void
  isLoading?: boolean
  error?: string
}

interface AuthFormData {
  email: string
  password: string
  username?: string
  confirmPassword?: string
  acceptTerms?: boolean
}

interface ValidationErrors {
  email?: string
  password?: string
  username?: string
  confirmPassword?: string
  acceptTerms?: string
}

export default function AuthForm({ mode, onSubmit, onModeSwitch, isLoading = false, error }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const isLogin = mode === "login"
  const isSignup = mode === "signup"

  // Real-time validation
  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "email":
        if (!value) return "E-Mail ist erforderlich"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Ungültige E-Mail-Adresse"
        break
      case "password":
        if (!value) return "Passwort ist erforderlich"
        if (value.length < 8) return "Passwort muss mindestens 8 Zeichen lang sein"
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return "Passwort muss Groß-, Kleinbuchstaben und Zahlen enthalten"
        break
      case "username":
        if (isSignup && !value) return "Benutzername ist erforderlich"
        if (value && value.length < 3) return "Benutzername muss mindestens 3 Zeichen lang sein"
        if (value && !/^[a-zA-Z0-9_]+$/.test(value)) return "Nur Buchstaben, Zahlen und Unterstriche erlaubt"
        break
      case "confirmPassword":
        if (isSignup && !value) return "Passwort-Bestätigung ist erforderlich"
        if (value && value !== formData.password) return "Passwörter stimmen nicht überein"
        break
    }
    return undefined
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (typeof value === "string" && touched[field]) {
      const error = validateField(field, value)
      setValidationErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const value = formData[field as keyof AuthFormData]
    if (typeof value === "string") {
      const error = validateField(field, value)
      setValidationErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}

    errors.email = validateField("email", formData.email)
    errors.password = validateField("password", formData.password)

    if (isSignup) {
      errors.username = validateField("username", formData.username || "")
      errors.confirmPassword = validateField("confirmPassword", formData.confirmPassword || "")

      if (!formData.acceptTerms) {
        errors.acceptTerms = "Du musst die Nutzungsbedingungen akzeptieren"
      }
    }

    setValidationErrors(errors)
    return !Object.values(errors).some((error) => error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await onSubmit(formData)
    } catch (error) {
      // Error handling is done by parent component
    }
  }

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const labels = ["Sehr schwach", "Schwach", "Mittel", "Stark", "Sehr stark"]
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"]

    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || "Sehr schwach",
      color: colors[strength - 1] || "bg-red-500",
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
            <span className="text-white font-bold text-2xl">XP</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {isLogin ? "Willkommen zurück" : "Konto erstellen"}
          </h1>
          <p className="text-zinc-400">
            {isLogin ? "Melde dich an, um deine Erfahrungen zu teilen" : "Werde Teil der XP Share Community"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-700 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Auth Form */}
        <Card className="bg-zinc-900 border-zinc-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              {isLogin ? "Anmelden" : "Registrieren"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username (Signup only) */}
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-zinc-200 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Benutzername
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      onBlur={() => handleBlur("username")}
                      placeholder="deinbenutzername"
                      className={`bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pr-10 ${
                        validationErrors.username ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      disabled={isLoading}
                    />
                    {formData.username && !validationErrors.username && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {validationErrors.username && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.username}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-Mail-Adresse
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="deine@email.com"
                    className={`bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pr-10 ${
                      validationErrors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  {formData.email && !validationErrors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>
                {validationErrors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Passwort
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className={`bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pr-10 ${
                      validationErrors.password ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    disabled={isLoading}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Password Strength Indicator (Signup only) */}
                {isSignup && formData.password && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Passwortstärke:</span>
                      <span className="text-zinc-300">{passwordStrength.label}</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}

                {validationErrors.password && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password (Signup only) */}
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-zinc-200 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Passwort bestätigen
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      onBlur={() => handleBlur("confirmPassword")}
                      placeholder="••••••••"
                      className={`bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pr-10 ${
                        validationErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-zinc-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Terms Acceptance (Signup only) */}
              {isSignup && (
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                      className="border-zinc-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-zinc-300 leading-relaxed">
                      Ich akzeptiere die{" "}
                      <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto text-sm">
                        Nutzungsbedingungen
                      </Button>{" "}
                      und{" "}
                      <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto text-sm">
                        Datenschutzerklärung
                      </Button>
                    </Label>
                  </div>
                  {validationErrors.acceptTerms && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.acceptTerms}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 h-12"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isLogin ? "Anmeldung läuft..." : "Registrierung läuft..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{isLogin ? "Anmelden" : "Konto erstellen"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="text-center">
                  <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto text-sm">
                    Passwort vergessen?
                  </Button>
                </div>
              )}
            </form>

            <Separator className="my-6 bg-zinc-700" />

            {/* Mode Switch */}
            <div className="text-center">
              <p className="text-zinc-400 mb-4">{isLogin ? "Noch kein Konto?" : "Bereits registriert?"}</p>
              <Button
                variant="outline"
                onClick={onModeSwitch}
                disabled={isLoading}
                className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {isLogin ? "Jetzt registrieren" : "Jetzt anmelden"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="bg-zinc-800/50 border-zinc-600 mt-6">
          <CardContent className="p-4">
            <p className="text-zinc-400 text-sm text-center">
              <strong className="text-cyan-400">Demo-Modus:</strong> Verwende beliebige Daten für{" "}
              {isLogin ? "die Anmeldung" : "die Registrierung"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
