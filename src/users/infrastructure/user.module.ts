import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongoRepository } from './repositories/mongo.repository';
import { CreateUserController } from './http/create-user/createUser.http-controller';
import { CreateUserService } from '../application/services/createUser.service';
import { UserRepository } from '../domain/user.repository';
import { CryptoAdapter } from '../../adapters/crypto/cryptoAdapter';
import { JwtAdapter } from '../../adapters/jwt/jwtAdapter';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { LoginController } from './http/login/login.http-controller';
import { FindUserService } from '../application/services/findUser.service';
import { FindAllUsersService } from '../application/services/findAll.service';
import { UpdateUserService } from '../application/services/updateUser.service';
import { InvalidCredentialsException } from '../domain/exceptions/invalidCredentials.exception';
import { ValidateTokenMiddleware } from 'src/adapters/middlewares/validateToken.middleware';
import { GetUsersController } from './http/get/getUsers.http-controller';
import { UpdateUserController } from './http/update-user/updateUser.http-controller';

@Module({
  controllers: [
    CreateUserController,
    LoginController,
    GetUsersController,
    UpdateUserController,
  ],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    CryptoAdapter,
    JwtAdapter,
    MongoRepository,
    CreateUserService,
    FindUserService,
    FindAllUsersService,
    UpdateUserService,
    InvalidCredentialsException,
    {
      provide: UserRepository,
      useExisting: MongoRepository,
    },
  ],
  exports: [
    CreateUserService,
    FindUserService,
    FindAllUsersService,
    UpdateUserService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateTokenMiddleware)
      .forRoutes(
        CreateUserController,
        GetUsersController,
        UpdateUserController,
      );
  }
}
