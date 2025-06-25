"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface XPSearchAgentModalProps {
  open: boolean
  onSave: (name: string, description: string) => void
  onClose: () => void
}

export default function XPSearchAgentModal({ open, onSave, onClose }: XPSearchAgentModalProps) {
  const [agentName, setAgentName] = useState("")
  const [description, setDescription] = useState("")

  const handleSave = () => {
    if (agentName.trim()) {
      onSave(agentName.trim(), description.trim())
      setAgentName("")
      setDescription("")
      onClose()
    }
  }

  const handleClose = () => {
    setAgentName("")
    setDescription("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">XP-Agent speichern</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="agent-name" className="text-sm font-medium text-zinc-200">
              Agent-Name
            </Label>
            <Input
              id="agent-name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="z.B. Reise-Transformationen"
              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-zinc-200">
              Beschreibung
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibe, welche Art von Erfahrungen dieser Agent für dich finden soll..."
              className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
              rows={3}
            />
          </div>

          <div className="text-sm text-zinc-400 bg-zinc-800 p-3 rounded">
            <p className="font-medium mb-1">💡 Tipp:</p>
            <p>
              Dein XP-Agent wird automatisch nach neuen Erfahrungen suchen, die deinen aktuellen Filterkriterien
              entsprechen, und dich benachrichtigen.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700" disabled={!agentName.trim()}>
            Agent speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
