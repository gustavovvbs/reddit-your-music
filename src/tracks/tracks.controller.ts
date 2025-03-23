import { Controller, Get, Param, Logger } from '@nestjs/common';
import { TrackReviewResponseDto } from './dto/track-review-response.dto';
import { ReviewService } from '../review/review.service';
import { SpotifyService } from '../external/spotify/spotify.service';
import { plainToInstance } from 'class-transformer';
import { ReviewResponseDto } from '../review/dto/review-response.dto';
import { SpotifyTrackDto } from '../external/spotify/dto/spotify-track.dto';

@Controller('tracks')
export class TracksController {
    private readonly logger = new Logger(TracksController.name);
    
    constructor(
        private readonly reviewService: ReviewService,
        private readonly spotifyService: SpotifyService,
    ) {}

    @Get(':spotifyId')
    async getTrackReviews(
        @Param('spotifyId') spotifyId: string,
    ): Promise<TrackReviewResponseDto> {
        try {
            this.logger.debug(`Buscando track com ID: ${spotifyId}`);
            
            const trackData = await this.spotifyService.getTrackOrAlbum(spotifyId, 'track');
            
            this.logger.debug(`Dados recebidos do Spotify: ${JSON.stringify(trackData)}`);
            
            const reviews = await this.reviewService.findBySpotifyId(spotifyId);
            
            if (!trackData || Object.keys(trackData).length === 0) {
                this.logger.warn(`Track data vazio para ID: ${spotifyId}. Verificando SpotifyService.`);
            }

            trackData.album.
        
            const response = {
                track: trackData,
                reviews: reviews
            };
            
            return plainToInstance(TrackReviewResponseDto, response);
        } catch (error) {
            this.logger.error(`Erro ao buscar track ${spotifyId}: ${error.message}`, error.stack);
            throw error;
        }
    }
}