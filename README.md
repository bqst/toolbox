# Bqst Toolbox

Simple toolbox for developers.

## Features

- **VAT Calculator**: Calculate prices with or without VAT. Supports French and US tax rates, or custom rates.
- **Slug Generator**: Generate URL-friendly slugs from text. Remove special characters and optionally filter stop words (French, English, or custom).
- **QR Code Generator**: Generate QR codes from text or URLs with download option.
- **Cross Multiplication Calculator**: Solve proportions using cross multiplication (A/B = C/D).
- **Password Generator**: Generate a random password or secret.
- **UUID Generator**: Generate a random UUID.
- **MD5 Hash Generator**: Generate a MD5 hash from a string.
- **JWT Viewer**: Decode and view the header and payload of a JWT token.
- **Base64 Image Encode**: Convert an image file to Base64 encoded string.
- **Commit Lint**: Generate commit messages based on the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
- **JSON Minify/Unminify**: Minify JSON by removing whitespace or unminify with customizable tab size (default 2).
- **Sort And Dedupe**: Sort comma-separated values A-Z or Z-A and optionally remove duplicates.

## Built With

- [Next.js](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [pnpm](https://pnpm.io/) >= 8.0.0

### Development

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

## Authors

- **Bqst** - _Initial work_ - [Bqst](https://github.com/bqst)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
