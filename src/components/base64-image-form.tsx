'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const Base64ImageForm = () => {
  const [base64, setBase64] = useState('')
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setBase64('')
      setFileName('')
      return
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setBase64(result)
    }
    reader.onerror = () => {
      alert('Error reading file')
      setBase64('')
      setFileName('')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="image-upload">Upload Image</Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="text-sm text-muted-foreground">File: {fileName}</p>
        )}
      </div>
      <Textarea
        placeholder="Base64 encoded image will appear here..."
        readOnly
        value={base64}
        rows={8}
      />
      <ButtonCopy text={base64} />
    </div>
  )
}

export default Base64ImageForm

