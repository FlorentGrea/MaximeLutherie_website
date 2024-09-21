'use client'

import { CardContent, Card } from "@/components/ui/card"
import { PlusIcon } from "./ui/icons";
import PocketBase from 'pocketbase';
import { Input } from "./ui/input";
import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { Textarea } from "./ui/textarea";

export default function ArticlesAdmin({ Article, article_nb }: any) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR)
  const [file, setFile] = useState(Article.Images ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images[0] : '')
  const [liveArticle, setLiveArticle] = useState({...Article})
  const [change, setChange] = useState(0)
  const newData = new FormData

  function getFile(event: any) {
    if (event.target.files[0]) {
        const newImage = new FormData
        newData.set('Images', event.target.files[0])
        setFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  function changeText(event: any, type: string) {
    event.preventDefault()
    const tmpArticle = {...liveArticle}
    if (type == 'Title') {
      tmpArticle.Title = event.target.value
    }
    if (type == 'Subtitle') {
      tmpArticle.Subtitle = event.target.value
    }
    setLiveArticle(tmpArticle)
  }

  if (article_nb == 1) {
    return (
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
                  src={file ? file : '/placeholder.svg'}
                />
                <label className='absolute -bottom-[1%] sm:bottom-[32.5%] left-[32.5%] sm:-left-[1%] w-[35%] rounded-lg object-cover aspect-square sm:order-last'>
                    <input type="file" onChange={getFile} accept='image/*' className='hidden' />
                    <PlusIcon className='filter-white' />
                </label>
              </div>
            </div>
            <div className='flex flex-col self-center w-full p-6 space-y-4'>             
              <Textarea placeholder='Titre' value={liveArticle.Title} onChange={(event) => changeText(event, 'Title')} className={`bg-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brandy-punch-950`} />
              <Textarea placeholder='Text' value={liveArticle.Subtitle} onChange={(event) => changeText(event, 'Subtitle')} className={`bg-transparent text-lg text-brandy-punch-600 md:text-xl`} />
            </div>
          </Card>
        </div>
      </section>
  )}

  if (article_nb == 2) {
    return (
      <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Card className='grid grid-cols-1 sm:grid-cols-2 overflow-hidden bg-brandy-punch-200'>
            <div className="relative w-full aspect-square">
              <div className="absolute -top-[40%] sm:-top-[20%] -left-[20%] sm:-left-[40%] rounded-full w-[140%] aspect-square overflow-hidden">
                <Image
                  alt="Atelier de guitares"
                  className="absolute top-[20%] sm:top-[10%] sm:left-[15%] rounded-lg object-cover aspect-square"
                  width={6000}
                  height={6000}
                  src={file ? file : '/placeholder.svg'}
                />
                <label className="absolute top-[20%] sm:top-[10%] sm:left-[15%] rounded-lg object-cover aspect-square">
                    <input type="file" onChange={getFile} accept='image/*' className='hidden' />
                    <PlusIcon className='filter-white' />
                </label>
              </div>
            </div>
            <div className='flex flex-col self-center w-full p-6 space-y-4'>
              <Textarea placeholder='Titre' value={liveArticle.Title} onChange={(event) => changeText(event, 'Title')} className={`bg-transparent text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl`} />
              <Textarea placeholder='Text' value={liveArticle.Subtitle} onChange={(event) => changeText(event, 'Subtitle')} className={`bg-transparent text-brandy-punch-600`} />
            </div>
            <div className="flex flex-col justify-center space-y-4">
            </div>
          </Card>
        </div>
      </section>
  )}

  return (
    <section className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 animate-slide-bottom">
        <Card className='container grid items-center sm:grid-cols-2 sm:gap-10 overflow-hidden bg-brandy-punch-200'>
          <div className="relative w-full aspect-square">
            <div className="absolute -right-[50%] sm:-right-[5%] -top-[110%] sm:-top-[60%] rounded-full w-[200%] aspect-square overflow-hidden">
                <Image
                    alt="Atelier de boîtes de cigares"
                    className="absolute w-[70%] sm:w-[70%] top-[40%] sm:top-[20%] right-[15%] sm:-right-[5%] object-cover aspect-square"
                    width={6000}
                    height={6000}
                    src={file ? file : '/placeholder.svg'}
                />
                <label className="absolute w-[70%] sm:w-[70%] top-[40%] sm:top-[20%] right-[15%] sm:-right-[5%] object-cover aspect-square">
                    <input type="file" onChange={getFile} accept='image/*' className='hidden' />
                    <PlusIcon className='filter-white' />
                </label>
            </div>
          </div>
          <div className='flex flex-col self-center w-full pb-6 sm:pt-6 space-y-4'>
            <Textarea placeholder='Titre' value={liveArticle.Title} onChange={(event) => changeText(event, 'Title')} className={`bg-transparent text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl`} />
            <Textarea placeholder='Text' value={liveArticle.Subtitle} onChange={(event) => changeText(event, 'Subtitle')} className={`bg-transparent text-brandy-punch-600 md:text-xl/relaxed sm:text-base/relaxed xl:text-xl/relaxed`} />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-brandy-punch-500 text-brandy-punch-50 px-8 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="https://wecandoo.fr/atelier/lyon-maxime-cigarbox"
                    target="_blank"
                >
                    En savoir plus
                </Link>
            </div>
          </div>
        </Card>
    </section>
  )
}