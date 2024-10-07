import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserService } from '../../../application/services/createUser.service';
import { CreateUserHttpDto } from './createUser.http-dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserNotCreatedException } from 'src/users/domain/exceptions/userNotCreated.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, cb) => {
          const randomName = Math.random().toString(36).substring(2, 10);
          const sanitizedName = randomName;
          const fileExtension = extname(file.originalname);
          const newFilename = `${sanitizedName}${fileExtension}`;
          cb(null, newFilename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserHttpDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiBadRequestResponse({
    description: 'User not created due to bad request.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @UsePipes(new ValidationPipe())
  async run(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserHttpDto,
  ) {
    try {
      const data = {
        name: body.name,
        lastname: body.lastname,
        address: body.address,
        password: body.password,
        profilePicture: file.filename,
      };
      const user = await this.createUserService.execute(data);
      if (!user)
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      return user;
    } catch (error) {
      if (error instanceof UserNotCreatedException) {
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
