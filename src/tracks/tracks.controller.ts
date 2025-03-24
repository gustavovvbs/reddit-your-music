import { Controller, Get, Param, Logger, InternalServerErrorException } from '@nestjs/common';
import { TrackReviewResponseDto } from './dto/track-review-response.dto';
import { ReviewService } from '../review/review.service';
import { SpotifyService } from '../external/spotify/spotify.service';
import { plainToInstance } from 'class-transformer';
import { ReviewResponseDto } from '../review/dto/review-response.dto';
import { SpotifyTrackDto } from '../external/spotify/dto/spotify-track.dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
    private readonly logger = new Logger(TracksController.name);
    
    constructor(
        private readonly reviewService: ReviewService,
        private readonly spotifyService: SpotifyService,
        private readonly tracksService: TracksService,
    ) {}

    @Get(':spotifyId')
    async getTrackReviews(@Param('spotifyId') spotifyId: string): Promise<TrackReviewResponseDto> {
        try {
            const trackReviewResponse = await this.tracksService.getTrackAndReviews(spotifyId);

            return trackReviewResponse;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar track e reviews', error);
        }
    }
}