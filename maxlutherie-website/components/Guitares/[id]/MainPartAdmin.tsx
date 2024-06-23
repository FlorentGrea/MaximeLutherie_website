'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusIcon } from '@/components/ui/icons';

export default function MainPartAdmin({ newGuitar, setNewGuitar }: any) {
    const [file, setFile] = useState(newGuitar.Description.Image ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + newGuitar.collectionId + '/' + newGuitar.id + '/' + newGuitar.Description.Image : '')

    function getFile(event: any) {
        if (event.target.files[0]) {
            const newImage = new FormData
            const tmpGuitar = {...newGuitar}
            const tmpDescription = {...newGuitar.Description}

            newImage.append('Images', event.target.files[0])
            tmpDescription.newImage = newImage
            tmpGuitar.Description = tmpDescription
            setNewGuitar(tmpGuitar)
            setFile(URL.createObjectURL(event.target.files[0]))
        }
    }

    function changeText(event: any) {
        const tmpGuitar = {...newGuitar}
        const tmpDescription = {...newGuitar.Description}

        tmpDescription.Title = event.target.value
        tmpGuitar.Description = tmpDescription
        setNewGuitar(tmpGuitar)
    }

    return (
        <div className="mb-5">
            <Card className='relative h-96 overflow-hidden'>
                <Image
                    src={file ? file : '/placeholder.svg'}
                    width={1500}
                    height={1500}
                    alt={newGuitar.Title ? newGuitar.Title : 'placeholder'}
                    className="object-cover w-full h-full"
                />
                <label className='absolute flex items-center justify-center top-0 w-full h-full'>
                    <input type="file" onChange={getFile} accept='image/*' className='hidden' />
                    <PlusIcon className='filter-white' />
                </label>
                <div className="absolute h-full w-full top-0 bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0"/>
                <CardContent className='absolute flex items-center bottom-0 w-full h-[20%] pl-4 bg-gradient-to-t from-black/60'>
                    <Input type='text' placeholder='Titre' value={newGuitar.Description.Title} onChange={(event) => changeText(event)} className='bg-transparent text-white'/>
                </CardContent>
            </Card>
        </div>
    );
}