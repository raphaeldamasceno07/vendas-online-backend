import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @MinLength(3)
  @MaxLength(256)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsPhoneNumber()
  @IsString()
  phone: string;

  @IsString()
  @Length(11, 11, {
    message: 'CPF deve ter exatamente 11 caracteres',
  })
  @IsNotEmpty()
  cpf: string;
}
