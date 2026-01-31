import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Numeric = ColumnType<string, string | number, string | number>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Pgmigrations {
  id: Generated<number>;
  name: string;
  run_on: Timestamp;
}

export interface Products {
  id: Generated<string>;
  name: string;
  description: string;
  price: Numeric;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Regions {
  id: Generated<string>;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Siteadmins {
  id: Generated<string>;
  name: string;
  email: string;
  password_hash: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Storeadmins {
  id: Generated<string>;
  name: string;
  email: string;
  password_hash: string;
  created_at: Generated<Timestamp>;
  store_id: string | null;
  warehouse_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface Stores {
  id: Generated<string>;
  name: string;
  address: string;
  warehouse_id: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface StoresInventories {
  product_id: string;
  store_id: string;
  warehouse_id: string;
  quantity: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Warehouseadmins {
  id: Generated<string>;
  name: string;
  email: string;
  password_hash: string;
  warehouse_id: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Warehouses {
  id: Generated<string>;
  name: string;
  region_id: string;
  address: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface WarehousesInventories {
  product_id: string;
  warehouse_id: string;
  quantity: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  pgmigrations: Pgmigrations;
  products: Products;
  regions: Regions;
  siteadmins: Siteadmins;
  storeadmins: Storeadmins;
  stores: Stores;
  stores_inventories: StoresInventories;
  warehouseadmins: Warehouseadmins;
  warehouses: Warehouses;
  warehouses_inventories: WarehousesInventories;
}
