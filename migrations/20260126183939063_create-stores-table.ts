import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('stores', {
        id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
        name: { type: 'varchar(255)', notNull: true },
        address: { type: 'text', notNull: true },
        warehouse_id: { type: 'uuid', notNull: true, references: 'warehouses(id)', onDelete: 'CASCADE' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.addConstraint('storeadmins', 'storeadmins_store_id_fkey', {
        foreignKeys: [
            {
                columns: 'store_id',
                references: 'stores(id)',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint('storeadmins', 'storeadmins_store_id_fkey', { ifExists: true });
    pgm.dropTable('stores');
}
