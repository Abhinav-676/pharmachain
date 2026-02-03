import { Module, Global } from '@nestjs/common';
import { getDB } from './db.service';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const DATABASE_POOL = 'DATABASE_POOL';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DATABASE_POOL,
            useFactory: getDB
        },
        {
            provide: DATABASE_CONNECTION,
            useFactory: (pool) => pool,
            inject: [DATABASE_POOL]
        }
    ],
    exports: [DATABASE_CONNECTION, DATABASE_POOL],
})
export class DbModule { }
