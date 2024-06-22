import { CardContent, Card } from "@/components/ui/card"
import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';
import Image from "next/image"
import Link from "next/link"

export default async function HomePage() {
  const pb = new PocketBase(process.env.DB_ADDR)
  const guitarList = await pb.collection('Guitars').getFullList({ cache: 'no-store' })
  const session = await getSession()
  const user = session?.user

  return (
    <main>
      <section className="w-full py-4 md:py-6 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Card className='grid grid-cols-1 sm:grid-cols-2 overflow-hidden bg-brandy-punch-200'>
            <div className="relative w-full aspect-square sm:order-last">
              <div className="absolute -right-[16%] -top-[16%] rounded-full w-[110%] aspect-square overflow-hidden">
                <Image
                  alt="Guitare faite à la main"
                  className="absolute top-[14%] right-[14%] rounded-lg object-cover aspect-square sm:order-last"
                  width={6000}
                  height={6000}
                  src="/a1.jpg"
                />
              </div>
            </div>
            <div className='flex flex-col self-center w-full p-6 space-y-4'>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brandy-punch-950">
                Découvrez l&apos;art de l&apos;artisanat
              </h1>
              <p className="text-lg text-brandy-punch-600 md:text-xl">
                Découvrez la beauté et la qualité de nos guitares faites à la main, construites avec passion et
                précision.
              </p>
            </div>
          </Card>
        </div>
      </section>
      <section className="w-full py-4 md:py-6 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl">
            Nos modèles de guitares
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
      <section className="w-full py-4 md:py-6 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Card className='grid grid-cols-1 sm:grid-cols-2 overflow-hidden bg-brandy-punch-200'>
            <div className="relative w-full aspect-square">
              <div className="absolute -top-[40%] sm:-top-[20%] -left-[20%] sm:-left-[40%] rounded-full w-[140%] aspect-square overflow-hidden">
                <Image
                  alt="Atelier de guitares"
                  className="absolute top-[20%] sm:top-[10%] sm:left-[15%] rounded-lg object-cover aspect-square"
                  width={6000}
                  height={6000}
                  src="/bag/bag9.webp"
                />
              </div>
            </div>
            <div className='flex flex-col self-center w-full p-6 space-y-4'>
              <h2 className="text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl">À propos de nous</h2>
              <p className="text-brandy-punch-600">
                Chez Max Lutherie, nous sommes passionnés par l&apos;art de la fabrication de guitares. Notre équipe de
                luthiers qualifiés fabrique chaque instrument avec une attention méticuleuse aux détails, en utilisant
                uniquement les meilleurs matériaux et des techniques ancestrales.
              </p>
              <p className="text-brandy-punch-600">
                Notre engagement envers la qualité et l&apos;artisanat se reflète dans chaque guitare que nous créons. Nous
                sommes fiers de notre travail et nous nous efforçons de procurer une expérience de jeu exceptionnelle
                à nos clients.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}