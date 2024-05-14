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
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col">
                <Card className='relative h-96 overflow-hidden'>
                    <Image
                        src={guitar.Description.Image ? mainImg : '/placeholder.svg'}
                        width={1500}
                        height={1500}
                        alt={guitar.Title}
                        className="object-cover w-full h-full"
                    />
                    <CardContent className='absolute flex items-center bottom-0 w-full h-[20%] pl-4 bg-gradient-to-t from-black/80'>
                        <h1 className="text-white text-xl">{guitar.Title}</h1>
                    </CardContent>
                </Card>
                { guitar.Description.Paragraphs.map((paragraph: any, index: number) => {
                    const imageUrl = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + paragraph.Image

                    return (
                        <Card key={index} className={`flex flex-col justify-between my-4 lg:max-h-96 overflow-hidden ${index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            <Image
                                src={paragraph.Image ? imageUrl : '/placeholder.svg'}
                                width={1500}
                                height={1500}
                                alt={guitar.Title}
                                className="object-cover w-full lg:w-[49.5%] h-80 lg:h-full"
                            />
                            <CardContent className='flex flex-col content-center w-full lg:w-[49.5%] lg:pt-6'>
                                { paragraph.Title && <h1 className='my-2'>{ paragraph.Title }</h1> }
                                { paragraph.Subtitle && <h2 className='my-2'>{ paragraph.Subtitle }</h2> }
                                <p className="flex-grow">{ paragraph.Body }</p>
                            </CardContent>
                        </Card>
                )})}
                <Link href={{ pathname: '/Contact', query: { id: guitar.id }}} className="mx-auto">
                    <Button>
                        Commander / Prendre contact
                    </Button>
                </Link>
            </div>
        </section>
    )
}
  