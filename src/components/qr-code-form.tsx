'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const QRCodeForm = () => {
  const [text, setText] = useState('')
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!text || !qrRef.current) return

    const svgElement = qrRef.current.querySelector('svg')
    if (!svgElement) return

    // Convert SVG to canvas, then to blob for download
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Set canvas size with padding
      const padding = 20
      canvas.width = img.width + padding * 2
      canvas.height = img.height + padding * 2
      
      // Fill white background
      if (ctx) {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw the QR code image
        ctx.drawImage(img, padding, padding)
        
        canvas.toBlob((blob) => {
          if (!blob) return
          
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `qrcode-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }, 'image/png')
      }
    }

    // Use data URL to avoid CORS issues
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
    
    // Clean up the object URL after loading
    img.onerror = () => {
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="qr-input">Enter text or URL</Label>
        <Input
          id="qr-input"
          type="text"
          placeholder="Enter text or URL to generate QR code..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      {text && (
        <div className="flex flex-col items-center gap-4">
          <div 
            ref={qrRef}
            className="flex items-center justify-center p-4 bg-white rounded-lg border"
          >
            <QRCodeSVG value={text} size={256} />
          </div>
          <Button onClick={handleDownload} disabled={!text}>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </div>
      )}
      
      {!text && (
        <div className="flex items-center justify-center p-8 bg-muted rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">
            Enter text or URL above to generate QR code
          </p>
        </div>
      )}
    </div>
  )
}

export default QRCodeForm

