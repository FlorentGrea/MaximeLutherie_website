'use client'

import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import * as Icons from './ui/icons';
import Link from 'next/link'
import "@/app/globals.css";
import React from 'react';
import { cookies } from "next/headers";

//Navigation Bar.
//The const pages define each pages.
//Each link will displayed in dropdown menu, except if the screen have a width superior to 1280px, then they will be displayed as a line.
//the last li is for logging out of admin mode

export default function Nav({ logout, user }: any) {
  const pages = [ 'Guitares', 'Ateliers', 'Photos', 'Contact' ]
  const currentRoute = usePathname()

  return (
    <nav className="flex items-center space-x-1 sm:space-x-4 md:space-x-6 lg:space-x-8 text-brandy-punch-950">
      <div className='hidden lg:flex'>
        { pages.map((page) => {

          return (
            <div key={page}>
              <Link href={'/' + page} className={`block px-1 sm:px-2 md:px-3 items-center hover:text-brandy-punch-600 transition-colors ${currentRoute == '/' + page && `text-brandy-punch-200`}`}>
                  {page.toUpperCase()}
              </Link>
            </div>
        )})}
        { user ? (
          <form className="block w-full" action={logout}>
            <button type="submit" className="block px-1 sm:px-2 md:px-3 items-center hover:text-brandy-punch-600 transition-colors">DÉCONNEXION</button>
          </form>
        ) : <></>}
      </div>
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full border-none bg-brandy-punch-50" size="icon" variant="outline">
              <Icons.MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            { pages.map((page) => {

              return (
                <DropdownMenuItem key={page}>
                  <Link  className={`block w-full ${currentRoute == '/' + page && `text-brandy-punch-200`}`} href={'/' + page}>
                    {page.toUpperCase()}
                  </Link>
                </DropdownMenuItem>
            )})}
            { user && (
              <DropdownMenuItem>
                <form className="block w-full" action={logout}>
                  <button type="submit">DÉCONNEXION</button>
                </form>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}