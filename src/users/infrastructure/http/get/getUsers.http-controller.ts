import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindAllUsersService } from '../../../application/services/findAll.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersNotFoundException } from 'src/users/domain/exceptions/usersNotFound.exception';

@ApiTags('users')
@Controller('users')
export class GetUsersController {
  constructor(private readonly findAllUsersService: FindAllUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users successfully retrieved.' })
  @ApiBadRequestResponse({
    description: 'Users not retrieved due to bad request.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @UsePipes(new ValidationPipe())
  async run() {
    try {
      const users = await this.findAllUsersService.execute();
      if (!users)
        throw new HttpException('Users not retrieved', HttpStatus.BAD_REQUEST);
      return users;
    } catch (error) {
      if (error instanceof UsersNotFoundException) {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
