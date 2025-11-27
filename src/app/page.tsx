import MD5Form from '@/components/md5-form'
import SecretForm from '@/components/secret-form'
import UuidForm from '@/components/uuid-form'
import CrossMultiplicationForm from '@/components/cross-multiplication-form'
import VATCalculator from '@/components/vat-calculator'
import SlugForm from '@/components/slug-form'
import Base64ImageForm from '@/components/base64-image-form'
import JsonForm from '@/components/json-form'
import SortDedupeForm from '@/components/sort-dedupe-form'
import QRCodeForm from '@/components/qr-code-form'
import JwtViewer from '@/components/jwt-viewer'

import CommitLint from '@/components/commit-lint'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card id="vat-calculator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Receipt className="inline-block mr-2" />
            VAT Calculator
          </CardTitle>
          <CardDescription>
            Calculate prices with or without VAT. Supports French and US tax
            rates, or custom rates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VATCalculator />
        </CardContent>
      </Card>

      <Card id="slug-generator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <LinkIcon className="inline-block mr-2" />
            Slug Generator
          </CardTitle>
          <CardDescription>
            Generate URL-friendly slugs from text. Remove special characters and
            optionally filter stop words (French, English, or custom).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SlugForm />
        </CardContent>
      </Card>

      <Card id="qr-code-generator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <QrCode className="inline-block mr-2" />
            QR Code Generator
          </CardTitle>
          <CardDescription>
            Generate QR codes from text or URLs with download option.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QRCodeForm />
        </CardContent>
      </Card>

      <Card id="cross-multiplication-calculator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Calculator className="inline-block mr-2" />
            Cross Multiplication Calculator
          </CardTitle>
          <CardDescription>
            Solve proportions using cross multiplication (A/B = C/D).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CrossMultiplicationForm />
        </CardContent>
      </Card>

      <Card id="password-generator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Lock className="inline-block mr-2" />
            Password Generator
          </CardTitle>
          <CardDescription>
            Generate a random password or secret.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SecretForm />
        </CardContent>
      </Card>

      <Card id="uuid-generator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <TableProperties className="inline-block mr-2" />
            UUID Generator
          </CardTitle>
          <CardDescription>Generate a random UUID.</CardDescription>
        </CardHeader>
        <CardContent>
          <UuidForm />
        </CardContent>
      </Card>

      <Card id="md5-hash-generator">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Hash className="inline-block mr-2" />
            MD5 Hash Generator
          </CardTitle>
          <CardDescription>Generate a MD5 hash from a string.</CardDescription>
        </CardHeader>
        <CardContent>
          <MD5Form />
        </CardContent>
      </Card>

      <Card id="jwt-viewer">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Key className="inline-block mr-2" />
            JWT Viewer
          </CardTitle>
          <CardDescription>
            Decode and view the header and payload of a JWT token.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JwtViewer />
        </CardContent>
      </Card>

      <Card id="base64-image-encode">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <ImageIcon className="inline-block mr-2" />
            Base64 Image Encode
          </CardTitle>
          <CardDescription>
            Convert an image file to Base64 encoded string.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Base64ImageForm />
        </CardContent>
      </Card>

      <Card id="commit-lint">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <SpellCheck className="inline-block mr-2" />
            Commit Lint
          </CardTitle>
          <CardDescription>
            Generate your commit messages based on the{' '}
            <Link
              href="https://www.conventionalcommits.org/en/v1.0.0/"
              className="underline"
            >
              Conventional Commits specification.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommitLint />
        </CardContent>
      </Card>

      <Card id="json-minify-unminify">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Code className="inline-block mr-2" />
            JSON Minify/Unminify
          </CardTitle>
          <CardDescription>
            Minify JSON by removing whitespace or unminify with customizable tab
            size (default 2).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JsonForm />
        </CardContent>
      </Card>

      <Card id="sort-dedupe">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <ArrowUpDown className="inline-block mr-2" />
            Sort And Dedupe
          </CardTitle>
          <CardDescription>
            Sort comma-separated values A-Z or Z-A and optionally remove
            duplicates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SortDedupeForm />
        </CardContent>
      </Card>
    </div>
  )
}
