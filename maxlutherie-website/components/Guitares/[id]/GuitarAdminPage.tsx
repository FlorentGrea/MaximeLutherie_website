'use client'

import LoadingWheel from '@/components/ui/loadingWheel';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function GuitarAdminPage({ guitar }: any) {
    const router = useRouter()
    const isNew = guitar ? 0 : 1
    if (!guitar) {
        guitar = {
            img_main: '', title_main: '',
            img_a1: '', title_a1: '', subtitle_a1: '', des_a1: '',
            img_a2: '', title_a2: '', subtitle_a2: '', des_a2: '',
            img_a3: '', title_a3: '', subtitle_a3: '', des_a3: '',
            img_a4: '', title_a4: '', subtitle_a4: '', des_a4: '',
            img_a5: '', title_a5: '', subtitle_a5: '', des_a5: '',
            img_a6: '', title_a6: '', subtitle_a6: '', des_a6: '',
            img_a7: '', title_a7: '', subtitle_a7: '', des_a7: '',
        }
    }
    const [ changeButton, setChangeButton ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const form = new FormData
    const keys = Object.keys(guitar)
    keys.map((key) => {
        form.set(key, guitar[key])
    })
    var count = 0
    if (guitar.img_a7 || guitar.title_a7 || guitar.subtitle_a7 || guitar.des_a7) {
        count = 7
    } else if (guitar.img_a6 || guitar.title_a6 || guitar.subtitle_a6 || guitar.des_a6) {
        count = 6
    } else if (guitar.img_a5 || guitar.title_a5 || guitar.subtitle_a5 || guitar.des_a5) {
        count = 5
    } else if (guitar.img_a4 || guitar.title_a4 || guitar.subtitle_a4 || guitar.des_a4) {
        count = 4
    } else if (guitar.img_a3 || guitar.title_a3 || guitar.subtitle_a3 || guitar.des_a3) {
        count = 3
    } else if (guitar.img_a2 || guitar.title_a2 || guitar.subtitle_a2 || guitar.des_a2) {
        count = 2
    } else if (guitar.img_a1 || guitar.title_a1 || guitar.subtitle_a1 || guitar.des_a1) {
        count = 1
    }
    const [paragraphCount, setParagraphCount] = useState(count)
    keys.map((key) => {
        if (key.startsWith('img'))
            guitar[key] = guitar[key] ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar[key] : ''
    })
    const defaultGuitar = JSON.stringify(guitar)
    const [newGuitar, setNewGuitar] = useState({...guitar})
    const [postGuitar, setPostGuitar] = useState(form)

    function getFile(event: any, type: string) {
        if (event.target.files[0]) {
            const tmpGuitar = {...newGuitar}
            tmpGuitar[type] = URL.createObjectURL(event.target.files[0])
            setNewGuitar(tmpGuitar)
            postGuitar.set(type, event.target.files[0])
            setPostGuitar(postGuitar)
        }
    }

    function changeText(event: any, type: string) {
        const tmpGuitar = {...newGuitar}
        tmpGuitar[type] = event.target.value
        setNewGuitar(tmpGuitar)
        postGuitar.set(type, event.target.value)
        setPostGuitar(postGuitar)
    }

    async function handleSubmit() {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR)

        setIsLoading(true)
        try {
            if (isNew)
                await pb.collection(process.env.NEXT_PUBLIC_COLLECTION_ID!).create(postGuitar)
            else
                await pb.collection(process.env.NEXT_PUBLIC_COLLECTION_ID!).update(newGuitar.id, postGuitar)
        } catch (error) {
            console.error('error modifying file:', error)
        } finally {
            if (isNew)
                router.push('/Guitares')
            else
                location.reload()
        }
    }

    useEffect(() => {
        if (defaultGuitar !== JSON.stringify(newGuitar))
            setChangeButton(true)
    }, [newGuitar, defaultGuitar])

    function deleteParagraph(nb: number) {
        newGuitar['img_a' + nb] = ''
        newGuitar['title_a' + nb] = ''
        newGuitar['subtitle_a' + nb] = ''
        newGuitar['des_a' + nb] = ''
        setNewGuitar(newGuitar)
        postGuitar.set('img_a' + nb, '')
        postGuitar.set('title_a' + nb, '')
        postGuitar.set('subtitle_a' + nb, '')
        postGuitar.set('des_a' + nb, '')
        setPostGuitar(postGuitar)
        setParagraphCount(paragraphCount - 1)
    }

    if (isLoading) {
        return (
            <LoadingWheel />
    )}

    return (
        <section className='w-full py-4 md:py-6 lg:py-8'>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
                <Card className='relative h-[80vh] overflow-hidden mb-5'>
                    <Image
                        src={newGuitar.img_main ? newGuitar.img_main : '/placeholder.svg'}
                        width={1500}
                        height={1500}
                        alt={newGuitar.Title ? newGuitar.Title : 'placeholder'}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute h-full w-full top-0 bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0"/>
                    <label className='absolute flex items-center justify-center top-0 w-full h-full'>
                        <input type="file" onChange={(e) => getFile(e, 'img_main')} accept='image/*' className='hidden' />
                    </label>
                    <CardContent className='absolute flex items-center bottom-0 w-full h-[20%] pl-4 bg-gradient-to-t from-black/60'>
                        <Input type='text' placeholder='Titre' value={newGuitar.title_main} onChange={(e) => changeText(e, 'title_main')} className='bg-transparent text-white'/>
                    </CardContent>
                </Card>
                { paragraphCount == 0 ? 
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 0 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                                <div className={`relative w-full aspect-square`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a1 ? newGuitar.img_a1 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a1 ? newGuitar.title_a1 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a1')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a1} onChange={(event) => changeText(event, 'title_a1')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-950`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a1} onChange={(event) => changeText(event, 'subtitle_a1')} className={`bg-transparent text-xl my-2 text-brandy-punch-600`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a1} onChange={(event) => changeText(event, 'des_a1')} className={`bg-transparent h-60 flex-grow text-brandy-punch-950`} />
                                </div>
                            </Card>
                            { paragraphCount == 1 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(1)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
                { paragraphCount == 1 ?
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 1 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-900`}>
                                <div className={`relative w-full aspect-square lg:order-last`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a2 ? newGuitar.img_a2 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a2 ? newGuitar.title_a2 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a2')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a2} onChange={(event) => changeText(event, 'title_a2')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-50`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a2} onChange={(event) => changeText(event, 'subtitle_a2')} className={`bg-transparent text-xl my-2 text-brandy-punch-200`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a2} onChange={(event) => changeText(event, 'des_a2')} className={`bg-transparent h-60 flex-grow text-brandy-punch-50`} />
                                </div>
                            </Card>
                            { paragraphCount == 2 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(2)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
                { paragraphCount == 2 ?
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 2 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                                <div className={`relative w-full aspect-square`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a3 ? newGuitar.img_a3 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a3 ? newGuitar.title_a3 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a3')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a3} onChange={(event) => changeText(event, 'title_a3')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-950`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a3} onChange={(event) => changeText(event, 'subtitle_a3')} className={`bg-transparent text-xl my-2 text-brandy-punch-600`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a3} onChange={(event) => changeText(event, 'des_a3')} className={`bg-transparent h-60 flex-grow text-brandy-punch-950`} />
                                </div>
                            </Card>
                            { paragraphCount == 3 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(3)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
                { paragraphCount == 3 ?
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 3 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-900`}>
                                <div className={`relative w-full aspect-square lg:order-last`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a4 ? newGuitar.img_a4 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a4 ? newGuitar.title_a4 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a4')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a4} onChange={(event) => changeText(event, 'title_a4')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-50`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a4} onChange={(event) => changeText(event, 'subtitle_a4')} className={`bg-transparent text-xl my-2 text-brandy-punch-200`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a4} onChange={(event) => changeText(event, 'des_a4')} className={`bg-transparent h-60 flex-grow text-brandy-punch-50`} />
                                </div>
                            </Card>
                            { paragraphCount == 4 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(4)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
                { paragraphCount == 4 ?
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 4 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                                <div className={`relative w-full aspect-square`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a5 ? newGuitar.img_a5 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a5 ? newGuitar.title_a5 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a5')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a5} onChange={(event) => changeText(event, 'title_a5')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-950`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a5} onChange={(event) => changeText(event, 'subtitle_a5')} className={`bg-transparent text-xl my-2 text-brandy-punch-600`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a5} onChange={(event) => changeText(event, 'des_a5')} className={`bg-transparent h-60 flex-grow text-brandy-punch-950`} />
                                </div>
                            </Card>
                            { paragraphCount == 5 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(5)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
                { paragraphCount == 5 ?
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 5 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-900`}>
                                <div className={`relative w-full aspect-square lg:order-last`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a6 ? newGuitar.img_a6 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a6 ? newGuitar.title_a6 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a6')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a6} onChange={(event) => changeText(event, 'title_a6')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-50`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a6} onChange={(event) => changeText(event, 'subtitle_a6')} className={`bg-transparent text-xl my-2 text-brandy-punch-200`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a6} onChange={(event) => changeText(event, 'des_a6')} className={`bg-transparent h-60 flex-grow text-brandy-punch-50`} />
                                </div>
                            </Card>
                            { paragraphCount == 6 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(6)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
                { paragraphCount == 6 ?
                    <Button onClick={() => setParagraphCount(paragraphCount + 1)} className='w-fit m-auto mb-4 bg-brandy-punch-500 text-brandy-punch-50'>Ajouter un Paragraphe</Button>
                : <></>}
                { paragraphCount > 6 ?
                    <>
                        <div className='flex flex-col mb-4'>
                            <Card className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                                <div className={`relative w-full aspect-square`}>
                                    <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                                    >
                                        <Image
                                            src={newGuitar.img_a7 ? newGuitar.img_a7 : '/placeholder.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={newGuitar.title_a7 ? newGuitar.title_a7 : 'placeholder'}
                                            className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        />
                                        <label className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                        >
                                            <input type="file" onChange={(e) => getFile(e, 'img_a7')} accept='image/*' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                    <Input type='text' placeholder='Titre' value={newGuitar.title_a7} onChange={(event) => changeText(event, 'title_a7')} className={`bg-transparent text-xl font-bold my-2 text-brandy-punch-50`} />
                                    <Input type='text' placeholder='Sous-titre' value={newGuitar.subtitle_a7} onChange={(event) => changeText(event, 'subtitle_a7')} className={`bg-transparent text-xl my-2 text-brandy-punch-200`} />
                                    <Textarea placeholder='Paragraphe' value={newGuitar.des_a7} onChange={(event) => changeText(event, 'des_a7')} className={`bg-transparent h-60 flex-grow text-brandy-punch-50`} />
                                </div>
                            </Card>
                            { paragraphCount == 7 ? 
                                <Button variant={'destructive'} onClick={(e) => deleteParagraph(7)} className='w-fit m-auto mt-4'>Supprimer le paragraphe</Button>
                            : <></>}
                        </div>
                    </>
                : <></>}
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