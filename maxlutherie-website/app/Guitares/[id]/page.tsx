import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GuitarAdminPage from "@/components/Guitares/[id]/GuitarAdminPage";

export default async function GuitarCardPage({ params }: any) {
    const pb = new PocketBase(process.env.DB_ADDR)
    const session = await getSession();
    const user = session?.user;
    
    if (params.id == 'new_instrument' && user)
        return (<GuitarAdminPage guitar={null} />)

    const guitar = await pb.collection('Guitar_List').getOne(params.id, { cache: 'no-store' })
    const mainImg = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_main
    const parImg1 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a1
    const parImg2 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a2
    const parImg3 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a3
    const parImg4 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a4
    const parImg5 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a5
    const parImg6 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a6
    const parImg7 = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.img_a7

    if (user)
        return (<GuitarAdminPage guitar={guitar} />)

    return (
        <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
                <Card className='relative h-96 overflow-hidden'>
                    <Image
                        src={guitar.img_main ? mainImg : '/placeholder.svg'}
                        width={1500}
                        height={1500}
                        alt={guitar.title_main}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute h-full w-full top-0 bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0"/>
                    <CardContent className='absolute flex items-center bottom-0 w-full h-[20%] pl-4 bg-gradient-to-t from-black/80'>
                        <h1 className="text-brandy-punch-50 text-xl">{guitar.title_main}</h1>
                    </CardContent>
                </Card>
                { guitar.img_a1 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                        <div className={`relative w-full aspect-square`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a1 ? parImg1 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a1 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-950`}>{ guitar.title_a1 }</h1> }
                            { guitar.subtitle_a1 && <h2 className={`text-xl my-2 text-brandy-punch-600`}>{ guitar.subtitle_a1 }</h2> }
                            <p className={`flex-grow text-brandy-punch-950`}>{ guitar.des_a1 }</p>
                        </div>
                    </Card>
                : <></>}
                { guitar.img_a2 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-900'`}>
                        <div className={`relative w-full aspect-square lg:order-last`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a2 ? parImg2 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a2 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-50`}>{ guitar.title_a2 }</h1> }
                            { guitar.subtitle_a2 && <h2 className={`text-xl my-2 text-brandy-punch-200`}>{ guitar.subtitle_a2 }</h2> }
                            <p className={`flex-grow text-brandy-punch-50`}>{ guitar.des_a2 }</p>
                        </div>
                    </Card>
                : <></>}
                { guitar.img_a3 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                        <div className={`relative w-full aspect-square`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a3 ? parImg3 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a3 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-950`}>{ guitar.title_a3 }</h1> }
                            { guitar.subtitle_a3 && <h2 className={`text-xl my-2 text-brandy-punch-600`}>{ guitar.subtitle_a3 }</h2> }
                            <p className={`flex-grow text-brandy-punch-950`}>{ guitar.des_a3 }</p>
                        </div>
                    </Card>
                : <></>}
                { guitar.img_a4 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-900'`}>
                        <div className={`relative w-full aspect-square lg:order-last`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a4 ? parImg4 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a4 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-50`}>{ guitar.title_a4 }</h1> }
                            { guitar.subtitle_a4 && <h2 className={`text-xl my-2 text-brandy-punch-200`}>{ guitar.subtitle_a4 }</h2> }
                            <p className={`flex-grow text-brandy-punch-50`}>{ guitar.des_a4 }</p>
                        </div>
                    </Card>
                : <></>}
                { guitar.img_a5 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                        <div className={`relative w-full aspect-square`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a5 ? parImg5 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a5 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-950`}>{ guitar.title_a5 }</h1> }
                            { guitar.subtitle_a5 && <h2 className={`text-xl my-2 text-brandy-punch-600`}>{ guitar.subtitle_a5 }</h2> }
                            <p className={`flex-grow text-brandy-punch-950`}>{ guitar.des_a5 }</p>
                        </div>
                    </Card>
                : <></>}
                { guitar.img_a6 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-900'`}>
                        <div className={`relative w-full aspect-square lg:order-last`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a6 ? parImg6 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a6 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-50`}>{ guitar.title_a6 }</h1> }
                            { guitar.subtitle_a6 && <h2 className={`text-xl my-2 text-brandy-punch-200`}>{ guitar.subtitle_a6 }</h2> }
                            <p className={`flex-grow text-brandy-punch-50`}>{ guitar.des_a6 }</p>
                        </div>
                    </Card>
                : <></>}
                { guitar.img_a7 ? 
                    <Card className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-brandy-punch-200`}>
                        <div className={`relative w-full aspect-square`}>
                            <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] -right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]`}
                            >
                                <Image
                                    src={guitar.img_a7 ? parImg7 : '/placeholder.svg'}
                                    width={1500}
                                    height={1500}
                                    alt={guitar.title_main}
                                    className={`absolute object-cover aspect-square w-[27%] lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                            { guitar.title_a7 && <h1 className={`text-xl font-bold my-2 text-brandy-punch-950`}>{ guitar.title_a7 }</h1> }
                            { guitar.subtitle_a7 && <h2 className={`text-xl my-2 text-brandy-punch-600`}>{ guitar.subtitle_a7 }</h2> }
                            <p className={`flex-grow text-brandy-punch-950`}>{ guitar.des_a7 }</p>
                        </div>
                    </Card>
                : <></>}
                <Link href={{ pathname: '/Contact', query: { id: guitar.id }}} className="mt-4 mx-auto">
                    <Button className="bg-brandy-punch-500 text-brandy-punch-50">
                        Commander / Prendre contact
                    </Button>
                </Link>
            </div>
        </section>
    )
}
  