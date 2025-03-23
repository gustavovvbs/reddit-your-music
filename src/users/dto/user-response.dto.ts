

export class UserResponseDto {
    id: number;
    email: string;
    username: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}