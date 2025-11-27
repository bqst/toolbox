'use client'

import React, { useState } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  ArrowUpDown,
  Calculator,
  Code,
  Hash,
  Image as ImageIcon,
  Key,
  Link as LinkIcon,
  Lock,
  QrCode,
  Receipt,
  SpellCheck,
  TableProperties,
} from 'lucide-react'

const featuresByTheme = {
  calculators: [
    {
      title: 'VAT Calculator',
      href: '#vat-calculator',
      icon: Receipt,
    },
    {
      title: 'Cross Multiplication Calculator',
      href: '#cross-multiplication-calculator',
      icon: Calculator,
    },
  ],
  'text-encoding': [
    {
      title: 'Slug Generator',
      href: '#slug-generator',
      icon: LinkIcon,
    },
    {
      title: 'QR Code Generator',
      href: '#qr-code-generator',
      icon: QrCode,
    },
    {
      title: 'Base64 Image Encode',
      href: '#base64-image-encode',
      icon: ImageIcon,
    },
    {
      title: 'JSON Minify/Unminify',
      href: '#json-minify-unminify',
      icon: Code,
    },
    {
      title: 'Sort And Dedupe',
      href: '#sort-dedupe',
      icon: ArrowUpDown,
    },
  ],
  'security-generators': [
    {
      title: 'Password Generator',
      href: '#password-generator',
      icon: Lock,
    },
    {
      title: 'UUID Generator',
      href: '#uuid-generator',
      icon: TableProperties,
    },
    {
      title: 'MD5 Hash Generator',
      href: '#md5-hash-generator',
      icon: Hash,
    },
    {
      title: 'JWT Viewer',
      href: '#jwt-viewer',
      icon: Key,
    },
  ],
  development: [
    {
      title: 'Commit Lint',
      href: '#commit-lint',
      icon: SpellCheck,
    },
  ],
}

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = (href: string) => {
    // Extract the ID from the href (e.g., "#vat-calculator" -> "vat-calculator")
    const cardId = href.replace('#', '')

    // Dispatch a custom event to trigger the card animation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('animateCard', { detail: { cardId } })
      )
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-[1100px]:hidden"
        >
          <Icons.logo className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium">Calculators</h4>
              {featuresByTheme.calculators.map((feature) => {
                const Icon = feature.icon
                return (
                  <MobileLink
                    key={feature.href}
                    href={feature.href}
                    onOpenChange={setOpen}
                    onClick={() => handleLinkClick(feature.href)}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {feature.title}
                  </MobileLink>
                )
              })}
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium">Text & Encoding</h4>
              {featuresByTheme['text-encoding'].map((feature) => {
                const Icon = feature.icon
                return (
                  <MobileLink
                    key={feature.href}
                    href={feature.href}
                    onOpenChange={setOpen}
                    onClick={() => handleLinkClick(feature.href)}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {feature.title}
                  </MobileLink>
                )
              })}
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium">Security & Generators</h4>
              {featuresByTheme['security-generators'].map((feature) => {
                const Icon = feature.icon
                return (
                  <MobileLink
                    key={feature.href}
                    href={feature.href}
                    onOpenChange={setOpen}
                    onClick={() => handleLinkClick(feature.href)}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {feature.title}
                  </MobileLink>
                )
              })}
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium">Development</h4>
              {featuresByTheme.development.map((feature) => {
                const Icon = feature.icon
                return (
                  <MobileLink
                    key={feature.href}
                    href={feature.href}
                    onOpenChange={setOpen}
                    onClick={() => handleLinkClick(feature.href)}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {feature.title}
                  </MobileLink>
                )
              })}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  onClick,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  const isAnchor = href.toString().startsWith('#')

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.()
        if (isAnchor) {
          e.preventDefault()
          const element = document.querySelector(href.toString())
          if (element) {
            const headerHeight = 72 // h-14 = 56px + 16px offset
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - headerHeight

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }
        } else {
          router.push(href.toString())
        }
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
