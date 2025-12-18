'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ExternalLink } from 'lucide-react'

type OpenMode = 'new-tab' | 'new-window' | 'reuse-tab'

const BulkUrlOpener = () => {
  const [urls, setUrls] = useState('')
  const [openMode, setOpenMode] = useState<OpenMode>('new-tab')
  const [delay, setDelay] = useState(500)
  const [isOpening, setIsOpening] = useState(false)

  const parsedUrls = urls
    .split('\n')
    .map((url) => url.trim())
    .filter((url) => url.length > 0)

  const urlCount = parsedUrls.length

  const normalizeUrl = (url: string): string => {
    // Add protocol if missing
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`
    }
    return url
  }

  const openUrls = useCallback(async () => {
    if (urlCount === 0 || isOpening) return

    setIsOpening(true)

    let windowRef: Window | null = null

    for (let i = 0; i < parsedUrls.length; i++) {
      const url = normalizeUrl(parsedUrls[i])

      try {
        switch (openMode) {
          case 'new-tab':
            window.open(url, '_blank')
            break
          case 'new-window':
            window.open(url, '_blank', 'noopener,noreferrer,width=1024,height=768')
            break
          case 'reuse-tab':
            if (!windowRef || windowRef.closed) {
              windowRef = window.open(url, 'bulk-url-opener')
            } else {
              windowRef.location.href = url
              windowRef.focus()
            }
            break
        }
      } catch (error) {
        console.error(`Failed to open URL: ${url}`, error)
      }

      // Add delay between URLs (except for the last one)
      if (i < parsedUrls.length - 1 && delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    setIsOpening(false)
  }, [parsedUrls, urlCount, openMode, delay, isOpening])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="urls-input">Enter URLs (one per line)</Label>
        <Textarea
          id="urls-input"
          placeholder={`https://example.com\nhttps://google.com\ngithub.com`}
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={5}
          className="font-mono text-sm"
        />
      </div>

      <Button
        onClick={openUrls}
        disabled={urlCount === 0 || isOpening}
        className="w-full"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        {isOpening
          ? 'Opening...'
          : `Open ${urlCount} URL${urlCount !== 1 ? 's' : ''}`}
      </Button>

      <div className="grid gap-3">
        <Label>How would you like to open the URLs?</Label>

        <RadioGroup
          value={openMode}
          onValueChange={(value) => setOpenMode(value as OpenMode)}
          className="grid gap-2"
        >
          <div className="flex items-center space-x-3 rounded-lg border border-input p-3">
            <RadioGroupItem value="new-tab" id="new-tab" />
            <Label htmlFor="new-tab" className="cursor-pointer font-medium">
              New Tab
            </Label>
          </div>

          <div className="flex items-center space-x-3 rounded-lg border border-input p-3">
            <RadioGroupItem value="new-window" id="new-window" />
            <Label htmlFor="new-window" className="cursor-pointer font-medium">
              New Window
            </Label>
          </div>

          <div className="flex flex-col gap-1 rounded-lg border border-input p-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="reuse-tab" id="reuse-tab" />
              <Label htmlFor="reuse-tab" className="cursor-pointer font-medium">
                Reuse same tab
              </Label>
            </div>
            <p className="text-xs text-muted-foreground ml-7">
              Open each URL in the same tab instead of creating multiple
            </p>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="delay">Delay between URLs</Label>
          <span className="w-16 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {delay} ms
          </span>
        </div>
        <Slider
          id="delay"
          min={0}
          max={2000}
          step={100}
          value={[delay]}
          onValueChange={(value) => setDelay(value[0])}
        />
        <p className="text-xs text-muted-foreground">
          Spread out requests to avoid popup blocking or rate limits.
        </p>
      </div>
    </div>
  )
}

export default BulkUrlOpener
