import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "../review/review.entity";
import { User } from "../users/user.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async createComment(
        content: string,
        reviewId: number,
        userId: number,
        parentId?: number,
    ): Promise<Comment> {
        const comment = this.commentRepository.create({
            content,
            review: { id: reviewId } as Review,
            votesAndDownvotes: 0,
            user: { id: userId } as User,
            parent: parentId ? { id: parentId} as Comment : null,
        });

        return this.commentRepository.save(comment);
    }

    async voteComment(
        id: number,
        vote: boolean 
    ) : Promise<Comment> {
        const comment = await this.findById(id);

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        if (vote) {
            comment.votesAndDownvotes++;
        } else {
            comment.votesAndDownvotes--;
        }

        await this.commentRepository.save(comment);

        return comment;
    }

    async findById(id: number): Promise<Comment | null> {
        const comment = await this.commentRepository.findOne({ where: { id}});
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return comment;
    }

    async findByReviewId(reviewId: number): Promise<Comment[]> {
        const comment = await this.commentRepository.find({ where: { review: { id: reviewId } } });
        if (!comment) {
            throw new NotFoundException(`Comment with review id ${reviewId} not found`);
        }

        return comment
    }

    async findByUserId(userId: number): Promise<Comment[]> {
        const comment = await this.commentRepository.find({ where: { user: { id: userId } } });
        if (!comment) {
            throw new NotFoundException(`Comment with user id ${userId} not found`);
        }

        return comment;
    }

    async deleteComment(id: number): Promise<void> {
        const comment = await this.findById(id);

        if (!comment) {
            throw new Error(`Comment with id ${id} not found`);
        }

        this.commentRepository.delete(id);
    }
}