"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, File, X } from "lucide-react"

interface ImportDiaryUploaderProps {
  onImport: (mapping: { title: string; date: string; content: string }) => void
}

interface FilePreview {
  name: string
  size: number
  type: string
}

export default function ImportDiaryUploader({ onImport }: ImportDiaryUploaderProps) {
  const [files, setFiles] = useState<FilePreview[]>([])
  const [mapping, setMapping] = useState({
    title: "",
    date: "",
    content: "",
  })

  // TODO: Implement actual file upload logic
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    const filePreview = uploadedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }))
    setFiles(filePreview)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleImport = () => {
    // TODO: Process files with mapping
    onImport(mapping)
  }

  return (
    <div className="space-y-6" data-motion>
      <Card className="bg-zinc-900 border-zinc-700">
        <CardContent className="p-6">
          <div className="border-2 border-dashed border-zinc-600 rounded-lg p-8 text-center hover:border-zinc-500 transition-colors">
            <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Tagebuch-Dateien hochladen</h3>
            <p className="text-sm text-zinc-400 mb-4">Ziehe Dateien hierher oder klicke zum Auswählen</p>
            <input
              type="file"
              multiple
              accept=".txt,.csv,.json,.md"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" className="border-zinc-600 text-zinc-300">
              <label htmlFor="file-upload" className="cursor-pointer">
                Dateien auswählen
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-white mb-3">Hochgeladene Dateien</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-zinc-800 rounded">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm text-zinc-300">{file.name}</span>
                    <span className="text-xs text-zinc-500">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {files.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-white mb-3">Feld-Zuordnung</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Titel-Spalte</label>
                <Select value={mapping.title} onValueChange={(value) => setMapping({ ...mapping, title: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-600">
                    <SelectValue placeholder="Spalte wählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600">
                    <SelectItem value="title">Titel</SelectItem>
                    <SelectItem value="subject">Betreff</SelectItem>
                    <SelectItem value="heading">Überschrift</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Datum-Spalte</label>
                <Select value={mapping.date} onValueChange={(value) => setMapping({ ...mapping, date: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-600">
                    <SelectValue placeholder="Spalte wählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600">
                    <SelectItem value="date">Datum</SelectItem>
                    <SelectItem value="created">Erstellt</SelectItem>
                    <SelectItem value="timestamp">Zeitstempel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Inhalt-Spalte</label>
                <Select value={mapping.content} onValueChange={(value) => setMapping({ ...mapping, content: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-600">
                    <SelectValue placeholder="Spalte wählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600">
                    <SelectItem value="content">Inhalt</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="body">Körper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleImport}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                disabled={!mapping.title || !mapping.date || !mapping.content}
              >
                Importieren
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
