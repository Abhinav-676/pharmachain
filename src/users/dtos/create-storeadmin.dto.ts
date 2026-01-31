

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateStoreAdminDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    storeId: string;
}