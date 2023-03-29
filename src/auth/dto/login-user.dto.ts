import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ganibek@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Uzb@k!$t0n' })
  @IsString()
  readonly password: string;
}
