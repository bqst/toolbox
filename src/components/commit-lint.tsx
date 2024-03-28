'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ButtonCopy } from './copy-button'
import { Checkbox } from './ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

type Type = {
  value: string
  text: string
  emoji: string
}

const TYPES = [
  {
    value: 'build',
    text: 'build(build system or external dependencies changes)',
    emoji: '📦',
  },
  {
    value: 'ci',
    text: 'ci(CI configurations and scripts changes)',
    emoji: '👷',
  },
  { value: 'chore', text: 'chore(maintain)', emoji: '🔧' },
  { value: 'docs', text: 'docs(documentation)', emoji: '📚' },
  { value: 'feat', text: 'feat(feature)', emoji: '✨' },
  { value: 'fix', text: 'fix(bug fix)', emoji: '🐛' },
  { value: 'perf', text: 'perf(improves performance)', emoji: '🚀' },
  {
    value: 'refactor',
    text: 'refactor(neither fixes a bug or adds a feature)',
    emoji: '🔨',
  },
  { value: 'revert', text: 'revert(reverts a previous commit)', emoji: '⏪' },
  {
    value: 'style',
    text: 'style(formatting, missing semi colons, etc.)',
    emoji: '💎',
  },
  { value: 'test', text: 'test(adding missing tests)', emoji: '🚨' },
]

const CommitLint = () => {
  const [withEmoji, setWithEmoji] = useState(true)
  const [type, setType] = useState<Type | null>(null)
  const [scope, setScope] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [footer, setFooter] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [result, setResult] = useState('')

  const generateCommit = () => {
    const parts = [
      type?.emoji ? `${type.emoji} ` : '',
      type?.value,
      scope ? `(${scope}): ` : ' ',
      subject,
      body ? `\n\n${body}` : '',
      footer ? `\n\n${footer}` : '',
    ]

    setResult(parts.filter(Boolean).join(''))
  }

  useEffect(() => {
    generateCommit()
  }, [type, scope, subject, body, footer])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="flex justify-between">
          <Label htmlFor="type">Type</Label>
          <div className="flex flex-row items-start space-x-3 space-y-0">
            <Checkbox
              id="with-emoji"
              name="with-emoji"
              checked={withEmoji}
              onCheckedChange={(checked) => setWithEmoji(checked as boolean)}
            />
            <Label htmlFor="with-emoji">With Emoji</Label>
          </div>
        </div>
        <Select
          value={type?.value}
          onValueChange={(value) =>
            setType(TYPES.find((t) => t.value === value) || null)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {withEmoji && type.emoji} {type.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="scope">Scope</Label>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                type="text"
                name="scope"
                placeholder="<scope>"
                onChange={(e) => setScope(e.target.value)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                Could be anything specifying place of the commit change.
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="scope">Subject</Label>
            <CollapsibleTrigger>
              {isOpen ? (
                <MinusIcon className="h-4 w-4" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  type="text"
                  name="subject"
                  placeholder="<subject> succinct description of the change"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <ul>
                    <li>
                      - use imperative, present tense: "change" not “changed”
                      nor “changes”
                    </li>
                    <li>- don't capitalize first letter</li>
                    <li>- no dot (.) at the end</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <CollapsibleContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="scope">Body (optionnal)</Label>
              <Textarea
                placeholder="Body"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="scope">Footer (optionnal)</Label>
              <Textarea
                placeholder="Footer"
                onChange={(e) => setFooter(e.target.value)}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Textarea placeholder="Result" readOnly value={result} rows={6} />
      <ButtonCopy text={result} />
    </div>
  )
}

export default CommitLint
