'use client'

import { CardContent, Card } from "@/components/ui/card"
import PocketBase from 'pocketbase';
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { PlusIcon } from "./ui/icons";
import { Button } from "./ui/button";
import LoadingWheel from "./ui/loadingWheel";

export default function HomePageAdmin({Article, guitarList}: any) {
    const defArticle = JSON.stringify(Article)
    const defFile1 = Article.Images_a1 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images_a1 : ''
    const defFile2 = Article.Images_a2 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images_a2 : ''
    const [file1, setFile1] = useState(Article.Images_a1 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images_a1 : '')
    const [file2, setFile2] = useState(Article.Images_a2 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images_a2 : '')
    const [liveArticle, setLiveArticle] = useState({...Article})
    const [ changeButton, setChangeButton ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [ newData, setNewData ] = useState(new FormData)

    function getFile(event: any, nb: number) {
      if (event.target.files[0]) {
          if (nb == 1) {
              newData.set('Images_a1', event.target.files[0])
              setFile1(URL.createObjectURL(event.target.files[0]))
          } else {
              newData.set('Images_a2', event.target.files[0])
              setFile2(URL.createObjectURL(event.target.files[0]))
          }
          setNewData(newData)
      }
    }

    function changeText(event: any, type: string, nb: number) {
        event.preventDefault()
        const tmpArticle = {...liveArticle}
        if (type == 'Title' && nb == 1) {
            tmpArticle.Title_a1 = event.target.value
        } else if (type == 'Title' && nb == 2) {
            tmpArticle.Title_a2 = event.target.value
        }
        if (type == 'Subtitle' && nb == 1) {
            tmpArticle.Subtitle_a1 = event.target.value
        } else if (type == 'Subtitle' && nb == 2) {
            tmpArticle.Subtitle_a2 = event.target.value
        }
        setLiveArticle(tmpArticle)
    }

    async function handleSubmit() {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR)
        let record: any = []

        setIsLoading(true)
        try {
            newData.set('Title_a1', liveArticle.Title_a1)
            newData.set('Title_a2', liveArticle.Title_a2)
            newData.set('Subtitle_a1', liveArticle.Subtitle_a1)
            newData.set('Subtitle_a2', liveArticle.Subtitle_a2)
            record = await pb.collection(Article.collectionId).update(Article.id, newData)
        } catch (error) {
            console.error('error modifying file:', error)
        } finally {
            location.reload()
        }
    }

    useEffect(() => {
        if (defArticle != JSON.stringify(liveArticle) || defFile1 != file1 || defFile2 != file2)
            setChangeButton(true)
    }, [defArticle, liveArticle, file1, file2])

    if (isLoading) {
        return (
            <LoadingWheel />
    )}

  return (
    <main>
        <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <Card className='grid grid-cols-1 sm:grid-cols-2 overflow-hidden bg-brandy-punch-200'>
                    <div className="relative w-full aspect-square sm:order-last">
                        <div className="absolute -right-[100%] sm:-right-[0%] sm:left-0 -top-[200%] sm:-top-[100%] w-[300%] rounded-full aspect-square overflow-hidden">
                            <Image
                                alt="Guitare faite à la main"
                                className="absolute -bottom-[1%] sm:bottom-[32.5%] left-[32.5%] sm:-left-[1%] w-[35%] rounded-lg object-cover aspect-square sm:order-last"
                                width={6000}
                                height={6000}
                                src={file1 ? file1 : '/placeholder.svg'}
                            />
                            <label className='absolute -bottom-[1%] sm:bottom-[32.5%] left-[32.5%] sm:-left-[1%] w-[35%] rounded-lg object-cover aspect-square sm:order-last'>
                                <input type="file" onChange={e => {getFile(e, 1)}} accept='image/*' className='hidden' />
                                <PlusIcon className='filter-white' />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col self-center w-full p-6 space-y-4'>             
                      <Textarea placeholder='Titre' defaultValue={liveArticle.Title_a1} onChange={(event) => changeText(event, 'Title', 1)} className={`bg-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brandy-punch-950 h-40`} />
                      <Textarea placeholder='Text' defaultValue={liveArticle.Subtitle_a1} onChange={(event) => changeText(event, 'Subtitle', 1)} className={`bg-transparent text-lg text-brandy-punch-600 md:text-xl h-40`} />
                    </div>
                </Card>
            </div>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <h2 className="mb-8 text-center text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl">
                  Nos modèles de guitares
                </h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    { guitarList.map((guitar: any, index: number) => {
                        const imageUrl = process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_main
                        
                        return (
                            <Link key={guitar.id} href={`/Guitares/${guitar.id}`}>
                                <Card className={`relative overflow-hidden h-96 animate-slide-bottom-d2`}>
                                    <Image
                                        alt={guitar.title_main}
                                        className="absolute w-full h-full rounded-t-lg object-cover aspect-[4/3] z-0"
                                        height={300}
                                        width={400}
                                        src={guitar.img_main ? imageUrl : "/placeholder.svg"}
                                    />
                                    <div className="absolute h-full w-full bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0 z-10"/>
                                    <CardContent className="absolute bottom-0 z-20">
                                        <h3 className="text-2xl font-bold text-brandy-punch-50">{guitar.title_main}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                    )})}
                </div>
            </div>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <Card className='grid grid-cols-1 sm:grid-cols-2 overflow-hidden bg-brandy-punch-200'>
                    <div className="relative w-full aspect-square">
                        <div className="absolute -right-[100%] sm:right-0 -top-[200%] sm:-top-[100%] w-[300%] rounded-full aspect-square overflow-hidden">
                            <Image
                                alt="Atelier de guitares"
                                className="absolute -bottom-[1%] sm:bottom-[32.5%] right-[32.5%] sm:-right-[1%] w-[35%] rounded-lg object-cover aspect-square"
                                width={6000}
                                height={6000}
                                src={file2 ? file2 : '/placeholder.svg'}
                            />
                            <label className='absolute -bottom-[1%] sm:bottom-[32.5%] right-[32.5%] sm:-right-[1%] w-[35%] rounded-lg object-cover aspect-square'>
                                <input type="file" onChange={e => {getFile(e, 2)}} accept='image/*' className='hidden' />
                                <PlusIcon className='filter-white' />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col self-center w-full p-6 space-y-4'>             
                      <Textarea placeholder='Titre' defaultValue={liveArticle.Title_a2} onChange={(event) => changeText(event, 'Title', 2)} className={`bg-transparent text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl h-40`} />
                      <Textarea placeholder='Text' defaultValue={liveArticle.Subtitle_a2} onChange={(event) => changeText(event, 'Subtitle', 2)} className={`bg-transparent text-brandy-punch-600 h-40`} />
                    </div>
                </Card>
            </div>
        </section>
        { changeButton &&
            <div className='sticky flex flex-row bottom-5 w-full justify-center align-middle animate-slide-bottom-d1'>
                <Button onClick={handleSubmit} className='mx-5 bg-brandy-punch-500 text-brandy-punch-50'>Sauvegarder</Button>
                <Button variant={'outline'} onClick={() => {setIsLoading(true); window.location.reload()}} className='mx-5'>Reinitialiser</Button>
            </div>
        }
    </main>
  )
}