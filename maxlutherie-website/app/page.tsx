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
      <section className="w-full bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto flex items-center justify-between gap-8 px-4 md:px-6 lg:px-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Découvrez l&apos;art de l&apos;artisanat
            </h1>
            <p className="text-lg text-gray-400 md:text-xl">
              Découvrez la beauté et la qualité de nos guitares faites à la main, construites avec passion et
              précision.
            </p>
          </div>
          <Image
            alt="Guitare faite à la main"
            className="hidden w-1/2 rounded-lg object-cover md:block"
            height={600}
            src="/placeholder.svg"
            style={{
              aspectRatio: "600/600",
              objectFit: "cover",
            }}
            width={600}
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Nos modèles de guitares
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            { guitarList.map((guitar) => {
              const imageUrl = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.Description.Image

              return (
                <Link key={guitar.id} href={`/Guitares/${guitar.id}`}>
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
        </div>
      </section>
      <section className="w-full bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Image
                alt="Atelier de guitares"
                className="rounded-lg object-cover w-full"
                height={400}
                src="/bag/bag9.webp"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width={600}
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">À propos de nous</h2>
              <p className="text-gray-700">
                Chez Max Lutherie, nous sommes passionnés par l&apos;art de la fabrication de guitares. Notre équipe de
                luthiers qualifiés fabrique chaque instrument avec une attention méticuleuse aux détails, en utilisant
                uniquement les meilleurs matériaux et des techniques ancestrales.
              </p>
              <p className="text-gray-700">
                Notre engagement envers la qualité et l&apos;artisanat se reflète dans chaque guitare que nous créons. Nous
                sommes fiers de notre travail et nous nous efforçons de procurer une expérience de jeu exceptionnelle
                à nos clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}