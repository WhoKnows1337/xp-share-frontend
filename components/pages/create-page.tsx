"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import WizardStepBasicInfo from "@/components/wizard-step-basic-info"
import EmotionWheelStep from "@/components/emotion-wheel-step"
import { CheckCircle } from "lucide-react"
import WizardFlow from "@/components/wizard/wizard-flow"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  level: string
  xpCount: number
  isLoggedIn: boolean
}

interface CreatePageProps {
  user: User
  onComplete: () => void
}

interface XPData {
  title: string
  date: string
  location: string
  emotions: string[]
  description: string
}

export default function CreatePage({ user, onComplete }: CreatePageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [xpData, setXPData] = useState<XPData>({
    title: "",
    date: "",
    location: "",
    emotions: [],
    description: "",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // TODO: Save XP data to backend
    console.log("XP Data:", xpData)
    onComplete()
  }

  const handleWizardComplete = (data: any) => {
    console.log("XP Created:", data)
    onComplete()
  }

  const handleWizardCancel = () => {
    onComplete()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStepBasicInfo
            title={xpData.title}
            date={xpData.date}
            location={xpData.location}
            onTitleChange={(title) => setXPData({ ...xpData, title })}
            onDateChange={(date) => setXPData({ ...xpData, date })}
            onLocationChange={(location) => setXPData({ ...xpData, location })}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <EmotionWheelStep
            selectedEmotions={xpData.emotions}
            onChange={(emotions) => setXPData({ ...xpData, emotions })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Erfahrung bereit zum Teilen!</h3>
              <p className="text-zinc-400">Deine Erfahrung wurde erfolgreich erstellt und kann jetzt geteilt werden.</p>
            </div>

            <Card className="bg-zinc-800 border-zinc-600">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-2">Zusammenfassung:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-zinc-400">Titel:</span>
                    <span className="text-white ml-2">{xpData.title}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Datum:</span>
                    <span className="text-white ml-2">{xpData.date}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Ort:</span>
                    <span className="text-white ml-2">{xpData.location}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Emotionen:</span>
                    <span className="text-white ml-2">{xpData.emotions.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="border-zinc-600 text-zinc-300">
                Zurück
              </Button>
              <Button onClick={handleComplete} className="bg-cyan-600 hover:bg-cyan-700">
                Erfahrung teilen
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Neue Erfahrung teilen</h1>
          <p className="text-zinc-400">Teile deine außergewöhnliche Erfahrung mit der Community</p>
        </div>

        {/* Progress */}
        <Card className="bg-zinc-900 border-zinc-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-300">
                Schritt {currentStep} von {totalSteps}
              </span>
              <span className="text-sm text-zinc-400">{Math.round(progress)}% abgeschlossen</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-zinc-500">
              <span className={currentStep >= 1 ? "text-cyan-400" : ""}>Grunddaten</span>
              <span className={currentStep >= 2 ? "text-cyan-400" : ""}>Emotionen</span>
              <span className={currentStep >= 3 ? "text-cyan-400" : ""}>Fertigstellung</span>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">
              {currentStep === 1 && "Grundinformationen"}
              {currentStep === 2 && "Emotionen auswählen"}
              {currentStep === 3 && "Fertigstellung"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {currentStep === 1 || currentStep === 2 || currentStep === 3 ? (
              renderStep()
            ) : (
              <WizardFlow onComplete={handleWizardComplete} onCancel={handleWizardCancel} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
