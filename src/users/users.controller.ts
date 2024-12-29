import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post() create(@Body() user: Users): Promise<Users> {
    return this.usersService.create(user);
  }
  @Get() findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.findOne(+id);
  }
  @Put(':id') update(
    @Param('id') id: string,
    @Body() user: Users,
  ): Promise<UpdateResult> {
    return this.usersService.update(+id, user);
  }
  @Delete(':id') remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(+id);
  }
}
