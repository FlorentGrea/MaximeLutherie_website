import PhotosAdminPage from "@/components/Photos/PhotosAdminPage";
import { getSession } from "@auth0/nextjs-auth0";
import { Card } from "@/components/ui/card";
import PocketBase from 'pocketbase';
import Image from "next/image";

export default async function PhotosPage() {
  const pb = new PocketBase(process.env.DB_ADDR);
  const record = await pb.collection('Photos').getOne('eupapy42hgupvan', { cache: 'no-store' })
  const photos = record.Images
  const session = await getSession();
  const user = session?.user;

  if (user)
    return <PhotosAdminPage record={JSON.stringify(record)} />

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className='container mx-auto px-4 md:px-6 lg:px-8 columns-1 md:columns-2 lg:columns-3 break-inside-auto gap-2 w-full'>
        { photos.map((photo: string, index: number) => {
          const imageUrl = process.env.DB_ADDR + 'api/files/' + record.collectionId + '/' + record.id + '/' + photo
          
          return (
            <Card key={index} className="mb-2 overflow-hidden">
              <Image
                alt={photo}
                className="rounded-t-lg object-cover w-full"
                height={300}
                src={photo ? imageUrl : "/placeholder.svg"}
                style={{
                  objectFit: "cover",
                }}
                width={400}
              />
            </Card>
        )})}
      </div>
    </section>
  )
}