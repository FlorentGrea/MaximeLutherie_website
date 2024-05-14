'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation'
import * as Icons from './ui/icons';
import Link from 'next/link'
import "@/app/globals.css";
import React from 'react';

//Navigation Bar.
//The const pages define each pages.
//You need to add the svg Icon associated to the name in the icon.tsx file
//Each link will be displayed as an Icon, except if the screen have a width superior to 1280px, then they will be displayed as text.
//the last li is for logging out of admin mode

export default function Nav() {
  const pages = [
    {
      name: 'Guitares',
      iconComponent: Icons.GuitaresIcon 
    },
    {
      name: 'Ateliers',
      iconComponent: Icons.AteliersIcon
    },
    {
      name: 'Photos',
      iconComponent: Icons.PhotosIcon 
    },
    {
      name: 'Contact',
      iconComponent: Icons.ContactIcon
    }
  ]
  const currentRoute = usePathname()
  const { user } = useUser();

  return (
    <nav className="flex items-center space-x-1 sm:space-x-4 md:space-x-6 lg:space-x-8">
      { pages.map((page) => {

        return (
          <div key={page.name}>
            <Link href={'/' + page.name} className="block px-1 sm:px-2 md:px-3">
              <page.iconComponent className={`md:hidden ${currentRoute.startsWith('/' + page.name) ? 'filter-orange' : ' filter-white'}`} />
              <p className={`hidden md:flex items-center hover:text-gray-400 transition-colors ${currentRoute.startsWith('/' + page) ? 'text-red' : 'text-white'}`}>
                {page.name.toUpperCase()}
              </p>
            </Link>
          </div>
      )})}
      { user && (
        <Link href="/api/auth/logout" className="block px-1 sm:px-2 md:px-3">
          <Icons.LogoutIcon className='md:hidden filter-white' />
          <p className='hidden md:flex items-center text-white hover:text-gray-400 transition-colors'>
            DÉCONNEXION
          </p>
        </Link>
      )}
    </nav>
  )
}