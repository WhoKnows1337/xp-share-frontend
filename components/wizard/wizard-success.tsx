"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, Share2, Eye } from "lucide-react"

interface WizardSuccessProps {
  onContinue: () => void
}

export default function WizardSuccess({ onContinue }: WizardSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Card className="bg-zinc-900 border-zinc-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Erfahrung veröffentlicht! 🎉</h1>
              <p className="text-zinc-400">
                Deine außergewöhnliche Erfahrung wurde erfolgreich geteilt und ist jetzt für die Community sichtbar.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                <Eye className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">Jetzt sichtbar</div>
                  <div className="text-xs text-zinc-400">Andere können deine Erfahrung entdecken</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                <Share2 className="w-5 h-5 text-purple-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">Bereit zum Teilen</div>
                  <div className="text-xs text-zinc-400">Teile den Link mit Freunden und Familie</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={onContinue} className="w-full bg-cyan-600 hover:bg-cyan-700">
                Zum Feed zurückkehren
              </Button>
              <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                Weitere Erfahrung teilen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
