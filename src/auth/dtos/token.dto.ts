

export class TokenDto {
    userId: string;
    role: 'site-admin' | 'warehouse-admin' | 'store-admin';
}