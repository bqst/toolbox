'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Files } from 'lucide-react'

type ButtonCopyProps = {
  text: string
}

export const ButtonCopy = ({ text }: ButtonCopyProps) => {
  const { toast } = useToast()

  const copyText = () => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied !',
    })
  }

  return (
    <Button onClick={copyText} disabled={!text}>
      Copy <Files className="w-4 h-4 ml-2" />
    </Button>
  )
}
