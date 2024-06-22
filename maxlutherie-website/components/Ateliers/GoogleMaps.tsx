'use client'

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import LoadingWheel from "../ui/loadingWheel";

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
    })
    const center = useMemo(() => ({ lat: 45.75482091824271, lng: 4.938829118760671 }), [])

    if (!isLoaded)
        return <LoadingWheel />

    return (
        <GoogleMap zoom={13} center={center} mapContainerClassName="mx-auto rounded-xl object-cover object-center w-full min-h-96">
            <Marker position={{ lat: 45.75482091824271, lng: 4.938829118760671 }}/>
        </GoogleMap>
    )
}