import { Expose, Transform, Type } from "class-transformer";

export class SpotifyImageDto {
    @Expose()
    url: string

    @Expose()
    height: number;

    @Expose()
    width: number;
}

export class SpotifyArtistDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    uri: string;
}

export class SpotifyAlbumDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    releaseDate: string;

    @Expose()
    @Type(() => SpotifyImageDto)
    images: SpotifyImageDto[];
}
export class SpotifyTrackDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    @Type(() =>SpotifyArtistDto)
    artists: SpotifyArtistDto[];

    @Expose()
    @Type(() => SpotifyAlbumDto)
    album: SpotifyAlbumDto;

    @Expose()
    durationMs: number;
    
    @Expose()
    explicit: boolean;
    
    // externalUrls: {
    //     spotify: string;
    // };
}