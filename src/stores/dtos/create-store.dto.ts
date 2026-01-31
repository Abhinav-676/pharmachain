
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateStoreDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsUUID()
    @IsNotEmpty()
    warehouse_id: string;
}
