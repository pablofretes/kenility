import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindUserService } from '../../../application/services/findUser.service';
import { LoginHttpDto } from './login.http-dto';
import { CryptoAdapter } from '../../../../adapters/crypto/cryptoAdapter';
import { JwtAdapter } from '../../../../adapters/jwt/jwtAdapter';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InvalidCredentialsException } from 'src/users/domain/exceptions/invalidCredentials.exception';
import { UserNotFoundException } from 'src/users/domain/exceptions/userNotFound.exception';

@ApiTags('users/login')
@Controller('users/login')
export class LoginController {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly jwt: JwtAdapter,
    private readonly crypto: CryptoAdapter,
    private readonly errorClass: InvalidCredentialsException,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Log in a user and return a JWT token' })
  @ApiBody({ type: LoginHttpDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in and JWT token returned.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @UsePipes(new ValidationPipe())
  async run(@Body() body: LoginHttpDto) {
    try {
      const { name, password } = body;
      const user = await this.findUserService.execute({ name });
      const hash = this.crypto.hashPassword(password);
      if (user.password !== hash) throw new InvalidCredentialsException();
      const token = this.jwt.generateToken({ name });
      return token;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (error instanceof InvalidCredentialsException) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
