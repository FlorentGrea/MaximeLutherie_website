'use client'

import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon } from '../ui/icons';

export default function GuitarsAdminPage({ guitarList }: any) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR);
    const [ id, setId ] = useState('')
    const [ popupButton, setPopupButton ] = useState(0)
    const maxOrder = guitarList.length
    
    async function newGuitar() {
        const data = {
            'Title': 'nouvelle guitare',
            'Order': maxOrder,
            'Description': {
                "Title": "nouvelle guitare",
                "Image": "",
                "Paragraphs": []
            }
        }
        const record = await pb.collection('Guitars').create(data);
        const url = window.location
        window.location.href = url + '/' + record.id
    }

    async function delGuitar() {
        if (id)
            await pb.collection('Guitars').delete(id)
        location.reload()
    }

    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                { guitarList.map((guitar: any) => {
                    const imageUrl = process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.Description.Image

                    return (
                        <div key={guitar.id} className="relative">
                            <Link key={guitar.id} href={`/Guitares/${guitar.id}`}>
                                <Card className="relative overflow-hidden h-96">
                                  <Image
                                    alt={guitar.Title}
                                    className="absolute w-full h-full rounded-t-lg object-cover aspect-[4/3] z-0"
                                    height={300}
                                    width={400}
                                    src={guitar.Description.Image ? imageUrl : "/placeholder.svg"}
                                  />
                                  <div className="absolute h-full w-full bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0 z-10"/>
                                  <CardContent className="absolute bottom-0 z-20">
                                    <h3 className="text-2xl font-bold text-brandy-punch-50">{guitar.Title}</h3>
                                  </CardContent>
                                </Card>
                            </Link>
                            <Button variant={'destructive'} onClick={() => {setId(guitar.id); setPopupButton(1)}} className='absolute top-4 left-0 right-0 m-auto w-fit z-20'>Supprimer</Button>
                        </div>
            )})}
                <button onClick={newGuitar}>
                    <Card className="relative overflow-hidden h-96">
                      <Image
                        alt='Nouvelle Guitare'
                        className="absolute w-full h-full rounded-t-lg object-cover aspect-[4/3] z-0"
                        height={300}
                        width={400}
                        src='/placeholder.svg'
                      />
                      <div className="absolute h-full w-full bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0 z-10"/>
                      <CardContent className="absolute bottom-0 z-20">
                        <h3 className="text-2xl font-bold text-brandy-punch-50">Ajouter un instrument</h3>
                      </CardContent>
                    </Card>
                </button>
                { popupButton ? 
                    <div className='fixed flex flex-col top-0 left-0 m-auto w-full h-full justify-center items-center text-white bg-black/70 z-30'>
                        <h1>Êtes-vous sur?</h1>
                        <div className='flex flex-row'>
                            <Button variant={'destructive'} onClick={delGuitar} className='m-4'>Supprimer</Button>
                            <Button onClick={() => setPopupButton(0)} className='m-4 bg-brandy-punch-500 text-brandy-punch-50'>Annuler</Button>
                        </div>
                    </div>
                : <></>}
            </div>
        </section>
    )
}