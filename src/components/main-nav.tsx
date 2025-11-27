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
  Calculator,
  Code,
  Hash,
  Image as ImageIcon,
  Link as LinkIcon,
  Lock,
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
  return (
    <div className="mr-4 hidden md:flex">
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
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {featuresByTheme.development.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
