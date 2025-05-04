import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ThemeModule } from './theme/theme.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EventEquipmentModule } from './event-equipment/event-equipment.module';
import { FieldValueModule } from './field-value/field-value.module';
import { FieldModule } from './field/field.module';
import { RegistrationModule } from './registration/registration.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // rend les variables dispo dans tous les modules
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    EquipmentModule,
    FieldModule,
    RegistrationModule,
    EventModule,
    ThemeModule,
    FieldValueModule,
    EventEquipmentModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AppModule {}
