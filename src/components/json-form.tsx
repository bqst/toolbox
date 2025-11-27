'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useState, useEffect, useCallback } from 'react'

type Mode = 'minify' | 'unminify'

const JsonForm = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<Mode>('minify')
  const [tabSize, setTabSize] = useState(2)
  const [error, setError] = useState('')

  const processJson = useCallback(() => {
    setError('')
    if (!input.trim()) {
      setResult('')
      return
    }

    try {
      // Parse JSON to validate it
      const parsed = JSON.parse(input)

      if (mode === 'minify') {
        // Minify: remove all whitespace
        setResult(JSON.stringify(parsed))
      } else {
        // Unminify: format with indentation
        const indent = ' '.repeat(tabSize)
        setResult(JSON.stringify(parsed, null, indent))
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid JSON'
      setError(errorMessage)
      setResult('')
    }
  }, [input, mode, tabSize])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    if (!value.trim()) {
      setResult('')
      setError('')
    }
  }

  const handleModeChange = (value: string) => {
    setMode(value as Mode)
  }

  const handleTabSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= 0 && value <= 8) {
      setTabSize(value)
    }
  }

  // Re-process when mode, tabSize, or input changes
  useEffect(() => {
    if (input.trim()) {
      processJson()
    }
  }, [input, mode, tabSize, processJson])

  return (
    <div className="grid gap-4">
      <Tabs defaultValue="minify" value={mode} onValueChange={handleModeChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="minify">Minify</TabsTrigger>
          <TabsTrigger value="unminify">Unminify</TabsTrigger>
        </TabsList>
        <TabsContent value="unminify">
          <div className="grid gap-2">
            <Label htmlFor="tab-size">Tab Size</Label>
            <Input
              id="tab-size"
              type="number"
              min="0"
              max="8"
              value={tabSize}
              onChange={handleTabSizeChange}
              className="w-full"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-2">
        <Label htmlFor="json-input">JSON Input</Label>
        <Textarea
          id="json-input"
          placeholder="Paste your JSON here..."
          value={input}
          onChange={handleInputChange}
          rows={8}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="json-output">JSON Output</Label>
        <Textarea
          id="json-output"
          placeholder="Result will appear here..."
          readOnly
          value={result}
          rows={8}
        />
      </div>

      <ButtonCopy text={result} />
    </div>
  )
}

export default JsonForm
