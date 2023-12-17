'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Check, Files } from 'lucide-react'

type ButtonCopyProps = {
  text: string
}

export const ButtonCopy = ({ text }: ButtonCopyProps) => {
  const [hasCopied, setHasCopied] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyToClipboard = useCallback((value: string) => {
    navigator.clipboard.writeText(value)
    toast({ title: 'Copied!' })
    setHasCopied(true)
  }, [])

  return (
    <Button onClick={() => copyToClipboard(text)}>
      Copy
      {hasCopied ? (
        <Check className="w-4 h-4 ml-2" />
      ) : (
        <Files className="w-4 h-4 ml-2" />
      )}
    </Button>
  )
}
