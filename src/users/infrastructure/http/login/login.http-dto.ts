import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginHttpDto {
  @ApiProperty({
    description: 'name of the user attempting to log in',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Password of the user attempting to log in',
    example: 'strongPassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
