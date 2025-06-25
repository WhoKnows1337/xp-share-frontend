"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WizardStepBasicInfoProps {
  title: string
  date: string
  location: string
  onTitleChange: (value: string) => void
  onDateChange: (value: string) => void
  onLocationChange: (value: string) => void
  onNext: () => void
}

export default function WizardStepBasicInfo({
  title,
  date,
  location,
  onTitleChange,
  onDateChange,
  onLocationChange,
  onNext,
}: WizardStepBasicInfoProps) {
  return (
    <div className="space-y-6" data-motion>
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-zinc-200">
          Titel der Erfahrung
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Beschreibe deine Erfahrung in wenigen Worten..."
          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date" className="text-sm font-medium text-zinc-200">
          Datum
        </Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-zinc-800 border-zinc-600 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-medium text-zinc-200">
          Ort
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Wo hat diese Erfahrung stattgefunden?"
          className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} className="bg-cyan-600 hover:bg-cyan-700 text-white" disabled={!title || !date}>
          Weiter
        </Button>
      </div>
    </div>
  )
}
