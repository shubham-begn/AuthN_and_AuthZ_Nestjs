import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule, UserModule,JwtModule.register({
        secret: "Secret",
        signOptions: { expiresIn: '60s' },
    })],
    providers: [AuthService, LocalStrategy,JwtStrategy],
    exports: [AuthService], 
})
export class AuthModule {}
