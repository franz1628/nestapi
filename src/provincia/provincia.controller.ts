import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, ConflictException, UseGuards } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Response } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/roles.enum';

@Controller('provincia')
@UseGuards(AuthGuard)
export class ProvinciaController {
  constructor(private readonly service: ProvinciaService) {}

  @Post()
  async create(@Body() create: CreateProvinciaDto, @Res() res: Response): Promise<void> {
    try {
      const model = await this.service.create(create);
      res.status(HttpStatus.CREATED).json(model);
    } catch (error) {
      if (error instanceof ConflictException) {
        res.status(HttpStatus.CONFLICT).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  }
  
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin) 
  async findAll(@Res() res: Response): Promise<void> {
    const models = await this.service.findAll();
    if (models.length === 0) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.OK).json(models);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() update: UpdateProvinciaDto) {
    return this.service.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
