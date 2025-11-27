'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'

// Common stop words in English
const ENGLISH_STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
  'had', 'what', 'said', 'each', 'which', 'their', 'time', 'if', 'up',
  'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would',
  'make', 'like', 'into', 'him', 'has', 'two', 'more', 'very', 'after',
  'words', 'long', 'than', 'first', 'been', 'call', 'who', 'oil', 'sit',
  'now', 'find', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'
])

// Common stop words in French
const FRENCH_STOP_WORDS = new Set([
  'le', 'de', 'et', 'à', 'un', 'il', 'être', 'en', 'avoir',
  'que', 'pour', 'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne',
  'se', 'pas', 'tout', 'plus', 'par', 'grand',
  'mais', 'ou', 'où', 'donc', 'or', 'ni', 'car', 'du', 'des', 'les',
  'la', 'au', 'aux', 'qui', 'quoi', 'quand', 'comment', 'pourquoi',
  'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'notre', 'votre', 'leur',
  'leurs', 'me', 'te', 'nous', 'vous', 'lui', 'elle', 'eux', 'elles',
  'cette', 'ces', 'cet', 'cette', 'sont', 'était', 'étaient', 'sera',
  'seront', 'sans', 'sous', 'vers', 'chez', 'entre', 'parmi', 'durant',
  'depuis', 'jusque', 'pendant', 'malgré', 'selon', 'dès', 'jusqu'
])

const STOP_WORD_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'custom', label: 'Custom' },
]

const SlugForm = () => {
  const [input, setInput] = useState('')
  const [stopWordOption, setStopWordOption] = useState('none')
  const [customStopWords, setCustomStopWords] = useState('')

  const slug = useMemo(() => {
    if (!input.trim()) return ''

    let text = input

    // Remove stop words if enabled
    if (stopWordOption !== 'none') {
      let stopWordsSet: Set<string>
      
      if (stopWordOption === 'en') {
        stopWordsSet = ENGLISH_STOP_WORDS
      } else if (stopWordOption === 'fr') {
        stopWordsSet = FRENCH_STOP_WORDS
      } else if (stopWordOption === 'custom') {
        // Parse custom stop words (comma or space separated)
        const customWords = customStopWords
          .toLowerCase()
          .split(/[,\s]+/)
          .filter(word => word.length > 0)
        stopWordsSet = new Set(customWords)
      } else {
        stopWordsSet = new Set()
      }

      // Split text into words and filter out stop words
      const words = text
        .toLowerCase()
        .split(/\s+/)
        .filter(word => {
          // Remove punctuation from word for comparison
          const cleanWord = word.replace(/[^\w\s-]/g, '')
          return cleanWord.length > 0 && !stopWordsSet.has(cleanWord)
        })
      
      text = words.join(' ')
    }

    // Generate slug: lowercase, remove special chars, replace spaces with hyphens
    return text
      .toLowerCase()
      .trim()
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Remove all special characters except hyphens
      .replace(/[^\w\s-]/g, '')
      // Replace multiple consecutive hyphens with a single hyphen
      .replace(/-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
  }, [input, stopWordOption, customStopWords])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="input">Text to convert</Label>
        <Textarea
          id="input"
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="stop-words">Remove stop words</Label>
        <Select
          value={stopWordOption}
          onValueChange={setStopWordOption}
        >
          <SelectTrigger id="stop-words">
            <SelectValue placeholder="Select stop words option">
              {STOP_WORD_OPTIONS.find((opt) => opt.value === stopWordOption)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STOP_WORD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {stopWordOption === 'custom' && (
        <div className="grid gap-2">
          <Label htmlFor="custom-stop-words">Custom stop words (comma or space separated)</Label>
          <Input
            id="custom-stop-words"
            placeholder="the, a, an, and, or..."
            value={customStopWords}
            onChange={(e) => setCustomStopWords(e.target.value)}
          />
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="result">Slug</Label>
        <Textarea
          id="result"
          placeholder="Generated slug will appear here..."
          readOnly
          value={slug}
        />
      </div>

      <ButtonCopy text={slug} />
    </div>
  )
}

export default SlugForm

