import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyConfig } from './spotify.config';
import { SpotifyTrackDto } from './dto/spotify-track.dto';

@Controller('spotify')
export class SpotifyController {
    constructor(
        private readonly spotifyService: SpotifyService,
    ) {}

   @Get("track")
   async getTrack(
        @Query('id') id: string,
    ): Promise<SpotifyTrackDto> {
        console.log("getTrack", id);
        return this.spotifyService.getTrackOrAlbum(id, 'track');
    }

}