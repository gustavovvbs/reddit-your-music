export class CreateCommentDto {
    reviewId: number;
    userId: number;
    content: string;
    parentId?: number;
}