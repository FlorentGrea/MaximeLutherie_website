import { UserProvider } from '@auth0/nextjs-auth0/client'
import { GuitaresIcon } from '@/components/ui/icons'
import { Crimson_Text } from 'next/font/google'
import { Eczar } from 'next/font/google'
import Nav from "../components/Navbar"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Max Lutherie",
  description: "Luthier Lyonnais",
}

const crimson_text = Crimson_Text({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson_text',
})

const eczar = Eczar({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eczar',
})

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <UserProvider>
        <body className={crimson_text.variable + ' ' + eczar.variable + " flex flex-col min-h-[100vh]"}>
          <header className="w-full bg-gray-900 py-6 md:py-8 md:px-6 lg:py-10 lg:px-8">
            <div className="container w-full mx-auto flex items-center justify-between">
              <Link className="flex items-center" href="/">
                <GuitaresIcon className='filter-white' />
                <span className="ml-2 text-xl font-bold text-white">Max Lutherie</span>
              </Link>
              <Nav />
            </div>
          </header>
          <main className='flex-grow'>
            {children}
          </main>
          <footer className="w-full bg-gray-900 py-6 px-4 md:py-8 md:px-6 lg:py-10 lg:px-8">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <GuitaresIcon className='filter-white' />
                <span className="ml-2 text-lg font-bold text-white">Max Lutherie</span>
              </div>
              <p className="text-sm text-gray-400">Site créé par <a href="https://www.linkedin.com/in/florent-grea-3a9b13137/" target='_blank' className='underline'>Florent Gréa</a></p>
            </div>
          </footer>
        </body>
      </UserProvider>
    </html>
  )
}
