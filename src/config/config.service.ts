import { Injectable } from '@nestjs/common';

enum EnvVariables {
  JWT_SECRET = 'JWT_SECRET',
  DATABASE_URL = 'DATABASE_URL',
  SITEADMIN_USR = 'SITEADMIN_USR',
  SITEADMIN_EMAIL = 'SITEADMIN_EMAIL',
  SITEADMIN_PASS = 'SITEADMIN_PASS',
}


@Injectable()
export class ConfigService {
    private envVaiables = new Map<string, string>();
    ENV = EnvVariables
    
    constructor() {
        this.loadEnvVariables();
    }

    private loadEnvVariables() {
        Object.values(EnvVariables).forEach((variable) => {
            if (!process.env[variable]) {
            throw new Error(`Missing environment variable: ${variable}`);
            }
        });
    }

    getEnvVariable(variable: EnvVariables) {
        const value = process.env[variable];

        if (!value) {
            throw new Error(`Environment variable ${variable} not set`);
        }
        return value;
    }
}
