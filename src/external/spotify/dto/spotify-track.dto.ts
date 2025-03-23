export class SpotifyTrackDto {
    id: string;
    name: string;
    artists: {
        id: string;
        name: string;
        uri: string;
    }[];
    album: {
        id: string;
        name: string;
        releaseDate: string;
        images: {
            url: string;
            height: number;
            width: number;
        }[];
    };
    durationMs: number;
    explicit: boolean;
    externalUrls: {
        spotify: string;
    };
}