'use client'

import { ButtonCopy } from '@/components/copy-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useMemo } from 'react'

type PriceType = 'excl' | 'incl' // excluding VAT (HT) or including VAT (TTC)

const VAT_RATES = {
  'FR_STANDARD': { label: 'France - Standard (20%)', rate: 20 },
  'FR_REDUCED': { label: 'France - Reduced (5.5%)', rate: 5.5 },
  'FR_SUPER_REDUCED': { label: 'France - Super Reduced (2.1%)', rate: 2.1 },
  'US_STANDARD': { label: 'USA - Standard (varies by state)', rate: 0 }, // Will use custom
  'US_CALIFORNIA': { label: 'USA - California (7.25%)', rate: 7.25 },
  'US_NEW_YORK': { label: 'USA - New York (8%)', rate: 8 },
  'US_TEXAS': { label: 'USA - Texas (6.25%)', rate: 6.25 },
  'CUSTOM': { label: 'Custom', rate: 0 },
} as const

const VATCalculator = () => {
  const [price, setPrice] = useState('')
  const [priceType, setPriceType] = useState<PriceType>('excl')
  const [vatRateKey, setVatRateKey] = useState<keyof typeof VAT_RATES>('FR_STANDARD')
  const [customRate, setCustomRate] = useState('')

  const vatRate = useMemo(() => {
    if (vatRateKey === 'CUSTOM') {
      const custom = parseFloat(customRate)
      return isNaN(custom) ? 0 : custom
    }
    return VAT_RATES[vatRateKey].rate
  }, [vatRateKey, customRate])

  const results = useMemo(() => {
    const priceNum = parseFloat(price)
    if (!price || isNaN(priceNum) || priceNum < 0) {
      return null
    }

    // Validate VAT rate
    if (vatRateKey === 'CUSTOM') {
      const custom = parseFloat(customRate)
      if (!customRate || isNaN(custom) || custom <= 0) {
        return null
      }
    } else if (vatRate <= 0) {
      return null
    }

    const vatMultiplier = vatRate / 100

    if (priceType === 'excl') {
      // Price excluding VAT (HT) -> Calculate including VAT (TTC)
      const vatAmount = priceNum * vatMultiplier
      const priceIncl = priceNum + vatAmount
      return {
        priceExcl: priceNum,
        vatAmount,
        priceIncl,
      }
    } else {
      // Price including VAT (TTC) -> Calculate excluding VAT (HT)
      const priceExcl = priceNum / (1 + vatMultiplier)
      const vatAmount = priceNum - priceExcl
      return {
        priceExcl,
        vatAmount,
        priceIncl: priceNum,
      }
    }
  }, [price, priceType, vatRate, vatRateKey])

  const handlePriceChange = (value: string) => {
    // Allow empty string or valid number
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPrice(value)
    }
  }

  const handleCustomRateChange = (value: string) => {
    // Allow empty string or valid number
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomRate(value)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="price-type">Price Type</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price-type"
              checked={priceType === 'excl'}
              onChange={() => setPriceType('excl')}
              className="h-4 w-4"
            />
            <span className="text-sm">Excluding VAT (HT)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price-type"
              checked={priceType === 'incl'}
              onChange={() => setPriceType('incl')}
              className="h-4 w-4"
            />
            <span className="text-sm">Including VAT (TTC)</span>
          </label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vat-rate">VAT Rate</Label>
        <Select value={vatRateKey} onValueChange={(value) => setVatRateKey(value as keyof typeof VAT_RATES)}>
          <SelectTrigger id="vat-rate">
            <SelectValue placeholder="Select VAT rate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FR_STANDARD">{VAT_RATES.FR_STANDARD.label}</SelectItem>
            <SelectItem value="FR_REDUCED">{VAT_RATES.FR_REDUCED.label}</SelectItem>
            <SelectItem value="FR_SUPER_REDUCED">{VAT_RATES.FR_SUPER_REDUCED.label}</SelectItem>
            <SelectItem value="US_CALIFORNIA">{VAT_RATES.US_CALIFORNIA.label}</SelectItem>
            <SelectItem value="US_NEW_YORK">{VAT_RATES.US_NEW_YORK.label}</SelectItem>
            <SelectItem value="US_TEXAS">{VAT_RATES.US_TEXAS.label}</SelectItem>
            <SelectItem value="CUSTOM">{VAT_RATES.CUSTOM.label}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {vatRateKey === 'CUSTOM' && (
        <div className="grid gap-2">
          <Label htmlFor="custom-rate">Custom VAT Rate (%)</Label>
          <Input
            id="custom-rate"
            type="text"
            placeholder="Enter custom rate (e.g., 19)"
            value={customRate}
            onChange={(e) => handleCustomRateChange(e.target.value)}
          />
        </div>
      )}

      {results && (
        <div className="rounded-md border p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Price {priceType === 'excl' ? 'Excluding' : 'Including'} VAT:</span>
            <span className="text-sm font-semibold">
              {results.priceExcl.toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">VAT Amount ({vatRate}%):</span>
            <span className="text-sm font-semibold">
              {results.vatAmount.toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm font-medium">Price {priceType === 'incl' ? 'Excluding' : 'Including'} VAT:</span>
            <span className="text-sm font-bold">
              {results.priceIncl.toFixed(2)} €
            </span>
          </div>
        </div>
      )}

      {results && (
        <ButtonCopy text={results.priceIncl.toFixed(2)} />
      )}

      <p className="text-xs text-muted-foreground">
        Enter a price and select a VAT rate to calculate the price with or without VAT.
      </p>
    </div>
  )
}

export default VATCalculator

