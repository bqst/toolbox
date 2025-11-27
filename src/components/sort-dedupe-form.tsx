'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useMemo } from 'react'

type SortOrder = 'asc' | 'desc'

const SortDedupeForm = () => {
  const [input, setInput] = useState('alpha, beta, gamma, alpha')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [dedupe, setDedupe] = useState(false)

  const result = useMemo(() => {
    if (!input.trim()) return ''

    // Split by comma and trim each item
    const items = input
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)

    // Dedupe if enabled
    const uniqueItems = dedupe ? Array.from(new Set(items)) : items

    // Sort based on order
    const sortedItems = [...uniqueItems].sort((a, b) => {
      const comparison = a.localeCompare(b, undefined, { sensitivity: 'base' })
      return sortOrder === 'asc' ? comparison : -comparison
    })

    // Join back with newlines
    return sortedItems.join('\n')
  }, [input, sortOrder, dedupe])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="input">Comma-separated values</Label>
        <Textarea
          id="input"
          placeholder="Enter values separated by commas (e.g., apple, banana, apple, cherry)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="sort-order">Sort Order</Label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as SortOrder)}
          >
            <SelectTrigger id="sort-order">
              <SelectValue>
                {sortOrder === 'asc' ? 'A-Z (Ascending)' : 'Z-A (Descending)'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A-Z (Ascending)</SelectItem>
              <SelectItem value="desc">Z-A (Descending)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Checkbox
            id="dedupe"
            checked={dedupe}
            onCheckedChange={(checked) => setDedupe(checked === true)}
          />
          <Label
            htmlFor="dedupe"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Remove duplicates
          </Label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="result">Result</Label>
        <Textarea
          id="result"
          placeholder="Sorted and deduplicated values will appear here..."
          readOnly
          value={result}
          rows={6}
        />
      </div>

      <ButtonCopy text={result} />
    </div>
  )
}

export default SortDedupeForm

