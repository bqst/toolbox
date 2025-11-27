'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useMemo } from 'react'

const CrossMultiplicationForm = () => {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [d, setD] = useState('')

  const result = useMemo(() => {
    const aNum = parseFloat(a)
    const bNum = parseFloat(b)
    const cNum = parseFloat(c)
    const dNum = parseFloat(d)

    // Count how many values are provided
    const provided = [a, b, c, d].filter((val) => val !== '').length

    // Need exactly 3 values to calculate the 4th
    if (provided !== 3) return ''

    // Calculate the missing value based on cross multiplication: a/b = c/d => a*d = b*c
    if (a === '') {
      // Solve for a: a = (b * c) / d
      if (dNum === 0) return 'Cannot divide by zero'
      const result = (bNum * cNum) / dNum
      return isNaN(result) ? '' : result.toString()
    }
    if (b === '') {
      // Solve for b: b = (a * d) / c
      if (cNum === 0) return 'Cannot divide by zero'
      const result = (aNum * dNum) / cNum
      return isNaN(result) ? '' : result.toString()
    }
    if (c === '') {
      // Solve for c: c = (a * d) / b
      if (bNum === 0) return 'Cannot divide by zero'
      const result = (aNum * dNum) / bNum
      return isNaN(result) ? '' : result.toString()
    }
    if (d === '') {
      // Solve for d: d = (b * c) / a
      if (aNum === 0) return 'Cannot divide by zero'
      const result = (bNum * cNum) / aNum
      return isNaN(result) ? '' : result.toString()
    }

    return ''
  }, [a, b, c, d])

  const handleChange = (
    field: 'a' | 'b' | 'c' | 'd',
    value: string
  ) => {
    // Allow empty string or valid number
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      switch (field) {
        case 'a':
          setA(value)
          break
        case 'b':
          setB(value)
          break
        case 'c':
          setC(value)
          break
        case 'd':
          setD(value)
          break
      }
    }
  }

  const displayResult = useMemo(() => {
    const provided = [a, b, c, d].filter((val) => val !== '').length
    if (provided < 3) return ''
    if (result === 'Cannot divide by zero') return result
    if (!result) return ''
    
    // Find which field is empty (or was calculated)
    const emptyField = a === '' ? 'a' : b === '' ? 'b' : c === '' ? 'c' : 'd'
    return `Result: ${emptyField.toUpperCase()} = ${result}`
  }, [a, b, c, d, result])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label htmlFor="a">A</Label>
            <Input
              id="a"
              type="text"
              placeholder="Enter value"
              value={a}
              onChange={(e) => handleChange('a', e.target.value)}
            />
          </div>
          <div className="pt-6 text-lg font-semibold">/</div>
          <div className="flex-1">
            <Label htmlFor="b">B</Label>
            <Input
              id="b"
              type="text"
              placeholder="Enter value"
              value={b}
              onChange={(e) => handleChange('b', e.target.value)}
            />
          </div>
        </div>
        <div className="text-center text-lg font-semibold">=</div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label htmlFor="c">C</Label>
            <Input
              id="c"
              type="text"
              placeholder="Enter value"
              value={c}
              onChange={(e) => handleChange('c', e.target.value)}
            />
          </div>
          <div className="pt-6 text-lg font-semibold">/</div>
          <div className="flex-1">
            <Label htmlFor="d">D</Label>
            <Input
              id="d"
              type="text"
              placeholder="Enter value"
              value={d}
              onChange={(e) => handleChange('d', e.target.value)}
            />
          </div>
        </div>
      </div>

      {displayResult && (
        <div className="rounded-md border p-3">
          <p className="text-sm font-medium">{displayResult}</p>
        </div>
      )}

      {result && result !== 'Cannot divide by zero' && (
        <ButtonCopy text={result} />
      )}

      <p className="text-xs text-muted-foreground">
        Enter 3 values to calculate the 4th. Uses cross multiplication: A/B = C/D
      </p>
    </div>
  )
}

export default CrossMultiplicationForm

