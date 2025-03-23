import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Comment } from "../comment/comment.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    spotifyId: string;

    @Column({
        type: 'enum',
        enum: ['TRACK', 'ALBUM'],
    })
    spotifyType: 'TRACK' | 'ALBUM';

    @Column()
    review: string;

    @Column()
    rating: number;

    @Column()
    votesAndDownvotes: number;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.review, { onDelete: 'CASCADE' })
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

}