import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PocketBase from 'pocketbase';

export default async function ContactPage({ searchParams }: any) {
  const pb = new PocketBase(process.env.DB_ADDR);
  const guitarList = await pb.collection('Guitars').getFullList({ cache: 'no-store' })

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Contactez-nous</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Entrez votre nom" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Entrez votre email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Modèle</Label>
            <Select defaultValue={searchParams.id}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un Modele" />
              </SelectTrigger>
              <SelectContent>
                { guitarList.map((guitar) => {
                  
                  return (
                    <SelectItem key={guitar.id} value={guitar.id}>{guitar.Title}</SelectItem>
                )})}
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea className="min-h-[120px]" id="message" placeholder="Entrez votre message" required />
          </div>
          <Button className="w-full" type="submit">
            Envoyer
          </Button>
        </form>
      </div>
    </section>
  )
}