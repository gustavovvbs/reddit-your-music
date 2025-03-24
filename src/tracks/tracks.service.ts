import { Inject, Injectable, Logger } from '@nestjs/common';
import { ReviewService } from '../review/review.service';
import { SpotifyService } from '../external/spotify/spotify.service';
import { plainToInstance } from 'class-transformer';

import { TrackReviewResponseDto } from './dto/track-review-response.dto';

import { ReviewResponseDto } from '../review/dto/review-response.dto';

import { SpotifyTrackDto } from '../external/spotify/dto/spotify-track.dto';



@Injectable()
export class TracksService {
    private readonly logger = new Logger(TracksService.name);

    constructor(
        private readonly reviewService: ReviewService,
        private readonly spotifyService: SpotifyService,
    ) {}

    async getTrackAndReviews(spotifyId: string) : Promise<TrackReviewResponseDto> {
        try {
            this.logger.debug(`Buscando track com ID: ${spotifyId}`);

            // get track from the spotify service 
            const trackData = await this.spotifyService.getTrackOrAlbum(spotifyId, 'track');

            if (!trackData || Object.keys(trackData).length === 0) {
                this.logger.warn(`Track data vazio para ID: ${spotifyId}. Verificando SpotifyService.`);
            }

            const reviews = this.reviewService.findBySpotifyId(spotifyId);


            const response = {
                track: trackData,
                reviews: reviews
            }

            return plainToInstance(TrackReviewResponseDto, response, {
                excludeExtraneousValues: true
            });

        } catch (error) {
            throw error;
        }
    }
}