'use client'

import { Button } from '@/components/ui/button'
import { ButtonCopy } from '@/components/copy-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const WEAKNESSES = ['very weak', 'weak', 'good', 'strong', 'very strong']

const scoreRandom = (secret: string): number => {
  if (!secret) return 0

  let score = 0
  const letters: { [char: string]: number } = {}

  for (const char of secret) {
    letters[char] = (letters[char] || 0) + 1
    score += 5.0 / letters[char]
  }

  const variations = {
    numbers: /\d/.test(secret),
    lowercase: /[a-z]/.test(secret),
    uppercase: /[A-Z]/.test(secret),
    specials: /\W/.test(secret),
  }

  const variationCount = Object.values(variations).filter(Boolean).length
  score += (variationCount - 1) * 10

  return Math.floor(score)
}

const weakness = (score: number): string => {
  if (score <= 40) return WEAKNESSES[0]
  if (score <= 60) return WEAKNESSES[1]
  if (score <= 80) return WEAKNESSES[2]
  if (score <= 100) return WEAKNESSES[3]
  return WEAKNESSES[4]
}

const SecretForm = () => {
  const [secret, setSecret] = useState('')
  const [length, setLength] = useState(15)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [specials, setSpecials] = useState(true)

  const score = useMemo(() => scoreRandom(secret), [secret])

  const generateSecret = useCallback(() => {
    let allowedLetters = ''
    let random = ''

    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const numbersLetters = '0123456789'
    const specialsLetters = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    if (uppercase) allowedLetters += uppercaseLetters
    if (lowercase) allowedLetters += lowercaseLetters
    if (numbers) allowedLetters += numbersLetters
    if (specials) allowedLetters += specialsLetters

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedLetters.length)
      random += allowedLetters[randomIndex]
    }

    setSecret(random)
  }, [length, uppercase, lowercase, numbers, specials])

  useEffect(() => {
    generateSecret()
  }, [generateSecret])

  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <Button onClick={generateSecret} variant="outline">
          <RefreshCcw className="w-4 h-4 mr-2" /> Generate
        </Button>
        <ButtonCopy text={secret} />
      </div>
      <div className="flex relative">
        {score !== 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    'absolute right-3 top-3.5 block h-3 w-3 rounded-full ring-2 ring-white',
                    {
                      'bg-green-400': score >= 80,
                      'bg-yellow-400': score >= 60 && score < 80,
                      'bg-red-400': score < 60,
                    }
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  {weakness(score)} (score: {score})
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Input
          type="text"
          name="secret"
          value={secret}
          readOnly
          className="pr-9"
        />
      </div>

      <div className="w-full">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="length">Length</Label>
            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
              {length}
            </span>
          </div>
          <Slider
            min={1}
            max={100}
            defaultValue={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox
            id="lowercase"
            name="lowercase"
            checked={lowercase}
            onCheckedChange={(checked) => setLowercase(checked as boolean)}
            disabled={!uppercase && !numbers && !specials}
          />
          <Label htmlFor="lowercase">Lowercase (a-z)</Label>
        </div>

        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox
            id="uppercase"
            name="uppercase"
            checked={uppercase}
            onCheckedChange={(checked) => setUppercase(checked as boolean)}
            disabled={!lowercase && !numbers && !specials}
          />
          <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
        </div>

        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox
            id="numbers"
            name="numbers"
            checked={numbers}
            onCheckedChange={(checked) => setNumbers(checked as boolean)}
            disabled={!lowercase && !uppercase && !specials}
          />
          <Label htmlFor="numbers">Numbers (0-9)</Label>
        </div>

        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox
            id="specials"
            name="specials"
            checked={specials}
            onCheckedChange={(checked) => setSpecials(checked as boolean)}
            disabled={!lowercase && !uppercase && !numbers}
          />
          <Label htmlFor="specials">Specials (symbols)</Label>
        </div>

        <div>
          <p className="text-xs">
            Scores are calculated based on the following criteria: number of
            characters, uppercase letters, lowercase letters, numbers, and
            symbols.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecretForm
