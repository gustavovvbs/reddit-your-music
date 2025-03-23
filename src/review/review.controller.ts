import { Controller, Post, Body, Get, Param, NotFoundException, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { plainToInstance } from 'class-transformer';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { VoteReviewDto } from './dto/vote-review.dto';
import { Review } from './review.entity';

@Controller("reviews")
export class ReviewController {

    private readonly logger = new Logger(ReviewController.name);
    constructor(
        private readonly reviewService: ReviewService,
    ) {}

    @Post("create")
    async createReview(
        @Body() createReviewDTO: CreateReviewDTO,
    ): Promise<ReviewResponseDto> {
        try {
            const review = await this.reviewService.createReview(
                createReviewDTO.spotifyId,
                createReviewDTO.reviewContent,
                createReviewDTO.rating,
                createReviewDTO.userId
            );
    
            return plainToInstance(ReviewResponseDto, review);
        } catch (error) {
            this.logger.error(`Error creating review: ${error.message}`, error.stack);
            throw error;
        }
    }

    @Get(":id")
    async findById(
        @Param("id") id: number
    ): Promise<ReviewResponseDto | null> {
        const review = await this.reviewService.findById(id);

        if (!review) {
            throw new NotFoundException(`Review with id ${id} not found`);
        }

        return plainToInstance(ReviewResponseDto, review);
    }

    @Post("vote")
    @HttpCode(HttpStatus.OK)
    async voteReview(
        @Body() voteReviewDto: VoteReviewDto,
    ): Promise<ReviewResponseDto> {
        const review = await this.reviewService.voteReview(voteReviewDto.reviewId, voteReviewDto.vote);

        // this.logger.debug(`Review with id ${voteReviewDto.reviewId} voted successfully`);
        // console.log(review);
        return plainToInstance(ReviewResponseDto, review);
        
    }

    @Get()
    async findAll(): Promise<ReviewResponseDto[]> {
        const reviews = await this.reviewService.findAll();

        return plainToInstance(ReviewResponseDto, reviews);

    }
}