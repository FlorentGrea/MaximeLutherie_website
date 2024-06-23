import GuitarAdminPage from "@/components/Guitares/[id]/GuitarAdminPage";
import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function GuitarCardPage({ params }: any) {
    const pb = new PocketBase(process.env.DB_ADDR)
    const guitar = await pb.collection('Guitars').getOne(params.id, { cache: 'no-store' })
    const session = await getSession();
    const user = session?.user;
    const mainImg = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.Description.Image

    if (user)
        return (<GuitarAdminPage guitar={guitar} />)

    return (
        <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
                <Card className='relative h-96 overflow-hidden'>
                    <Image
                        src={guitar.Description.Image ? mainImg : '/placeholder.svg'}
                        width={1500}
                        height={1500}
                        alt={guitar.Title}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute h-full w-full top-0 bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0"/>
                    <CardContent className='absolute flex items-center bottom-0 w-full h-[20%] pl-4 bg-gradient-to-t from-black/80'>
                        <h1 className="text-brandy-punch-50 text-xl">{guitar.Title}</h1>
                    </CardContent>
                </Card>
                { guitar.Description.Paragraphs.map((paragraph: any, index: number) => {
                    const imageUrl = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + paragraph.Image

                    return (
                        <Card key={index} className={`mt-4 grid grid-cols-1 lg:grid-cols-2 overflow-hidden ${index % 2 ? 'bg-brandy-punch-900' : 'bg-brandy-punch-200'}`}>
                            <div className={`relative w-full aspect-square ${index % 2 && 'lg:order-last'}`}>
                                <div className={`absolute rounded-full aspect-square overflow-hidden w-[400%] 
                                    ${index % 2 ?
                                        '-right-[150%] lg:-right-[302%] -top-[295%] lg:-top-[149%]' :
                                        '-right-[140%] lg:right-0 -top-[295%] lg:-top-[149%]'
                                    }`}
                                >
                                    <Image
                                        src={paragraph.Image ? imageUrl : '/placeholder.svg'}
                                        width={1500}
                                        height={1500}
                                        alt={guitar.Title}
                                        className={`absolute object-cover aspect-square w-[27%] 
                                            ${index % 2 ?
                                                'lg:w-[27%] left-[36.5%] lg:left-0 top-[73.5%] lg:top-[37%]' :
                                                'lg:w-[26%] left-[39%] lg:left-[74.5%] top-[73.5%] lg:top-[37%]'
                                            }`}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col self-center w-full pt-11 lg:pt-6 p-6 space-y-4'>
                                { paragraph.Title && <h1 className={`text-xl font-bold my-2 ${index % 2 ? 'text-brandy-punch-50' : 'text-brandy-punch-950'}`}>{ paragraph.Title }</h1> }
                                { paragraph.Subtitle && <h2 className={`text-xl my-2 ${index % 2 ? 'text-brandy-punch-200' : 'text-brandy-punch-600'}`}>{ paragraph.Subtitle }</h2> }
                                <p className={`flex-grow ${index % 2 ? 'text-brandy-punch-50' : 'text-brandy-punch-950'}`}>{ paragraph.Body }</p>
                            </div>
                        </Card>
                )})}
                <Link href={{ pathname: '/Contact', query: { id: guitar.id }}} className="mt-4 mx-auto">
                    <Button className="bg-brandy-punch-500 text-brandy-punch-50">
                        Commander / Prendre contact
                    </Button>
                </Link>
            </div>
        </section>
    )
}
  