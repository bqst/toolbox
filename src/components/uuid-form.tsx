'use client'

import { Button } from '@/components/ui/button'
import { ButtonCopy } from '@/components/copy-button'
import { Input } from './ui/input'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'

const TYPES = [
  { id: 4, name: 'Version 4 UUID' },
  { id: 1, name: 'Version 1 UUID' },
]

const UuidForm = () => {
  const [id, setId] = useState('')
  const [typeId, setTypeId] = useState(TYPES[0].id)

  useEffect(() => {
    generateId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId])

  const generateId = () => {
    switch (typeId) {
      case 1:
        setId(uuidv1())
        break
      case 4:
        setId(uuidv4())
        break
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <Button onClick={generateId} variant="outline">
          <RefreshCcw className="w-4 h-4 mr-2" /> Generate
        </Button>
        <ButtonCopy text={id} />
      </div>

      <div className="flex">
        <Input type="text" name="id" value={id} readOnly />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={typeId.toString()}
          onValueChange={(value) => setTypeId(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type">
              {TYPES.find((type) => type.id === typeId)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-xs mb-1">
          A Version 1 UUID is a universally unique identifier that is generated
          using a timestamp and the MAC address of the computer on which it was
          generated.
        </p>
        <p className="text-xs">
          A Version 4 UUID is a universally unique identifier that is generated
          using random numbers. The Version 4 UUIDs produced by this site were
          generated using a secure random number generator.
        </p>
      </div>
    </div>
  )
}

export default UuidForm
