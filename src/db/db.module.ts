import { Module } from '@nestjs/common';
import { getDB } from './db.service';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: getDB
        }
    ],
    exports: [DATABASE_CONNECTION],
})
export class DbModule {}
