import AteliersAdminPage from "@/components/Ateliers/AtelierAdminPage"
import Map from "@/components/Ateliers/GoogleMaps"
import { Card } from "@/components/ui/card"
import * as icons from "@/components/ui/icons"
import { getSession } from "@auth0/nextjs-auth0"
import PocketBase from 'pocketbase';
import Image from "next/image"
import Link from "next/link"

export default async function AteliersPage() {

    const pb = new PocketBase(process.env.DB_ADDR)
    const Article = await pb.collection('Atelier_Page').getOne('61ilm2khve5ikye', { cache: 'no-store' })
    const session = await getSession()
    const user = session?.user

    if (user)
        return <AteliersAdminPage Article={Article} />

    if(!user)
        console.log('no token')

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
                            src="/bag/bag1.webp"
                        />
                    </div>
                  </div>
                  <div className='flex flex-col self-center w-full pb-6 sm:pt-6 space-y-4'>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Découvrez l&apos;art des guitares en boîtes de cigares
                    </h1>
                    <p className="text-brandy-punch-600 md:text-xl/relaxed sm:text-base/relaxed xl:text-xl/relaxed dark:text-brandy-punch-600">
                        Rejoignez notre atelier pratique et apprenez à construire votre propre guitare en boîte de cigares unique.
                        Libérez votre créativité et faites un instrument unique.
                    </p>
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
            <section className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 animate-slide-bottom-d1">
                <Card className='container p-0 grid items-center sm:grid-cols-2 sm:gap-10 overflow-hidden bg-brandy-punch-900'>
                  <div className="w-full sm:order-last sm:pr-6 lg:p-0">
                        <Map />
                  </div>
                  <div className='flex flex-col self-center w-full p-6 space-y-4'>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brandy-punch-50">À propos de l&apos;atelier</h2>
                        <p className="text-brandy-punch-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Dans cet atelier pratique, vous apprendrez l&apos;art de construire votre propre guitare en boîte de cigares.
                            Sous la direction de notre instructeur expérimenté, vous créerez un instrument unique et jouable à partir
                            de zéro.
                        </p>
                        <div className="grid gap-4 text-brandy-punch-50">
                            <div className="flex items-center gap-2">
                                <icons.LocalisationIcon className="h-6 w-6 text-brandy-punch-50" />
                                <span>82 Rue Paul et Marc Barbezat, 69150 Décines-Charpieu</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <icons.CalendarIcon className="h-6 w-6 text-brandy-punch-50" />
                                <span>Sur réservation</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </Card>
            </section>
            <section className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 animate-slide-bottom-d2">
                <Card className='container grid items-center lg:grid-cols-2 lg:gap-10 overflow-hidden bg-brandy-punch-200'><div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 pt-6 lg:pt-0">
                            <Image
                                alt="Guitare en boîte de cigares 1"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src="/bag/bag2.webp"
                            />
                            <Image
                                alt="Guitare en boîte de cigares 2"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src="/bag/bag3.webp"
                            />
                            <Image
                                alt="Guitare en boîte de cigares 3"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src="/bag/bag4.webp"
                            />
                            <Image
                                alt="Guitare en boîte de cigares 4"
                                className="w-full mx-auto rounded-xl object-cover object-center"
                                width="1500"
                                height="1500"
                                src="/bag/bag5.webp"
                            />
                        </div>
                    </div>
                    <div className="py-6 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brandy-punch-950">Témoignages</h2>
                        <div className="rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800">
                            <blockquote className="space-y-2">
                                <p className="text-brandy-punch-500">
                                    &quot;Super expérience d&apos;une journée avec Max le luthier dans son atelier rempli d&apos;outils de pro... 
                                    Je suis rentré chez moi avec une jolie petite guitare à 3 cordes qui une fois branchée sur 
                                    mon ampli en son crunch envoie du son bien blues/roots, j&apos;ai plus qu&apos;à bosser le bottleneck... 
                                    Max m&apos;a montré les différentes techniques d&apos;assemblage, de frettage, de profiling du manche, etc... 
                                    et j&apos;ai pu mettre la main à la pâte sur toutes les phases de réalisation, et ça c&apos;est cool. 
                                    Je conseille cet atelier à tous les guitaristes qui ont envie d&apos;ajouter une cigarbox à leur collection et 
                                    souhaitent comprendre comment on fait pour fabriquer une gratte, 
                                    ou même aux bricoleurs curieux qui aiment travailler le bois.&quot;
                                </p>
                                <cite className="not-italic font-medium text-brandy-punch-950">- Philippe L</cite>
                            </blockquote>
                        </div>
                        <div className="rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800">
                            <blockquote className="space-y-2">
                                <p className="text-brandy-punch-500">
                                    &quot;J&apos;ai toujours voulu apprendre à construire une guitare, et l&apos;approche de la boîte de cigares l&apos;a rendu accessible et amusant. 
                                    J&apos;ai hâte de continuer à jouer de mon nouvel instrument !&quot;
                                </p>
                                <cite className="not-italic font-medium text-brandy-punch-950">- Rodolphe P</cite>
                            </blockquote>
                        </div>
                    </div>
                </Card>
            </section>

        </>
    )
}