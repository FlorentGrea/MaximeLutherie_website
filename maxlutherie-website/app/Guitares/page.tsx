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
            <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                { guitarList.map((guitar) => {
                    const imageUrl = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.Description.Image

                    return (
                        <Link key={guitar.id} href={`/Guitares/${guitar.id}`}>
                          <Card className="relative overflow-hidden h-96">
                            <Image
                              alt={guitar.Title}
                              className="absolute w-full h-full rounded-t-lg object-cover aspect-[4/3] z-0"
                              height={300}
                              width={400}
                              src={guitar.Description.Image ? imageUrl : "/placeholder.svg"}
                            />
                            <div className="absolute h-full w-full bg-gradient-to-t from-brandy-punch-950/70 to-brandy-punch-800/0 z-10"/>
                            <CardContent className="absolute bottom-0 z-20">
                              <h3 className="text-2xl font-bold text-brandy-punch-50">{guitar.Title}</h3>
                            </CardContent>
                          </Card>
                        </Link>
                )})}
            </div>
        </section>
    )
}
  