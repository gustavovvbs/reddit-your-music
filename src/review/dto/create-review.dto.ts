import { IsString, IsNotEmpty, IsNumber } from "class-validator"


export class CreateReviewDTO {
    @IsString()
    @IsNotEmpty()
    spotifyId: string;

    @IsString()
    @IsNotEmpty()
    spotifyType: 'TRACK' | 'ALBUM';

    @IsString()
    @IsNotEmpty()
    reviewContent: string;

    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}