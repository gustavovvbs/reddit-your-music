import { Exclude, Expose, Transform, Type} from "class-transformer";
import { UserResponseDto } from "../../users/dto/user-response.dto";
import { CommentResponseDto } from "src/comment/dto/comment-response.dto";

export class ReviewResponseDto {
    @Expose()
    id: number;

    @Expose()
    spotifyId: string;

    @Expose()
    spotifyType: 'TRACK' | 'ALBUM';

    @Expose()
    review: string;

    @Expose()
    rating: number;

    @Expose()
    votesAndDownvotes: number;

    @Exclude( { toPlainOnly: true } )
    @Transform(({ value }) => {
        if (!value) return null;

        return value.map((comment) => ({
            id: comment.id,
            content: comment.content,
            parentId: comment.parentId,
            votesAndDownvotes: comment.votesAndDownvotes,
            createdAt: comment.createdAt,
            user : comment.user ? {
                id: comment.user.id,
                username: comment.user.username,
            } : null,
        }));
    })
    comments: Partial<CommentResponseDto>[];

    @Transform(({ value}) => {
       if (!value) return null;

       return {
              id: value.id,
              username: value.username,
       }
    })
    user: Partial<UserResponseDto>;

    @Expose()
    get commentCount(): number {
        return Array.isArray(this.comments) ? this.comments.length : 0;
    }

    @Expose()
    get recentComments(): Partial<CommentResponseDto>[] {
        if (!Array.isArray(this.comments) || this.comments.length <= 1) {
        return [];
        }
        return this.comments.slice(0, 2).map((comment) => ({
        id: comment.id,
        content: comment.content,
        user: comment.user
            ? {
                id: comment.user.id,
                username: comment.user.username,
            }
            : undefined,
        createdAt: comment.createdAt,
        votesAndDownvotes: comment.votesAndDownvotes,
        parentId: comment.parentId,
        }));
    }

}