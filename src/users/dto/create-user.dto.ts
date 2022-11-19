import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    address: string;

    @IsString()
    password: string;

    @IsString()
    contact: string;

    @IsEnum(UserRole)
    role: UserRole;
}
