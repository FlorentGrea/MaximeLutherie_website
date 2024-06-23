'use client'

import LoadingWheel from '@/components/ui/loadingWheel';
import ParagraphAdmin from './ParagraphAdmin';
import MainPartAdmin from './MainPartAdmin';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

//suprimer un paragraphe

export default function GuitarAdminPage({ guitar }: any) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR)
    const defaultGuitar = JSON.stringify(guitar)
    const [ changeButton, setChangeButton ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [parToDel, setParToDel] = useState<any[]>([])
    if (!guitar) {
        guitar = {
            Description: {
                Title: '',
                Image: '',
                Parahraphs: []
            },
        }
    }
    const [newGuitar, setNewGuitar] = useState({...guitar})

    function addParagraph() {
        const newParagraph = {...newGuitar}
        newParagraph.Description.Paragraphs.push({
            Title: '',
            Subtitle: '',
            Image: '',
            Body: ''
        })
        setNewGuitar(newParagraph)
    }

    //When an image is added to pocketbase, his name is changed with a unique name to prevent duplicated.
    //handlesubmit will get the name of the image in the formData added in newImage,
    //then search the new name added and change the image key associated by the new name.
    //
    //finally, the Description is sent so all data is correctly implemented

    async function postImages(object: any) {
        let record: any = []

        if (object.newImage) {
            if (object.Image)
                await pb.collection(newGuitar.collectionId).update(newGuitar.id, {'Images-': object.Image})
            let parts = object.newImage.get('Images').name.split('.')
            parts = parts[0].split(' ')
            record = await pb.collection(newGuitar.collectionId).update(newGuitar.id, object.newImage)
            await record.Images.map((image: string) => {
                console.log('parts = ', parts[0].toLowerCase())
                console.log('image = ', image)
                if (image.startsWith(parts[0].toLowerCase()))
                    object.Image = image
            })
            delete object.newImage
        }
    }

    async function handleSubmit() {
        let record: any = []

        setIsLoading(true)
        try {
            await postImages(newGuitar.Description)
            for (let i = 0; newGuitar.Description.Paragraphs[i]; i++)
                await postImages(newGuitar.Description.Paragraphs[i])
            for (let i = 0; parToDel[i]; i++) {
                if (parToDel[i].Image)
                    await pb.collection(newGuitar.collectionId).update(newGuitar.id, {'Images-': parToDel[i].Image})
            }
            const newData = new FormData
            newData.set('Description', JSON.stringify(newGuitar.Description))
            newData.set('Title', newGuitar.Description.Title)
            record = await pb.collection(newGuitar.collectionId).update(newGuitar.id, newData)
        } catch (error) {
            console.error('error modifying file:', error)
        } finally {
            location.reload()
        }
    }

    useEffect(() => {
        if (defaultGuitar !== JSON.stringify(newGuitar))
            setChangeButton(true)
    }, [newGuitar, defaultGuitar])

    if (isLoading) {
        return (
            <LoadingWheel />
    )}

    return (
        <section className='w-full py-4 md:py-6 lg:py-8'>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
                <MainPartAdmin newGuitar={newGuitar} setNewGuitar={setNewGuitar} />
                { newGuitar.Description.Paragraphs.map((paragraph: any, index: number) => {
                    if (paragraph)
                        return (
                            <ParagraphAdmin key={index} newGuitar={newGuitar} setNewGuitar={setNewGuitar} parToDel={parToDel} setParToDel={setParToDel} paragraph={paragraph} index={index} />
                )})}
                <Button onClick={addParagraph} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                { changeButton &&
                    <div className='sticky flex flex-row bottom-5 w-full justify-center align-middle animate-slide-bottom-d1'>
                        <Button onClick={handleSubmit} className='mx-5 bg-brandy-punch-500 text-brandy-punch-50'>Sauvegarder</Button>
                        <Button variant={'outline'} onClick={() => {setIsLoading(true); window.location.reload()}} className='mx-5'>Reinitialiser</Button>
                    </div>
                }
            </div>
        </section>
    )
}