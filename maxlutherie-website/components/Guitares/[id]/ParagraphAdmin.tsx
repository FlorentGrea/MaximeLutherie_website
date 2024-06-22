'use client'

import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';

export default function ParagraphAdmin({ newGuitar, setNewGuitar, parTodel, setParToDel, paragraph, index }: any) {
    const [file, setFile] = useState(paragraph.Image ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + newGuitar.collectionId + '/' + newGuitar.id + '/' + paragraph.Image : '')

    function getFile(event: any) {
        if (event.target.files[0]) {
            const newImage = new FormData
            const tmpGuitar = {...newGuitar}
            const tmpDescription = {...newGuitar.Description}
            const tmpParagraphs = [...newGuitar.Description.Paragraphs]
            const tmpOneParagraph = {...newGuitar.Description.Paragraphs[index]}

            newImage.set('Images', event.target.files[0])
            tmpOneParagraph.newImage = newImage
            tmpParagraphs[index] = tmpOneParagraph
            tmpDescription.Paragraphs = tmpParagraphs
            tmpGuitar.Description = tmpDescription
            setNewGuitar(tmpGuitar)
            setFile(URL.createObjectURL(event.target.files[0]))
        }
    }

    function changeText(event: any, textType: any) {
        const tmpGuitar = {...newGuitar}
        const tmpDescription = {...newGuitar.Description}
        const tmpParagraphs = [...newGuitar.Description.Paragraphs]
        const tmpOneParagraph = {...newGuitar.Description.Paragraphs[index]}

        tmpOneParagraph[textType] = event.target.value
        tmpParagraphs[index] = tmpOneParagraph
        tmpDescription.Paragraphs = tmpParagraphs
        tmpGuitar.Description = tmpDescription
        setNewGuitar(tmpGuitar)
    }

    function deleteParagraphs() {
        const tmpGuitar = {...newGuitar}
        const tmpDescription = {...newGuitar.Description}
        const tmpParagraphs = [...newGuitar.Description.Paragraphs]
        let tmpParToDel: any[] = []
        if (parTodel)
            tmpParToDel = [...parTodel]

        tmpParToDel.push(tmpParagraphs[index])
        setParToDel(tmpParToDel)
        tmpParagraphs.splice(index, 1)
        tmpDescription.Paragraphs = tmpParagraphs
        tmpGuitar.Description = tmpDescription
        setNewGuitar(tmpGuitar)
    }

    return (
        <div className='flex flex-col'>
            <Button variant={'destructive'} onClick={deleteParagraphs} className='w-fit m-auto'>Supprimer le paragraphe</Button>
            <Card className={`flex flex-col justify-between my-4 lg:max-h-96 overflow-hidden ${index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                <div className='relative w-full lg:w-[49.5%]'>
                    <Image
                        src={file ? file : '/placeholder.svg'}
                        width={1500}
                        height={1500}
                        alt={paragraph.Title ? paragraph.Title : 'placeholder'}
                        className="object-cover bg-white h-80 lg:h-full"
                    />
                    <label className='absolute flex items-center justify-center top-0 w-full h-full'>
                        <input type="file" onChange={getFile} accept='image/*' className='hidden' />
                        <PlusIcon className='filter-white' />
                    </label>
                </div>
                <CardContent className='flex flex-col content-center w-full lg:w-[49.5%] lg:pt-6'>
                    <Input type='text' placeholder='Titre' value={paragraph.Title} onChange={(event) => changeText(event, 'Title')} className='my-2' />
                    <Input type='text' placeholder='Sous-titre' value={paragraph.Subtitle} onChange={(event) => changeText(event, 'Subtitle')} className='my-2' />
                    <Textarea placeholder='Paragraphe' value={paragraph.Body} onChange={(event) => changeText(event, 'Body')} className='flex-grow min-h-28' />
                </CardContent>
            </Card>
        </div>
    )
}
  