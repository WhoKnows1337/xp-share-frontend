"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EmotionWheelStepProps {
  selectedEmotions: string[]
  onChange: (emotions: string[]) => void
  onNext: () => void
  onBack: () => void
}

const parentEmotions = [
  { name: "Freude", children: ["Glück", "Begeisterung", "Zufriedenheit", "Euphorie"] },
  { name: "Trauer", children: ["Melancholie", "Verzweiflung", "Enttäuschung", "Verlust"] },
  { name: "Angst", children: ["Sorge", "Panik", "Nervosität", "Unsicherheit"] },
  { name: "Wut", children: ["Ärger", "Frustration", "Empörung", "Irritation"] },
  { name: "Überraschung", children: ["Erstaunen", "Verwirrung", "Schock", "Verwunderung"] },
  { name: "Ekel", children: ["Abscheu", "Widerwillen", "Verachtung", "Ablehnung"] },
]

export default function EmotionWheelStep({ selectedEmotions, onChange, onNext, onBack }: EmotionWheelStepProps) {
  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      onChange(selectedEmotions.filter((e) => e !== emotion))
    } else {
      onChange([...selectedEmotions, emotion])
    }
  }

  return (
    <div className="space-y-6" data-motion>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Welche Emotionen hast du erlebt?</h3>
        <p className="text-sm text-zinc-400">Wähle alle zutreffenden Emotionen aus</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {parentEmotions.map((parent) => (
          <div key={parent.name} className="space-y-2">
            <Button
              variant={selectedEmotions.includes(parent.name) ? "default" : "outline"}
              className={`w-full ${
                selectedEmotions.includes(parent.name)
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              }`}
              onClick={() => toggleEmotion(parent.name)}
            >
              {parent.name}
            </Button>

            <div className="flex flex-wrap gap-1">
              {parent.children.map((child) => (
                <Badge
                  key={child}
                  variant={selectedEmotions.includes(child) ? "default" : "secondary"}
                  className={`cursor-pointer text-xs ${
                    selectedEmotions.includes(child)
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
                  }`}
                  onClick={() => toggleEmotion(child)}
                >
                  {child}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="border-zinc-600 text-zinc-300">
          Zurück
        </Button>
        <Button
          onClick={onNext}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          disabled={selectedEmotions.length === 0}
        >
          Weiter
        </Button>
      </div>
    </div>
  )
}
