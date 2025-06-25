"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Save } from "lucide-react"
import WizardStepTitle from "./wizard-step-title"
import WizardStepContent from "./wizard-step-content"
import WizardStepMedia from "./wizard-step-media"
import WizardStepVisibility from "./wizard-step-visibility"
import WizardSuccess from "./wizard-success"

interface XPFormData {
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
  mediaFiles: File[]
  visibility: "public" | "community" | "private"
  allowComments: boolean
  license: string
}

interface WizardFlowProps {
  onComplete: (data: XPFormData) => void
  onCancel: () => void
}

const WIZARD_STEPS = [
  { id: 1, title: "Titel & Beschreibung", description: "Grundinformationen zu deiner Erfahrung" },
  { id: 2, title: "Inhalt & Details", description: "Ausführliche Beschreibung deines Erlebnisses" },
  { id: 3, title: "Medien", description: "Bilder, Videos oder Audio hinzufügen (optional)" },
  { id: 4, title: "Sichtbarkeit", description: "Privatsphäre-Einstellungen und Veröffentlichung" },
]

export default function WizardFlow({ onComplete, onCancel }: WizardFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [formData, setFormData] = useState<XPFormData>({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: [],
    mediaFiles: [],
    visibility: "public",
    allowComments: true,
    license: "cc-by-sa",
  })

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (formData.title || formData.summary || formData.content) {
        localStorage.setItem("xpDraft", JSON.stringify(formData))
        setLastSaved(new Date())
      }
    }, 2000) // Save 2 seconds after last change

    return () => clearTimeout(saveTimer)
  }, [formData])

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("xpDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setFormData(parsedDraft)
        setLastSaved(new Date())
      } catch (error) {
        console.error("Failed to load draft:", error)
      }
    }
  }, [])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formData.title || formData.summary || formData.content) {
        e.preventDefault()
        e.returnValue = "Du hast ungespeicherte Änderungen. Möchtest du die Seite wirklich verlassen?"
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [formData])

  const updateFormData = (updates: Partial<XPFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.title.trim().length > 0 && formData.summary.trim().length > 0
      case 2:
        return formData.content.trim().length > 50 // Minimum content length
      case 3:
        return true // Media is optional
      case 4:
        return true // All fields have defaults
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceedFromStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, WIZARD_STEPS.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    try {
      // TODO: Submit to API
      console.log("Submitting XP:", formData)

      // Clear draft after successful submission
      localStorage.removeItem("xpDraft")

      setIsCompleted(true)

      // Complete after showing success screen
      setTimeout(() => {
        onComplete(formData)
      }, 3000)
    } catch (error) {
      console.error("Failed to submit XP:", error)
    }
  }

  const handleCancel = () => {
    const hasContent = formData.title || formData.summary || formData.content
    if (hasContent) {
      const confirmed = window.confirm("Du hast ungespeicherte Änderungen. Möchtest du den Wizard wirklich verlassen?")
      if (!confirmed) return
    }

    localStorage.removeItem("xpDraft")
    onCancel()
  }

  const progress = (currentStep / WIZARD_STEPS.length) * 100

  if (isCompleted) {
    return <WizardSuccess onContinue={() => onComplete(formData)} />
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <WizardStepTitle data={formData} updateData={updateFormData} />
      case 2:
        return <WizardStepContent data={formData} updateData={updateFormData} />
      case 3:
        return <WizardStepMedia data={formData} updateData={updateFormData} />
      case 4:
        return <WizardStepVisibility data={formData} updateData={updateFormData} />
      default:
        return null
    }
  }

  const currentStepInfo = WIZARD_STEPS[currentStep - 1]

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Neue Erfahrung erstellen</h1>
          <p className="text-zinc-400">Teile deine außergewöhnliche Erfahrung mit der Community</p>
        </div>

        {/* Progress Section */}
        <Card className="bg-zinc-900 border-zinc-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Schritt {currentStep} von {WIZARD_STEPS.length}
                </h2>
                <p className="text-sm text-zinc-400">{currentStepInfo.title}</p>
              </div>
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                {Math.round(progress)}% abgeschlossen
              </Badge>
            </div>

            <Progress value={progress} className="h-2 mb-4" />

            {/* Step Indicators */}
            <div className="flex justify-between">
              {WIZARD_STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step.id < currentStep
                        ? "bg-green-600 text-white"
                        : step.id === currentStep
                          ? "bg-cyan-600 text-white"
                          : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <span className="text-xs text-zinc-400 mt-1 text-center max-w-20">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Auto-save indicator */}
            {lastSaved && (
              <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500">
                <Save className="w-3 h-3" />
                <span>Entwurf gespeichert um {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="bg-zinc-900 border-zinc-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {currentStepInfo.title}
              {!canProceedFromStep(currentStep) && currentStep < WIZARD_STEPS.length && (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
            </CardTitle>
            <p className="text-zinc-400 text-sm">{currentStepInfo.description}</p>
          </CardHeader>
          <CardContent className="p-6">{renderCurrentStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleCancel} className="text-zinc-400 hover:text-white">
              Abbrechen
            </Button>
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} className="border-zinc-600 text-zinc-300">
                Zurück
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep < WIZARD_STEPS.length ? (
              <Button
                onClick={nextStep}
                disabled={!canProceedFromStep(currentStep)}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700 disabled:text-zinc-500"
              >
                Weiter
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceedFromStep(currentStep)}
                className="bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 disabled:text-zinc-500"
              >
                Erfahrung veröffentlichen
              </Button>
            )}
          </div>
        </div>

        {/* Validation Messages */}
        {!canProceedFromStep(currentStep) && (
          <Card className="bg-amber-900/20 border-amber-700 mt-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  {currentStep === 1 && "Bitte fülle Titel und Kurzbeschreibung aus."}
                  {currentStep === 2 && "Bitte schreibe mindestens 50 Zeichen für den Inhalt."}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
