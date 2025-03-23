import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Review } from "src/review/review.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    password: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @OneToMany(() => Review, (review) => review.user, { onDelete: 'CASCADE' })
    reviews: Review[];

    @CreateDateColumn()
    createdAt: Date;

}