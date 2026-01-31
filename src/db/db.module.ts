import { Module, Global } from '@nestjs/common';
import { getDB } from './db.service';
import { DbContextService } from './db-context.service';
import { ClsModule } from 'nestjs-cls';
import { Kysely } from 'kysely';
import { DB } from '../../db/db';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const DATABASE_POOL = 'DATABASE_POOL';

@Global()
@Module({
    imports: [ClsModule],
    providers: [
        DbContextService,
        {
            provide: DATABASE_POOL,
            useFactory: getDB
        },
        {
            provide: DATABASE_CONNECTION,
            useFactory: (pool: Kysely<DB>, context: DbContextService) => {
                return new Proxy(pool, {
                    get: (target, prop) => {
                        const tx = context.getTransaction();
                        const obj = (tx && prop in tx) ? tx : target;
                        const value = obj[prop as keyof typeof obj];

                        // Bind functions to the original object to support private field access
                        if (typeof value === 'function') {
                            return value.bind(obj);
                        }
                        return value;
                    }
                });
            },
            inject: [DATABASE_POOL, DbContextService]
        }
    ],
    exports: [DATABASE_CONNECTION, DATABASE_POOL, DbContextService],
})
export class DbModule { }
