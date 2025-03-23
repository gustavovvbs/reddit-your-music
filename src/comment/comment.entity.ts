import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Review } from "../review/review.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    votesAndDownvotes: number;

    @ManyToOne(() => Review, (review) => review.comments, { onDelete: 'CASCADE' })
    review: Review;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user: Partial<User>;

    @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
    parent: Comment | null;

    @OneToMany(() => Comment, ( comment )=> comment.parent, { onDelete: 'CASCADE' })
    children: Comment[];

    @CreateDateColumn()
    createdAt: Date;
}