import { CardContent, Card } from "@/components/ui/card"
import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';
import Image from "next/image"
import Link from "next/link"
import HomePageAdmin from "@/components/MainPageAdmin";

export default async function HomePage() {
  const pb = new PocketBase(process.env.DB_ADDR)
  const guitarList = await pb.collection('Guitars').getFullList({ cache: 'no-store' })
  const Article = await pb.collection('Main_Page').getOne('wovyggtylon449j', { cache: 'no-store' })
  const session = await getSession()
  const user = session?.user

  guitarList.sort((a,b) => a.order - b.order)
  guitarList.reverse()

  if (user)
    return <HomePageAdmin Article={Article} guitarList={guitarList} />

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
                  src={Article.Images_a1 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images_a1 : '/placeholder.svg'}
                />
              </div>
            </div>
            <div className='flex flex-col self-center w-full p-6 space-y-4'>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brandy-punch-950">
                {Article.Title_a1}
              </h1>
              <p className="text-lg text-brandy-punch-600 md:text-xl">
                {Article.Subtitle_a1}
              </p>
            </div>
          </Card>
        </div>
      </section>
      <section className="w-full py-4 md:py-6 lg:py-8 animate-slide-bottom">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl">
            Les modèles de guitares
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            { guitarList.map((guitar, index: number) => {
              const imageUrl = process.env.DB_ADDR + 'api/files/' + guitar.collectionId + '/' + guitar.id + '/' + guitar.Description.Image

              return (
                <Link key={guitar.id} href={`/Guitares/${guitar.id}`}>
                  <Card className={`relative overflow-hidden h-96 animate-slide-bottom-d2`}>
                    <Image
                      alt={guitar.Title}
                      className="absolute w-full h-full rounded-t-lg object-cover aspect-[4/3] z-0"
                      height={300}
                      width={400}
                      src={guitar.Description.Image ? imageUrl : "/placeholder.svg"}
                    />
                    <div className="absolute h-full w-full bg-gradient-to-t from-brandy-punch-950/50 to-brandy-punch-800/0 z-10"/>
                    <CardContent className="absolute bottom-0 z-20">
                      <h3 className="text-2xl font-bold text-brandy-punch-50">{guitar.Title}</h3>
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
                  src={Article.Images_a2 ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + Article.collectionId + '/' + Article.id + '/' + Article.Images_a2 : '/placeholder.svg'}
                />
              </div>
            </div>
            <div className='flex flex-col self-center w-full p-6 space-y-4'>
              <h2 className="text-3xl font-bold text-brandy-punch-950 md:text-4xl lg:text-5xl">{Article.Title_a2}</h2>
              <p className="text-brandy-punch-600">
                {Article.Subtitle_a2}
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