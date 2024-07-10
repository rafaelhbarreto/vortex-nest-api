import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { OutputUserDTO } from './dto/output.user.dto';
import { PatchUserDTO } from './dto/patch.user.dto';

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

  /**
   * List all users
   *
   * @returns
   */
  async list(): Promise<OutputUserDTO[]> {
    return await this.prisma.user.findMany();
  }

  /**
   * Find a user by id
   *
   * @returns
   */
  async find(id: number): Promise<OutputUserDTO> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Update a user
   *
   * @param id
   * @param data
   * @returns
   */
  async update(id: number, data: PatchUserDTO): Promise<OutputUserDTO> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete an user
   *
   * @param id
   */
  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
