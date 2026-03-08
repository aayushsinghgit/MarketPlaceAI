import './globals.css'

export const metadata = {
  title: 'AgentForge - AI Agents Platform',
  description: 'Discover, buy, and sell AI agents and automation solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/codec-pro" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
