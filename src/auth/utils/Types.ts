

type BaseToken = {
    userId: string;
    role: string;
}

type TokenExtensions = {
    warehouseId?: string;
    storeId?: string;
}


export type AuthToken = BaseToken & TokenExtensions;