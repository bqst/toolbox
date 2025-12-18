'use client'

import { Button } from '@/components/ui/button'
import { ButtonCopy } from '@/components/copy-button'
import { Input } from './ui/input'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, v6 as uuidv6, v7 as uuidv7 } from 'uuid'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'

const NAMESPACES = {
  DNS: uuidv5.DNS,
  URL: uuidv5.URL,
  OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
}

type UuidType = 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7'

const TYPES: { id: UuidType; name: string; description: string }[] = [
  {
    id: 'v4',
    name: 'Version 4 (Random)',
    description: 'Generated using random numbers. Most commonly used.',
  },
  {
    id: 'v7',
    name: 'Version 7 (Unix Epoch)',
    description: 'Unix timestamp with millisecond precision. Sortable by creation time.',
  },
  {
    id: 'v1',
    name: 'Version 1 (Timestamp)',
    description: 'Generated using timestamp and MAC address.',
  },
  {
    id: 'v6',
    name: 'Version 6 (Reordered Time)',
    description: 'Like v1 but with improved sorting. Field-compatible with v1.',
  },
  {
    id: 'v5',
    name: 'Version 5 (Namespace SHA-1)',
    description: 'Generated from namespace and name using SHA-1 hash.',
  },
  {
    id: 'v3',
    name: 'Version 3 (Namespace MD5)',
    description: 'Generated from namespace and name using MD5 hash.',
  },
]

const UuidForm = () => {
  const [id, setId] = useState('')
  const [typeId, setTypeId] = useState<UuidType>('v4')
  const [namespace, setNamespace] = useState<keyof typeof NAMESPACES | 'custom'>('DNS')
  const [customNamespace, setCustomNamespace] = useState('')
  const [name, setName] = useState('')

  const needsNamespace = typeId === 'v3' || typeId === 'v5'

  const generateId = useCallback(() => {
    switch (typeId) {
      case 'v1':
        setId(uuidv1())
        break
      case 'v3': {
        const ns = namespace === 'custom' ? customNamespace : NAMESPACES[namespace]
        if (ns && name) {
          try {
            setId(uuidv3(name, ns))
          } catch {
            setId('Invalid namespace UUID')
          }
        } else {
          setId('')
        }
        break
      }
      case 'v4':
        setId(uuidv4())
        break
      case 'v5': {
        const ns = namespace === 'custom' ? customNamespace : NAMESPACES[namespace]
        if (ns && name) {
          try {
            setId(uuidv5(name, ns))
          } catch {
            setId('Invalid namespace UUID')
          }
        } else {
          setId('')
        }
        break
      }
      case 'v6':
        setId(uuidv6())
        break
      case 'v7':
        setId(uuidv7())
        break
    }
  }, [typeId, namespace, customNamespace, name])

  useEffect(() => {
    generateId()
  }, [generateId])

  const selectedType = TYPES.find((type) => type.id === typeId)

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
          value={typeId}
          onValueChange={(value) => setTypeId(value as UuidType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type">
              {selectedType?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {needsNamespace && (
        <>
          <div className="grid gap-2">
            <Label htmlFor="namespace">Namespace</Label>
            <Select
              value={namespace}
              onValueChange={(value) => setNamespace(value as keyof typeof NAMESPACES | 'custom')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a namespace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DNS">DNS</SelectItem>
                <SelectItem value="URL">URL</SelectItem>
                <SelectItem value="OID">OID</SelectItem>
                <SelectItem value="X500">X500</SelectItem>
                <SelectItem value="custom">Custom UUID</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {namespace === 'custom' && (
            <div className="grid gap-2">
              <Label htmlFor="customNamespace">Custom Namespace UUID</Label>
              <Input
                id="customNamespace"
                type="text"
                placeholder="e.g., 6ba7b810-9dad-11d1-80b4-00c04fd430c8"
                value={customNamespace}
                onChange={(e) => setCustomNamespace(e.target.value)}
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., example.com"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </>
      )}

      {selectedType && (
        <p className="text-xs text-muted-foreground">
          {selectedType.description}
        </p>
      )}
    </div>
  )
}

export default UuidForm
