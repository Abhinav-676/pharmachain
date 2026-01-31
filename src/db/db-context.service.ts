import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Transaction } from 'kysely';
import { DB } from '../../db/db';

@Injectable()
export class DbContextService {
    private static readonly TRANSACTION_KEY = 'KYSELY_TRANSACTION';

    constructor(private readonly cls: ClsService) { }

    setTransaction(transaction: Transaction<DB>) {
        this.cls.set(DbContextService.TRANSACTION_KEY, transaction);
    }

    getTransaction(): Transaction<DB> | undefined {
        return this.cls.get(DbContextService.TRANSACTION_KEY);
    }
}
