import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from "../users/user.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async createReview(
        spotifyId: string,
        reviewContent: string,
        rating: number,
        userId: number) : Promise<Review> {
            const review = this.reviewRepository.create({
                spotifyId,
                review: reviewContent,
                rating,
                votesAndDownvotes: 0,
                user: { id: userId } as User,
            })

            return this.reviewRepository.save(review);
        }

    async findBySpotifyId(spotifyId: string): Promise<Review[]> {
        return this.reviewRepository.find({ where: { spotifyId } });
    }

    async voteReview(
        id: number,
        vote: boolean
    ) : Promise<Review> {
        const review = await this.findById(id);

        if (!review) {
            throw new NotFoundException(`Review with id ${id} not found`); 
        }

        if (vote) {
            review.votesAndDownvotes++;
        } else {
            review.votesAndDownvotes--;
        }

        await this.reviewRepository.save(review);
        return review;
    }

    async findById(id: number): Promise<Review | null> {
        return this.reviewRepository.findOne({
             where: { id },
             relations: ["user",  "comments", "comments.user"] }
            );
    }

    async findByUserId(userId: number): Promise<Review[]> {
        return this.reviewRepository.find({ where: { user: { id: userId } } });
    }

    async findAll(): Promise<Review[]> {
        return this.reviewRepository.find();
    }

}