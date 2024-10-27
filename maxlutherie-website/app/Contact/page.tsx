'use client'

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import PocketBase from 'pocketbase';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default async function ContactPage({ searchParams }: any) {
  const form = useRef<HTMLFormElement>(null);
  const data = new FormData
  data.set('guitar', searchParams.title_main)
  const [contactData, setContactData] = useState(data)
  const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR);
  const guitarList = await pb.collection('Guitar_List').getFullList({ cache: 'no-store' })

  function ChangeValue(type: string, value: string) {
    contactData.set(type, value)
    setContactData(contactData)
  }

  function sendEmail(e: any) {
    e.preventDefault();
    console.log(contactData.get('name'))
    console.log(contactData.get('email'))
    console.log(contactData.get('guitar'))
    console.log(contactData.get('message'))
    console.log(form.current)
    emailjs.sendForm(process.env.NEXT_PUBLIC_MAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_MAILJS_TEMPLATE_ID!, form.current!, {publicKey: process.env.NEXT_PUBLIC_MAILJS_PUBLIC_KEY!,}).then(
        () => {
          console.log('SUCCESS!');
        },
        (error: any) => {
          console.log('FAILED...', error.text);
        },
      )
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 animate-slide-bottom">
      <Card className='container py-6 mx-auto px-4 md:px-6 lg:px-8 max-w-md space-y-6 bg-brandy-punch-200 text-brandy-punch-950'>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Contactez-nous</h1>
          <p className="text-brandy-punch-600">
            Remplissez le formulaire ci-dessous et je vous répondrais dès que possible.
          </p>
        </div>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" name="name" onChange={(event) => ChangeValue('name', event.target.value)} placeholder="Entrez votre nom" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" onChange={(event) => ChangeValue('email', event.target.value)} placeholder="Entrez votre email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Modèle</Label>
            <Select defaultValue={searchParams.title_main} name="guitar" onValueChange={(object) => {ChangeValue('guitar', object)}}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un Modele" />
              </SelectTrigger>
              <SelectContent>
                { guitarList.map((guitar) => {
                  
                  return (
                    <SelectItem key={guitar.id} value={guitar.title_main}>{guitar.title_main}</SelectItem>
                )})}
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea className="min-h-[120px]" id="message" name="message" onChange={(event) => ChangeValue('message', event.target.value)} placeholder="Entrez votre message" required />
          </div>
          <Button className="w-full bg-brandy-punch-500 text-brandy-punch-50" type="submit">
            Envoyer
          </Button>
        </form>
      </Card>
    </section>
  )
}