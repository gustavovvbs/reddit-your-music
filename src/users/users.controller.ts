import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("register")
    async register(
        @Body() CreateUserDTO,
    ) {
        return this.usersService.createUser(CreateUserDTO.username, CreateUserDTO.password, CreateUserDTO.email);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }
}