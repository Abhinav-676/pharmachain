
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsUUID()
    @IsNotEmpty()
    region_id: string;
}
