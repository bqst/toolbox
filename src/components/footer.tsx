import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
          Password creation occurs exclusively on the user's device, ensuring
          they are never retained in any location, be it on the user's device or
          the server. The UUIDs produced by this website are offered without any
          form of guarantee, including the assurance of their uniqueness.
          Utilizing these UUIDs is entirely at the user's discretion, and they
          bear all associated risks. Our website is free from tracking cookies
          or similar tracking mechanisms. The sole use of cookies is for
          essential site functionality.
        </p>
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <Link
            href="https://www.bqst.fr/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            bqst
          </Link>
          . The source code is available on{' '}
          <Link
            href="https://github.com/bqst/toolbox"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
