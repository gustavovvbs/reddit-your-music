import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}