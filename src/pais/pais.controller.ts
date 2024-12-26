import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, ConflictException, UseGuards, NotFoundException, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/roles.enum';
import { ResponseDto } from 'src/common/dtos/responseDto';
import { ErrorResponse } from 'src/common/dtos/errorResponse';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { Pais } from './entities/pais.entity';
import { UpdatePaisDto } from './dto/update-pais.dto';

@Controller('pais')
//@UseGuards(AuthGuard)
export class PaisController {
  constructor(private readonly service: PaisService) {}

  @Post()
  async create(@Body() create: CreatePaisDto): Promise<Pais> {
    return await this.service.create(create);
  }
  
  @Get()
  //@UseGuards(RolesGuard)
  //@Roles(Role.User, Role.Admin) 
  async findAll(): Promise<Pais[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Pais> {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() update: UpdatePaisDto):Promise<Pais> {
    return await this.service.update(id, update);
  }

  @Delete(':id')
  async remove(@Param('id') id: number):Promise<Pais> {
    return await this.service.remove(id);
  }
}
