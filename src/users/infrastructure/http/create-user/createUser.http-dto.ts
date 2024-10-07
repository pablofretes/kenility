import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserHttpDto {
  @ApiProperty({
    description: 'Name of the new user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Last name of the new user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'Address of the new user',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Profile picture of the new user',
    type: 'string',
    format: 'binary',
  })
  profilePicture: Express.Multer.File;

  @ApiProperty({
    description: 'Password of the new user',
    example: 'strongPassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
