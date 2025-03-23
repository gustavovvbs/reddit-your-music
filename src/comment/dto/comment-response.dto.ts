import { UserResponseDto } from "src/users/dto/user-response.dto";

export class CommentResponseDto {
    id: number;
    content: string;
    reviewId: number;
    userId: number;
    parentId?: number;
    votesAndDownvotes: number;
    createdAt: Date;
    children: CommentResponseDto[];
    user: Partial<UserResponseDto>;
}