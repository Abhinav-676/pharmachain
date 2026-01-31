import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('warehouses', {
        id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
        name: { type: 'varchar(255)', notNull: true },
        region_id: { type: 'uuid', notNull: true },
        address: { type: 'text', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    // Explicit FK with cascade and named constraint for clarity
    pgm.addConstraint('warehouses', 'warehouses_region_id_fkey', {
        foreignKeys: [
            {
                columns: 'region_id',
                references: 'regions(id)',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    pgm.addConstraint('storeadmins', 'storeadmins_warehouse_id_fkey', {
        foreignKeys: [
            {
                columns: 'warehouse_id',
                references: 'warehouses(id)',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    // Index region_id to speed joins/filters
    pgm.createIndex('warehouses', ['region_id'], { name: 'idx_warehouses_region_id' });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropIndex('warehouses', 'idx_warehouses_region_id', { ifExists: true });
    pgm.dropConstraint('warehouses', 'warehouses_region_id_fkey', { ifExists: true });
    pgm.dropConstraint('storeadmins', 'storeadmins_warehouse_id_fkey', { ifExists: true });
    pgm.dropTable('warehouses');
}