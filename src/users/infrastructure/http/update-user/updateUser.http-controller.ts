import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateUserService } from '../../../application/services/updateUser.service';
import { UpdateUserHttpDto } from './updateUser.http-dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserNotUpdatedException } from 'src/users/domain/exceptions/userNotUpdated.exception';

@ApiTags('users')
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put(':uuid')
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: UpdateUserHttpDto })
  @ApiResponse({ status: 201, description: 'User successfully updated.' })
  @ApiBadRequestResponse({
    description: 'User not updated due to bad request.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @UsePipes(new ValidationPipe())
  async run(@Param('uuid') uuid: string, @Body() body: UpdateUserHttpDto) {
    try {
      const user = await this.updateUserService.execute(uuid, body);
      if (!user)
        throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
      return user;
    } catch (error) {
      if (error instanceof UserNotUpdatedException) {
        throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
