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
                                <Card>
                                  <Image
                                    alt={guitar.Title}
                                    className="rounded-t-lg object-cover w-full"
                                    height={300}
                                    src={guitar.Description.Image ? imageUrl : "/placeholder.svg"}
                                    style={{
                                      aspectRatio: "400/300",
                                      objectFit: "cover",
                                    }}
                                    width={400}
                                  />
                                  <CardContent>
                                    <h3 className="text-xl font-bold text-gray-900">{guitar.Title}</h3>
                                    <p className="mt-2 text-gray-700">
                                      Fabriqué avec précision et attention aux détails, cette guitare offre un son riche et résonnant.
                                    </p>
                                  </CardContent>
                                </Card>
                            </Link>
                            <Button variant={'destructive'} onClick={() => {setId(guitar.id); setPopupButton(1)}} className='absolute top-4 left-0 right-0 m-auto w-fit'>Supprimer</Button>
                        </div>
            )})}
                <button onClick={newGuitar}>
                    <Card>
                      <Image
                        alt='Nouvelle Guitare'
                        className="rounded-t-lg object-cover w-full"
                        height={300}
                        src='/placeholder.svg'
                        style={{
                          aspectRatio: "400/300",
                          objectFit: "cover",
                        }}
                        width={400}
                      />
                      <CardContent>
                        <h3 className="text-xl font-bold text-gray-900">Ajouter un instrument</h3>
                        <p className="mt-2 text-gray-700">
                          Cliquez pour créer un nouvel instrument a présenter
                        </p>
                      </CardContent>
                    </Card>
                </button>
                { popupButton ? 
                    <div className='fixed flex flex-col top-0 left-0 m-auto w-full h-full justify-center items-center text-white bg-black/60'>
                        <h1>Êtes-vous sur?</h1>
                        <div className='flex flex-row'>
                            <Button variant={'destructive'} onClick={delGuitar} className='m-4'>Supprimer</Button>
                            <Button onClick={() => setPopupButton(0)} className='m-4'>Annuler</Button>
                        </div>
                    </div>
                : <></>}
            </div>
        </section>
    )
}