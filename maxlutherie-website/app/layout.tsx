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
          <header className="w-full md:pt-4 md:px-6 lg:pt-6 lg:px-8">
            <div className="relative container w-full flex items-center justify-end mt-10 px-2">
              <Link className="absolute left-2 -top-6 md:-top-12 lg:-top-14 flex items-center w-44 sm:w-52 md:w-80" href="/">
                <Image 
                  src='/max_logo_full.png'
                  width={350}
                  height={350}
                  alt="logo"
                  className='object-contain m-auto filter-brandy-punch'
                />
              </Link>
              <Nav />
            </div>
          </header>
          <main className='flex-grow'>
            {children}
          </main>
          <footer className="w-full pb-6 px-4 md:pb-8 md:px-6 lg:pb-10 lg:px-8">
            <div className="container mx-auto flex items-center justify-between px-2">
              <div className="flex items-center">
                <GuitaresIcon className='filter-brandy-punch' />
                <span className="ml-2 text-lg font-bold text-brandy-punch-950">Max Lutherie</span>
              </div>
              <p className="text-right text-sm text-brandy-punch-950">Site créé par <a href="https://www.linkedin.com/in/florent-grea-3a9b13137/" target='_blank' className='underline'>Florent Gréa</a></p>
            </div>
          </footer>
        </body>
      </UserProvider>
    </html>
  )
}