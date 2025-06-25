"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, FileText } from "lucide-react"

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

interface WizardStepContentProps {
  data: XPFormData
  updateData: (updates: Partial<XPFormData>) => void
}

export default function WizardStepContent({ data, updateData }: WizardStepContentProps) {
  const writingTips = [
    "Beschreibe deine Gefühle und Gedanken während des Erlebnisses",
    "Erkläre den Kontext: Wo und wann ist es passiert?",
    "Was hat dich an dieser Erfahrung überrascht oder verändert?",
    "Welche Lehren oder Erkenntnisse hast du daraus gezogen?",
    "Verwende lebendige Details, um die Szene zu beschreiben",
  ]

  return (
    <div className="space-y-6">
      {/* Writing Tips */}
      <Card className="bg-zinc-800 border-zinc-600">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Schreibtipps</span>
          </div>
          <ul className="space-y-1 text-sm text-zinc-300">
            {writingTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Content Editor */}
      <div className="space-y-2">
        <Label htmlFor="content" className="text-sm font-medium text-zinc-200 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Ausführliche Beschreibung *
        </Label>
        <Textarea
          id="content"
          value={data.content}
          onChange={(e) => updateData({ content: e.target.value })}
          placeholder="Erzähle deine Geschichte ausführlich... 

Beschreibe:
- Was genau ist passiert?
- Wie hast du dich gefühlt?
- Was war besonders oder unerwartet?
- Welche Auswirkungen hatte es auf dich?

Du kannst auch Absätze verwenden, um deine Geschichte zu strukturieren."
          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 min-h-[400px] resize-y"
          rows={20}
        />
        <div className="flex justify-between text-xs text-zinc-500">
          <span>
            {data.content.length < 50 ? (
              <span className="text-amber-400">Mindestens 50 Zeichen erforderlich</span>
            ) : (
              "Teile deine Geschichte so detailliert wie möglich"
            )}
          </span>
          <span>{data.content.length} Zeichen</span>
        </div>
      </div>

      {/* Preview */}
      {data.content.length > 0 && (
        <Card className="bg-zinc-800 border-zinc-600">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-white mb-3">Vorschau</h4>
            <div className="prose prose-invert prose-sm max-w-none">
              {data.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-zinc-300 leading-relaxed mb-3 last:mb-0">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
