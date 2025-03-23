import { Controller, Get, Post, Delete, Body, Param, NotFoundException } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Comment } from "./comment.entity";
import { plainToInstance } from "class-transformer";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentResponseDto } from "./dto/comment-response.dto";
import { create } from "domain";

@Controller("comments")
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ) {}

    @Post()
    async createComment(
        @Body() createCommentDto : CreateCommentDto,
    ): Promise<CommentResponseDto> {
        const comment = await this.commentService.createComment(
            createCommentDto.content,
            createCommentDto.reviewId,
            createCommentDto.userId,
            createCommentDto.parentId
        )

        return plainToInstance(CommentResponseDto, comment)
    }

    @Get(":id")
    async findById(
        @Param("id") id: number,
    ): Promise<CommentResponseDto | null> {
        const comment = await this.commentService.findById(id);

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return plainToInstance(CommentResponseDto, comment);
    }

    @Get("review/:reviewId")
    async findByReviewId(
        @Param("reviewId") reviewId: number,
    ): Promise<CommentResponseDto[]> {
        const comments = await this.commentService.findByReviewId(reviewId);

        return plainToInstance(CommentResponseDto, comments);
    }

    @Get("user/:userId")
    async findByUserId(
        @Param("userId") userId: number,
    ) : Promise<CommentResponseDto[]> {
        const comments = await this.commentService.findByUserId(userId);

        return plainToInstance(CommentResponseDto, comments);
    }

    @Delete(":id")
    async deleteComment(
        @Param("id") id: number,
    ): Promise<void> {
        const comment = await this.commentService.findById(id);

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        await this.commentService.deleteComment(id);
    }

    @Post("vote/:id")
    async voteComment(
        @Param("id") id: number,
        @Body() vote: {value: boolean},
    ): Promise<CommentResponseDto> {
        const comment = await this.commentService.voteComment(id, vote.value);
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }
        return plainToInstance(CommentResponseDto, comment);
    }

}