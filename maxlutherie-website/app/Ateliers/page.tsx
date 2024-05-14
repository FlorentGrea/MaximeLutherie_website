import * as icons from "@/components/ui/icons"
import Image from "next/image"
import Link from "next/link"

export default function AteliersPage() {

  return (
    <>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <Image
                    alt="Atelier de boîtes de cigares"
                    className="mx-auto rounded-xl object-cover sm:w-full"
                    height="600"
                    src="/bag/bag1.webp"
                    style={{
                        aspectRatio: "800/600",
                        objectFit: "cover",
                    }}
                    width="800"
                />
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Découvrez l&apos;art des guitares en boîtes de cigares
                    </h1>
                    <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Rejoignez notre atelier pratique et apprenez à construire votre propre guitare en boîte de cigares unique.
                        Libérez votre créativité et faites un instrument unique.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link
                            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                            href="https://wecandoo.fr/atelier/lyon-maxime-cigarbox"
                            target="_blank"
                        >
                            En savoir plus
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">À propos de l&apos;atelier</h2>
                    <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Dans cet atelier pratique, vous apprendrez l&apos;art de construire votre propre guitare en boîte de cigares.
                        Sous la direction de notre instructeur expérimenté, vous créerez un instrument unique et jouable à partir
                        de zéro.
                    </p>
                    <div className="grid gap-4">
                        <div className="flex items-center gap-2">
                            <icons.LocalisationIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            <span>82 Rue Paul et Marc Barbezat, 69150 Décines-Charpieu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <icons.UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            <span>John Doe, Fabricant de guitares en boîtes de cigares</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <icons.CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            <span>Tout les vendredi</span>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <Image
                        alt="Guitare en boîte de cigares"
                        className="mx-auto rounded-xl object-cover object-center sm:w-full"
                        height="310"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "550/310",
                            objectFit: "cover",
                        }}
                        width="550"
                    />
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            alt="Guitare en boîte de cigares 1"
                            className="mx-auto rounded-xl object-cover object-center"
                            height="275"
                            src="/bag/bag2.webp"
                            style={{
                                aspectRatio: "275/275",
                                objectFit: "cover",
                            }}
                            width="275"
                        />
                        <Image
                            alt="Guitare en boîte de cigares 2"
                            className="mx-auto rounded-xl object-cover object-center"
                            height="275"
                            src="/bag/bag3.webp"
                            style={{
                                aspectRatio: "275/275",
                                objectFit: "cover",
                            }}
                            width="275"
                        />
                        <Image
                            alt="Guitare en boîte de cigares 3"
                            className="mx-auto rounded-xl object-cover object-center"
                            height="275"
                            src="/bag/bag4.webp"
                            style={{
                                aspectRatio: "275/275",
                                objectFit: "cover",
                            }}
                            width="275"
                        />
                        <Image
                            alt="Guitare en boîte de cigares 4"
                            className="mx-auto rounded-xl object-cover object-center"
                            height="275"
                            src="/bag/bag5.webp"
                            style={{
                                aspectRatio: "275/275",
                                objectFit: "cover",
                            }}
                            width="275"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Témoignages</h2>
                    <div className="rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800">
                        <blockquote className="space-y-2">
                            <p className="text-gray-500 dark:text-gray-400">
                                &quot;Super expérience d&apos;une journée avec Max le luthier dans son atelier rempli d&apos;outils de pro... 
                                Je suis rentré chez moi avec une jolie petite guitare à 3 cordes qui une fois branchée sur 
                                mon ampli en son crunch envoie du son bien blues/roots, j&apos;ai plus qu&apos;à bosser le bottleneck... 
                                Max m&apos;a montré les différentes techniques d&apos;assemblage, de frettage, de profiling du manche, etc... 
                                et j&apos;ai pu mettre la main à la pâte sur toutes les phases de réalisation, et ça c&apos;est cool. 
                                Je conseille cet atelier à tous les guitaristes qui ont envie d&apos;ajouter une cigarbox à leur collection et 
                                souhaitent comprendre comment on fait pour fabriquer une gratte, 
                                ou même aux bricoleurs curieux qui aiment travailler le bois.&quot;
                            </p>
                            <cite className="not-italic font-medium">- Philippe L</cite>
                        </blockquote>
                    </div>
                    <div className="rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800">
                        <blockquote className="space-y-2">
                            <p className="text-gray-500 dark:text-gray-400">
                                &quot;J&apos;ai toujours voulu apprendre à construire une guitare, et l&apos;approche de la boîte de cigares l&apos;a rendu accessible et amusant. 
                                J&apos;ai hâte de continuer à jouer de mon nouvel instrument !&quot;
                            </p>
                            <cite className="not-italic font-medium">- Rodolphe P</cite>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}