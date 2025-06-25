"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon, Video, Music, File } from "lucide-react"

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

interface WizardStepMediaProps {
  data: XPFormData
  updateData: (updates: Partial<XPFormData>) => void
}

export default function WizardStepMedia({ data, updateData }: WizardStepMediaProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Datei "${file.name}" ist zu groß. Maximum: 10MB`)
        return false
      }

      // Check file type
      const allowedTypes = ["image/", "video/", "audio/"]
      if (!allowedTypes.some((type) => file.type.startsWith(type))) {
        alert(`Dateityp "${file.type}" wird nicht unterstützt`)
        return false
      }

      return true
    })

    updateData({ mediaFiles: [...data.mediaFiles, ...newFiles] })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    const newFiles = data.mediaFiles.filter((_, i) => i !== index)
    updateData({ mediaFiles: newFiles })
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (file.type.startsWith("video/")) return <Video className="w-4 h-4" />
    if (file.type.startsWith("audio/")) return <Music className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Info */}
      <Card className="bg-zinc-800 border-zinc-600">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-cyan-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Medien hinzufügen (optional)</h4>
              <p className="text-xs text-zinc-400">
                Bilder, Videos oder Audioaufnahmen können deine Erfahrung lebendiger machen. Unterstützte Formate: JPG,
                PNG, GIF, MP4, MOV, MP3, WAV. Maximale Dateigröße: 10MB pro Datei.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? "border-cyan-500 bg-cyan-500/10" : "border-zinc-600 hover:border-zinc-500 hover:bg-zinc-800/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Dateien hierher ziehen</h3>
        <p className="text-sm text-zinc-400 mb-4">oder klicke zum Auswählen</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
        >
          Dateien auswählen
        </Button>
      </div>

      {/* File List */}
      {data.mediaFiles.length > 0 && (
        <Card className="bg-zinc-800 border-zinc-600">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-white mb-3 block">
              Hochgeladene Dateien ({data.mediaFiles.length})
            </Label>
            <div className="space-y-3">
              {data.mediaFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="text-zinc-400">{getFileIcon(file)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-zinc-400">
                        {formatFileSize(file.size)} • {file.type}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-zinc-400 hover:text-red-400 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Preview */}
      {data.mediaFiles.some((file) => file.type.startsWith("image/")) && (
        <Card className="bg-zinc-800 border-zinc-600">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-white mb-3 block">Bildvorschau</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.mediaFiles
                .filter((file) => file.type.startsWith("image/"))
                .slice(0, 6)
                .map((file, index) => (
                  <div key={index} className="aspect-square bg-zinc-900 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
