import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SiteAdminService } from 'src/users/services/siteadmin.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StoreAdminService } from 'src/users/services/storeadmin.service';
import { WarehouseAdminService } from 'src/users/services/warehouseadmin.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly siteAdminService: SiteAdminService,
        private readonly storeAdminService: StoreAdminService,
        private readonly wareHouseAdminService: WarehouseAdminService,
        private readonly jwtService: JwtService
    ) { }

    async signInSiteAdmin(email: string, password: string) {
        const user = await this.siteAdminService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password_hash } = user;
        const isPasswordValid = await bcrypt.compare(password, password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            role: 'site-admin'
        }
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }

    async signInWarehouseAdmin(email: string, password: string) {
        const user = await this.wareHouseAdminService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password_hash } = user;
        const isPasswordValid = await bcrypt.compare(password, password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            warehouse_id: user.warehouse_id,
            role: 'warehouse-admin'
        }
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }

    async signInStoreAdmin(email: string, password: string) {
        const user = await this.storeAdminService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password_hash } = user;
        const isPasswordValid = await bcrypt.compare(password, password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            store_id: user.store_id,
            role: 'store-admin'
        }
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }
}
