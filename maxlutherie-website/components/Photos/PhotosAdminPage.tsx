'use client'

import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from  "@dnd-kit/sortable"
import PhotoCardAdmin from "./PhotoCardAdmin";
import LoadingWheel from "../ui/loadingWheel";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import PocketBase from 'pocketbase';
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function PhotosAdminPage({ record }: any) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR)
    record = JSON.parse(record)
    const defaultPhotos = JSON.stringify(record.Images)
    const [ photos, setPhotos ] = useState([...record.Images])
    const [ changeButton, setChangeButton ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 2}}),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
    }))

    function onDragEnd(event: any) {
        const { active, over } = event

        if (active.id === over.id)
            return ;

        let tmpPhotos = [...photos]
        const oldIndex = photos.findIndex((photo: string) => photo === active.id)
        const newIndex = photos.findIndex((photo: string) => photo === over.id)
        tmpPhotos = arrayMove(photos, oldIndex, newIndex)
        setPhotos(tmpPhotos)
    }

    useEffect(() => {
        if (defaultPhotos !== JSON.stringify(photos))
            setChangeButton(true)
    }, [photos, defaultPhotos])

    async function handleSubmit(record: any) {
        setLoading(true)
        record.Images = photos
        try {
            await pb.collection(record.collectionId).update(record.id, record)
        } catch (error) {
            console.error('error modifying pictures:', error)
        } finally {
            location.reload()
        }
    }

    async function addPhotos(postForm: FormData) {
        setLoading(true)

        try {
            await pb.collection(record.collectionId).update(record.id, postForm)
        } catch (error) {
            console.error('error adding pictures:', error)
        } finally {
            location.reload()
        }
    }

    if (loading)
        return <LoadingWheel />

    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <form action={addPhotos} className="container flex flex-col w-full mx-auto max-w-sm items-center gap-1.5 mb-10 px-4 md:px-6 lg:px-8">
                <Label htmlFor="picture" className="text-md mx-auto">Ajoutez des photos</Label>
                <Input id="picture" type="image" name="Images" accept="images/*" required multiple/>
                <Button type="submit" className="w-fit self-end mx-auto bg-brandy-punch-500 text-brandy-punch-50">Sauvegarder</Button>
            </form>
            <div className='container mx-auto px-4 md:px-6 lg:px-8 columns-1 md:columns-2 lg:columns-3 break-inside-auto gap-2 w-full'>
                <DndContext id={record.id} collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
                    <SortableContext items={photos} strategy={rectSortingStrategy}>
                        { photos.map((photo: string) => {
                        
                            return (
                                <PhotoCardAdmin key={photo} record={record} photo={photo} photos={photos} setPhotos={setPhotos} />
                        )})}
                    </SortableContext>
                </DndContext>
            </div>
            { changeButton &&
                <div className='sticky flex flex-row bottom-5 w-full justify-center align-middle animate-slide-bottom-d1'>
                    <Button onClick={() => handleSubmit(record)} className='mx-5 bg-brandy-punch-500 text-brandy-punch-50'>Sauvegarder</Button>
                    <Button variant={'outline'} onClick={() => {setLoading(true); window.location.reload()}} className='mx-5'>Reinitialiser</Button>
                </div>
            }
        </section>
    )
}