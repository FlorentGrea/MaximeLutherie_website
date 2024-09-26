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
        <div className='flex flex-col mb-4'>
            <Card key={index} className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden ${index % 2 ? 'bg-brandy-punch-900' : 'bg-brandy-punch-200'}`}>
                <div className={`relative w-full aspect-square ${index % 2 && 'lg:order-last'}`}>
                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] 
                        ${index % 2 ?
                            '-right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]' :
                            '-right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]'
                        }`}
                    >
                        <Image
                            src={file ? file : '/placeholder.svg'}
                            width={1500}
                            height={1500}
                            alt={paragraph.Title ? paragraph.Title : 'placeholder'}
                            className={`absolute object-cover aspect-square w-[27%] 
                                ${index % 2 ?
                                    'lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]' :
                                    'lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]'
                                }`}
                        />
                        <label className={`absolute object-cover aspect-square w-[27%] 
                            ${index % 2 ?
                                'lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]' :
                                'lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]'
                            }`}
                        >
                            <input type="file" onChange={getFile} accept='image/*' className='hidden' />
                            <PlusIcon className='filter-white' />
                        </label>
                    </div>
                </div>
                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                    <Input type='text' placeholder='Titre' value={paragraph.Title} onChange={(event) => changeText(event, 'Title')} className={`bg-transparent text-xl font-bold my-2 ${index % 2 ? 'text-brandy-punch-50' : 'text-brandy-punch-950'}`} />
                    <Input type='text' placeholder='Sous-titre' value={paragraph.Subtitle} onChange={(event) => changeText(event, 'Subtitle')} className={`bg-transparent text-xl my-2 ${index % 2 ? 'text-brandy-punch-200' : 'text-brandy-punch-600'}`} />
                    <Textarea placeholder='Paragraphe' value={paragraph.Body} onChange={(event) => changeText(event, 'Body')} className={`bg-transparent h-60 flex-grow ${index % 2 ? 'text-brandy-punch-50' : 'text-brandy-punch-950'}`} />
                </div>
            </Card>
            <Button variant={'destructive'} onClick={deleteParagraphs} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
        </div>
    )
}
  