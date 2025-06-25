"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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

interface WizardStepTitleProps {
  data: XPFormData
  updateData: (updates: Partial<XPFormData>) => void
}

const CATEGORIES = [
  { value: "traum", label: "💭 Traum", description: "Außergewöhnliche Träume und Traumerlebnisse" },
  { value: "nahtod", label: "⚡ Nahtod", description: "Nahtoderfahrungen und spirituelle Begegnungen" },
  { value: "ufo", label: "👽 UFO", description: "Unidentifizierte Flugobjekte und Begegnungen" },
  { value: "reise", label: "🌍 Reise", description: "Transformative Reiseerlebnisse" },
  { value: "karriere", label: "💼 Karriere", description: "Berufliche Wendepunkte und Erfolge" },
  { value: "beziehung", label: "💕 Beziehung", description: "Zwischenmenschliche Erfahrungen" },
  { value: "gesundheit", label: "🏥 Gesundheit", description: "Gesundheitliche Herausforderungen und Heilung" },
  { value: "spirituell", label: "🧘 Spirituell", description: "Spirituelle und meditative Erfahrungen" },
  { value: "persönlich", label: "🌟 Persönlich", description: "Persönliche Entwicklung und Wachstum" },
]

export default function WizardStepTitle({ data, updateData }: WizardStepTitleProps) {
  const addTag = (tag: string) => {
    if (tag.trim() && !data.tags.includes(tag.trim()) && data.tags.length < 10) {
      updateData({ tags: [...data.tags, tag.trim()] })
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateData({ tags: data.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const input = e.target as HTMLInputElement
      addTag(input.value)
      input.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-zinc-200">
          Titel deiner Erfahrung *
        </Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="Gib einen kurzen, prägnanten Titel ein..."
          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
          maxLength={100}
        />
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Ein guter Titel weckt Neugier und fasst dein Erlebnis zusammen</span>
          <span>{data.title.length}/100</span>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium text-zinc-200">
          Kurzbeschreibung (TL;DR) *
        </Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => updateData({ summary: e.target.value })}
          placeholder="Fasse dein Erlebnis in 1-2 Sätzen zusammen..."
          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
          rows={3}
          maxLength={300}
        />
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Diese Zusammenfassung erscheint in der Vorschau</span>
          <span>{data.summary.length}/300</span>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-zinc-200">Kategorie *</Label>
        <Select value={data.category} onValueChange={(value) => updateData({ category: value })}>
          <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
            <SelectValue placeholder="Wähle eine passende Kategorie" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-600">
            {CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value} className="text-white hover:bg-zinc-700">
                <div>
                  <div className="font-medium">{category.label}</div>
                  <div className="text-xs text-zinc-400">{category.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-zinc-200">
          Tags (optional)
          <span className="text-xs text-zinc-400 ml-2">Drücke Enter oder Komma zum Hinzufügen</span>
        </Label>
        <Input
          placeholder="z.B. transformation, solo-reise, nepal..."
          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
          onKeyDown={handleKeyPress}
        />
        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-zinc-700 text-zinc-200 pr-1">
                #{tag}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTag(tag)}
                  className="ml-1 h-auto p-0 hover:bg-transparent hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        <div className="text-xs text-zinc-500">
          {data.tags.length}/10 Tags • Tags helfen anderen, deine Erfahrung zu finden
        </div>
      </div>
    </div>
  )
}
