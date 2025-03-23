import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(username: string, password: string, email: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username, password: hashedPassword, email
        });
        return this.userRepository.save(user);
    }

    async findByUserId(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findUserByUserName(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}