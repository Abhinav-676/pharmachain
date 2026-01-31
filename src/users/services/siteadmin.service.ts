import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { UpdateSiteAdminParams } from "../utils/service/Types";
import { Kysely } from "kysely";
import { DB } from "../../../db/db";
import { DATABASE_CONNECTION } from "src/db/db.module";

@Injectable()
export class SiteAdminService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<DB>) { }

    async findById(id: string) {
        return await this.db.selectFrom('siteadmins')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
    }

    async findByEmail(email: string) {
        return await this.db.selectFrom('siteadmins')
            .selectAll()
            .where('email', '=', email)
            .executeTakeFirst();
    }

    async findAll() {
        return await this.db.selectFrom('siteadmins')
            .selectAll()
            .execute();
    }

    async update(id: string, data: UpdateSiteAdminParams) {
        try {
            const updatedUser = await this.db.updateTable('siteadmins')
                .set(data)
                .where('id', '=', id)
                .executeTakeFirstOrThrow();

            return updatedUser;
        } catch (error) {
            throw new NotFoundException(error, `Site Admin with ID ${id} not found`);
        }
    }

    async resetAndCreate(data: UpdateSiteAdminParams) {
        // Delete all existing site admins
        await this.db.deleteFrom('siteadmins').execute();

        // Hash the password
        const passwordHash = await import('bcrypt').then(m => m.hash(data.password!, 10));

        // Create new site admin
        return await this.db.insertInto('siteadmins')
            .values({
                name: data.name!,
                email: data.email!,
                password_hash: passwordHash
            })
            .returningAll()
            .executeTakeFirst();
    }
}