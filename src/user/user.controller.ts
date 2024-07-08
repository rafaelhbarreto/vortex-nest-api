import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { PatchUserDTO } from './dto/patch.user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() body: CreateUserDTO) {
    const user = await this.userService.create(body);
    return { user };
  }

  @Get(':id')
  public async find(@Param('id') id: number) {
    return { id };
  }

  @Get()
  public async list() {
    return { users: [] };
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return { id, body };
  }

  @Patch(':id')
  public async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchUserDTO,
  ) {
    return { id, body };
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
