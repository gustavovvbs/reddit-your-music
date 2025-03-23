import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VoteReviewDto {
  @IsNumber()
  @IsNotEmpty()
  reviewId: number;

  @IsBoolean()
  @IsNotEmpty()
  vote: boolean;
}