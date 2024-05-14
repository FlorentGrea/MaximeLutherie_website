import GuitarsAdminPage from "@/components/Guitares/GuitarsAdminPage";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';

export default async function GuitaresPage() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const guitarList = await pb.collection('Guitars').getFullList({ cache: 'no-store' })
    const session = await getSession();
    const user = session?.user;
    
    guitarList.sort((a,b) => a.order - b.order)
    guitarList.reverse()

    if (user)
        return <GuitarsAdminPage guitarList={guitarList} />

    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-wrap justify-between">
                { guitarList.map((guitar) => {
                    const imageUrl = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.Description.Image

                    return (
                        <Link key={guitar.id} href={`/Guitares/${guitar.id}`} className="sm:w-[49%] lg:w-[32%] mb-8">
                            <Card>
                              <Image
                                alt={guitar.Title}
                                className="rounded-t-lg object-cover w-full"
                                height={300}
                                src={guitar.Description.Image ? imageUrl : "/placeholder.svg"}
                                style={{
                                  aspectRatio: "400/300",
                                  objectFit: "cover",
                                }}
                                width={400}
                              />
                              <CardContent>
                                <h3 className="text-xl font-bold text-gray-900">{guitar.Title}</h3>
                                <p className="mt-2 text-gray-700">
                                  Fabriqué avec précision et attention aux détails, cette guitare offre un son riche et résonnant.
                                </p>
                              </CardContent>
                            </Card>
                        </Link>
                )})}
            </div>
        </section>
    )
}
  