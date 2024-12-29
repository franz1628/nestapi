import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, ConflictException, UseGuards, NotFoundException, HttpException, Query } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Response } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/roles.enum';
import { ResponseDto } from 'src/common/dtos/responseDto';
import { Provincia } from './entities/provincia.entity';
import { ErrorResponse } from 'src/common/dtos/errorResponse';
import { PaginationDto } from 'src/common/dtos/paginationDto';

@Controller('provincia')
//@UseGuards(AuthGuard)
export class ProvinciaController {
  constructor(private readonly service: ProvinciaService) {}

  @Get("findAllPaginado")
  async findAllPaginado(@Query() paginationDto :PaginationDto){
    return this.service.findPaginationAll(paginationDto);
  }

  @Post()
  async create(@Body() create: CreateProvinciaDto): Promise<Provincia> {
    return await this.service.create(create);
  }
  
  @Get()
  //@UseGuards(RolesGuard)
  //@Roles(Role.User, Role.Admin) 
  async findAll(): Promise<Provincia[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Provincia> {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() update: UpdateProvinciaDto):Promise<Provincia> {
    return await this.service.update(id, update);
  }

  @Delete(':id')
  async remove(@Param('id') id: number):Promise<Provincia> {
    return await this.service.remove(id);
  }
}
