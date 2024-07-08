import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDTO} createUserDTO
   * @returns
   */
  async create({ name, email, password }: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
