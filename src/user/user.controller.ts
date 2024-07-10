import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { PatchUserDTO } from './dto/patch.user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from './interceptors/log.interceptor';
import { ParamId } from './decorators/param.id.decorator';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() body: CreateUserDTO) {
    const user = await this.userService.create(body);
    return { user };
  }

  @Get(':id')
  public async find(@ParamId() id: number) {
    const user = await this.userService.find(id);
    return { user };
  }

  @Get()
  public async list() {
    const users = await this.userService.list();
    return { users };
  }

  @Put(':id')
  public async update(@ParamId() id: number, @Body() body: UpdateUserDTO) {
    const user = await this.userService.update(id, body);
    return { user };
  }

  @Patch(':id')
  public async patch(@ParamId() id: number, @Body() body: PatchUserDTO) {
    const user = await this.userService.update(id, body);
    return { user };
  }

  @Delete(':id')
  public async delete(@ParamId() id: number) {
    await this.userService.delete(id);
    return { message: 'User deleted' };
  }
}
