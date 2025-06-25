"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Lock, MessageCircle, Scale, Info } from "lucide-react"

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

interface WizardStepVisibilityProps {
  data: XPFormData
  updateData: (updates: Partial<XPFormData>) => void
}

const VISIBILITY_OPTIONS = [
  {
    value: "public",
    icon: Globe,
    title: "Öffentlich",
    description: "Jeder kann deine Erfahrung sehen und finden",
    badge: "Empfohlen",
  },
  {
    value: "community",
    icon: Users,
    title: "Nur Community",
    description: "Nur angemeldete XP Share Mitglieder können sie sehen",
    badge: null,
  },
  {
    value: "private",
    icon: Lock,
    title: "Privat",
    description: "Nur du kannst deine Erfahrung sehen",
    badge: null,
  },
]

const LICENSE_OPTIONS = [
  {
    value: "cc-by-sa",
    title: "Creative Commons BY-SA",
    description: "Andere dürfen teilen und bearbeiten mit Namensnennung",
  },
  {
    value: "cc-by",
    title: "Creative Commons BY",
    description: "Andere dürfen teilen und bearbeiten mit Namensnennung",
  },
  {
    value: "cc-by-nc",
    title: "Creative Commons BY-NC",
    description: "Nur nicht-kommerziell mit Namensnennung",
  },
  {
    value: "all-rights-reserved",
    title: "Alle Rechte vorbehalten",
    description: "Vollständiger Schutz deiner Inhalte",
  },
]

export default function WizardStepVisibility({ data, updateData }: WizardStepVisibilityProps) {
  return (
    <div className="space-y-6">
      {/* Visibility Settings */}
      <Card className="bg-zinc-800 border-zinc-600">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Sichtbarkeit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.visibility}
            onValueChange={(value: "public" | "community" | "private") => updateData({ visibility: value })}
            className="space-y-4"
          >
            {VISIBILITY_OPTIONS.map((option) => {
              const Icon = option.icon
              return (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="w-4 h-4 text-zinc-400" />
                      <span className="text-white font-medium">{option.title}</span>
                      {option.badge && <Badge className="bg-cyan-600 text-white text-xs">{option.badge}</Badge>}
                    </Label>
                    <p className="text-sm text-zinc-400 mt-1">{option.description}</p>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Comment Settings */}
      <Card className="bg-zinc-800 border-zinc-600">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Interaktionen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allow-comments" className="text-white font-medium">
                Kommentare erlauben
              </Label>
              <p className="text-sm text-zinc-400 mt-1">Andere können auf deine Erfahrung antworten und diskutieren</p>
            </div>
            <Switch
              id="allow-comments"
              checked={data.allowComments}
              onCheckedChange={(checked) => updateData({ allowComments: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* License Settings */}
      <Card className="bg-zinc-800 border-zinc-600">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Lizenz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-white font-medium">Wie sollen andere deine Inhalte nutzen dürfen?</Label>
            <Select value={data.license} onValueChange={(value) => updateData({ license: value })}>
              <SelectTrigger className="bg-zinc-900 border-zinc-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-600">
                {LICENSE_OPTIONS.map((license) => (
                  <SelectItem key={license.value} value={license.value} className="text-white hover:bg-zinc-700">
                    <div>
                      <div className="font-medium">{license.title}</div>
                      <div className="text-xs text-zinc-400">{license.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-zinc-800 border-zinc-600">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Info className="w-4 h-4" />
            Zusammenfassung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Titel:</span>
              <span className="text-white font-medium">{data.title || "Nicht angegeben"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Kategorie:</span>
              <span className="text-white">{data.category || "Nicht ausgewählt"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Tags:</span>
              <span className="text-white">{data.tags.length > 0 ? data.tags.join(", ") : "Keine"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Medien:</span>
              <span className="text-white">{data.mediaFiles.length} Datei(en)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Sichtbarkeit:</span>
              <span className="text-white">
                {VISIBILITY_OPTIONS.find((opt) => opt.value === data.visibility)?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Kommentare:</span>
              <span className="text-white">{data.allowComments ? "Erlaubt" : "Deaktiviert"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
