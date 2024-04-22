import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [AuthGuard],
})
export class AuthModule {}
