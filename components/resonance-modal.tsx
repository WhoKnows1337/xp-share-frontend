"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ResonanceModalProps {
  open: boolean
  onSubmit: (value: number, note?: string) => void
  onClose: () => void
}

export default function ResonanceModal({ open, onSubmit, onClose }: ResonanceModalProps) {
  const [value, setValue] = useState(50)
  const [note, setNote] = useState("")

  const handleSubmit = () => {
    onSubmit(value, note)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Resonanz bewerten</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Wie sehr kannst du dich mit dieser Erfahrung identifizieren?</Label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-cyan-400">{value}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">
              Notiz (optional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Teile deine Gedanken zu dieser Erfahrung..."
              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} className="bg-cyan-600 hover:bg-cyan-700">
            Bewertung abgeben
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
