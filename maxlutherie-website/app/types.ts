export interface GuitarData {
    id: string
    collectionId: string
    Title: string
    Image: string
    Order: number
    Description: GuitarDescription[]
}

export interface GuitarDescription {
    Title: string
    Subtitle: string
    Body: string
    Image: string
}