import { Body, Controller, Post } from '@nestjs/common';
import { LoginSiteAdminDto } from './dtos/login-siteadmin.dto';
import { AuthService } from './auth.service';

import { Public } from '../common/utils/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login/site-admin')
    async loginSiteAdmin(@Body() body: LoginSiteAdminDto) {
        const { email, password } = body;
        return this.authService.signInSiteAdmin(email, password);
    }

    @Post('login/warehouse-admin')
    async loginWarehouseAdmin(@Body() body: LoginSiteAdminDto) {
        const { email, password } = body;
        return this.authService.signInWarehouseAdmin(email, password);
    }

    @Post('login/store-admin')
    async loginStoreAdmin(@Body() body: LoginSiteAdminDto) {
        const { email, password } = body;
        return this.authService.signInStoreAdmin(email, password);
    }
}
