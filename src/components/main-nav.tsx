'use client'

import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
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
      description:
        'Calculate prices with or without VAT. Supports French and US tax rates, or custom rates.',
      icon: Receipt,
    },
    {
      title: 'Cross Multiplication Calculator',
      href: '#cross-multiplication-calculator',
      description: 'Solve proportions using cross multiplication (A/B = C/D).',
      icon: Calculator,
    },
  ],
  'text-encoding': [
    {
      title: 'Slug Generator',
      href: '#slug-generator',
      description:
        'Generate URL-friendly slugs from text. Remove special characters and optionally filter stop words.',
      icon: LinkIcon,
    },
    {
      title: 'QR Code Generator',
      href: '#qr-code-generator',
      description: 'Generate QR codes from text or URLs with download option.',
      icon: QrCode,
    },
    {
      title: 'Base64 Image Encode',
      href: '#base64-image-encode',
      description: 'Convert an image file to Base64 encoded string.',
      icon: ImageIcon,
    },
    {
      title: 'JSON Minify/Unminify',
      href: '#json-minify-unminify',
      description:
        'Minify JSON by removing whitespace or unminify with customizable tab size.',
      icon: Code,
    },
    {
      title: 'Sort And Dedupe',
      href: '#sort-dedupe',
      description:
        'Sort comma-separated values A-Z or Z-A and optionally remove duplicates.',
      icon: ArrowUpDown,
    },
  ],
  'security-generators': [
    {
      title: 'Password Generator',
      href: '#password-generator',
      description: 'Generate a random password or secret.',
      icon: Lock,
    },
    {
      title: 'UUID Generator',
      href: '#uuid-generator',
      description: 'Generate a random UUID.',
      icon: TableProperties,
    },
    {
      title: 'MD5 Hash Generator',
      href: '#md5-hash-generator',
      description: 'Generate a MD5 hash from a string.',
      icon: Hash,
    },
    {
      title: 'JWT Viewer',
      href: '#jwt-viewer',
      description: 'Decode and view the header and payload of a JWT token.',
      icon: Key,
    },
  ],
  development: [
    {
      title: 'Commit Lint',
      href: '#commit-lint',
      description:
        'Generate your commit messages based on the Conventional Commits specification.',
      icon: SpellCheck,
    },
  ],
}

export function MainNav() {
  const handleLinkClick = (
    href: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    // Extract the ID from the href (e.g., "#vat-calculator" -> "vat-calculator")
    const cardId = href.replace('#', '')

    // Dispatch a custom event to trigger the card animation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('animateCard', { detail: { cardId } })
      )

      // Handle scroll with offset for anchor links
      if (href.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
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
      }
    }
  }

  return (
    <div className="mr-4 hidden min-[1100px]:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Calculators</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <ul className="grid gap-2 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                {featuresByTheme.calculators.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          onClick={(e) => handleLinkClick(feature.href, e)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none line-clamp-1">
                            <Icon className="h-4 w-4" />
                            {feature.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Text & Encoding</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <ul className="grid gap-2 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                {featuresByTheme['text-encoding'].map((feature) => {
                  const Icon = feature.icon
                  return (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          onClick={(e) => handleLinkClick(feature.href, e)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none line-clamp-1">
                            <Icon className="h-4 w-4" />
                            {feature.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Security & Generators</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <ul className="grid gap-2 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                {featuresByTheme['security-generators'].map((feature) => {
                  const Icon = feature.icon
                  return (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          onClick={(e) => handleLinkClick(feature.href, e)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none line-clamp-1">
                            <Icon className="h-4 w-4" />
                            {feature.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Development</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {featuresByTheme.development.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          onClick={(e) => handleLinkClick(feature.href, e)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none">
                            <Icon className="h-4 w-4" />
                            {feature.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
