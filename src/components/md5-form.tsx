'use client'

import { ButtonCopy } from '@/components/copy-button'
import { MD5 } from 'crypto-js'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const MD5Form = () => {
  const [_, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (!value) return setResult('')

    const result = MD5(value)
    setInput(value)
    setResult(result.toString())
  }

  return (
    <div className="grid gap-4">
      <Textarea placeholder="Copy your text here..." onChange={handleChange} />
      <Textarea placeholder="Result" readOnly value={result} />
      <ButtonCopy text={result} />
    </div>
  )
}

export default MD5Form
