'use client'

import Map from "@/components/Ateliers/GoogleMaps"
import { Card } from "@/components/ui/card"
import * as icons from "@/components/ui/icons"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import PocketBase from 'pocketbase';
import LoadingWheel from "../ui/loadingWheel"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

//can modify

export default function AteliersAdminPage( { Article }: any ) {
    const defArticle = JSON.stringify(Article)
    const defFile1 = Article.image_a1 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.image_a1 : ''
    const defFile2 = Article.img1_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img1_a3 : ''
    const defFile3 = Article.img2_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img2_a3 : ''
    const defFile4 = Article.img3_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img3_a3 : ''
    const defFile5 = Article.img4_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img4_a3 : ''
    const [file1, setFile1] = useState(Article.image_a1 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.image_a1 : '')
    const [file2, setFile2] = useState(Article.img1_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img1_a3 : '')
    const [file3, setFile3] = useState(Article.img2_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img2_a3 : '')
    const [file4, setFile4] = useState(Article.img3_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img3_a3 : '')
    const [file5, setFile5] = useState(Article.img4_a3 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.img4_a3 : '')
    const [liveArticle, setLiveArticle] = useState({...Article})
    const [ changeButton, setChangeButton ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [ newData, setNewData ] = useState(new FormData)
    console.log('bonsoir paris1')

    function getFile(event: any, nb: number) {
      if (event.target.files[0]) {
          if (nb == 1) {
              newData.set('image_a1', event.target.files[0])
              setFile1(URL.createObjectURL(event.target.files[0]))
          } else if (nb == 2) {
              newData.set('img1_a3', event.target.files[0])
              setFile2(URL.createObjectURL(event.target.files[0]))
          } else if (nb == 3) {
            newData.set('img2_a3', event.target.files[0])
            setFile3(URL.createObjectURL(event.target.files[0]))
        } else if (nb == 4) {
            newData.set('img3_a3', event.target.files[0])
            setFile4(URL.createObjectURL(event.target.files[0]))
        } else if (nb == 5) {
            newData.set('img4_a3', event.target.files[0])
            setFile5(URL.createObjectURL(event.target.files[0]))
        }
          setNewData(newData)
      }
    }

    function changeText(event: any, type: string) {
        event.preventDefault()
        const tmpArticle = {...liveArticle}
        tmpArticle[type] = event.target.value
        setLiveArticle(tmpArticle)
    }

    async function handleSubmit() {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR)
        let record: any = []

        setIsLoading(true)
        try {
            newData.set('title_a1', liveArticle.title_a1)
            newData.set('des_a1', liveArticle.des_a1)
            newData.set('link_a1', liveArticle.link_a1)
            newData.set('title_a2', liveArticle.title_a2)
            newData.set('des_a2', liveArticle.des_a2)
            newData.set('adress_a2', liveArticle.adress_a2)
            newData.set('dates_a2', liveArticle.dates_a2)
            newData.set('title_a3', liveArticle.title_a3)
            newData.set('tem1_a3', liveArticle.tem1_a3)
            newData.set('nam1_a3', liveArticle.nam1_a3)
            newData.set('tem2_a3', liveArticle.tem2_a3)
            newData.set('nam2_a3', liveArticle.nam2_a3)
            record = await pb.collection(Article.collectionId).update(Article.id, newData)
        } catch (error) {
            console.error('error modifying file:', error)
        } finally {
            location.reload()
        }
    }

    useEffect(() => {
        if (defArticle != JSON.stringify(liveArticle) || defFile1 != file1 || defFile2 != file2 || defFile3 != file3 || defFile4 != file4 || defFile5 != file5)
            setChangeButton(true)
    }, [defArticle, liveArticle, file1, file2, file3, file4, file5])

    if (isLoading) {
        return (
            <LoadingWheel />
    )}

  return (
    <>
        <section className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 animate-slide-bottom">
            <Card className='container grid items-center sm:grid-cols-2 sm:gap-10 overflow-hidden bg-brandy-punch-200'>
              <div className="relative w-full aspect-square">
                <div className="absolute -right-[50%] sm:-right-[5%] -top-[110%] sm:-top-[60%] rounded-full w-[200%] aspect-square overflow-hidden">
                    <Image
                        alt="Atelier de boîtes de cigares"
                        className="absolute w-[70%] sm:w-[70%] top-[40%] sm:top-[20%] right-[15%] sm:-right-[5%] object-cover aspect-square"
                        width={6000}
                        height={6000}
                        src={file1 ? file1 : '/placeholder.svg'}
                    />
                    <label className='absolute w-[70%] sm:w-[70%] top-[40%] sm:top-[20%] right-[15%] sm:-right-[5%] object-cover aspect-square'>
                        <input type="file" onChange={e => {getFile(e, 1)}} accept='image/*' className='hidden' />
                        <icons.PlusIcon className='filter-white' />
                    </label>
                </div>
              </div>
              <div className='flex flex-col self-center w-full pb-6 sm:pt-6 space-y-4'>             
                <Textarea placeholder='Titre' defaultValue={liveArticle.title_a1} onChange={(event) => changeText(event, 'title_a1')} className={`h-32 bg-transparent text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brandy-punch-950`} />
                <Textarea placeholder='Description' defaultValue={liveArticle.des_a1} onChange={(event) => changeText(event, 'des_a1')} className={`h-44 bg-transparent w-full text-brandy-punch-600 md:text-xl/relaxed sm:text-base/relaxed xl:text-xl/relaxed dark:text-brandy-punch-600`} />
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Input type="text" placeholder="lien" defaultValue={liveArticle.link_a1} onChange={(event) => changeText(event, 'link_a1')} className="inline-flex h-10 items-center justify-center rounded-md bg-brandy-punch-500 text-brandy-punch-50 px-8 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"></Input>
                </div>
              </div>
            </Card>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 animate-slide-bottom-d1">
            <Card className='container p-0 grid items-center sm:grid-cols-2 sm:gap-10 overflow-hidden bg-brandy-punch-900'>
              <div className="w-full sm:order-last sm:pr-6 lg:p-0">
                    <Map />
              </div>
              <div className='flex flex-col self-center w-full p-6 space-y-4'>
                <div className="space-y-4">                
                    <Textarea placeholder='Titre' defaultValue={liveArticle.title_a2} onChange={(event) => changeText(event, 'title_a2')} className={`bg-transparent text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brandy-punch-50`} />
                    <Textarea placeholder='Description' defaultValue={liveArticle.des_a2} onChange={(event) => changeText(event, 'des_a2')} className={`h-36 bg-transparent text-brandy-punch-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`} />
                    <div className="grid gap-4 text-brandy-punch-50">
                        <div className="flex items-center gap-2">
                            <icons.LocalisationIcon className="h-6 w-6 text-brandy-punch-50" />
                            <Input placeholder='Description' defaultValue={liveArticle.adress_a2} onChange={(event) => changeText(event, 'adress_a2')} className={`bg-transparent`} />
                        </div>
                        <div className="flex items-center gap-2">
                            <icons.CalendarIcon className="h-6 w-6 text-brandy-punch-50" />
                            <Input placeholder='Description' defaultValue={liveArticle.dates_a2} onChange={(event) => changeText(event, 'dates_a2')} className={`bg-transparent`} />
                        </div>
                    </div>
                </div>
              </div>
            </Card>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 animate-slide-bottom-d2">
            <Card className='container grid items-center lg:grid-cols-2 lg:gap-10 overflow-hidden bg-brandy-punch-200'><div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 pt-6 lg:pt-0">
                        <div className="relative">
                            <Image
                                alt="Guitare en boîte de cigares 1"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src={file2 ? file2 : '/placeholder.svg'}
                            />
                            <label className='absolute top-0 w-full h-full mx-auto rounded-xl object-cover object-center'>
                                <input type="file" onChange={e => {getFile(e, 2)}} accept='image/*' className='hidden' />
                                <icons.PlusIcon className='filter-white' />
                            </label>
                        </div>
                        <div className="relative">
                            <Image
                                alt="Guitare en boîte de cigares 1"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src={file3 ? file3 : '/placeholder.svg'}
                            />
                            <label className='absolute top-0 w-full h-full mx-auto rounded-xl object-cover object-center'>
                                <input type="file" onChange={e => {getFile(e, 3)}} accept='image/*' className='hidden' />
                                <icons.PlusIcon className='filter-white' />
                            </label>
                        </div>
                        <div className="relative">
                            <Image
                                alt="Guitare en boîte de cigares 1"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src={file4 ? file4 : '/placeholder.svg'}
                            />
                            <label className='absolute top-0 w-full h-full mx-auto rounded-xl object-cover object-center'>
                                <input type="file" onChange={e => {getFile(e, 4)}} accept='image/*' className='hidden' />
                                <icons.PlusIcon className='filter-white' />
                            </label>
                        </div>
                        <div className="relative">
                            <Image
                                alt="Guitare en boîte de cigares 1"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src={file5 ? file5 : '/placeholder.svg'}
                            />
                            <label className='absolute top-0 w-full h-full mx-auto rounded-xl object-cover object-center'>
                                <input type="file" onChange={e => {getFile(e, 5)}} accept='image/*' className='hidden' />
                                <icons.PlusIcon className='filter-white' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="py-6 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brandy-punch-950">Témoignages</h2>
                    <div className="rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800">
                        <blockquote className="space-y-2">
                            <p className="text-brandy-punch-500">
                                <Textarea placeholder='Texte témoignage' defaultValue={liveArticle.tem1_a3} onChange={(event) => changeText(event, 'tem1_a3')} className={`h-32 bg-transparent border-none`} />
                            </p>
                            <cite className="not-italic font-medium text-brandy-punch-950">                               
                                <Input placeholder='Texte témoignage' defaultValue={liveArticle.nam1_a3} onChange={(event) => changeText(event, 'nam1_a3')} className={`bg-transparent border-none h-2`} />
                            </cite>
                        </blockquote>
                    </div>
                    <div className="rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800">
                        <blockquote className="space-y-2">
                            <p className="text-brandy-punch-500 mb-2">
                                <Textarea placeholder='Texte témoignage' defaultValue={liveArticle.tem2_a3} onChange={(event) => changeText(event, 'tem2_a3')} className={`h-32 bg-transparent border-none`} />
                            </p>
                            <cite className="flex flex-row not-italic font-medium text-brandy-punch-950 h-4">
                                <Input placeholder='Nom du témoin' defaultValue={liveArticle.nam2_a3} onChange={(event) => changeText(event, 'nam2_a3')} className={`bg-transparent border-none h-1`} />
                            </cite>
                        </blockquote>
                    </div>
                </div>
            </Card>
        </section>
        { changeButton &&
            <div className='sticky flex flex-row bottom-5 w-full justify-center align-middle animate-slide-bottom-d1'>
                <Button onClick={handleSubmit} className='mx-5 bg-brandy-punch-500 text-brandy-punch-50'>Sauvegarder</Button>
                <Button variant={'outline'} onClick={() => {setIsLoading(true); window.location.reload()}} className='mx-5'>Reinitialiser</Button>
            </div>
        }
    </>
  )
}