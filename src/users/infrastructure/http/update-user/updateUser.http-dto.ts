import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserHttpDto {
  @ApiProperty({
    description: 'Name of the new user',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Last name of the new user',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({
    description: 'Address of the new user',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Profile picture of the new user',
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  @IsOptional()
  profilePicture: string;
}
