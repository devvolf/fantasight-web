export interface AddWatchablePayload {
    title: string;
    description: string;
    year: string;
    genreIds: string[];
    characteristicIds: string[];
    image: File;
    video: File;
}

export interface AddWatchable {
    title: string;
    description: string;
    year: number;
    genreIds: string[];
    characteristicIds: string[];
    imageId: string;
    videoId: string;
}
