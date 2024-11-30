import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post() create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
  @Get() findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
  @Put(':id') update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<UpdateResult> {
    return this.usersService.update(+id, user);
  }
  @Delete(':id') remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(+id);
  }
}