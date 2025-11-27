'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const JwtViewer = () => {
  const [input, setInput] = useState(DEFAULT_JWT)
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const base64UrlDecode = (str: string): string => {
    // Replace URL-safe characters with standard base64 characters
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '='
    }
    
    try {
      // Decode base64
      const decoded = atob(base64)
      return decoded
    } catch (e) {
      throw new Error('Invalid base64 encoding')
    }
  }

  const formatJson = (jsonString: string): string => {
    try {
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed, null, 2)
    } catch (e) {
      return jsonString
    }
  }

  const decodeJwt = (value: string) => {
    if (!value.trim()) {
      setHeader('')
      setPayload('')
      setError('')
      return
    }

    try {
      // Split JWT into parts
      const parts = value.trim().split('.')
      
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.')
      }

      // Decode header
      const headerDecoded = base64UrlDecode(parts[0])
      const headerFormatted = formatJson(headerDecoded)
      setHeader(headerFormatted)

      // Decode payload
      const payloadDecoded = base64UrlDecode(parts[1])
      const payloadFormatted = formatJson(payloadDecoded)
      setPayload(payloadFormatted)

      setError('')
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid JWT token'
      setError(errorMessage)
      setHeader('')
      setPayload('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    decodeJwt(value)
  }

  // Decode default JWT on mount
  useEffect(() => {
    decodeJwt(DEFAULT_JWT)
  }, [])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="jwt-input">JWT Token</Label>
        <Textarea
          id="jwt-input"
          placeholder="Paste your JWT token here..."
          value={input}
          onChange={handleChange}
          rows={4}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {header && (
        <div className="grid gap-2">
          <Label htmlFor="jwt-header">Header</Label>
          <Textarea
            id="jwt-header"
            readOnly
            value={header}
            rows={6}
            className="font-mono text-sm"
          />
          <ButtonCopy text={header} />
        </div>
      )}

      {payload && (
        <div className="grid gap-2">
          <Label htmlFor="jwt-payload">Payload</Label>
          <Textarea
            id="jwt-payload"
            readOnly
            value={payload}
            rows={12}
            className="font-mono text-sm"
          />
          <ButtonCopy text={payload} />
        </div>
      )}
    </div>
  )
}

export default JwtViewer

