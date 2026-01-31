import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, from, lastValueFrom } from 'rxjs';
import { Kysely } from 'kysely';
import { DB } from '../../../db/db';
import { DbContextService } from '../../db/db-context.service';
import { DATABASE_POOL } from '../../db/db.module';
import { sql } from 'kysely';
import { Request } from 'express';
import { Roles } from '../../auth/utils/enums/roles.enum';

@Injectable()
export class RlsInterceptor implements NestInterceptor {
    constructor(
        @Inject(DATABASE_POOL) private readonly db: Kysely<DB>,
        private readonly dbContext: DbContextService,
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user;

        // If no user or not a tenant role, proceed without RLS transaction
        // Or arguably, proceed with a "public" transaction or no transaction
        if (!user || (user.role !== Roles.STORE_ADMIN && user.role !== Roles.WAREHOUSE_ADMIN)) {
            return next.handle();
        }

        return from(this.runWithTransaction(user, next));
    }

    private async runWithTransaction(user: any, next: CallHandler) {
        return await this.db.transaction().execute(async (tx) => {
            this.dbContext.setTransaction(tx);

            // Set RLS variables
            if (user.role === Roles.STORE_ADMIN && user.storeId) {
                await sql`select set_config('app.current_store_id', ${user.storeId}, true)`.execute(tx);
            } else if (user.role === Roles.WAREHOUSE_ADMIN && user.warehouseId) {
                await sql`select set_config('app.current_warehouse_id', ${user.warehouseId}, true)`.execute(tx);
            }

            // Execute the request handler
            return lastValueFrom(next.handle());
        });
    }
}
