'use client'

import { Card, CardContent } from "@/components/ui/card";
import { useSortable } from  "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "../ui/button";
import Image from "next/image";
import { CrossIcon } from "../ui/icons";

export default function PhotoCardAdmin({ record, photo, photos, setPhotos }: any) {
    const imageUrl = process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + record.collectionId + '/' + record.id + '/' + photo
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: photo})
    const style = {
        transition,
        transform: CSS.Translate.toString(transform)
    }

    function deletePhoto() {
        const tmpPhotos = [...photos]
        tmpPhotos.splice(photos.findIndex((base_photo: string) => base_photo === photo), 1)
        setPhotos(tmpPhotos)
    }

    return (
        <Card ref={setNodeRef} {...attributes} {...listeners} style={style} className="relative mb-2 overflow-hidden">
            <Image
                alt={photo}
                className="rounded-t-lg object-cover w-full"
                height={300}
                src={photo ? imageUrl : "/placeholder.svg"}
                width={400}
            />
            <CardContent className='absolute flex justify-end items-center top-4 right-4 p-0 w-32'>
                <Button variant={'destructive'} onClick={deletePhoto}>
                    <CrossIcon className='fill-white'/>
                </Button>
            </CardContent>
        </Card>
    )
}