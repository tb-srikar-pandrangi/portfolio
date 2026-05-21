import './globals.css'

export const metadata = {
  title: 'Srikar Pandrangi - Growth, Brand & AI Automation',
  description: 'Portfolio of Srikar Pandrangi. Growth strategies, brand development, and AI automation expertise.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
