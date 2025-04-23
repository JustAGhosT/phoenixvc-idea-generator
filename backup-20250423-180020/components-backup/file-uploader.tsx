"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

interface FileUploaderProps {
  accept?: string
  onFileUpload: (file: File) => void
}

export function FileUploader({ accept, onFileUpload }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      onFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      onFileUpload(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={`border-2 border-dashed rounded-md p-4 text-center ${
          selectedFile ? "border-primary" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <File className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleRemoveFile}>
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept={accept}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>{" "}
              or drag and drop
            </div>
            <p className="text-xs text-muted-foreground">
              {accept ? `Supported formats: ${accept}` : "Any file format"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
