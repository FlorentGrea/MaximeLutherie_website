import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import PocketBase from 'pocketbase';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export default async function AdminPage() {

    async function formSubmit(formdata: FormData) {
        'use server'

        const name = formdata.get('name')
        const pwd = formdata.get('password')
        if (name == process.env.ACCOUNT_NAME && pwd == process.env.PASSWORD) {
            const is_connected = 'true'
            cookies().set("Admin", is_connected);
            redirect('/')
        }
    }

    return (
        <section className="w-full py-12 md:py-16 lg:py-20 animate-slide-bottom">
          <Card className='container py-6 mx-auto px-4 md:px-6 lg:px-8 max-w-md space-y-6 bg-brandy-punch-200 text-brandy-punch-950'>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Se connecter au mode admin</h1>
            </div>
            <form className="space-y-4" action={formSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nom de compte</Label>
                <Input id="name" name="name" placeholder="Entrez votre nom de compte" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" type="password" placeholder="Entrez votre mot de passe" required />
              </div>
              <Button className="w-full bg-brandy-punch-500 text-brandy-punch-50" type="submit">
                Connexion
              </Button>
            </form>
          </Card>
        </section>
    )
}
    //const session = await getSession();
    //const user = session?.user;
//
    //if (!user)
    //    redirect ('/api/auth/login')
    //else
    //    redirect ('/')