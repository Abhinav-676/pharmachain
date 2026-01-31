import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    // Create table and define FK constraints explicitly
    pgm.createTable('stores_inventories', {
        product_id: { type: 'uuid', notNull: true, references: 'products(id)', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        store_id: { type: 'uuid', notNull: true, references: 'stores(id)', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        warehouse_id: { type: 'uuid', notNull: true, references: 'warehouses(id)', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        quantity: { type: 'integer', notNull: true, default: 0 },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    // Composite primary key
    pgm.addConstraint('stores_inventories', 'stores_inventories_pkey', { primaryKey: ['product_id', 'store_id'] });

    // Indexes to speed up common queries
    pgm.createIndex('stores_inventories', ['product_id'], { name: 'idx_stores_inventories_product_id' });
    pgm.createIndex('stores_inventories', ['store_id'], { name: 'idx_stores_inventories_store_id' });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropIndex('stores_inventories', 'idx_stores_inventories_product_id', { ifExists: true });
    pgm.dropIndex('stores_inventories', 'idx_stores_inventories_store_id', { ifExists: true });
    pgm.dropConstraint('stores_inventories', 'stores_inventories_pkey', { ifExists: true });
    pgm.dropTable('stores_inventories');
}