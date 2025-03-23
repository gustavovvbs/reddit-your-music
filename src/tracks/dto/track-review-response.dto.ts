import { Expose, Type } from 'class-transformer';
import { SpotifyTrackDto } from 'src/external/spotify/dto/spotify-track.dto';
import { ReviewResponseDto } from 'src/review/dto/review-response.dto';

export class TrackReviewResponseDto {
    @Expose()
    @Type(() => SpotifyTrackDto)
    track: SpotifyTrackDto;

    @Expose()
    @Type(() => ReviewResponseDto)
    reviews: ReviewResponseDto[] | null;
}