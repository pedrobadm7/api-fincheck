import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authenticate(authenticadeDto: AuthenticateDto) {
    const { email, password } = authenticadeDto;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalide credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalide credentials');
    }

    return { isPasswordValid };
  }
}
